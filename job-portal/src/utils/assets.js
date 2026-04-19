const BASE_URL = 'http://localhost:7001';

export const getAssetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path; // Cloudinary or External
  return `${BASE_URL}${path}`; // Local
};
