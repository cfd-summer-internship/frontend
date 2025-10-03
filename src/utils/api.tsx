export const apiFetch = (path: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const normalizedPath = path.startsWith("/api") ? path.replace(/^\/api/, "") : path;
  return fetch(`${baseUrl}${normalizedPath}`, options);
};