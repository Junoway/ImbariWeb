// BasePath for GitHub Pages deployment
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Utility to prefix paths with basePath
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
