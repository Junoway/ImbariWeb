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
  // Handles short emails: a@example.com -> a***@example.com
  const [localPart, domain] = email.split('@');
  if (!domain) return email; // Invalid email, return as-is
  
  if (localPart.length <= 2) {
    return `${localPart}***@${domain}`;
  }
  return `${localPart.substring(0, 2)}***@${domain}`;
}

// Utility to mask verification codes in production logs
export function maskVerificationCodeForLogging(code: string): string {
  if (process.env.NODE_ENV === 'development') {
    return code;
  }
  return '[REDACTED]';
}
