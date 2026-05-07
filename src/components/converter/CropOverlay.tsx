'use client';

import { useRef, useEffect } from 'react';
import ReactCrop, { type Crop, type PixelCrop, type PercentCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export type AspectRatioPreset = 'free' | '1:1' | '4:5' | '16:9' | '9:16' | '3:2';

interface CropOverlayProps {
  imageSrc: string;
  crop: Crop;
  aspectRatio: number | null;
  onCropChange: (percentCrop: PercentCrop) => void;
  onCropComplete: (percentCrop: PercentCrop) => void;
}

export default function CropOverlay({
  imageSrc,
  crop,
  aspectRatio,
  onCropChange,
  onCropComplete,
}: CropOverlayProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  // When the image loads, set initial crop for current aspect ratio
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    if (aspectRatio) {
      const newCrop = centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, aspectRatio, width, height),
        width,
        height
      );
      onCropChange(newCrop as PercentCrop);
    }
  }

  // When aspect ratio changes after load, recalculate crop from natural dimensions
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    const { naturalWidth: width, naturalHeight: height } = img;
    if (aspectRatio) {
      const newCrop = centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, aspectRatio, width, height),
        width,
        height
      );
      onCropChange(newCrop as PercentCrop);
    } else {
      onCropChange({ unit: '%', x: 25, y: 25, width: 50, height: 50 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspectRatio]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <ReactCrop
        crop={crop}
        onChange={(_pixelCrop, percentCrop) => onCropChange(percentCrop)}
        onComplete={(_pixelCrop: PixelCrop, percentCrop: PercentCrop) => onCropComplete(percentCrop)}
        aspect={aspectRatio || undefined}
        minWidth={10}
        minHeight={10}
        keepSelection
        className="max-h-full max-w-full"
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Crop preview"
          onLoad={onImageLoad}
          className="max-h-[280px] max-w-full object-contain"
          style={{ maxHeight: '280px' }}
        />
      </ReactCrop>
    </div>
  );
}
