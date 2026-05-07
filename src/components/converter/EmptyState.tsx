'use client';

interface EmptyStateProps {
  onFileSelect: (file: File) => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function EmptyState({
  onFileSelect,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
}: EmptyStateProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] ${
        isDragging 
          ? 'border-violet-500 bg-violet-500/10 scale-[1.02] shadow-lg shadow-violet-500/10' 
          : 'border-[#30363d] hover:border-zinc-600 hover:bg-[#161b22]/50'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={handleKeyDown}
      aria-label="Upload image"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/bmp,image/tiff,image/gif"
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />
      <svg
        className={`mb-4 h-12 w-12 transition-all duration-200 ${isDragging ? 'scale-110 text-violet-400' : 'text-[#8b949e]'}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
      <p className={`mb-2 text-base font-medium transition-colors ${isDragging ? 'text-violet-300' : 'text-[#e6edf3]'}`}>
        {isDragging ? 'Drop image here' : 'Drop an image or click to upload'}
      </p>
      <p className="text-sm text-[#8b949e]">
        PNG, JPG, WEBP, SVG, BMP, TIFF, GIF (max 10MB)
      </p>
    </div>
  );
}
