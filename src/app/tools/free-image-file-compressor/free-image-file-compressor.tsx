'use client';

import { useState } from 'react';

const FreeImageFileCompressor = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCompress = async () => {
    if (!image) {
      alert('Please select an image.');
      return;
    }

    // Replace with your actual image compression logic
    const compressedImageUrl = URL.createObjectURL(image);
    setCompressedImage(compressedImageUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Free Image File Compressor</h1>
      <div className="flex mb-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="flex-grow p-2 border rounded-l-md"
        />
        <button onClick={handleCompress} className="bg-blue-500 text-white p-2 rounded-r-md">
          Compress
        </button>
      </div>
      {compressedImage && (
        <div className="p-4 border rounded-md bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">Compressed Image</h2>
          <img src={compressedImage} alt="Compressed" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default FreeImageFileCompressor;
