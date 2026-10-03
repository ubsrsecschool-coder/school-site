import { useEffect } from "react";
import { routeMeta } from "@/lib/routes";

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
  }, [title, description]);
}

export function useRouteMeta(path: string) {
  const meta = routeMeta(path);
  usePageMeta(meta?.title ?? "", meta?.description ?? "");
  return meta;
}
