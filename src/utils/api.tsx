export const apiFetch = (path: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(`${baseUrl}${path}`, options);
};