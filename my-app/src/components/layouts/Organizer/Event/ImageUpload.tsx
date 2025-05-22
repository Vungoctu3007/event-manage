import React, { useEffect, useRef, useState, useCallback } from "react";
import { Upload, FileImage } from "lucide-react";

interface ImageUploadProps {
  onFileChange: (file: File | null) => void;
  preview: string | null;
  setPreview: (preview: string | null) => void;
  width: string;
  height: string;
  label: string;
  dimensions: string;
}

const ImageUpload: React.FC<ImageUploadProps> = React.memo(
  ({ onFileChange, preview, setPreview, width, height, label, dimensions }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => {
      inputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileChange(file);
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        } else {
          if (preview) URL.revokeObjectURL(preview);
          setPreview(null);
        }
      },
      [onFileChange, preview, setPreview]
    );

    useEffect(() => {
      return () => {
        if (preview) URL.revokeObjectURL(preview);
      };
    }, [preview]);

    return (
      <div
        className={`rounded-lg border-2 border-dashed border-gray-600 hover:border-green-500 transition-colors duration-200 relative cursor-pointer bg-[#292D2B] ${
          preview ? "w-auto max-w-full" : ""
        }`}
        style={!preview ? { width, height } : {}}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {preview ? (
          <img
            src={preview}
            alt={`${label} Preview`}
            className="w-full max-w-[1370px] h-auto object-contain rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            {label.includes("Logo") ? (
              <Upload className="w-12 h-12 text-green-500 mb-4" />
            ) : (
              <FileImage className="w-12 h-12 text-green-500 mb-4" />
            )}
            <p className="text-gray-400 text-center">{label}</p>
            <p className="text-gray-400 text-center">{dimensions}</p>
          </div>
        )}
      </div>
    );
  }
);

export default ImageUpload;