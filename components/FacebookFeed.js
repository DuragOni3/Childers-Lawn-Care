"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Facebook Page Plugin.
 * The plugin's hard max is 500 px wide. If the container is wider we
 * scale the plugin up with CSS transform so it always fills edge-to-edge.
 * The outer div clips to the desired height so nothing overflows.
 */
const PLUGIN_MAX = 500;

export default function FacebookFeed({ pageUrl, height = 560 }) {
  const containerRef = useRef(null);
  const [boxWidth,  setBoxWidth]  = useState(0);
  const [sdkReady,  setSdkReady]  = useState(false);

  /* ── Measure container (and re-measure on resize) ── */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setBoxWidth(containerRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Load FB SDK once ── */
  useEffect(() => {
    if (!document.getElementById("fb-root")) {
      const d = document.createElement("div");
      d.id = "fb-root";
      document.body.prepend(d);
    }
    if (window.FB) { setSdkReady(true); return; }

    window.fbAsyncInit = () => {
      window.FB.init({ xfbml: false, version: "v19.0" });
      setSdkReady(true);
    };
    if (!document.querySelector('script[src*="connect.facebook.net"]')) {
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/sdk.js";
      s.async = true; s.defer = true; s.crossOrigin = "anonymous";
      document.body.appendChild(s);
    }
  }, []);

  /* ── Re-parse when SDK ready + width known ── */
  useEffect(() => {
    if (sdkReady && boxWidth > 0 && window.FB && containerRef.current) {
      window.FB.XFBML.parse(containerRef.current);
    }
  }, [sdkReady, boxWidth]);

  /* ── Scale maths ─────────────────────────────────────────────
     Render the plugin at PLUGIN_MAX (500 px) then scale it up so
     it fills the full container width.  The outer wrapper clips to
     the desired height so the extra scaled pixels are hidden.
  ──────────────────────────────────────────────────────────── */
  const scale        = boxWidth > 0 ? boxWidth / PLUGIN_MAX : 1;
  const pluginHeight = Math.round(height / scale); // pre-scale height

  return (
    /* Outer: clips to the card height, hides overflow */
    <div
      ref={containerRef}
      style={{ width: "100%", height: `${height}px`, overflow: "hidden" }}
    >
      {boxWidth > 0 && (
        /* Inner: rendered at 500 px, then scaled up to fill */
        <div
          style={{
            width: `${PLUGIN_MAX}px`,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="fb-page"
            data-href={pageUrl}
            data-tabs="timeline"
            data-width={String(PLUGIN_MAX)}
            data-height={String(pluginHeight)}
            data-small-header="true"
            data-adapt-container-width="false"
            data-hide-cover="false"
            data-show-facepile="false"
          />
        </div>
      )}
    </div>
  );
}
