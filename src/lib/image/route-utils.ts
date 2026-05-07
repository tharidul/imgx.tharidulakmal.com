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

const conversionContent: Partial<Record<string, {
  explanation: string;
  faqs: Array<{ question: string; answer: string }>;
}>> = {
  'png-to-jpg': {
    explanation: `PNG files are great for graphics and transparency, but they're often larger than necessary for photos. Converting to JPG makes sense when you're sharing photos on the web, attaching images to emails, or uploading to platforms that don't need transparency. JPG's adjustable compression lets you balance quality and file size — a quality setting of 85% typically gives you 60-70% smaller files with barely visible quality loss.`,
    faqs: [
      {
        question: 'When should I convert PNG to JPG?',
        answer: 'Convert to JPG when you need smaller file sizes for photos, web images, or email attachments. If your PNG has no transparency and contains a photograph, JPG will be significantly smaller.',
      },
      {
        question: 'Will I lose the transparency when converting PNG to JPG?',
        answer: 'Yes. JPG does not support transparency. Any transparent areas in your PNG will be filled with white by default. If your image needs transparency, keep it as PNG or use WebP instead.',
      },
      {
        question: 'What quality setting should I use?',
        answer: 'For most web images, 80-85% quality gives the best balance. For print or professional use, use 90-95%. Only go below 80% if file size is critical and you can tolerate some artifacts.',
      },
      {
        question: 'Are my images uploaded to a server?',
        answer: 'No. IMG-X processes everything directly in your browser using the Canvas API. Your images never leave your device — not even for a millisecond.',
      },
    ],
  },
  'jpg-to-png': {
    explanation: `JPG is great for photos but uses lossy compression — meaning some data is permanently lost each time you save. Converting to PNG stops that quality degradation cycle. It's especially useful when you need to edit an image further, need a transparent background, or are working with screenshots and UI graphics where sharp edges matter more than file size.`,
    faqs: [
      {
        question: 'Does converting JPG to PNG improve quality?',
        answer: 'No. Converting to PNG won\'t recover quality lost during JPG compression. It will however prevent further quality loss if you plan to re-edit and re-save the image multiple times.',
      },
      {
        question: 'Why is the PNG file so much larger than the original JPG?',
        answer: 'PNG uses lossless compression — it stores every pixel exactly. JPG discards some data to achieve smaller sizes. A PNG of the same image will always be larger than its JPG equivalent.',
      },
      {
        question: 'When does JPG to PNG make sense?',
        answer: 'It makes sense when you need to add a transparent background, edit the image further without quality loss, or use it as a source asset in a design project.',
      },
      {
        question: 'Is this converter free?',
        answer: 'Yes, completely free with no signup, no watermarks, and no limits. All conversion happens in your browser.',
      },
    ],
  },
  'jpg-to-webp': {
    explanation: `WebP is Google's modern image format designed specifically for the web. Converting your JPGs to WebP typically reduces file size by 25-35% at equivalent visual quality. This directly improves your website's Core Web Vitals, particularly LCP (Largest Contentful Paint). All modern browsers support WebP, making it the smart default for web developers optimizing page speed.`,
    faqs: [
      {
        question: 'How much smaller will my WebP file be compared to JPG?',
        answer: 'Typically 25-35% smaller at equivalent quality. For a 500KB JPG, expect a WebP around 325-375KB with no visible quality difference.',
      },
      {
        question: 'Do all browsers support WebP?',
        answer: 'Yes. As of 2024, WebP is supported by all major browsers including Chrome, Firefox, Safari, and Edge. Over 97% of global browser usage supports WebP.',
      },
      {
        question: 'Should I use WebP instead of JPG for my website?',
        answer: 'Yes, for web use WebP is the better choice. Smaller files mean faster load times, better Core Web Vitals scores, and lower bandwidth costs.',
      },
      {
        question: 'Are my images safe during conversion?',
        answer: 'Absolutely. All conversion happens locally in your browser. Your images are never uploaded to any server.',
      },
    ],
  },
  'png-to-webp': {
    explanation: `PNG files with transparency can be large — sometimes unnecessarily so. WebP supports transparency (alpha channel) just like PNG, but with significantly better compression. Converting PNG to WebP is one of the most impactful optimizations you can make for web performance, especially for logos, icons, and UI graphics that need transparency without the file size penalty of PNG.`,
    faqs: [
      {
        question: 'Does WebP support transparency like PNG?',
        answer: 'Yes. WebP fully supports alpha channel transparency. You can safely convert transparent PNGs to WebP without losing the transparency.',
      },
      {
        question: 'How much smaller will my WebP be compared to PNG?',
        answer: 'WebP is typically 26% smaller than PNG for lossless compression, and even smaller with lossy compression. For transparent images, the savings are often 40-60%.',
      },
      {
        question: 'Is PNG to WebP the best optimization for web logos?',
        answer: 'For raster logos yes. If your logo is simple with flat colors, SVG would be even better. But for complex logos and UI graphics with transparency, WebP is the practical choice.',
      },
      {
        question: 'Will older browsers display my WebP images?',
        answer: 'Modern browsers all support WebP. If you need to support very old browsers (IE11), keep a PNG fallback using the HTML picture element.',
      },
    ],
  },
  'png-to-ico': {
    explanation: `ICO is the standard format for browser favicons and Windows application icons. When you upload a favicon.ico to your website root, browsers automatically detect and display it in the tab bar, bookmarks, and address bar. Converting your PNG logo or icon to ICO ensures maximum compatibility across all browsers and operating systems. For best results, start with a square PNG at least 256×256 pixels.`,
    faqs: [
      {
        question: 'What size should my PNG be before converting to ICO?',
        answer: 'Use a square PNG of at least 256×256 pixels. ICO files can contain multiple sizes — the converter will generate the appropriate favicon size for browser compatibility.',
      },
      {
        question: 'Where do I put the favicon.ico file on my website?',
        answer: 'Place it in your website\'s root directory (e.g., /public/favicon.ico in Next.js). Most browsers automatically look for favicon.ico at the root.',
      },
      {
        question: 'Should I use ICO or PNG for my favicon?',
        answer: 'ICO for maximum compatibility, especially for older browsers and Windows desktop shortcuts. Modern browsers also support PNG favicons, but ICO is the safe universal standard.',
      },
      {
        question: 'Is my image processed locally?',
        answer: 'Yes. Your PNG is converted to ICO entirely in your browser. Nothing is uploaded to any server.',
      },
    ],
  },
  'jpg-to-ico': {
    explanation: `If your logo or icon source is a JPG, you can convert it directly to ICO for use as a favicon or application icon. Keep in mind that JPG doesn't support transparency — if you need a transparent background in your favicon, convert your image to PNG first, remove the background, then convert to ICO. For solid-background icons and logos, converting JPG to ICO directly works perfectly fine.`,
    faqs: [
      {
        question: 'Can I use a JPG photo as a favicon?',
        answer: 'Technically yes, but it\'s not recommended. Favicons are typically simple icons or logos. A photo will be hard to recognize at 16×16 or 32×32 pixels.',
      },
      {
        question: 'Will my JPG background become transparent in the ICO?',
        answer: 'No. JPG does not support transparency. Your background color will be preserved. To get a transparent favicon, convert to PNG first, remove the background, then convert that PNG to ICO.',
      },
      {
        question: 'What\'s the best image to use for a favicon?',
        answer: 'A simple, high-contrast logo or icon on a solid or transparent background. It should be recognizable at very small sizes (16×16 pixels).',
      },
      {
        question: 'Is this converter free to use?',
        answer: 'Yes, completely free. No account needed. Conversion happens in your browser with no file uploads.',
      },
    ],
  },
  'webp-to-png': {
    explanation: `WebP is excellent for the web, but not every tool supports it. Design software like older versions of Photoshop, many CMS platforms, and some email clients don't handle WebP files. Converting WebP to PNG gives you a universally compatible format you can use anywhere. PNG is also the right choice when you need to edit the image further without any compression artifacts.`,
    faqs: [
      {
        question: 'Why would I convert WebP back to PNG?',
        answer: 'Common reasons: your design tool doesn\'t support WebP, you need to upload to a platform that requires PNG, or you want to edit the image without lossy compression artifacts.',
      },
      {
        question: 'Will converting WebP to PNG improve the image quality?',
        answer: 'No. If the WebP was created from a lossy source, that quality loss is permanent. Converting to PNG will preserve the current quality without further loss, but won\'t restore lost detail.',
      },
      {
        question: 'Does WebP transparency carry over to PNG?',
        answer: 'Yes. If your WebP has a transparent background, that transparency will be preserved in the PNG output.',
      },
      {
        question: 'Is there a file size limit?',
        answer: 'IMG-X supports files up to 10MB. All processing happens in your browser — no server uploads.',
      },
    ],
  },
  'webp-to-jpg': {
    explanation: `While WebP is the modern standard for web images, JPG remains the most universally compatible format for photos. Convert WebP to JPG when you need to share images with people or tools that don't support WebP, upload photos to older platforms, or print images. JPG is supported everywhere — from email clients to photo printing services to legacy software.`,
    faqs: [
      {
        question: 'Why convert WebP to JPG?',
        answer: 'For maximum compatibility. JPG is supported universally — email clients, photo printing services, older software, and social platforms all handle JPG reliably.',
      },
      {
        question: 'Will I lose quality converting WebP to JPG?',
        answer: 'If the WebP was lossy, some quality was already lost. Converting to JPG at high quality (85%+) will preserve what\'s there. Avoid low quality settings to minimize further degradation.',
      },
      {
        question: 'Does JPG support transparency?',
        answer: 'No. If your WebP has a transparent background, it will be filled with white when converted to JPG. Use PNG if you need to keep the transparency.',
      },
      {
        question: 'Are my files private during conversion?',
        answer: 'Yes. Everything happens in your browser. Your WebP files are never sent to any server or third party.',
      },
    ],
  },
};

export function getConversionExplanation(source: ImageFormat, target: ImageFormat): string {
  const key = `${source}-to-${target}`;
  const content = conversionContent[key];
  if (content) return content.explanation;
  
  // fallback
  const sourceInfo = getFormatInfo(source);
  const targetInfo = getFormatInfo(target);
  return `Converting from ${sourceInfo.name} to ${targetInfo.name} transforms your image to take advantage of ${targetInfo.name.toLowerCase()}'s specific characteristics. ${targetInfo.description}`;
}

export function getFAQItems(source: ImageFormat, target: ImageFormat): Array<{
  question: string;
  answer: string;
}> {
  const key = `${source}-to-${target}`;
  const content = conversionContent[key];
  if (content) return content.faqs;

  // fallback to old template
  const sourceInfo = getFormatInfo(source);
  const targetInfo = getFormatInfo(target);
  return [
    {
      question: `Why convert ${sourceInfo.name} to ${targetInfo.name}?`,
      answer: `${targetInfo.description} This conversion is ideal when you need ${targetInfo.bestFor.slice(0, 3).join(', ')}.`,
    },
    {
      question: 'Will I lose image quality?',
      answer: target === 'png'
        ? 'No, PNG is a lossless format. Your image quality will be preserved exactly.'
        : 'Some quality loss may occur depending on the quality setting you choose. Use higher quality settings (80-100%) for minimal quality loss.',
    },
    {
      question: 'Is this conversion free?',
      answer: 'Yes, this converter is completely free with no signup required. All processing happens in your browser.',
    },
    {
      question: 'Are my images safe?',
      answer: 'Absolutely. Your images are processed entirely in your browser and never uploaded to any server. Your files never leave your device.',
    },
  ];
}
