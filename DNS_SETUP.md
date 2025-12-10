# Imbari Coffee - DNS Configuration Checklist
# Use this to configure PremiumDNS in Namecheap

## ⚠️ IMPORTANT: Get your Stellar Hosting IP Address
Before configuring DNS, you need your server IP address.
Find it in your Namecheap welcome email or cPanel.

---

## DNS Records to Add in PremiumDNS Zone Manager

### 🌐 A Records (Point domain to hosting)
```
Type: A
Host: @
Value: [YOUR_STELLAR_HOSTING_IP]
TTL: Automatic
```

```
Type: A  
Host: www
Value: [YOUR_STELLAR_HOSTING_IP]
TTL: Automatic
```

---

### 📧 MX Records (Private Email)
```
Type: MX
Host: @
Value: mx1.privateemail.com
Priority: 10
TTL: Automatic
```

```
Type: MX
Host: @
Value: mx2.privateemail.com
Priority: 20
TTL: Automatic
```

---

### 🔐 TXT Records (Email Authentication)

**SPF Record:**
```
Type: TXT
Host: @
Value: v=spf1 include:spf.privateemail.com ~all
TTL: Automatic
```

**DMARC Record:**
```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:postmaster@imbaricoffee.com
TTL: Automatic
```

**DKIM Record** (Get from Private Email dashboard):
```
Type: TXT
Host: default._domainkey
Value: [GET_FROM_PRIVATEEMAIL_DASHBOARD]
TTL: Automatic
```

---

### 🔗 CNAME Records (Email Autodiscover)

```
Type: CNAME
Host: autoconfig
Value: autoconfig.privateemail.com
TTL: Automatic
```

```
Type: CNAME
Host: autodiscover
Value: autodiscover.privateemail.com
TTL: Automatic
```

---

## ✅ Verification Steps

1. **Check Nameservers** (should already be set):
   - pdns1.registrar-servers.com
   - pdns2.registrar-servers.com

2. **Wait for DNS Propagation** (24-48 hours):
   - Check: https://dnschecker.org
   - Enter: imbaricoffee.com

3. **Verify A Record**:
   ```
   nslookup imbaricoffee.com
   ```
   Should return your hosting IP

4. **Verify MX Record**:
   ```
   nslookup -type=MX imbaricoffee.com
   ```
   Should return mx1/mx2.privateemail.com

5. **Test Email**:
   - Send email to hello@imbaricoffee.com
   - Check delivery with https://mail-tester.com

---

## 📞 Need Help?

- **Namecheap DNS Guide**: https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/
- **Private Email Setup**: https://www.namecheap.com/support/knowledgebase/subcategory/2214/private-email/
- **Live Chat**: Available 24/7 in Namecheap account panel
