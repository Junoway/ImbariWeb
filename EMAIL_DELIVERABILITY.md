# Email Deliverability Tips

## Known Issues

### Outlook Permission Error
If you're using Outlook as your EmailJS service and seeing the error "The user account which was used to submit this request does not have the right to send mail on behalf of the specified sending account", this means:
- Outlook doesn't allow sending emails with a reply-to address from a different email provider
- **Solution:** Remove the `reply_to` parameter from your email template, or switch to Gmail which is more flexible

**Recommendation:** Use Gmail instead of Outlook for EmailJS as it's easier to configure and doesn't have these restrictions.

## Current Issue
Verification emails are being sent to spam folders. This is common for new email senders.

## Solutions Implemented

### 1. **Enhanced Email Headers** ✅
- Added `from_name: 'Imbari Coffee'`
- Added `reply_to: 'imbaricoffee@gmail.com'`
- Added clear subject line: "Verify your Imbari Coffee account - Action Required"

### 2. **Template Best Practices**
Your EmailJS template should include:
- Clear "From" name (Imbari Coffee)
- Action-oriented subject line
- Professional email body
- No spam trigger words

## Additional Steps to Improve Deliverability

### Short-term (Do Now):
1. **Update EmailJS Template Subject:**
   ```
   Verify your Imbari Coffee account - Action Required
   ```

2. **Template Body Best Practices:**
   - Keep it simple and professional
   - Avoid ALL CAPS
   - Avoid words like "FREE", "CLICK HERE", "ACT NOW"
   - Include company name prominently
   - Add unsubscribe link (optional but helps)

3. **Ask Users to Whitelist:**
   - Add text on signup page: "Check your spam folder and mark as 'Not Spam'"
   - Add: "Add imbaricoffee@gmail.com to your contacts"

### Medium-term (Next Week):
1. **Warm Up Your Email:**
   - Send emails gradually (start with 10-20/day)
   - Ask recipients to reply or mark as important
   - Don't send too many emails at once

2. **SPF/DKIM Records:**
   - EmailJS handles this automatically for Gmail and Outlook
   - Make sure your email account is properly verified
   - **Note:** If using Outlook, do NOT set a custom reply-to address from a different provider (e.g., Gmail) as Outlook will reject emails with permission errors

3. **Monitor EmailJS Dashboard:**
   - Check bounce rates and spam reports
   - EmailJS shows delivery status for each email

### Long-term (Production):
1. **Custom Domain Email:**
   - Use `noreply@imbaricoffee.com` instead of Gmail
   - Requires domain ownership and DNS configuration
   - Much better deliverability

2. **Professional Email Service:**
   - SendGrid (99k emails/month free)
   - Mailgun (5k emails/month free)
   - AWS SES (62k emails/month free)

3. **Email Authentication:**
   - Set up SPF, DKIM, and DMARC records
   - Requires custom domain

## Quick Fixes for Current Template

Update your EmailJS template to:

**Subject:**
```
Your Imbari Coffee Verification Code
```

**Body:**
```
Hello {{to_name}},

Welcome to Imbari Coffee!

Your account verification code is: {{verification_code}}

Please enter this code to complete your registration. The code expires in 15 minutes.

If you did not create this account, please disregard this email.

Thank you for choosing Imbari Coffee!

Best regards,
The Imbari Coffee Team
imbaricoffee@gmail.com
```

## Why Emails Go to Spam

Common reasons:
1. ❌ New sender (no email reputation yet)
2. ❌ Using free email service (Gmail, Outlook)
3. ❌ No previous email history with recipient
4. ❌ Spam trigger words in subject/body
5. ❌ Missing authentication records (SPF/DKIM)

## Monitor & Improve

Check EmailJS dashboard:
- https://dashboard.emailjs.com/admin/email_log
- Look for bounce rates
- Check delivery status
- Read error messages

Most important: **Ask your first users to mark emails as "Not Spam"** - this helps build sender reputation!
