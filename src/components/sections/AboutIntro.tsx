import { school } from "@/lib/school";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { Reveal } from "@/components/ui/Reveal";

export function AboutIntro() {
  return (
    <section className="pad" id="about">
      <div className="wrap-tight text-center">
        <Reveal as="span" className="inline-block">
          <Eyebrow center>Our Story</Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={1} className="display-lg mt-4">
          A neighbourhood school, teaching since {school.established}.
        </Reveal>
        <Reveal as="p" delay={2} className="lede mx-auto mt-[22px] max-w-[62ch]">
          {school.name} has served families in {school.location.locality}, {school.location.city} since{" "}
          {school.established}. We teach in English, follow the CBSE-pattern curriculum under HBSE affiliation, and
          take students from their first day in Nursery through to Class XII.
        </Reveal>
        <Reveal delay={3} className="mt-[26px]">
          <LinkArrow to="/about">Read our full story</LinkArrow>
        </Reveal>
      </div>
    </section>
  );
}
