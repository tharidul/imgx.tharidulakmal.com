import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ImageFormat, ConversionState, ConversionOptions, ImageDimensions, ValidationResult } from '@/types/image';
import { validateImageFile, validateDimensions, validateQuality, validateImageIntegrity } from '@/lib/image/validation';
import { loadImageFromFile, getImageDimensions } from '@/lib/image/canvas';
import { convertImage, downloadImage } from '@/lib/image/convert';
import { calculateAspectRatio } from '@/lib/image/resize';
import { cropImage } from '@/lib/image/crop';
import { useDebounce } from './useDebounce';
import { useCrop } from './useCrop';

interface UseImageConverterOptions {
  defaultFormat?: ImageFormat;
  onStateChange?: (state: ConversionState) => void;
}

export function useImageConverter({ defaultFormat = 'png', onStateChange }: UseImageConverterOptions = {}) {
  const [state, setState] = useState<ConversionState>('empty');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
  const [convertedPreview, setConvertedPreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>(defaultFormat);
  const [quality, setQuality] = useState(90);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Crop state management
  const {
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
  } = useCrop();

  // Notify state changes
  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    // Validate file
    const fileValidation = validateImageFile(selectedFile);
    if (!fileValidation.valid) {
      setError(fileValidation.error || 'Invalid file');
      setState('error');
      return;
    }

    setState('processing');
    setFile(selectedFile);

    try {
      // Validate image integrity (corruption detection)
      const integrityValidation = await validateImageIntegrity(selectedFile);
      if (!integrityValidation.valid) {
        setError(integrityValidation.error || 'Image validation failed');
        setState('error');
        return;
      }

      // Load image
      const img = await loadImageFromFile(selectedFile);
      
      // Get dimensions
      const dims = getImageDimensions(img);
      setImageDimensions(dims);

      // Generate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);

      setState('uploaded');
    } catch (err) {
      setError('Failed to load image. The file may be corrupted or in an unsupported format.');
      setState('error');
    }
  }, []);


  const clearImage = useCallback(() => {
    setFile(null);
    setImagePreview('');
    setImageDimensions(null);
    setConvertedPreview('');
    setError('');
    setState('empty');
    resetCrop();
    stopCropping();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [resetCrop, stopCropping]);

  // Build filename suffix from aspect ratio preset
  const getAspectRatioSuffix = useCallback(() => {
    if (aspectRatioPreset === 'free') return '';
    return `_${aspectRatioPreset.replace(':', 'x')}`;
  }, [aspectRatioPreset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Revoke any object URLs
      if (imagePreview) {
        try {
          URL.revokeObjectURL(imagePreview);
        } catch (e) {
          // Ignore if already revoked
        }
      }
      if (convertedPreview) {
        try {
          URL.revokeObjectURL(convertedPreview);
        } catch (e) {
          // Ignore if already revoked
        }
      }
    };
  }, [imagePreview, convertedPreview]);

  const convert = useCallback(async () => {
    if (!file || !canvasRef.current || !imagePreview) return;

    // Validate quality
    const qualityValidation = validateQuality(quality);
    if (!qualityValidation.valid) {
      setError(qualityValidation.error || 'Invalid quality');
      setState('error');
      return;
    }

    setState('processing');
    setError('');

    try {
      let img = await loadImageFromFile(file);

      // Apply confirmed crop if active and valid
      if (hasCrop() && confirmedCrop && confirmedCrop.width > 0 && confirmedCrop.height > 0) {
        try {
          const croppedDataUrl = await cropImage(imagePreview, confirmedCrop);
          const response = await fetch(croppedDataUrl);
          const blob = await response.blob();
          const croppedFile = new File([blob], 'cropped.png', { type: 'image/png' });
          img = await loadImageFromFile(croppedFile);
        } catch (cropErr) {
          console.error('Crop error in conversion:', cropErr);
          img = await loadImageFromFile(file);
        }
      }

      const options: ConversionOptions = {
        format: selectedFormat,
        quality,
      };

      const result = await convertImage(img, canvasRef.current, options);

      // Update preview
      if (result.objectUrl) {
        setConvertedPreview(result.dataUrl);
      } else {
        setConvertedPreview(result.dataUrl);
      }

      // Download with aspect ratio suffix in filename
      const baseName = file.name.replace(/\.[^.]+$/, '');
      downloadImage(result, `${baseName}${getAspectRatioSuffix()}`, selectedFormat);

      setState('success');

      // Reset to uploaded state after a delay
      setTimeout(() => {
        setState('uploaded');
      }, 2000);
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Conversion failed');
      setState('error');
    }
  }, [file, imagePreview, imageDimensions, selectedFormat, quality, hasCrop, confirmedCrop, getAspectRatioSuffix]);

  const generatePreview = useCallback(async () => {
    if (!imagePreview || !canvasRef.current || !file) {
      setConvertedPreview('');
      return;
    }

    try {
      let img = await loadImageFromFile(file);

      // Apply confirmed crop if active and valid
      if (hasCrop() && confirmedCrop && confirmedCrop.width > 0 && confirmedCrop.height > 0) {
        try {
          const croppedDataUrl = await cropImage(imagePreview, confirmedCrop);
          const response = await fetch(croppedDataUrl);
          const blob = await response.blob();
          const croppedFile = new File([blob], 'cropped.png', { type: 'image/png' });
          img = await loadImageFromFile(croppedFile);
        } catch (cropErr) {
          console.error('Crop error in preview:', cropErr);
          img = await loadImageFromFile(file);
        }
      }

      const options: ConversionOptions = {
        format: selectedFormat,
        quality,
      };

      const result = await convertImage(img, canvasRef.current, options);
      setConvertedPreview(result.dataUrl);
    } catch (err) {
      console.error('Preview generation error:', err);
    }
  }, [imagePreview, selectedFormat, quality, file, hasCrop, confirmedCrop]);

  // Regenerate preview when format/quality/state changes
  useEffect(() => {
    if (state === 'uploaded' || state === 'success') {
      generatePreview();
    }
  }, [state, generatePreview]);

  // Explicitly regenerate preview when confirmedCrop changes (Done button clicked)
  useEffect(() => {
    if ((state === 'uploaded' || state === 'success') && imagePreview) {
      generatePreview();
    }
    // confirmedCrop intentionally in deps — triggers preview on crop confirm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedCrop]);

  return {
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
    completedCrop,
    confirmedCrop,
    aspectRatio,
    aspectRatioPreset,
    isCropping,
    onCropChange,
    onCropComplete,
    onToggleCrop: isCropping ? confirmCrop : startCropping,
    onCropAspectRatioChange: setAspectRatioPreset,
    onResetCrop: resetCrop,
  };
}
