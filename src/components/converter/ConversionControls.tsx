'use client';

import { ImageFormat, FORMAT_LABELS } from '@/types/image';
import { AspectRatioPreset } from './CropOverlay';

interface ConversionControlsProps {
  selectedFormat: ImageFormat;
  quality: number;
  isCropping: boolean;
  hasCroppedImage: boolean;
  cropAspectRatio: AspectRatioPreset;
  onFormatChange: (format: ImageFormat) => void;
  onQualityChange: (quality: number) => void;
  onConvert: () => void;
  onToggleCrop: () => void;
  onCropAspectRatioChange: (ratio: AspectRatioPreset) => void;
  onResetCrop: () => void;
  isProcessing: boolean;
}

const ASPECT_RATIOS: Record<AspectRatioPreset, string> = {
  free: 'Free',
  '1:1': '1:1',
  '4:5': '4:5',
  '16:9': '16:9',
  '9:16': '9:16',
  '3:2': '3:2',
  '5:4': '5:4',
  '4:3': '4:3',
  '2:3': '2:3',
  '2:1': '2:1',
  '1:2': '1:2',
  '5:3': '5:3',
};

export default function ConversionControls({
  selectedFormat,
  quality,
  isCropping,
  hasCroppedImage,
  cropAspectRatio,
  onFormatChange,
  onQualityChange,
  onConvert,
  onToggleCrop,
  onCropAspectRatioChange,
  onResetCrop,
  isProcessing,
}: ConversionControlsProps) {
  const showQualitySlider = selectedFormat === 'jpg' || selectedFormat === 'webp';

  return (
    <div className="space-y-4">
      {/* Format selector with crop button */}
      <div>
        <div className="mb-2 mt-3 flex items-center justify-between">
          <label htmlFor="format-select" className="text-xs font-medium text-[#8b949e] uppercase tracking-wide">
            Output Format
          </label>
          <div className="flex items-center gap-2">
            {hasCroppedImage && !isCropping && (
              <button
                onClick={onResetCrop}
                className="text-xs text-[#8b949e] transition-colors hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                aria-label="Remove crop"
              >
                Remove
              </button>
            )}
            <button
              onClick={onToggleCrop}
              className={`min-h-[36px] rounded-md border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161b22] ${
                isCropping
                  ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                  : 'border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-zinc-600 hover:text-[#e6edf3]'
              }`}
              aria-pressed={isCropping}
            >
              {isCropping ? 'Done' : hasCroppedImage ? 'Edit Crop' : 'Crop'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Output format selection">
          {(Object.keys(FORMAT_LABELS) as ImageFormat[]).map((format) => (
            <button
              key={format}
              onClick={() => onFormatChange(format)}
              className={`min-h-[44px] px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161b22] ${
                selectedFormat === format
                  ? 'bg-violet-600 text-white'
                  : 'bg-[#0d1117] text-[#8b949e] hover:text-[#e6edf3]'
              }`}
              aria-pressed={selectedFormat === format}
            >
              {FORMAT_LABELS[format]}
            </button>
          ))}
        </div>
      </div>

      {/* Crop controls - only shown when cropping */}
      {isCropping && (
        <div className="space-y-3 rounded-lg border border-[#30363d] bg-[#0d1117] p-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#8b949e] uppercase tracking-wide">
              Aspect Ratio
            </label>
            <button
              onClick={onResetCrop}
              className="text-xs text-[#8b949e] transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Reset crop selection"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Aspect ratio selection">
            {(Object.keys(ASPECT_RATIOS) as AspectRatioPreset[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => onCropAspectRatioChange(ratio)}
                className={`min-h-[36px] px-2 py-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] ${
                  cropAspectRatio === ratio
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#161b22] text-[#8b949e] hover:text-[#e6edf3]'
                }`}
                aria-pressed={cropAspectRatio === ratio}
              >
                {ASPECT_RATIOS[ratio]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quality */}
      {showQualitySlider && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="quality-slider" className="text-xs font-medium text-[#8b949e] uppercase tracking-wide">
              Quality
            </label>
            <span className="text-xs text-violet-400" aria-live="polite">{quality}%</span>
          </div>
          <input
            id="quality-slider"
            type="range"
            min="1"
            max="100"
            step="1"
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full h-2 bg-[#30363d] appearance-none rounded-full accent-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161b22]"
            aria-label="Quality percentage"
          />
          <div className="mt-1 flex justify-between text-xs text-[#8b949e]">
            <span>Lower size</span>
            <span>Higher quality</span>
          </div>
        </div>
      )}

      {/* Convert button */}
      <button
        onClick={onConvert}
        disabled={isProcessing || isCropping}
        title={isCropping ? 'Click Done to confirm your crop first' : undefined}
        className="sticky bottom-4 w-full min-h-[48px] rounded-md bg-violet-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161b22]"
        aria-live="polite"
      >
        {isProcessing ? 'Converting...' : isCropping ? 'Confirm crop first' : 'Convert Image'}
      </button>
    </div>
  );
}
