import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
}

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const config: EmailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
  };

  transporter = nodemailer.createTransport(config);
  return transporter;
}

export async function sendEmail(params: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const transport = getTransporter();

    const mailOptions = {
      from: params.from || `"Imbari Coffee" <${process.env.EMAIL_USER}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    };

    await transport.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    const transport = getTransporter();
    await transport.verify();
    console.log('✅ Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('❌ Email server verification failed:', error);
    return false;
  }
}
