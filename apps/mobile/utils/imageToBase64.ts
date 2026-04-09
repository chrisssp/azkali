import type { ImagePickerAsset } from "expo-image-picker";

function guessMimeFromUri(uri: string): string {
  const lower = uri.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

/**
 * Obtiene base64 y mime type listos para Gemini `inlineData`.
 * Requiere `base64: true` en `launchImageLibraryAsync`.
 */
export function assetToGeminiInlineData(asset: ImagePickerAsset): {
  base64: string;
  mimeType: string;
} {
  if (!asset.base64) {
    throw new Error(
      "El asset no incluye base64. Usa launchImageLibraryAsync({ base64: true })."
    );
  }
  const mimeType = asset.mimeType ?? guessMimeFromUri(asset.uri);
  return { base64: asset.base64, mimeType };
}
