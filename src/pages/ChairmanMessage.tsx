import { useRouteMeta } from "@/hooks/usePageMeta";
import { school } from "@/lib/school";
import { Frame } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNote } from "@/components/ui/PendingNote";

export function ChairmanMessage() {
  useRouteMeta("/about/chairman-message");
  return (
    <>
      <PageHero
        eyebrow="From the Chairman"
        title="A message from the Chairman."
        crumbs={[{ label: "About", to: "/about" }, { label: "Message from the Chairman" }]}
      />
      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap grid items-start gap-10 min-[1081px]:grid-cols-[.6fr_1.4fr]">
          <Frame glyph="RC" caption="Formal portrait required" className="aspect-[3/4] max-w-[320px]" />
          <div>
            <h2 className="text-2xl">{school.chairman.name}</h2>
            <p className="mt-1 text-[15px] font-semibold text-stone">{school.chairman.title}</p>
            <PendingNote className="mt-6">
              The Chairman&rsquo;s message and a formal portrait have not been supplied by the school yet.
            </PendingNote>
          </div>
        </div>
      </section>
    </>
  );
}
