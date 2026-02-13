import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Flip Beetle",
  description: "Our commitment to protecting your privacy and data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-theme-cream)] pt-32 pb-16 px-4 sm:px-6 md:px-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[var(--color-primary)] font-[var(--font-inter-tight)]">
          Privacy Policy
        </h1>

        <p className="text-lg riposte mb-8 text-[var(--color-primary)]/80">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-8 text-[var(--color-primary)] riposte text-lg leading-relaxed">
          {/* Introduction */}
          <section>
            <p>
              At Flip Beetle, we take your privacy seriously. This policy explains what information we collect,
              how we use it, and your rights regarding your data. If you have questions, reach out—we're here to help.
            </p>
          </section>

          {/* What We Collect */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              What Information We Collect
            </h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6 font-[var(--font-inter-tight)]">
              Information You Give Us
            </h3>
            <p className="mb-4">
              When you reach out through our contact form, email us, or work with us on a project, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your name and email address</li>
              <li>Any information you include in your messages</li>
              <li>Project details and requirements you share</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6 font-[var(--font-inter-tight)]">
              Information We Collect Automatically
            </h3>
            <p className="mb-4">
              Like most websites, we collect some data automatically when you visit:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address (anonymized)</li>
              <li>Pages you visit and how long you stay</li>
              <li>Referring website</li>
            </ul>
          </section>

          {/* How We Use It */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Deliver the services you've requested</li>
              <li>Send project updates and important communications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We don't sell your data. We don't share it with advertisers. We use it to do our job and nothing else.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              Cookies and Tracking
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience and understand how our site is used.
              This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Essential cookies:</strong> Required for the site to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (via Google Analytics or similar)</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p>
              You can disable cookies in your browser settings, but some features of our site may not work properly if you do.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              Third-Party Services
            </h2>
            <p className="mb-4">
              We use trusted third-party services to help run our business:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Hosting:</strong> Vercel (for website hosting)</li>
              <li><strong>Analytics:</strong> Google Analytics (to understand site usage)</li>
              <li><strong>Email:</strong> Email service providers for communication</li>
              <li><strong>Payments:</strong> Stripe or PayPal (for secure payment processing)</li>
            </ul>
            <p>
              These services have their own privacy policies. We choose partners who respect your privacy,
              but we encourage you to review their policies as well.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              How We Protect Your Data
            </h2>
            <p>
              We take reasonable measures to protect your information from unauthorized access, loss, or misuse.
              This includes encryption, secure servers, and limiting access to your data to only those who need it.
              That said, no method of transmission over the internet is 100% secure, and we can't guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request that we delete your personal data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails (though we don't send many)</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p>
              To exercise any of these rights, just email us. We'll respond promptly.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              Children's Privacy
            </h2>
            <p>
              Our services are not directed to anyone under 18. We don't knowingly collect information from children.
              If we discover we've inadvertently collected such data, we'll delete it immediately.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. When we do, we'll update the "Last updated"
              date at the top of this page. If we make significant changes, we'll let you know via email or
              a notice on our website.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-3xl font-bold mb-4 font-[var(--font-inter-tight)]">
              Questions?
            </h2>
            <p>
              If you have questions about this privacy policy or how we handle your data, reach out:
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@flipbeetle.com"
                className="text-[var(--color-secondary)] hover:opacity-80 transition-opacity"
              >
                privacy@flipbeetle.com
              </a>
            </p>
            <p className="mt-2">
              We're real people, and we'll get back to you.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
