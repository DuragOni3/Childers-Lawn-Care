"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Facebook Page Plugin.
 * Renders at PLUGIN_MAX (500 px) then CSS-scales to fill the parent
 * container in both width and height. The parent controls size via CSS
 * (e.g. Tailwind responsive height classes on the wrapper in contact/page.js).
 */
const PLUGIN_MAX = 500;

export default function FacebookFeed({ pageUrl }) {
  const containerRef = useRef(null);
  const [boxWidth,  setBoxWidth]  = useState(0);
  const [boxHeight, setBoxHeight] = useState(400);
  const [sdkReady,  setSdkReady]  = useState(false);

  /* ── Measure container on mount and every resize ── */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setBoxWidth(containerRef.current.offsetWidth);
        const h = containerRef.current.offsetHeight;
        if (h > 0) setBoxHeight(h);
      }
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

  /* ── Re-parse when SDK ready + dimensions change ── */
  useEffect(() => {
    if (sdkReady && boxWidth > 0 && window.FB && containerRef.current) {
      window.FB.XFBML.parse(containerRef.current);
    }
  }, [sdkReady, boxWidth, boxHeight]);

  const scale        = boxWidth > 0 ? boxWidth / PLUGIN_MAX : 1;
  const pluginHeight = Math.round(boxHeight / scale);

  return (
    /* Fills 100% of parent — parent's CSS classes control the height */
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      {boxWidth > 0 && (
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
