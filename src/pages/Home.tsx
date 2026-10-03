import { usePageMeta } from "@/hooks/usePageMeta";
import { routeMeta } from "@/lib/routes";
import { Hero } from "@/components/sections/Hero";
import { QuickFacts } from "@/components/sections/QuickFacts";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ChairmanMessage } from "@/components/sections/ChairmanMessage";
import { ResultsBand } from "@/components/sections/ResultsBand";
import { CampusGrid } from "@/components/sections/CampusGrid";
import { AdmissionsSection } from "@/components/sections/AdmissionsSection";
import { NoticeBoard } from "@/components/sections/NoticeBoard";
import { LocationContact } from "@/components/sections/LocationContact";

export function Home() {
  const meta = routeMeta("/");
  usePageMeta(meta?.title ?? "", meta?.description ?? "");
  return (
    <>
      <Hero />
      <QuickFacts />
      <AboutIntro />
      <ChairmanMessage />
      <ResultsBand />
      <CampusGrid />
      <AdmissionsSection />
      <NoticeBoard />
      <LocationContact />
    </>
  );
}
