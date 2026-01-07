import { removeBackground } from "@imgly/background-removal";

export async function processImage(image: File): Promise<File> {
  try {
    const blob = await removeBackground(image);
    const [fileName] = image.name.split(".");
    const processedFile = new File([blob], `${fileName}-bg-removed.png`, { type: "image/png" });
    return processedFile;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function processImages(images: File[]): Promise<File[]> {
    const processedFiles: File[] = [];
    
    for (const image of images) {
      try {
        const processedFile = await processImage(image);
        processedFiles.push(processedFile);
      } catch (error) {
        console.error("Error processing image", image.name, error);
      }
    }
    
    return processedFiles;
  }
