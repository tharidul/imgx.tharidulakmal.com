import { ImageFormat, ConversionOptions, ConversionResult } from '@/types/image';
import { drawImageToCanvas } from './canvas';
import { FORMAT_MIME_TYPES } from '@/types/image';

export async function convertImage(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  options: ConversionOptions
): Promise<ConversionResult> {
  const { format, quality, width, height, fit } = options;

  const targetWidth = width || img.width;
  const targetHeight = height || img.height;

  // Draw image to canvas
  drawImageToCanvas(img, canvas, fit || 'contain', targetWidth, targetHeight);

  let mimeType = FORMAT_MIME_TYPES[format];
  let extension = format;

  // Handle quality parameter
  const qualityValue = (format === 'jpg' || format === 'webp') ? quality / 100 : undefined;
  let dataUrl = canvas.toDataURL(mimeType, qualityValue);

  // Special handling for ICO (PNG wrapped)
  if (format === 'ico') {
    const icoCanvas = document.createElement('canvas');
    icoCanvas.width = 256;
    icoCanvas.height = 256;
    const icoCtx = icoCanvas.getContext('2d');
    if (icoCtx) {
      icoCtx.drawImage(img, 0, 0, 256, 256);
      dataUrl = icoCanvas.toDataURL('image/png');
      extension = 'ico';
    }
  }

  // Special handling for SVG
  if (format === 'svg') {
    const svgDataUrl = canvas.toDataURL('image/png');
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${targetWidth}" height="${targetHeight}" viewBox="0 0 ${targetWidth} ${targetHeight}">
  <image width="${targetWidth}" height="${targetHeight}" xlink:href="${svgDataUrl}" />
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const objectUrl = URL.createObjectURL(blob);
    return {
      dataUrl: svgDataUrl,
      blob,
      objectUrl,
    };
  }

  return {
    dataUrl,
  };
}

export function downloadImage(result: ConversionResult, filename: string, format: ImageFormat): void {
  const link = document.createElement('a');
  
  if (result.objectUrl) {
    link.href = result.objectUrl;
  } else {
    link.href = result.dataUrl;
  }
  
  link.download = `${filename}.${format}`;
  link.click();

  // Revoke object URL if it exists to prevent memory leak
  if (result.objectUrl) {
    URL.revokeObjectURL(result.objectUrl);
  }
}
