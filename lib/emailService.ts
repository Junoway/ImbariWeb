// lib/emailService.ts
"use client";

import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to create a free account at https://www.emailjs.com/
// Then add your keys here or in environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_imbari';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_verification';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export async function sendVerificationEmail(
  email: string,
  firstName: string,
  verificationCode: string
): Promise<boolean> {
  try {
    const templateParams = {
      to_email: email,
      to_name: firstName,
      from_name: 'Imbari Coffee',
      reply_to: 'imbaricoffee@gmail.com',
      verification_code: verificationCode,
      company_name: 'Imbari Coffee',
      subject: 'Verify your Imbari Coffee account - Action Required',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Generate a 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
