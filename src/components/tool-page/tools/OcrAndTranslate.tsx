"use client";
import React from "react";
import ImageUploader from "../../ImageUploader";
import { Languages } from "lucide-react";

const OcrAndTranslate: React.FC = () => {
  const handleImageUpload = (file: File) => {
    console.log("Image uploaded:", file);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Languages className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">OCR & Translate</h2>
        </div>
        <p className="text-muted-foreground">
          Extract text from images and translate to any language
        </p>
      </div>
      <ImageUploader onImageUpload={handleImageUpload} />
    </div>
  );
};

export default OcrAndTranslate;
