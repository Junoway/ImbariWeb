import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/emailService';
import { 
  getChatFollowUpHTML, 
  getChatFollowUpText, 
  getChatFollowUpSubject 
} from '@/lib/email/chatFollowUpTemplate';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      to_email, 
      to_name, 
      shop_link, 
      subscribe_link, 
      about_link, 
      impact_link 
    } = body;

    // Validate required fields
    if (!to_email || !to_name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to_email and to_name' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to_email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare template data with defaults
    const templateData = {
      to_name,
      shop_link: shop_link || 'https://www.imbaricoffee.com/shop',
      subscribe_link: subscribe_link || 'https://www.imbaricoffee.com/subscriptions',
      about_link: about_link || 'https://www.imbaricoffee.com/about',
      impact_link: impact_link || 'https://www.imbaricoffee.com/our-impact',
    };

    // Generate email content
    const htmlContent = getChatFollowUpHTML(templateData);
    const textContent = getChatFollowUpText(templateData);
    const subject = getChatFollowUpSubject(to_name);

    // Send email
    const result = await sendEmail({
      to: to_email,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: `Email sent successfully to ${to_email}` 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to send email' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Optional: Health check endpoint
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok', 
      message: 'Email API is running',
      endpoint: '/api/send-email',
      method: 'POST',
      requiredFields: ['to_email', 'to_name'],
      optionalFields: ['shop_link', 'subscribe_link', 'about_link', 'impact_link']
    },
    { status: 200 }
  );
}
