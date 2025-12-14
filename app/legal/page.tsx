// app/legal/page.tsx
import Link from "next/link";
import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function LegalPage() {
  return (
    <main className="bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Legal</h1>
      <p className="mb-8 text-lg">Terms of Use & Privacy Policy</p>
      <button className="bg-[#10b981] hover:bg-[#22c55e] text-imbari-very-dark-brown font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-4">
        View Terms
      </button>
      <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200">
        Privacy Policy
      </button>
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-emerald-300">Legal Information</h1>
        <p className="text-base text-imbari-coffee-brown">Terms of Use & Privacy Policy</p>
      </header>
      <section className="card bg-[#050708] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-emerald-200 mb-2">TERMS OF USE — IMBARI COFFEE</h2>
        <p className="text-xs text-imbari-coffee-brown mb-2">Last Updated: April 2025</p>
        <div className="space-y-4 text-sm text-imbari-very-dark-brown">
          <p>Welcome to Imbari Coffee. By accessing, browsing, or using this website (the “Site”), you acknowledge that you have read, understood, and agree to be bound by the following Terms of Use. If you do not agree to these terms, you must not use this Site.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Ownership of Content</strong><br />
              All content on this Site—including text, images, product designs, videos, graphics, trademarks, and digital assets—is the exclusive property of Imbari Coffee or its licensors. No part of the Site may be copied, reproduced, distributed, modified, or transmitted without prior written permission.
            </li>
            <li>
              <strong>Permitted Use</strong><br />
              You may use this Site solely for: browsing information about Imbari Coffee, purchasing products, contacting our team, or learning about our programs and distribution opportunities. Any unauthorized, illegal, or harmful use of the Site is strictly forbidden.
            </li>
            <li>
              <strong>Prohibited Conduct</strong><br />
              You agree NOT to: interfere with the security, performance, or operation of the Site, use the Site for fraudulent or deceptive activities, attempt to access restricted systems or data, upload harmful code, bots, or automated scripts, or infringe on Imbari Coffee intellectual property rights.
            </li>
            <li>
              <strong>Product Information & Availability</strong><br />
              Imbari Coffee works to ensure accurate product descriptions, pricing, and availability. However, we reserve the right to modify product offerings, packaging, pricing, or availability without prior notice.
            </li>
            <li>
              <strong>External Links</strong><br />
              This Site may contain links to external websites. Imbari Coffee is not responsible for the content, policies, or practices of any third-party website.
            </li>
            <li>
              <strong>Limitation of Liability</strong><br />
              Imbari Coffee is not liable for: any damages resulting from use or inability to use the Site, errors or interruptions in service, inaccuracies in content, or unauthorized access to your data. To the maximum extent allowed by law, your use of the Site is at your own risk.
            </li>
            <li>
              <strong>Changes to These Terms</strong><br />
              Imbari Coffee reserves the right to update or revise these Terms of Use at any time. Continued use of the Site constitutes acceptance of the revised terms.
            </li>
            <li>
              <strong>Contact Information</strong><br />
              For questions about these Terms, please contact us at: <a href="mailto:info@imbaricoffee.com" className="text-emerald-300 hover:underline">info@imbaricoffee.com</a><br />Imbari Coffee – Africa’s Premium Coffee, Perfected.
            </li>
          </ol>
        </div>
        <hr className="my-8 border-emerald-900/30" />
        <h2 className="text-2xl font-bold text-emerald-200 mb-2">PRIVACY POLICY — IMBARI COFFEE</h2>
        <p className="text-xs text-imbari-coffee-brown mb-2">Last Updated: April 2025</p>
        <div className="space-y-4 text-sm text-imbari-very-dark-brown">
          <p>This Privacy Policy explains how Imbari Coffee (“we,” “our,” “us”) collects, uses, protects, and manages your information when you visit our website or communicate with us. Imbari Coffee is committed to transparency, respect, and safeguarding your privacy in compliance with international best practices.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Information We Collect</strong><br />
              <span className="font-semibold">a. Information You Provide Directly</span><br />Contact form submissions, Email communications, Order details (if applicable), Distributor or partnership inquiries.<br />
              <span className="font-semibold">b. Automated Information</span><br />Browser type, Device information, Pages visited, General site analytics.<br />No sensitive personal information is collected unless you voluntarily provide it.
            </li>
            <li>
              <strong>How We Use Your Information</strong><br />
              Your information is used solely for legitimate business purposes, including: Responding to inquiries, Processing orders (if applicable), Improving our website and customer experience, Providing distributor or partnership information, Communicating updates or confirmations. We do not sell, rent, or trade your personal information to third parties.
            </li>
            <li>
              <strong>Data Sharing</strong><br />
              We may share information only with trusted service providers who help us operate our website (e.g., hosting services or email systems). These providers are required to maintain confidentiality and adhere to data-protection standards. We do not share your data for advertising, marketing resale, or unrelated purposes.
            </li>
            <li>
              <strong>Data Security</strong><br />
              We employ industry-standard security measures to protect your data from unauthorized access, loss, or misuse. However, no online system can guarantee absolute security, and you agree to use the Site at your own risk.
            </li>
            <li>
              <strong>Cookies & Tracking</strong><br />
              We may use cookies or basic tracking tools to enhance your browsing experience and improve site performance. You may adjust your browser settings to block cookies if you prefer.
            </li>
            <li>
              <strong>Your Rights</strong><br />
              You may request at any time to: access your information, update or correct your information, request deletion of your information, ask how your data is used. Please contact us at <a href="mailto:info@imbaricoffee.com" className="text-emerald-300 hover:underline">info@imbaricoffee.com</a> for such requests.
            </li>
            <li>
              <strong>International Users</strong><br />
              Because Imbari Coffee serves Africa and global markets, your information may be processed in regions outside your country. By using the Site, you consent to international data transfer where necessary.
            </li>
            <li>
              <strong>Updates to This Privacy Policy</strong><br />
              We may revise this policy to reflect changes in our practices or regulatory requirements. Updated versions will be posted on this page with a new “Last Updated” date.
            </li>
            <li>
              <strong>Contact Information</strong><br />
              For privacy-related questions or requests, you may reach us at: <a href="mailto:info@imbaricoffee.com" className="text-emerald-300 hover:underline">info@imbaricoffee.com</a><br />Imbari Coffee – Africa’s Premium Coffee, Perfected.
            </li>
          </ol>
        </div>
      </section>
      <div className="text-center pt-6">
        <Link href="/" className="text-emerald-300 hover:underline text-sm">Back to Home</Link>
      </div>
    </main>
  );
}






