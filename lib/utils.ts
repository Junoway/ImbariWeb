// Utility to prefix image paths with basePath
// No basePath needed for custom domain (www.imbaricoffee.com)
export function withBasePath(path: string): string {
  return path;
}

// Format currency values
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
