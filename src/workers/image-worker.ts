/// <reference lib="webworker" />

import { WorkerMessage, WorkerResponse, WorkerProgressMessage, WorkerSuccessMessage, WorkerErrorMessage } from '@/types/worker';
import { ImageFormat, FitMode, ConversionOptions, FORMAT_MIME_TYPES } from '@/types/image';

let offscreenCanvas: OffscreenCanvas | null = null;
let offscreenContext: OffscreenCanvasRenderingContext2D | null = null;

// Initialize worker with OffscreenCanvas if supported
self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const message = e.data;

  switch (message.type) {
    case 'INIT':
      initWorker(message);
      break;
    case 'CONVERT':
      handleConvert(message);
      break;
    case 'GENERATE_PREVIEW':
      handlePreview(message);
      break;
    case 'CLEANUP':
      handleCleanup();
      break;
  }
};

function initWorker(message: WorkerMessage & { type: 'INIT' }) {
  // OffscreenCanvas not available in worker context easily
  // We'll use regular canvas approach in worker
  postMessage({ type: 'INIT_ACK' } as WorkerResponse);
}

async function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

function drawImageToCanvas(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement | OffscreenCanvas,
  fit: FitMode,
  targetWidth: number,
  targetHeight: number
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || !(ctx instanceof OffscreenCanvasRenderingContext2D || ctx instanceof CanvasRenderingContext2D)) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  if (fit === 'contain') {
    const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
    const x = (targetWidth - img.width * scale) / 2;
    const y = (targetHeight - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  } else if (fit === 'cover') {
    const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
    const x = (targetWidth - img.width * scale) / 2;
    const y = (targetHeight - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  } else {
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  }
}

async function handleConvert(message: WorkerMessage & { type: 'CONVERT' }) {
  try {
    sendProgress(10, 'loading');

    const img = await loadImage(message.imageData);
    
    sendProgress(30, 'processing');

    // Create canvas in worker
    const canvas = new OffscreenCanvas(
      message.options.width || img.width,
      message.options.height || img.height
    );

    drawImageToCanvas(
      img,
      canvas,
      message.options.fit || 'contain',
      message.options.width || img.width,
      message.options.height || img.height
    );

    sendProgress(60, 'encoding');

    let mimeType = FORMAT_MIME_TYPES[message.options.format];
    let extension = message.options.format;

    const qualityValue = (message.options.format === 'jpg' || message.options.format === 'webp') 
      ? message.options.quality / 100 
      : undefined;

    let blob: Blob;
    
    if (message.options.format === 'svg') {
      // SVG special handling
      const pngDataUrl = canvas.convertToBlob({ type: 'image/png', quality: 1 });
      const pngBlob = await pngDataUrl;
      const reader = new FileReader();
      const svgDataUrl = await new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(pngBlob);
      });

      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image width="${canvas.width}" height="${canvas.height}" xlink:href="${svgDataUrl}" />
</svg>`;
      blob = new Blob([svgContent], { type: 'image/svg+xml' });
    } else if (message.options.format === 'ico') {
      // ICO special handling - PNG wrapper
      const icoCanvas = new OffscreenCanvas(256, 256);
      const icoCtx = icoCanvas.getContext('2d');
      if (icoCtx && (icoCtx instanceof OffscreenCanvasRenderingContext2D)) {
        icoCtx.drawImage(img, 0, 0, 256, 256);
        blob = await icoCanvas.convertToBlob({ type: 'image/png', quality: 1 });
      } else {
        blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
      }
      extension = 'ico';
    } else {
      blob = await canvas.convertToBlob({ type: mimeType, quality: qualityValue });
    }

    sendProgress(90, 'encoding');

    // Convert blob to data URL
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve) => {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(blob);
    });

    sendProgress(100, 'encoding');

    const successMsg: WorkerSuccessMessage = {
      type: 'SUCCESS',
      result: {
        dataUrl,
        format: message.options.format,
      },
    };
    postMessage(successMsg);
  } catch (error) {
    const errorMsg: WorkerErrorMessage = {
      type: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    postMessage(errorMsg);
  }
}

async function handlePreview(message: WorkerMessage & { type: 'GENERATE_PREVIEW' }) {
  try {
    const img = await loadImage(message.imageData);

    const canvas = new OffscreenCanvas(
      message.options.width || img.width,
      message.options.height || img.height
    );

    drawImageToCanvas(
      img,
      canvas,
      message.options.fit || 'contain',
      message.options.width || img.width,
      message.options.height || img.height
    );

    let mimeType = FORMAT_MIME_TYPES[message.options.format];
    if (message.options.format === 'svg') {
      mimeType = 'image/png'; // Use PNG for SVG preview
    }

    const qualityValue = (message.options.format === 'jpg' || message.options.format === 'webp') 
      ? message.options.quality / 100 
      : undefined;

    const blob = await canvas.convertToBlob({ type: mimeType, quality: qualityValue });

    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve) => {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(blob);
    });

    const successMsg: WorkerSuccessMessage = {
      type: 'SUCCESS',
      result: {
        dataUrl,
        format: message.options.format,
      },
      isPreview: true,
    };
    postMessage(successMsg);
  } catch (error) {
    const errorMsg: WorkerErrorMessage = {
      type: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    postMessage(errorMsg);
  }
}

function handleCleanup() {
  if (offscreenCanvas) {
    offscreenCanvas = null;
    offscreenContext = null;
  }
}

function sendProgress(progress: number, stage: 'loading' | 'processing' | 'encoding') {
  const msg: WorkerProgressMessage = {
    type: 'PROGRESS',
    progress,
    stage,
  };
  postMessage(msg);
}

export {};
