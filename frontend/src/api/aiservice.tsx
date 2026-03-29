// src/api/aiService.ts
export const fetchAIMessage = async (): Promise<string> => {
  const response = await fetch('http://127.0.0.1:8000/api/ai/');
  if (!response.ok) {
    throw new Error('Failed to fetch from API');
  }
  const text = await response.text(); // because your Django view returns HttpResponse
  return text;
};