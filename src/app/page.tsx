import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ApproachSection } from "@/components/sections/approach-section";
import { PresenceStrip } from "@/components/sections/presence-strip";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { ContactCta } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <ApproachSection />
      <PresenceStrip />
      <InsightsPreview />
      <ContactCta />
    </>
  );
}
