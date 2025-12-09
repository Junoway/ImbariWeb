// Utility to prefix image paths with basePath
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}

// Utility to mask email addresses in production logs
export function maskEmailForLogging(email: string): string {
  if (process.env.NODE_ENV === 'development') {
    return email;
  }
  // Masks email like: user@example.com -> us***@example.com
  return email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
}
