/**
 * Sanitizes and strips HTML/script tags and excessive whitespace from user inputs.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[&<>"'/]/g, (match) => {
      // Escape HTML special characters
      const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return escapeMap[match] || match;
    })
    .trim();
}
