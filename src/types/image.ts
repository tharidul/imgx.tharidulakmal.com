export type ImageFormat = 'png' | 'jpg' | 'webp' | 'ico' | 'svg';
export type FitMode = 'contain' | 'cover' | 'fill';

export type ConversionState = 'empty' | 'uploaded' | 'processing' | 'success' | 'error';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ConversionOptions {
  format: ImageFormat;
  quality: number;
  width?: number;
  height?: number;
  fit?: FitMode;
  cropArea?: CropArea | null;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface ConversionResult {
  dataUrl: string;
  blob?: Blob;
  objectUrl?: string;
}

export const SUPPORTED_FORMATS = ['png', 'jpeg', 'jpg', 'webp', 'svg+xml', 'bmp', 'tiff', 'gif'] as const;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const FORMAT_LABELS: Record<ImageFormat, string> = {
  png: 'PNG',
  jpg: 'JPG',
  webp: 'WEBP',
  ico: 'ICO',
  svg: 'SVG',
};

export const FORMAT_MIME_TYPES: Record<ImageFormat, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
  ico: 'image/png', // ICO is actually PNG wrapped
  svg: 'image/svg+xml',
};
