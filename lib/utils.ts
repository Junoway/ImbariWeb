export function getImagePath(path: string): string {
  const basePath = process.env.BASE_PATH || '';
  return `${basePath}${path}`;
}
