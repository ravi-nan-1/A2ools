// src/lib/similarity.ts

/**
 * Compute cosine similarity between two texts
 */
export function computeCosineSimilarity(text1: string, text2: string): number {
    // Simple word-based cosine similarity
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    // Create vocabulary
    const vocab = new Set([...words1, ...words2]);
    
    // Create vectors
    const vector1: number[] = [];
    const vector2: number[] = [];
    
    vocab.forEach(word => {
      vector1.push(words1.filter(w => w === word).length);
      vector2.push(words2.filter(w => w === word).length);
    });
    
    // Calculate dot product
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      magnitude1 += vector1[i] * vector1[i];
      magnitude2 += vector2[i] * vector2[i];
    }
    
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);
    
    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }
    
    return dotProduct / (magnitude1 * magnitude2);
  }