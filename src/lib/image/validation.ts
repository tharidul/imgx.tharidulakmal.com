import { ValidationResult, SUPPORTED_FORMATS, MAX_FILE_SIZE } from '@/types/image';

export function validateImageFile(file: File): ValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    };
  }

  // Check if file is an image
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: 'File must be an image.',
    };
  }

  // Check if format is supported
  const mimeSubtype = file.type.split('/')[1];
  const isSupported = SUPPORTED_FORMATS.some(format => 
    mimeSubtype === format || file.type.includes(format)
  );
  
  if (!isSupported) {
    return {
      valid: false,
      error: `Unsupported format. Supported formats: ${SUPPORTED_FORMATS.join(', ')}.`,
    };
  }

  return { valid: true };
}

export async function validateImageIntegrity(file: File): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      
      // Check if image has valid dimensions
      if (img.width === 0 || img.height === 0) {
        resolve({
          valid: false,
          error: 'Image has invalid dimensions.',
        });
        return;
      }

      // Check for extremely large images that might cause memory issues
      const pixelCount = img.width * img.height;
      const maxPixels = 20000 * 20000; // 400 megapixels
      
      if (pixelCount > maxPixels) {
        resolve({
          valid: false,
          error: 'Image resolution too high. Maximum is 20,000x20,000 pixels.',
        });
        return;
      }

      resolve({ valid: true });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: false,
        error: 'Image file appears to be corrupted or invalid.',
      });
    };
    
    // Timeout for images that take too long to load
    const timeout = setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: false,
        error: 'Image loading timed out. File may be corrupted.',
      });
    }, 10000); // 10 second timeout
    
    img.src = objectUrl;
    
    // Clean up timeout if load succeeds
    img.addEventListener('load', () => clearTimeout(timeout), { once: true });
    img.addEventListener('error', () => clearTimeout(timeout), { once: true });
  });
}

export function validateDimensions(width: number, height: number): ValidationResult {
  if (width <= 0 || height <= 0) {
    return {
      valid: false,
      error: 'Dimensions must be positive numbers.',
    };
  }

  // Increased max dimensions for better flexibility, but still reasonable
  if (width > 20000 || height > 20000) {
    return {
      valid: false,
      error: 'Dimensions too large. Maximum is 20000x20000.',
    };
  }

  // Warn about very large dimensions
  if (width > 8000 || height > 8000) {
    console.warn('Large dimensions may cause performance issues on mobile devices');
  }

  return { valid: true };
}

export function validateQuality(quality: number): ValidationResult {
  if (quality < 1 || quality > 100) {
    return {
      valid: false,
      error: 'Quality must be between 1 and 100.',
    };
  }

  return { valid: true };
}

export function detectBrowserCapabilities(): {
  offscreenCanvas: boolean;
  webp: boolean;
  canvas: boolean;
  memoryLimit: number;
} {
  const canvas = document.createElement('canvas');
  const offscreenCanvas = typeof OffscreenCanvas !== 'undefined' && canvas.transferControlToOffscreen !== undefined;
  
  // Check WebP support
  const webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  // Estimate memory limit based on device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const memoryLimit = isMobile ? 256 * 1024 * 1024 : 1024 * 1024 * 1024; // 256MB mobile, 1GB desktop
  
  return {
    offscreenCanvas,
    webp,
    canvas: !!canvas.getContext('2d'),
    memoryLimit,
  };
}
