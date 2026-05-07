'use client';

import { useState } from 'react';
import { formatFileSize } from '@/lib/image/resize';
import CropOverlay, { AspectRatioPreset } from './CropOverlay';
import type { Crop, PercentCrop } from 'react-image-crop';

interface PreviewWorkspaceProps {
  imagePreview: string;
  convertedPreview: string;
  file: File | null;
  imageDimensions: { width: number; height: number } | null;
  onClear: () => void;
  isCropping: boolean;
  crop: Crop;
  aspectRatio: number | null;
  onCropChange: (percentCrop: PercentCrop) => void;
  onCropComplete: (percentCrop: PercentCrop) => void;
  onAspectRatioChange: (ratio: AspectRatioPreset) => void;
}

export default function PreviewWorkspace({
  imagePreview,
  convertedPreview,
  file,
  imageDimensions,
  onClear,
  isCropping,
  crop,
  aspectRatio,
  onCropChange,
  onCropComplete,
  onAspectRatioChange,
}: PreviewWorkspaceProps) {
  const [previewZoom, setPreviewZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setPreviewZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setPreviewZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setPreviewZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isCropping && previewZoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isCropping && isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-[#30363d] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <div>
            <p className="text-sm font-medium text-[#e6edf3]">{file?.name}</p>
            {imageDimensions && (
              <p className="text-xs text-[#8b949e]">
                {imageDimensions.width} × {imageDimensions.height} • {formatFileSize(file?.size || 0)}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClear}
          className="w-full rounded-md border border-[#30363d] px-3 py-1.5 text-sm text-[#8b949e] transition-colors hover:border-zinc-600 hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161b22] sm:w-auto"
        >
          Remove
        </button>
      </div>

      {/* Preview area */}
      <div className="relative">
        {/* Zoom controls - hide when cropping */}
        {!isCropping && (
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-1 rounded-lg border border-[#30363d] bg-[#161b22] p-1 shadow-lg">
            <button
              onClick={handleZoomIn}
              className="rounded px-2 py-1 text-sm text-[#e6edf3] transition-colors hover:bg-[#30363d] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Zoom in"
              disabled={previewZoom >= 3}
            >
              +
            </button>
            <span className="text-center text-xs text-[#8b949e]" aria-live="polite">
              {Math.round(previewZoom * 100)}%
            </span>
            <button
              onClick={handleZoomOut}
              className="rounded px-2 py-1 text-sm text-[#e6edf3] transition-colors hover:bg-[#30363d] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Zoom out"
              disabled={previewZoom <= 0.5}
            >
              −
            </button>
            <div className="h-px bg-[#30363d]" />
            <button
              onClick={handleResetZoom}
              className="rounded px-2 py-1 text-xs text-[#8b949e] transition-colors hover:bg-[#30363d] hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Reset zoom"
            >
              Reset
            </button>
          </div>
        )}

        {/* Preview canvas with checkerboard pattern for transparency */}
        <div
          className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-[#0d1117] p-6"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #1a1f26 25%, transparent 25%),
              linear-gradient(-45deg, #1a1f26 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #1a1f26 75%),
              linear-gradient(-45deg, transparent 75%, #1a1f26 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {isCropping ? (
            <CropOverlay
              imageSrc={imagePreview}
              crop={crop}
              aspectRatio={aspectRatio}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
            />
          ) : (
            <div
              className="transition-transform duration-150 ease-out"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${previewZoom})`,
                cursor: previewZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
            >
              {(convertedPreview || imagePreview) && (
                <img
                  src={convertedPreview || imagePreview}
                  alt="Preview"
                  className="max-h-[280px] max-w-full object-contain"
                  draggable={false}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
