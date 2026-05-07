import { ImageFormat } from '@/types/image';

export interface ConversionRoute {
  source: ImageFormat;
  target: ImageFormat;
}

export function parseConversionRoute(conversion: string): ConversionRoute | null {
  const parts = conversion.split('-to-');
  if (parts.length !== 2) return null;

  const [source, target] = parts;
  
  const validFormats: ImageFormat[] = ['png', 'jpg', 'webp', 'ico', 'svg'];
  
  if (!validFormats.includes(source as ImageFormat) || !validFormats.includes(target as ImageFormat)) {
    return null;
  }

  return {
    source: source as ImageFormat,
    target: target as ImageFormat,
  };
}

export function formatConversionTitle(source: ImageFormat, target: ImageFormat): string {
  const formatLabels: Record<ImageFormat, string> = {
    png: 'PNG',
    jpg: 'JPG',
    webp: 'WEBP',
    ico: 'ICO',
    svg: 'SVG',
  };
  return `Convert ${formatLabels[source]} to ${formatLabels[target]} Online Free`;
}

export function getConversionDescription(source: ImageFormat, target: ImageFormat): string {
  const formatLabels: Record<ImageFormat, string> = {
    png: 'PNG',
    jpg: 'JPG',
    webp: 'WEBP',
    ico: 'ICO',
    svg: 'SVG',
  };
  
  const benefits: Record<ImageFormat, string> = {
    png: 'lossless compression with transparency support',
    jpg: 'smaller file size with adjustable quality',
    webp: 'superior compression while maintaining quality',
    ico: 'favicon compatibility for websites',
    svg: 'scalable vector format for graphics',
  };

  return `Convert ${formatLabels[source]} images to ${formatLabels[target]} format instantly. Fast, private, and 100% browser-based. Your files never leave your device. ${formatLabels[target]} offers ${benefits[target]}.`;
}

export function getConversionFeatures(source: ImageFormat, target: ImageFormat): string[] {
  const commonFeatures = [
    'Fast conversion in your browser',
    '100% free, no signup required',
    'Your files never leave your device',
  ];

  const targetFeatures: Record<ImageFormat, string> = {
    png: 'Lossless PNG compression with alpha channel',
    jpg: 'Adjustable quality settings for size optimization',
    webp: '25-35% smaller files than JPG with same quality',
    ico: 'Perfect for website favicons and app icons',
    svg: 'Infinitely scalable without quality loss',
  };

  return [...commonFeatures, targetFeatures[target]];
}

export function getFormatInfo(format: ImageFormat): {
  name: string;
  description: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
} {
  const formatInfo: Record<ImageFormat, {
    name: string;
    description: string;
    bestFor: string[];
    pros: string[];
    cons: string[];
  }> = {
    png: {
      name: 'PNG (Portable Network Graphics)',
      description: 'A lossless image format that supports transparency. Perfect for graphics, logos, and images requiring crisp edges.',
      bestFor: ['Logos', 'Graphics with transparency', 'Screenshots', 'Charts and diagrams'],
      pros: ['Lossless compression', 'Supports transparency (alpha channel)', 'Sharp edges and text', 'Widely supported'],
      cons: ['Larger file sizes than JPG', 'Not ideal for photographs'],
    },
    jpg: {
      name: 'JPG (JPEG)',
      description: 'A lossy compression format optimized for photographs. Excellent for photos with smooth color transitions.',
      bestFor: ['Photographs', 'Images with gradients', 'Web images', 'Print media'],
      pros: ['Small file sizes', 'Adjustable compression', 'Universal support', 'Good for photos'],
      cons: ['Lossy compression (quality loss)', 'No transparency support', 'Artifacts at high compression'],
    },
    webp: {
      name: 'WebP',
      description: 'A modern image format developed by Google that provides superior compression while maintaining quality.',
      bestFor: ['Web images', 'Photographs', 'Graphics', 'Modern browsers'],
      pros: ['25-35% smaller than JPG', 'Supports transparency', 'Supports animation', 'Better compression than PNG'],
      cons: ['Limited support in older browsers', 'Not ideal for print'],
    },
    ico: {
      name: 'ICO (Icon)',
      description: 'The standard format for website favicons and application icons.',
      bestFor: ['Website favicons', 'Application icons', 'Desktop shortcuts'],
      pros: ['Standard for favicons', 'Multiple sizes in one file', 'Browser compatibility'],
      cons: ['Limited to small sizes', 'Not for general images'],
    },
    svg: {
      name: 'SVG (Scalable Vector Graphics)',
      description: 'A vector format that scales infinitely without quality loss. Perfect for logos and illustrations.',
      bestFor: ['Logos', 'Icons', 'Illustrations', 'Print design'],
      pros: ['Infinitely scalable', 'Small file size for simple graphics', 'Editable', 'Supports animation'],
      cons: ['Not suitable for photographs', 'Complex graphics can have large file sizes'],
    },
  };

  return formatInfo[format];
}

export function getConversionExplanation(source: ImageFormat, target: ImageFormat): string {
  const sourceInfo = getFormatInfo(source);
  const targetInfo = getFormatInfo(target);

  return `Converting from ${sourceInfo.name} to ${targetInfo.name} transforms your image to take advantage of ${targetInfo.name.toLowerCase()}'s specific characteristics. ${targetInfo.description} This conversion is particularly useful when you need ${targetInfo.bestFor.slice(0, 2).join(' or ')}.`;
}

export function getFAQItems(source: ImageFormat, target: ImageFormat): Array<{
  question: string;
  answer: string;
}> {
  const sourceInfo = getFormatInfo(source);
  const targetInfo = getFormatInfo(target);

  return [
    {
      question: `Why convert ${sourceInfo.name} to ${targetInfo.name}?`,
      answer: `${targetInfo.description} This conversion is ideal when you need ${targetInfo.bestFor.slice(0, 3).join(', ')}.`,
    },
    {
      question: `Will I lose image quality?`,
      answer: target === 'png' 
        ? 'No, PNG is a lossless format. Your image quality will be preserved exactly.'
        : 'Some quality loss may occur depending on the quality setting you choose. Use higher quality settings (80-100%) for minimal quality loss.',
    },
    {
      question: `Is this conversion free?`,
      answer: 'Yes, this converter is completely free with no signup required. All processing happens in your browser.',
    },
    {
      question: `Are my images safe?`,
      answer: 'Absolutely. Your images are processed entirely in your browser and never uploaded to any server. Your files never leave your device.',
    },
    {
      question: `What are the advantages of ${targetInfo.name}?`,
      answer: `${targetInfo.pros.slice(0, 3).join(', ')}. ${targetInfo.description}`,
    },
  ];
}
