/**
 * Chat Follow-Up Email Template
 * Professional, persuasive, friendly coffee-lover tone
 */

interface TemplateData {
  to_name: string;
  shop_link: string;
  subscribe_link: string;
  about_link: string;
  impact_link: string;
}

export function getChatFollowUpHTML(data: TemplateData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for connecting with Imbari Coffee</title>
    <style>
        body { 
            font-family: 'Georgia', 'Times New Roman', serif; 
            color: #2d3748; 
            line-height: 1.6; 
            margin: 0;
            padding: 0;
            background-color: #f7fafc;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
            background: linear-gradient(135deg, #ff6b35 0%, #14b8a6 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.95;
        }
        .content { 
            padding: 40px 30px; 
        }
        .greeting {
            font-size: 18px;
            color: #2d3748;
            margin-bottom: 20px;
        }
        .section-title {
            color: #ff6b35;
            font-size: 24px;
            margin: 30px 0 20px 0;
            font-weight: 600;
        }
        .cta-section {
            margin: 25px 0;
            padding: 20px;
            background-color: #f7fafc;
            border-left: 4px solid #14b8a6;
            border-radius: 6px;
        }
        .cta-section strong {
            color: #2d3748;
            font-size: 16px;
        }
        .cta-section p {
            margin: 8px 0;
            color: #4a5568;
        }
        .cta-button {
            display: inline-block;
            background-color: #ff6b35;
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 10px;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        .cta-button:hover {
            background-color: #e55a2b;
        }
        .features {
            margin: 25px 0;
        }
        .feature {
            margin: 15px 0;
            padding: 15px;
            background-color: #f7fafc;
            border-radius: 6px;
        }
        .feature strong {
            color: #2d3748;
        }
        .feature-text {
            color: #4a5568;
            font-size: 14px;
            margin-top: 5px;
        }
        .discount-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
            border: 2px solid #fbbf24;
        }
        .discount-code {
            font-size: 24px;
            font-weight: 700;
            color: #ff6b35;
            letter-spacing: 2px;
            margin: 10px 0;
        }
        .signature {
            margin-top: 30px;
            font-style: italic;
            color: #4a5568;
        }
        .signature strong {
            color: #ff6b35;
            font-style: normal;
        }
        .footer {
            background-color: #1a202c;
            color: #cbd5e0;
            padding: 30px;
            text-align: center;
        }
        .footer-links {
            margin: 15px 0;
            font-size: 14px;
        }
        .footer-links a {
            color: #14b8a6;
            text-decoration: none;
            margin: 0 10px;
        }
        .footer-social {
            margin: 20px 0;
            font-size: 13px;
        }
        .footer-social a {
            color: #14b8a6;
            text-decoration: none;
            margin: 0 8px;
        }
        .unsubscribe {
            font-size: 11px;
            color: #718096;
            margin-top: 20px;
        }
        .unsubscribe a {
            color: #14b8a6;
            text-decoration: none;
        }
        .divider {
            border: 0;
            border-top: 2px solid #e2e8f0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>☕ Imbari Coffee</h1>
            <p>From Africa's Finest Farms to Your Cup</p>
        </div>
        
        <div class="content">
            <p class="greeting"><strong>Dear ${data.to_name},</strong></p>
            
            <p>Thank you for taking the time to connect with us today. It's conversations like ours that remind us why we fell in love with coffee in the first place—the connections, the stories, and the passion behind every single bean.</p>
            
            <p>At Imbari Coffee, we're not just another coffee company. We're a bridge between Africa's most dedicated farmers and coffee lovers who appreciate quality, authenticity, and impact. Every bag we export carries the dedication of women farmers on Mt. Elgon's volcanic slopes, the richness of Uganda's coffee heritage, and our commitment to creating real change.</p>
            
            <h2 class="section-title">Let's Continue Your Coffee Journey</h2>
            
            <div class="cta-section">
                <strong>☕ Discover Our Collection</strong>
                <p>From single-origin Arabica to our award-winning instant coffee, each product is crafted with the same care we put into our conversation with you.</p>
                <a href="${data.shop_link}" class="cta-button">Browse Our Shop</a>
            </div>
            
            <div class="cta-section">
                <strong>📦 Never Run Out of Great Coffee</strong>
                <p>Join our subscription community and enjoy 10% off every delivery, exclusive early access to new releases, and the satisfaction of knowing your coffee creates impact with every sip.</p>
                <a href="${data.subscribe_link}" class="cta-button">Start Your Subscription</a>
            </div>
            
            <div class="cta-section">
                <strong>🌍 See Your Impact</strong>
                <p>Curious about where your coffee comes from and who grows it? Discover how we're empowering women farmers, building sustainable communities, and transforming lives across East Africa.</p>
                <a href="${data.impact_link}" class="cta-button">Our Impact Story</a>
            </div>
            
            <div class="cta-section">
                <strong>🏆 Learn Our Story</strong>
                <p>From a bold pitch on Shark Tank to becoming a force for change in African coffee, our journey has been extraordinary—and we're just getting started.</p>
                <a href="${data.about_link}" class="cta-button">About Imbari Coffee</a>
            </div>
            
            <hr class="divider">
            
            <h3 style="color: #2d3748; font-size: 20px;">What Sets Imbari Apart?</h3>
            
            <div class="features">
                <div class="feature">
                    <strong>🏔️ Single-Origin Excellence</strong>
                    <div class="feature-text">Sourced from Mt. Elgon's nutrient-rich volcanic soils at altitudes of 1,800–2,300 meters</div>
                </div>
                
                <div class="feature">
                    <strong>🌱 Direct Trade Relationships</strong>
                    <div class="feature-text">Fair pricing, sustainable practices, and farmer-first partnerships</div>
                </div>
                
                <div class="feature">
                    <strong>👩‍🌾 Women-Powered</strong>
                    <div class="feature-text">60% of our partner farmers are women building generational wealth</div>
                </div>
                
                <div class="feature">
                    <strong>🏆 Quality You Can Taste</strong>
                    <div class="feature-text">SCA certified, organically grown options, consistently scoring 85+</div>
                </div>
            </div>
            
            <hr class="divider">
            
            <div class="discount-box">
                <h3 style="margin: 0 0 10px 0; color: #2d3748;">🎁 A Special Thank You</h3>
                <p style="margin: 0 0 15px 0; color: #4a5568;">Because great relationships start with great coffee, here's <strong>10% off your first order</strong> with us.</p>
                <div class="discount-code">FIRSTCUP10</div>
                <p style="margin: 15px 0 0 0; font-size: 13px; color: #4a5568;">Use code at checkout</p>
            </div>
            
            <p>Whether you're stocking your home pantry, sourcing for a café, or exploring bulk orders for your business, we're here to deliver excellence with every bag.</p>
            
            <hr class="divider">
            
            <h3 style="color: #2d3748; font-size: 18px;">Questions? We're Here to Help</h3>
            
            <p>If you have any questions about our products, wholesale opportunities, private label partnerships, or anything else coffee-related—simply reply to this email. Our team is always delighted to help.</p>
            
            <p>Here's to exceptional coffee, meaningful connections, and the shared belief that every cup can create change.</p>
            
            <div class="signature">
                Warmly,<br><br>
                <strong>The Imbari Coffee Team</strong><br>
                <span style="font-size: 13px;">Empowering Africa, One Cup at a Time</span>
            </div>
        </div>
        
        <div class="footer">
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Imbari Coffee</strong></p>
            <div class="footer-links">
                📧 info@imbaricoffee.com<br>
                🌐 <a href="https://www.imbaricoffee.com">www.imbaricoffee.com</a><br>
                📍 Connecting African Farms to Global Cups
            </div>
            
            <p style="margin: 20px 0 10px 0; font-size: 14px; font-weight: 600;">P.S.</p>
            <p style="margin: 0; font-size: 13px; line-height: 1.5;">If you're a café owner, hotel buyer, or distributor, ask us about our wholesale programs and white-label partnerships. We'd love to help you bring exceptional African coffee to your customers.</p>
            
            <div class="footer-social">
                Follow us: 
                <a href="https://instagram.com/imbaricoffee">Instagram</a> | 
                <a href="https://facebook.com/imbaricoffee">Facebook</a> | 
                <a href="https://linkedin.com/company/imbari-coffee">LinkedIn</a>
            </div>
            
            <div class="unsubscribe">
                You received this email because you recently connected with us via our website chat.<br>
                Want to change how you receive these emails? <a href="#">Update preferences</a> or <a href="#">unsubscribe</a>.
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

export function getChatFollowUpText(data: TemplateData): string {
  return `
Dear ${data.to_name},

Thank you for taking the time to connect with us today. It's conversations like ours that remind us why we fell in love with coffee in the first place—the connections, the stories, and the passion behind every single bean.

At Imbari Coffee, we're not just another coffee company. We're a bridge between Africa's most dedicated farmers and coffee lovers who appreciate quality, authenticity, and impact. Every bag we export carries the dedication of women farmers on Mt. Elgon's volcanic slopes, the richness of Uganda's coffee heritage, and our commitment to creating real change.

LET'S CONTINUE YOUR COFFEE JOURNEY
===================================

☕ DISCOVER OUR COLLECTION
From single-origin Arabica to our award-winning instant coffee, each product is crafted with the same care we put into our conversation with you.
Visit: ${data.shop_link}

📦 NEVER RUN OUT OF GREAT COFFEE
Join our subscription community and enjoy 10% off every delivery, exclusive early access to new releases, and the satisfaction of knowing your coffee creates impact with every sip.
Subscribe: ${data.subscribe_link}

🌍 SEE YOUR IMPACT
Curious about where your coffee comes from and who grows it? Discover how we're empowering women farmers, building sustainable communities, and transforming lives across East Africa.
Learn more: ${data.impact_link}

🏆 LEARN OUR STORY
From a bold pitch on Shark Tank to becoming a force for change in African coffee, our journey has been extraordinary—and we're just getting started.
About us: ${data.about_link}

WHAT SETS IMBARI APART?
=======================

🏔️ Single-Origin Excellence
   Sourced from Mt. Elgon's nutrient-rich volcanic soils at altitudes of 1,800–2,300 meters

🌱 Direct Trade Relationships
   Fair pricing, sustainable practices, and farmer-first partnerships

👩‍🌾 Women-Powered
   60% of our partner farmers are women building generational wealth

🏆 Quality You Can Taste
   SCA certified, organically grown options, consistently scoring 85+

A SPECIAL THANK YOU
===================

Because great relationships start with great coffee, here's 10% off your first order with us.

Use code: FIRSTCUP10 at checkout

Whether you're stocking your home pantry, sourcing for a café, or exploring bulk orders for your business, we're here to deliver excellence with every bag.

QUESTIONS? WE'RE HERE TO HELP
=============================

If you have any questions about our products, wholesale opportunities, private label partnerships, or anything else coffee-related—simply reply to this email. Our team is always delighted to help.

Here's to exceptional coffee, meaningful connections, and the shared belief that every cup can create change.

Warmly,
The Imbari Coffee Team
Empowering Africa, One Cup at a Time

---
Imbari Coffee
📧 info@imbaricoffee.com
🌐 www.imbaricoffee.com
📍 Connecting African Farms to Global Cups

P.S. – If you're a café owner, hotel buyer, or distributor, ask us about our wholesale programs and white-label partnerships. We'd love to help you bring exceptional African coffee to your customers.

---
You received this email because you recently connected with us via our website chat.
Want to change how you receive these emails? Update preferences or unsubscribe.
  `;
}

export function getChatFollowUpSubject(customerName: string): string {
  return `Thank you for connecting with Imbari Coffee ☕`;
}
