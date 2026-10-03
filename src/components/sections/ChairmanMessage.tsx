import { school } from "@/lib/school";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";

export function ChairmanMessage() {
  return (
    <section className="pad border-y border-line bg-paper">
      <div className="wrap grid items-center gap-9 min-[1081px]:grid-cols-[.78fr_1.22fr] min-[1081px]:gap-[clamp(36px,5vw,76px)]">
        <Reveal className="max-w-[340px] min-[1081px]:max-w-none">
          <Frame glyph="RC" caption="Formal portrait required" className="aspect-[3/4]" />
        </Reveal>
        <div>
          <Reveal as="span" className="inline-block">
            <Eyebrow>From the Chairman</Eyebrow>
          </Reveal>
          <Reveal as="blockquote" delay={1} className="m-0 mt-[22px]">
            <span className="mb-3 block font-display text-[64px] leading-[.6] text-brass" aria-hidden="true">
              &ldquo;
            </span>
            <p className="font-display text-[clamp(21px,2.3vw,30px)] font-normal leading-[1.42] tracking-[-.012em] text-green">
              A message from the Chairman will appear here.
              <em className="mt-3.5 block font-body text-[.6em] not-italic leading-normal text-muted">
                The school has not supplied the message yet.
              </em>
            </p>
          </Reveal>
          <Reveal delay={2} className="mt-[30px] border-t border-line pt-6">
            <b className="block text-[15.5px] font-bold text-text">{school.chairman.name}</b>
            <span className="mt-px block text-[13px] text-muted">{school.chairman.title}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
