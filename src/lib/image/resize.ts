import { ImageDimensions } from '@/types/image';

export function calculateAspectRatio(
  originalWidth: number,
  originalHeight: number,
  newWidth?: number,
  newHeight?: number,
  lockAspectRatio: boolean = true
): ImageDimensions {
  if (!lockAspectRatio) {
    return {
      width: newWidth || originalWidth,
      height: newHeight || originalHeight,
    };
  }

  const aspectRatio = originalWidth / originalHeight;

  if (newWidth && !newHeight) {
    return {
      width: newWidth,
      height: Math.round(newWidth / aspectRatio),
    };
  }

  if (newHeight && !newWidth) {
    return {
      width: Math.round(newHeight * aspectRatio),
      height: newHeight,
    };
  }

  if (newWidth && newHeight) {
    return {
      width: newWidth,
      height: newHeight,
    };
  }

  return {
    width: originalWidth,
    height: originalHeight,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
