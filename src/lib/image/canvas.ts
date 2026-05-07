import { FitMode, ImageDimensions } from '@/types/image';

export function drawImageToCanvas(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  fit: FitMode,
  targetWidth: number,
  targetHeight: number
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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

export async function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        try {
          const img = await loadImageFromDataUrl(result);
          resolve(img);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getImageDimensions(img: HTMLImageElement): ImageDimensions {
  return {
    width: img.width,
    height: img.height,
  };
}
