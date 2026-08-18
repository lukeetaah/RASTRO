// Helper para optimizar y garantizar la carga de imágenes históricas sin bloqueos ni fallas de doble codificación
export function getOptimizedImageUrl(rawUrl: string, width = 1600): string {
  if (!rawUrl) return '';
  if (rawUrl.startsWith('/')) return rawUrl;

  try {
    // Si ya es una URL con protocolo, limpiamos decodificando primero para evitar el bug de doble escape
    const urlWithoutProto = rawUrl.replace(/^https?:\/\//, '');
    let cleanDecoded = urlWithoutProto;
    try {
      cleanDecoded = decodeURIComponent(urlWithoutProto);
    } catch (_) {
      cleanDecoded = urlWithoutProto;
    }

    // Proxy ultra-confiable wsrv.nl con compresión WebP
    return `https://wsrv.nl/?url=${encodeURIComponent(cleanDecoded)}&w=${width}&q=85&output=webp&default=${encodeURIComponent(rawUrl)}`;
  } catch (_) {
    return rawUrl;
  }
}
