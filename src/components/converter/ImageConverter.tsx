'use client';

import { useState } from 'react';
import { ImageFormat, ConversionState } from '@/types/image';
import { useImageConverter } from '@/hooks/useImageConverter';
import EmptyState from './EmptyState';
import PreviewWorkspace from './PreviewWorkspace';
import ConversionControls from './ConversionControls';

interface ImageConverterProps {
  defaultFormat?: ImageFormat;
}

export default function ImageConverter({ defaultFormat = 'png' }: ImageConverterProps) {
  const [isDragging, setIsDragging] = useState(false);

  const {
    state,
    file,
    imagePreview,
    imageDimensions,
    convertedPreview,
    error,
    selectedFormat,
    quality,
    fileInputRef,
    canvasRef,
    setSelectedFormat,
    setQuality,
    handleFileSelect,
    clearImage,
    convert,
    // Crop state
    crop,
    confirmedCrop,
    aspectRatio,
    aspectRatioPreset,
    isCropping,
    onCropChange,
    onCropComplete,
    onToggleCrop,
    onCropAspectRatioChange,
    onResetCrop,
  } = useImageConverter({ defaultFormat });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        {state === 'empty' && (
          <EmptyState
            onFileSelect={handleFileSelect}
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            fileInputRef={fileInputRef}
          />
        )}

        {(state === 'uploaded' || state === 'processing' || state === 'success') && (
          <>
            <PreviewWorkspace
              imagePreview={imagePreview}
              convertedPreview={convertedPreview}
              file={file}
              imageDimensions={imageDimensions}
              onClear={clearImage}
              isCropping={isCropping}
              crop={crop}
              aspectRatio={aspectRatio}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onAspectRatioChange={onCropAspectRatioChange}
            />
            <ConversionControls
              selectedFormat={selectedFormat}
              quality={quality}
              isCropping={isCropping}
              hasCroppedImage={confirmedCrop !== null}
              cropAspectRatio={aspectRatioPreset}
              onFormatChange={setSelectedFormat}
              onQualityChange={setQuality}
              onConvert={convert}
              onToggleCrop={onToggleCrop}
              onCropAspectRatioChange={onCropAspectRatioChange}
              onResetCrop={onResetCrop}
              isProcessing={state === 'processing'}
            />
          </>
        )}

        {state === 'error' && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-500 bg-red-500/5 p-8">
            <svg className="mb-4 h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-center text-red-400">{error}</p>
            <button
              onClick={clearImage}
              className="mt-4 rounded-md border border-[#30363d] px-4 py-2 text-sm text-[#e6edf3] transition-colors hover:border-zinc-600 hover:bg-[#161b22] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              Try Again
            </button>
          </div>
        )}

        {state === 'processing' && (
          <div className="mt-4 flex items-center justify-center gap-3 rounded-lg bg-[#0d1117] p-4">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" aria-hidden="true" />
            <span className="text-sm text-[#8b949e]">Processing image...</span>
          </div>
        )}

        {state === 'success' && (
          <div role="alert" aria-live="polite" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md bg-green-600 px-4 py-2.5 text-sm text-white shadow-lg transition-all duration-300 animate-in slide-in-from-bottom fade-in">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Converted successfully</span>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      </div>
    </>
  );
}
