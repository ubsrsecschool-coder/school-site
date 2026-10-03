import { school } from "@/lib/school";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactDetails } from "./ContactDetails";
import { MapEmbed } from "./MapEmbed";

export function LocationContact() {
  return (
    <section className="pad" id="contact">
      <div className="wrap">
        <div className="max-w-[660px]">
          <Reveal as="span" className="inline-block">
            <Eyebrow>Visit Us</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={1} className="display-lg mt-4">
            {school.location.locality}, {school.location.city}.
          </Reveal>
        </div>
        <div className="mt-11 grid items-stretch gap-9 min-[1081px]:grid-cols-[1.1fr_.9fr] min-[1081px]:gap-[clamp(36px,4.6vw,70px)]">
          <Reveal>
            <MapEmbed />
          </Reveal>
          <ContactDetails />
        </div>
      </div>
    </section>
  );
}
