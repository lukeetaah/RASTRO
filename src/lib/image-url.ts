// Helper para optimizar y garantizar la carga de imágenes históricas sin bloqueos de referrer
export function getOptimizedImageUrl(rawUrl: string, width = 1600): string {
  if (!rawUrl) return '';

  // Si es Wikimedia o dominio externo, usamos el CDN de weserv con compresión WebP y bypass de referrer
  if (rawUrl.includes('wikimedia.org') || rawUrl.includes('wikipedia.org')) {
    const cleanUrl = rawUrl.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&q=85&output=webp`;
  }

  return rawUrl;
}
