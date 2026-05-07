import type { PercentCrop } from 'react-image-crop';

/**
 * Crop an image using canvas.
 * Accepts PercentCrop (display-independent) and converts to natural pixel
 * coordinates at export time using the image's naturalWidth/naturalHeight.
 * Only called on confirm/export, never during live drag interaction.
 */
export async function cropImage(
  imageSrc: string,
  crop: PercentCrop
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        const { naturalWidth, naturalHeight } = image;

        // Convert percent crop to natural image pixel coordinates
        const pixelX = Math.round((crop.x / 100) * naturalWidth);
        const pixelY = Math.round((crop.y / 100) * naturalHeight);
        const pixelWidth = Math.round((crop.width / 100) * naturalWidth);
        const pixelHeight = Math.round((crop.height / 100) * naturalHeight);

        if (pixelWidth <= 0 || pixelHeight <= 0) {
          reject(new Error(`Invalid crop dimensions: ${pixelWidth}x${pixelHeight}`));
          return;
        }

        canvas.width = pixelWidth;
        canvas.height = pixelHeight;

        ctx.drawImage(
          image,
          pixelX,
          pixelY,
          pixelWidth,
          pixelHeight,
          0,
          0,
          pixelWidth,
          pixelHeight
        );

        resolve(canvas.toDataURL('image/png'));
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () => {
      reject(new Error('Failed to load image for cropping'));
    };

    image.src = imageSrc;
  });
}

/**
 * Crop an HTMLImageElement directly using percent crop.
 */
export function cropImageElement(
  image: HTMLImageElement,
  crop: PercentCrop
): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  const { naturalWidth, naturalHeight } = image;
  const pixelX = Math.round((crop.x / 100) * naturalWidth);
  const pixelY = Math.round((crop.y / 100) * naturalHeight);
  const pixelWidth = Math.round((crop.width / 100) * naturalWidth);
  const pixelHeight = Math.round((crop.height / 100) * naturalHeight);

  canvas.width = pixelWidth;
  canvas.height = pixelHeight;

  ctx.drawImage(image, pixelX, pixelY, pixelWidth, pixelHeight, 0, 0, pixelWidth, pixelHeight);

  return canvas.toDataURL('image/png');
}

/**
 * Get cropped image as Blob for efficient download
 */
export async function cropImageToBlob(
  imageSrc: string,
  crop: PercentCrop,
  mimeType: string = 'image/png',
  quality: number = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        const { naturalWidth, naturalHeight } = image;
        const pixelX = Math.round((crop.x / 100) * naturalWidth);
        const pixelY = Math.round((crop.y / 100) * naturalHeight);
        const pixelWidth = Math.round((crop.width / 100) * naturalWidth);
        const pixelHeight = Math.round((crop.height / 100) * naturalHeight);

        canvas.width = pixelWidth;
        canvas.height = pixelHeight;

        ctx.drawImage(image, pixelX, pixelY, pixelWidth, pixelHeight, 0, 0, pixelWidth, pixelHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          mimeType,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () => {
      reject(new Error('Failed to load image for cropping'));
    };

    image.src = imageSrc;
  });
}

/**
 * Validate percent crop is within bounds
 */
export function validateCropArea(crop: PercentCrop): boolean {
  return (
    crop.x >= 0 &&
    crop.y >= 0 &&
    crop.width > 0 &&
    crop.height > 0 &&
    crop.x + crop.width <= 100 &&
    crop.y + crop.height <= 100
  );
}
