# Chat Follow-Up Email Template

## EmailJS Template Setup

### Template Name: `template_chat_followup`

### Subject Line:
```
Thank you for connecting with Imbari Coffee ☕
```

---

### Email Body (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Georgia, serif; color: #2d3748; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
        .footer { background: #1a202c; color: #cbd5e0; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 5px; font-weight: bold; }
        .button:hover { background: #e55a2b; }
        .signature { font-style: italic; color: #4a5568; margin-top: 20px; }
        .divider { border-top: 2px solid #e2e8f0; margin: 25px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 28px;">☕ Imbari Coffee</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">From Africa's Finest Farms to Your Cup</p>
        </div>
        
        <div class="content">
            <p style="font-size: 18px; color: #2d3748;"><strong>Dear {{to_name}},</strong></p>
            
            <p>Thank you for taking the time to connect with us. It's conversations like ours that fuel our passion for bringing extraordinary African coffee to the world.</p>
            
            <p>At Imbari Coffee, we believe every cup tells a story—of dedicated farmers on the slopes of Mt. Elgon, of women entrepreneurs building futures, and of a continent whose coffee heritage deserves to shine on the global stage.</p>
            
            <div class="divider"></div>
            
            <h2 style="color: #ff6b35; font-size: 20px;">Your Journey with Imbari</h2>
            
            <p><strong>🛍️ Explore Our Collection</strong><br>
            Discover our premium selection of Uganda Arabica, specialty blends, and instant coffee crafted for discerning palates.</p>
            <a href="{{shop_link}}" class="button">Browse Our Shop</a>
            
            <p style="margin-top: 25px;"><strong>📦 Join the Coffee Club</strong><br>
            Never run out of exceptional coffee. Our subscription service delivers freshness to your doorstep with exclusive member benefits.</p>
            <a href="{{subscribe_link}}" class="button">Start Your Subscription</a>
            
            <div class="divider"></div>
            
            <h3 style="color: #14b8a6;">Beyond the Bean 🌍</h3>
            
            <p>We're more than a coffee company—we're a movement. Learn about our impact:</p>
            
            <ul style="line-height: 2;">
                <li><a href="{{about_link}}" style="color: #ff6b35; text-decoration: none;"><strong>Our Story</strong></a> - From Shark Tank to global expansion</li>
                <li><a href="{{impact_link}}" style="color: #ff6b35; text-decoration: none;"><strong>Our Impact</strong></a> - Empowering women & transforming communities</li>
            </ul>
            
            <div class="divider"></div>
            
            <h3 style="color: #2d3748;">What Makes Imbari Different?</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; background: #f7fafc; border-radius: 6px; margin-bottom: 10px;">
                        <strong>🏔️ Single-Origin Excellence</strong><br>
                        <span style="color: #4a5568; font-size: 14px;">Sourced from Mt. Elgon's volcanic soils at 1,800-2,300m altitude</span>
                    </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                    <td style="padding: 10px; background: #f7fafc; border-radius: 6px;">
                        <strong>🌱 Direct Trade Commitment</strong><br>
                        <span style="color: #4a5568; font-size: 14px;">We work directly with farmers, ensuring fair prices and sustainable practices</span>
                    </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                    <td style="padding: 10px; background: #f7fafc; border-radius: 6px;">
                        <strong>👩‍🌾 Women Empowerment</strong><br>
                        <span style="color: #4a5568; font-size: 14px;">60% of our farmers are women building generational wealth</span>
                    </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                    <td style="padding: 10px; background: #f7fafc; border-radius: 6px;">
                        <strong>🏆 Award-Winning Quality</strong><br>
                        <span style="color: #4a5568; font-size: 14px;">SCA certified, organic options, consistently scoring 85+ on coffee reviews</span>
                    </td>
                </tr>
            </table>
            
            <div class="divider"></div>
            
            <p style="font-size: 16px; color: #2d3748; background: #fef3c7; padding: 15px; border-left: 4px solid #ff6b35; border-radius: 4px;">
                <strong>💡 Special Offer:</strong> Use code <strong>FIRSTCUP10</strong> for 10% off your first order. Because great relationships start with great coffee.
            </p>
            
            <div class="divider"></div>
            
            <p>Whether you're a café owner seeking premium beans, a corporate buyer exploring bulk orders, or a coffee enthusiast discovering new flavors—we're here to serve you with excellence.</p>
            
            <p>If you have any questions or need personalized recommendations, simply reply to this email. Our team is always delighted to help.</p>
            
            <p class="signature">
                Here's to exceptional coffee and meaningful connections,<br><br>
                <strong style="color: #ff6b35;">The Imbari Coffee Team</strong><br>
                <span style="font-size: 13px; color: #718096;">Empowering Africa, One Cup at a Time</span>
            </p>
        </div>
        
        <div class="footer">
            <p style="margin: 0 0 10px 0;"><strong>Imbari Coffee</strong></p>
            <p style="margin: 0; font-size: 13px;">
                📧 info@imbaricoffee.com | 🌐 <a href="https://www.imbaricoffee.com" style="color: #14b8a6; text-decoration: none;">www.imbaricoffee.com</a>
            </p>
            <p style="margin: 15px 0 0 0; font-size: 12px; color: #a0aec0;">
                Follow us: 
                <a href="#" style="color: #14b8a6; text-decoration: none; margin: 0 5px;">Instagram</a> | 
                <a href="#" style="color: #14b8a6; text-decoration: none; margin: 0 5px;">Facebook</a> | 
                <a href="#" style="color: #14b8a6; text-decoration: none; margin: 0 5px;">LinkedIn</a>
            </p>
            <p style="margin: 15px 0 0 0; font-size: 11px; color: #718096;">
                You received this email because you recently connected with us via our website chat.<br>
                Want to change how you receive these emails? <a href="#" style="color: #14b8a6;">Update preferences</a> or <a href="#" style="color: #14b8a6;">unsubscribe</a>.
            </p>
        </div>
    </div>
</body>
</html>
```

---

## Plain Text Version (Fallback):

```
Dear {{to_name}},

Thank you for taking the time to connect with Imbari Coffee. It's conversations like ours that fuel our passion for bringing extraordinary African coffee to the world.

At Imbari Coffee, we believe every cup tells a story—of dedicated farmers on the slopes of Mt. Elgon, of women entrepreneurs building futures, and of a continent whose coffee heritage deserves to shine on the global stage.

YOUR JOURNEY WITH IMBARI
========================

🛍️ EXPLORE OUR COLLECTION
Discover our premium selection of Uganda Arabica, specialty blends, and instant coffee.
Visit: {{shop_link}}

📦 JOIN THE COFFEE CLUB
Never run out of exceptional coffee with our subscription service.
Subscribe: {{subscribe_link}}

BEYOND THE BEAN 🌍
==================

Learn more about our impact:
- Our Story: {{about_link}}
- Our Impact: {{impact_link}}

WHAT MAKES IMBARI DIFFERENT?
============================

🏔️ Single-Origin Excellence
   Sourced from Mt. Elgon's volcanic soils at 1,800-2,300m altitude

🌱 Direct Trade Commitment
   We work directly with farmers, ensuring fair prices

👩‍🌾 Women Empowerment
   60% of our farmers are women building generational wealth

🏆 Award-Winning Quality
   SCA certified, consistently scoring 85+ on reviews

💡 SPECIAL OFFER
Use code FIRSTCUP10 for 10% off your first order.

Whether you're a café owner, corporate buyer, or coffee enthusiast—we're here to serve you with excellence.

Have questions? Simply reply to this email.

Here's to exceptional coffee and meaningful connections,

The Imbari Coffee Team
Empowering Africa, One Cup at a Time

---
Imbari Coffee
📧 info@imbaricoffee.com
🌐 www.imbaricoffee.com

You received this email because you recently connected with us via our website chat.
```

---

## EmailJS Template Variables:

Make sure your EmailJS template includes these variables:
- `{{to_email}}` - Customer's email
- `{{to_name}}` - Customer's name
- `{{shop_link}}` - https://www.imbaricoffee.com/shop
- `{{subscribe_link}}` - https://www.imbaricoffee.com/subscriptions
- `{{about_link}}` - https://www.imbaricoffee.com/about
- `{{impact_link}}` - https://www.imbaricoffee.com/our-impact

---

## Setup Instructions:

1. Go to EmailJS Dashboard: https://dashboard.emailjs.com/
2. Navigate to **Email Templates**
3. Click **Create New Template**
4. Template ID: `template_chat_followup`
5. Paste the HTML version into the **Content** field
6. Add the plain text version as fallback
7. Set **Subject**: `Thank you for connecting with Imbari Coffee ☕`
8. Add all template variables listed above
9. **Test the template** with sample data
10. **Save**

---

## Testing:

After setup, mark a test chat as resolved in the admin dashboard. The customer should receive:
- Professional, warm email
- Links to shop and subscribe
- Special discount code (FIRSTCUP10)
- Brand story and impact information
- Clear call-to-actions

---

**This email positions Imbari as a premium, mission-driven brand while maintaining warmth and accessibility—perfect for converting chat inquiries into customers!** ☕✨
