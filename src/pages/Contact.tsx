import { useRouteMeta } from "@/hooks/usePageMeta";
import { addressLine, school } from "@/lib/school";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  useRouteMeta("/contact");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Visit or call the school office."
        lede={`${school.name}, ${addressLine}.`}
        crumbs={[{ label: "Contact" }]}
      />
      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap grid items-stretch gap-9 min-[1081px]:grid-cols-[1.1fr_.9fr] min-[1081px]:gap-[clamp(36px,4.6vw,70px)]">
          <Reveal>
            <MapEmbed />
          </Reveal>
          <ContactDetails />
        </div>
      </section>
    </>
  );
}
