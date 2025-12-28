/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { processImages, initializeModel, getModelInfo } from "../../../lib/process";
import { Images } from "@/components/tool-page/tools/ai-product-background-remover/Images";

interface AppError {
  message: string;
}

export interface ImageFile {
  id: number;
  file: File;
  processedFile?: File;
}

/* SAMPLE IMAGES */
const sampleImages = [
  "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=600",
  "https://images.unsplash.com/photo-1513013156887-d2bf241c8c82?q=80&w=600",
  "https://images.unsplash.com/photo-1643490745745-e8ca9a3a1c90?q=80&w=600",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=600",
];

const isMobileSafari = () => {
  const ua = window.navigator.userAgent;
  return /iPhone|iPad/i.test(ua) && /WebKit/i.test(ua);
};

export default function BackgroundRemoverPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [isWebGPU, setIsWebGPU] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (isMobileSafari()) {
      window.location.href = 'https://bg-mobile.addy.ie';
      return;
    }
    const info = getModelInfo();
    setIsIOS(info.isIOS);
  }, []);

  /* LOAD SAMPLE IMAGE */
  const handleSampleImageClick = async (url: string) => {
    try {
      setIsLoading(true);
      await initializeModel();

      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], "sample.jpg", { type: blob.type });

      const id = Date.now();
      setImages([{ id, file }]);

      const result = await processImages([file]);
      if (result?.length) {
        setImages([{ id, file, processedFile: result[0] }]);
      }
    } catch {
      setError({ message: "Failed to load example image" });
    } finally {
      setIsLoading(false);
    }
  };

  /* DROP HANDLER */
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file, index) => ({
      id: Date.now() + index,
      file,
    }));

    setImages(prev => [...prev, ...newImages]);

    if (images.length === 0) {
      setIsLoading(true);
      try {
        await initializeModel();
        const info = getModelInfo();
        setIsWebGPU(info.isWebGPUSupported);
      } catch {
        setError({ message: "Failed to initialize AI model" });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }

    for (const img of newImages) {
      try {
        const result = await processImages([img.file]);
        if (result?.length) {
          setImages(prev =>
            prev.map(i => (i.id === img.id ? { ...i, processedFile: result[0] } : i))
          );
        }
      } catch {
        console.error("Image processing failed");
      }
    }
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              AI Background Remover – Remove Image Background Online
            </h1>
            <p className="mt-6 text-lg text-blue-100">
              Remove background from images instantly using AI.
              Get transparent PNGs in seconds. 100% free & no signup.
            </p>
            <ul className="mt-6 space-y-2 text-blue-100">
              <li>✔ Free AI background remover</li>
              <li>✔ High quality transparent background</li>
              <li>✔ Product, people & passport photos</li>
              <li>✔ Secure & private processing</li>
            </ul>
            <button
              onClick={() =>
                document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Upload Image
            </button>
          </div>
          <img src="/hero-bg-removal.png" alt="Remove background example" />
        </div>
      </section>

      {/* UPLOAD */}
      <section id="upload" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Upload Image to Remove Background
        </h2>
        <p className="text-center text-gray-600 mt-3">
          Drag & drop or click to upload JPG or PNG images.
        </p>

        <div
          {...getRootProps()}
          className={`mt-10 p-12 bg-white border-2 border-dashed rounded-2xl text-center cursor-pointer transition
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
          `}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <p className="text-gray-600">Loading AI background remover…</p>
          ) : (
            <p className="text-gray-600">
              Drag & drop image here or <span className="text-blue-600 font-semibold">browse</span>
            </p>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-center mt-4">{error.message}</p>
        )}
      </section>

      {/* ✅ EXAMPLE IMAGES – NOW VISIBLE */}
      {images.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h3 className="text-xl font-semibold text-center mb-6">
            Try with example images
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sampleImages.map((url, index) => (
              <button
                key={index}
                onClick={() => handleSampleImageClick(url)}
                className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition group"
              >
                <img
                  src={url}
                  alt="Example image"
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold">
                  Use Example
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* RESULTS */}
      {images.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <Images
            images={images}
            onDelete={(id) =>
              setImages(prev => prev.filter(i => i.id !== id))
            }
          />
        </section>
      )}

      {/* FEATURES */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg">AI Powered</h3>
            <p className="text-sm text-gray-600">Smart foreground detection</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">No Quality Loss</h3>
            <p className="text-sm text-gray-600">Sharp & clean edges</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Free Forever</h3>
            <p className="text-sm text-gray-600">No watermark, no signup</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Private</h3>
            <p className="text-sm text-gray-600">Processed locally</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Background Remover FAQs
        </h2>

        <div className="mt-8 space-y-4">
          {[
            ["Is this background remover free?", "Yes, this tool is completely free with no signup."],
            ["Does image quality reduce?", "No, images keep original quality and sharp edges."],
            ["Are my images uploaded?", "No, images are processed locally in your browser."],
            ["Can I use it for product photos?", "Yes, it’s perfect for e-commerce and catalogs."],
          ].map(([q, a], i) => (
            <details key={i} className="bg-white p-5 rounded-xl shadow">
              <summary className="font-semibold cursor-pointer">{q}</summary>
              <p className="mt-2 text-gray-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className="max-w-7xl mx-auto px-6 pb-16 text-sm text-gray-500">
        This free AI background remover helps you remove image background online
        with high quality. Convert images to transparent PNG, remove background
        from product photos, passport photos, profile pictures, and more.
      </section>

    </div>
  );
}
