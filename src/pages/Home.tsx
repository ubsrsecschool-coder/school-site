import { usePageMeta } from "@/hooks/usePageMeta";
import { routeMeta } from "@/lib/routes";

export function Home() {
  const meta = routeMeta("/");
  usePageMeta(meta?.title ?? "", meta?.description ?? "");
  return (
    <section className="light-field pad">
      <div className="wrap">
        <h1 className="display-xl">Shell check</h1>
      </div>
    </section>
  );
}
