import { ImageFormat, FitMode, ConversionOptions } from './image';

export type WorkerMessageType =
  | 'INIT'
  | 'CONVERT'
  | 'GENERATE_PREVIEW'
  | 'CLEANUP';

export interface WorkerInitMessage {
  type: 'INIT';
  useOffscreenCanvas: boolean;
}

export interface WorkerConvertMessage {
  type: 'CONVERT';
  imageData: string; // data URL
  options: ConversionOptions;
  originalDimensions: { width: number; height: number };
}

export interface WorkerPreviewMessage {
  type: 'GENERATE_PREVIEW';
  imageData: string;
  options: ConversionOptions;
  originalDimensions: { width: number; height: number };
}

export interface WorkerCleanupMessage {
  type: 'CLEANUP';
}

export type WorkerMessage =
  | WorkerInitMessage
  | WorkerConvertMessage
  | WorkerPreviewMessage
  | WorkerCleanupMessage;

export interface WorkerProgressMessage {
  type: 'PROGRESS';
  progress: number; // 0-100
  stage: 'loading' | 'processing' | 'encoding';
}

export interface WorkerSuccessMessage {
  type: 'SUCCESS';
  result: {
    dataUrl: string;
    format: ImageFormat;
  };
  isPreview?: boolean;
}

export interface WorkerErrorMessage {
  type: 'ERROR';
  error: string;
}

export interface WorkerInitAckMessage {
  type: 'INIT_ACK';
}

export type WorkerResponse =
  | WorkerProgressMessage
  | WorkerSuccessMessage
  | WorkerErrorMessage
  | WorkerInitAckMessage;
