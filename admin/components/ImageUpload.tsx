'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ImageUploadProps {
  value?: string | File;
  onChange: (value: string | File) => void;
  onRemove?: () => void;
  type?: 'cover' | 'content';
  maxSize?: number;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  type = 'cover',
  maxSize = 5,
  className = '',
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setError('');

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPEG, PNG, WebP, or GIF.');
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File too large. Maximum size is ${maxSize}MB.`);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Pass the File object to parent (not uploaded yet)
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  // Determine what to display
  const displayUrl = value instanceof File ? previewUrl : value;

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {displayUrl ? (
        <div className="relative group">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
            <Image src={displayUrl} alt="Upload preview" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
          {value instanceof File && (
            <div className="mt-2 text-sm text-muted-foreground">
              📎 {value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB) - Will upload on save
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
          `}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">JPEG, PNG, WebP, or GIF (max {maxSize}MB)</p>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
