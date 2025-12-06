// Utility to prefix image paths with basePath in production
export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/ImbariWeb' : '';
  return `${basePath}${path}`;
}
