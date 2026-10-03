import { usePageMeta } from "@/hooks/usePageMeta";
import { notFoundMeta } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";

export function NotFound() {
  usePageMeta(notFoundMeta.title, notFoundMeta.description);
  return (
    <section className="light-field pad">
      <div className="wrap-tight text-center">
        <p className="eyebrow center">Error 404</p>
        <h1 className="display-lg mt-4">We could not find that page.</h1>
        <p className="lede mx-auto mt-5 max-w-[52ch]">
          The address may have been typed incorrectly, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/contact" variant="line">
            Contact the school
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
