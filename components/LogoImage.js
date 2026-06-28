"use client";

import { useEffect, useState } from "react";

/**
 * Renders the logo PNG with its white background removed via Canvas API.
 * Uses a flood-fill from the image edges so only the background white is
 * removed — any white *inside* the logo (e.g. text) stays intact.
 */
export default function LogoImage({ alt = "Childers Lawn Care LLC", className, style }) {
  const [src, setSrc] = useState("/logo.png");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const W = img.naturalWidth;
      const H = img.naturalHeight;

      const canvas = document.createElement("canvas");
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, W, H);
      const d = imageData.data; // RGBA flat array

      // ── Flood-fill from every edge pixel that is "near white" ──
      // Threshold: all RGB channels > 210
      const THRESHOLD = 210;
      const isNearWhite = (pixelIdx) =>
        d[pixelIdx]     > THRESHOLD &&
        d[pixelIdx + 1] > THRESHOLD &&
        d[pixelIdx + 2] > THRESHOLD;

      const visited = new Uint8Array(W * H);
      const stack   = [];

      const seed = (i) => {
        if (!visited[i] && isNearWhite(i * 4)) {
          visited[i] = 1;
          stack.push(i);
        }
      };

      // Seed from all four edges
      for (let x = 0; x < W; x++) {
        seed(x);                    // top row
        seed((H - 1) * W + x);     // bottom row
      }
      for (let y = 0; y < H; y++) {
        seed(y * W);                // left column
        seed(y * W + W - 1);       // right column
      }

      // DFS flood fill — spread to near-white neighbours
      while (stack.length > 0) {
        const i = stack.pop();
        const x = i % W;
        const y = Math.floor(i / W);

        if (y > 0)     seed(i - W);   // up
        if (y < H - 1) seed(i + W);   // down
        if (x > 0)     seed(i - 1);   // left
        if (x < W - 1) seed(i + 1);   // right
      }

      // Make every visited (background) pixel fully transparent
      for (let i = 0; i < W * H; i++) {
        if (visited[i]) {
          d[i * 4 + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setSrc(canvas.toDataURL("image/png"));
    };

    img.src = "/logo.png";
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}
