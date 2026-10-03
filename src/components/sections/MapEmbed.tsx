import { useState } from "react";
import { addressLine, mapEmbedUrl, mapSearchUrl } from "@/lib/school";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Map showing ${addressLine}`}
        src={mapEmbedUrl}
        className="h-full min-h-[400px] w-full rounded-lg border border-line"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="frame sq flex min-h-[400px] flex-col items-center justify-center gap-5 p-8 text-center">
      <span className="frame-ring" aria-hidden="true" />
      <Icon name="pin" strokeWidth={1.2} className="relative z-[2] h-[68px] w-[68px] text-brass-light/60" />
      <div className="relative z-[2]">
        <p className="font-display text-xl font-semibold text-white">{addressLine}</p>
        <p className="mx-auto mt-2 max-w-[34ch] text-[13px] leading-normal text-white/70">
          The map loads from Google only when you choose to show it.
        </p>
      </div>
      <div className="relative z-[2] flex flex-wrap justify-center gap-2.5">
        <Button variant="brass" size="sm" onClick={() => setLoaded(true)}>
          Show map here
        </Button>
        <ButtonLink href={mapSearchUrl} variant="ghost" size="sm">
          Open in Google Maps
        </ButtonLink>
      </div>
    </div>
  );
}
