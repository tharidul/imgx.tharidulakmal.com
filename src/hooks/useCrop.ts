import { useState, useCallback } from 'react';
import type { Crop, PercentCrop } from 'react-image-crop';

export type AspectRatioPreset = 'free' | '1:1' | '4:5' | '16:9' | '9:16' | '3:2' | '5:4' | '4:3' | '2:3' | '2:1' | '1:2' | '5:3';

const ASPECT_RATIOS: Record<AspectRatioPreset, number | undefined> = {
  free: undefined,
  '1:1': 1,
  '4:5': 4 / 5,
  '16:9': 16 / 9,
  '9:16': 9 / 16,
  '3:2': 3 / 2,
  '5:4': 5 / 4,
  '4:3': 4 / 3,
  '2:3': 2 / 3,
  '2:1': 2 / 1,
  '1:2': 1 / 2,
  '5:3': 5 / 3,
};

export interface CropState {
  crop: Crop;
  completedCrop: PercentCrop | null;
  confirmedCrop: PercentCrop | null;
  aspectRatio: number | null;
  aspectRatioPreset: AspectRatioPreset;
  isCropping: boolean;
}

export function useCrop() {
  // Always store percent crop — display-independent, works at any image size
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  // completedCrop: current selection while dragging
  const [completedCrop, setCompletedCrop] = useState<PercentCrop | null>(null);
  // confirmedCrop: only set when user clicks "Done" — this is what gets exported
  const [confirmedCrop, setConfirmedCrop] = useState<PercentCrop | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [aspectRatioPreset, setAspectRatioPresetState] = useState<AspectRatioPreset>('free');
  const [isCropping, setIsCropping] = useState(false);

  // Receives percentCrop (2nd arg from ReactCrop onChange)
  const onCropChange = useCallback((percentCrop: PercentCrop) => {
    setCrop(percentCrop);
  }, []);

  // Receives percentCrop (2nd arg from ReactCrop onComplete)
  const onCropComplete = useCallback((percentCrop: PercentCrop) => {
    setCompletedCrop(percentCrop);
  }, []);

  const startCropping = useCallback(() => {
    setIsCropping(true);
  }, []);

  // "Done" — confirms the current selection and exits crop mode
  // Uses completedCrop (last drag end) if available, falls back to crop state
  // (which is always a valid PercentCrop since we store percentCrop from onChange)
  const confirmCrop = useCallback(() => {
    const cropToConfirm: PercentCrop | null =
      completedCrop && completedCrop.width > 0 && completedCrop.height > 0
        ? completedCrop
        : crop.unit === '%' && crop.width > 0 && crop.height > 0
          ? (crop as PercentCrop)
          : null;

    if (cropToConfirm) {
      setConfirmedCrop(cropToConfirm);
    }
    setIsCropping(false);
  }, [completedCrop, crop]);

  const stopCropping = useCallback(() => {
    setIsCropping(false);
  }, []);

  const resetCrop = useCallback(() => {
    setCrop({ unit: '%', x: 25, y: 25, width: 50, height: 50 });
    setCompletedCrop(null);
    setConfirmedCrop(null);
  }, []);

  const setAspectRatioPreset = useCallback((preset: AspectRatioPreset) => {
    setAspectRatio(ASPECT_RATIOS[preset] || null);
    setAspectRatioPresetState(preset);
  }, []);

  // hasCrop checks confirmedCrop (what will actually be exported)
  const hasCrop = useCallback(() => {
    return confirmedCrop !== null && confirmedCrop.width > 0 && confirmedCrop.height > 0;
  }, [confirmedCrop]);

  return {
    crop,
    completedCrop,
    confirmedCrop,
    aspectRatio,
    aspectRatioPreset,
    isCropping,
    onCropChange,
    onCropComplete,
    startCropping,
    stopCropping,
    confirmCrop,
    resetCrop,
    setAspectRatioPreset,
    hasCrop,
    ASPECT_RATIOS,
  };
}
