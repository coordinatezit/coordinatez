import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Coordinatez collects, uses, and protects personal information submitted through coordinatez.com — including contact and career forms, analytics, anti-spam protection, data retention, and your rights.",
  path: "/privacy-policy",
  noIndex: false,
});

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.75rem] h-px w-4 shrink-0 bg-brand-sky" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  const contactEmail = siteConfig.email.contact;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
          ]),
        ]}
      />

      <div className="section-y">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Heading */}
            <div className="flex items-center gap-3">
              <p className="eyebrow">Legal</p>
              <span aria-hidden className="h-px max-w-24 flex-1 bg-border" />
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-medium leading-[1.1] sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Last updated: July 22, 2026
            </p>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              This Privacy Policy explains how {siteConfig.name} (&ldquo;{siteConfig.name}
              ,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
              and protects personal information when you visit coordinatez.com (the
              &ldquo;Site&rdquo;) or communicate with us through it. By using the Site, you agree
              to the practices described here.
            </p>

            <PolicySection title="1. Information we collect">
              <p>
                We collect information you choose to give us. When you submit our contact form,
                this may include your name, company, email address, phone number, country, and
                the message you write. When you submit our careers form, this may additionally
                include the position you are interested in and the resume file you upload.
              </p>
              <p>
                Like most websites, the Site may also automatically receive limited technical
                information — such as browser type, device type, and pages visited — through the
                optional analytics services described below, where those services are enabled and
                consented to.
              </p>
            </PolicySection>

            <PolicySection title="2. How we use your information">
              <PolicyList
                items={[
                  "To respond to your inquiries and provide information about our technology services.",
                  "To evaluate career applications and contact you about current or future opportunities.",
                  "To operate, secure, and improve the Site.",
                  "To comply with legal obligations where applicable.",
                ]}
              />
              <p>
                We do not sell, rent, or trade your personal information to third parties.
              </p>
            </PolicySection>

            <PolicySection title="3. How form submissions are delivered">
              <p>
                When you submit a form on the Site, your submission is delivered to our team by
                email through a third-party SMTP (email delivery) provider. The provider processes
                the submission solely to transmit it to us and is not permitted to use it for its
                own purposes.
              </p>
            </PolicySection>

            <PolicySection title="4. Analytics and marketing tags">
              <p>
                The Site may use optional analytics and marketing tools — Google Analytics 4,
                Microsoft Clarity, and Meta and LinkedIn tags — to understand how visitors use the
                Site and to measure the effectiveness of our outreach. These tools are loaded only
                when they are enabled for the Site, and where a cookie-consent mechanism is
                presented, your consent choices are honored before any non-essential cookies or
                tracking are activated.
              </p>
              <p>
                Each of these providers processes data under its own privacy policy. You can
                manage or withdraw cookie consent at any time through your browser settings or the
                Site&apos;s consent controls where available.
              </p>
            </PolicySection>

            <PolicySection title="5. Anti-spam protection">
              <p>
                Our forms are protected by Cloudflare Turnstile, an anti-spam verification
                service. Turnstile may process limited technical signals from your browser to
                distinguish genuine visitors from automated abuse. This processing is governed by
                Cloudflare&apos;s privacy policy.
              </p>
            </PolicySection>

            <PolicySection title="6. Data retention">
              <p>
                We retain contact inquiries for as long as needed to respond to and follow up on
                the inquiry, and career applications (including resumes) for as long as reasonably
                needed to consider you for current or future roles. You may request deletion of
                your information at any time as described under &ldquo;Your rights&rdquo; below.
              </p>
            </PolicySection>

            <PolicySection title="7. Your rights">
              <p>
                Depending on your location, you may have rights to access, correct, or delete the
                personal information we hold about you, and to object to or restrict certain
                processing. To exercise any of these rights, email us at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>{" "}
                and we will respond within a reasonable timeframe.
              </p>
            </PolicySection>

            <PolicySection title="8. International data transfers">
              <p>
                {siteConfig.name} operates from the United States (Chicago, Illinois) and India
                (Mehsana, Gujarat). Information you submit may be accessed and processed by our
                teams in either country. Wherever your information is processed, we apply the
                protections described in this policy.
              </p>
            </PolicySection>

            <PolicySection title="9. Security">
              <p>
                We use reasonable technical and organizational measures to protect the information
                you send us, including transport encryption on the Site. No method of transmission
                or storage is completely secure, however, and we cannot guarantee absolute
                security.
              </p>
            </PolicySection>

            <PolicySection title="10. Children's privacy">
              <p>
                The Site is intended for business audiences and is not directed to children under
                the age of 13 (or the equivalent minimum age in your jurisdiction). We do not
                knowingly collect personal information from children. If you believe a child has
                provided us information, contact us and we will delete it.
              </p>
            </PolicySection>

            <PolicySection title="11. Third-party links">
              <p>
                The Site may link to external websites we do not operate. We are not responsible
                for the privacy practices of those sites, and we encourage you to review their
                policies.
              </p>
            </PolicySection>

            <PolicySection title="12. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last
                updated&rdquo; date at the top of this page reflects the most recent revision.
                Material changes will be reflected on this page; continued use of the Site after
                changes take effect constitutes acceptance of the revised policy.
              </p>
            </PolicySection>

            <PolicySection title="13. Contact us">
              <p>
                Questions about this policy or our data practices can be sent to{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>
                , or by mail to {siteConfig.name},{" "}
                {siteConfig.locations.headquarters.addressLines.join(", ")}.
              </p>
              <p>
                See also our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </PolicySection>
          </div>
        </Container>
      </div>
    </>
  );
}
