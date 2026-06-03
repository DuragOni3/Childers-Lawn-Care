"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   GrassScene — Three.js 3-D grass hero
   - 60 k blades (desktop) / 20 k (mobile) via merged BufferGeometry
   - Per-blade vertex attributes: height along blade, blade root XZ
   - Vertex shader: rolling sine-wave wind + smooth mouse push
   - Fragment shader: dark-root → bright-tip colour gradient + edge AO
   - Raycasts mouse onto Y=0 plane so push tracks cursor in world space
───────────────────────────────────────────────────────────── */
export default function GrassScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let THREE, renderer, scene, camera, grassMesh, animId;
    const mouse3D = { x: 9999, z: 9999 };

    const init = async () => {
      THREE = await import("three");

      const W  = container.clientWidth;
      const H  = container.clientHeight;
      const mobile = W < 768;

      /* ── Renderer ───────────────────────────────────────────── */
      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x1b4f0e);
      Object.assign(renderer.domElement.style, {
        position: "absolute", top: "0", left: "0",
        width: "100%", height: "100%", display: "block",
      });
      container.appendChild(renderer.domElement);

      /* ── Scene ──────────────────────────────────────────────── */
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1b4f0e);
      scene.fog        = new THREE.FogExp2(0x1b4f0e, 0.038);

      /* ── Camera — elevated angle, looking slightly down ─────── */
      camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 80);
      camera.position.set(0, 8, 6);
      camera.lookAt(0, 0, -1);

      /* ── Lighting ───────────────────────────────────────────── */
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const sun = new THREE.DirectionalLight(0xfff5cc, 1.5);
      sun.position.set(5, 12, 8);
      scene.add(sun);
      // subtle fill from below to soften blade undersides
      const fill = new THREE.DirectionalLight(0x80ff60, 0.18);
      fill.position.set(0, -1, 0);
      scene.add(fill);

      /* ── Ground plane ───────────────────────────────────────── */
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50, 1, 1),
        new THREE.MeshLambertMaterial({ color: 0x1e5a10 }),
      );
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      /* ── Grass ──────────────────────────────────────────────── */
      const bladeCount = mobile ? 20000 : 65000;
      grassMesh = new THREE.Mesh(
        buildGrassGeo(THREE, bladeCount),
        buildGrassMat(THREE),
      );
      scene.add(grassMesh);

      /* ── Render loop ────────────────────────────────────────── */
      const clock = new THREE.Clock();
      const tick  = () => {
        animId = requestAnimationFrame(tick);
        grassMesh.material.uniforms.time.value = clock.getElapsedTime();
        grassMesh.material.uniforms.mousePos.value.set(mouse3D.x, mouse3D.z);
        renderer.render(scene, camera);
      };
      tick();

      /* ── Mouse → world-space raycasting ─────────────────────── */
      const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const raycaster   = new THREE.Raycaster();
      const ndcVec      = new THREE.Vector2();
      const hitPt       = new THREE.Vector3();

      const onMouseMove = (e) => {
        const r = container.getBoundingClientRect();
        ndcVec.set(
           ((e.clientX - r.left) / r.width)  * 2 - 1,
          -((e.clientY - r.top)  / r.height) * 2 + 1,
        );
        raycaster.setFromCamera(ndcVec, camera);
        if (raycaster.ray.intersectPlane(groundPlane, hitPt)) {
          mouse3D.x = hitPt.x;
          mouse3D.z = hitPt.z;
        }
      };
      const onMouseLeave = () => { mouse3D.x = 9999; mouse3D.z = 9999; };

      // Listen on the SECTION (parent of text/buttons) so mouse events from
      // overlaid content still reach the grass — container only catches
      // events directly on the canvas which sits beneath z-20 overlays.
      const section = container.closest("section") || container.parentElement;
      section.addEventListener("mousemove",  onMouseMove,  { passive: true });
      section.addEventListener("mouseleave", onMouseLeave);

      /* ── Resize handler ─────────────────────────────────────── */
      const onResize = () => {
        const W2 = container.clientWidth, H2 = container.clientHeight;
        camera.aspect = W2 / H2;
        camera.updateProjectionMatrix();
        renderer.setSize(W2, H2);
      };
      window.addEventListener("resize", onResize);

      return () => {
        section.removeEventListener("mousemove",  onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", onResize);
      };
    };

    let evtCleanup;
    init().then(fn => { evtCleanup = fn; });

    return () => {
      cancelAnimationFrame(animId);
      evtCleanup?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.parentNode?.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   buildGrassGeo
   Creates a merged BufferGeometry with `count` individual blades.
   Each blade is a tapered quad strip with SEGS segments.
   Per-vertex attributes:
     height    (float) – 0 at root, 1 at tip (drives wind & colour)
     bladeRoot (vec2)  – world XZ of blade base (drives mouse push)
───────────────────────────────────────────────────────────── */
function buildGrassGeo(THREE, count) {
  const SEGS   = 5;                     // segments per blade
  const VPB    = (SEGS + 1) * 2;       // vertices per blade
  const IPB    = SEGS * 6;              // indices per blade

  const positions = new Float32Array(count * VPB * 3);
  const uvCoords  = new Float32Array(count * VPB * 2);
  const heights   = new Float32Array(count * VPB);
  const bladeRoots= new Float32Array(count * VPB * 2);
  const indices   = new Uint32Array (count * IPB);

  const FIELD_R   = 22;   // field half-size — large enough to fill all camera frustum corners
  const H_MIN     = 0.38;
  const H_MAX     = 0.82;
  const W_BASE    = 0.030;

  for (let i = 0; i < count; i++) {
    const vBase = i * VPB;
    const iBase = i * IPB;

    // Random blade placement & shape
    const rootX  = (Math.random() - 0.5) * FIELD_R * 2;
    const rootZ  = (Math.random() - 0.5) * FIELD_R * 2;
    const bladeH = H_MIN + Math.random() * (H_MAX - H_MIN);
    const bladeW = W_BASE * (0.65 + Math.random() * 0.7);
    const yRot   = Math.random() * Math.PI * 2;
    const lean   = (Math.random() - 0.5) * 0.35;   // sideways lean

    const cosY = Math.cos(yRot);
    const sinY = Math.sin(yRot);

    for (let s = 0; s <= SEGS; s++) {
      const t      = s / SEGS;
      const curW   = bladeW * (1.0 - t * 0.92);   // taper
      const curH   = bladeH * t;
      const leanOff= lean   * t * t;              // lean increases toward tip

      // Local blade coords, then rotate by yRot
      const lLoc = -curW;
      const rLoc =  curW;

      // Left vertex
      const lx = rootX + cosY * lLoc - sinY * leanOff;
      const lz = rootZ + sinY * lLoc + cosY * leanOff;
      // Right vertex
      const rx = rootX + cosY * rLoc - sinY * leanOff;
      const rz = rootZ + sinY * rLoc + cosY * leanOff;

      // Write positions
      const vi = (vBase + s * 2) * 3;
      positions[vi + 0] = lx;   positions[vi + 1] = curH; positions[vi + 2] = lz;
      positions[vi + 3] = rx;   positions[vi + 4] = curH; positions[vi + 5] = rz;

      // UVs
      const ui = (vBase + s * 2) * 2;
      uvCoords[ui + 0] = 0; uvCoords[ui + 1] = t;
      uvCoords[ui + 2] = 1; uvCoords[ui + 3] = t;

      // Height attribute
      heights[vBase + s * 2    ] = t;
      heights[vBase + s * 2 + 1] = t;

      // Blade root (constant per blade, used in shader for mouse dist)
      const ri = (vBase + s * 2) * 2;
      bladeRoots[ri + 0] = rootX; bladeRoots[ri + 1] = rootZ;
      bladeRoots[ri + 2] = rootX; bladeRoots[ri + 3] = rootZ;
    }

    // Quad indices for each segment
    for (let s = 0; s < SEGS; s++) {
      const a = vBase + s * 2;
      indices[iBase + s * 6 + 0] = a + 0;
      indices[iBase + s * 6 + 1] = a + 2;
      indices[iBase + s * 6 + 2] = a + 1;
      indices[iBase + s * 6 + 3] = a + 1;
      indices[iBase + s * 6 + 4] = a + 2;
      indices[iBase + s * 6 + 5] = a + 3;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position",  new THREE.BufferAttribute(positions,  3));
  geo.setAttribute("uv",        new THREE.BufferAttribute(uvCoords,   2));
  geo.setAttribute("height",    new THREE.BufferAttribute(heights,    1));
  geo.setAttribute("bladeRoot", new THREE.BufferAttribute(bladeRoots, 2));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  geo.computeVertexNormals();
  return geo;
}

/* ─────────────────────────────────────────────────────────────
   buildGrassMat — custom ShaderMaterial
───────────────────────────────────────────────────────────── */
function buildGrassMat(THREE) {
  return new THREE.ShaderMaterial({
    uniforms: {
      time:     { value: 0.0 },
      mousePos: { value: new THREE.Vector2(9999, 9999) },
    },

    /* ── Vertex shader ───────────────────────────────────────── */
    vertexShader: /* glsl */`
      uniform float time;
      uniform vec2  mousePos;

      attribute float height;
      attribute vec2  bladeRoot;

      varying float vHeight;
      varying vec2  vUv;

      /* 2-D value noise — looks more organic than pure sin/cos */
      float hash21(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }
      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f*f*(3.0 - 2.0*f);           // smoothstep
        return mix(
          mix(hash21(i),            hash21(i + vec2(1,0)), f.x),
          mix(hash21(i + vec2(0,1)),hash21(i + vec2(1,1)), f.x),
          f.y
        );
      }

      void main() {
        vUv     = uv;
        vHeight = height;

        vec3 pos  = position;
        float h2  = height * height;     // quadratic — base stays still

        /* ── Wind ─────────────────────────────────────────────
           Two noise layers at different frequencies/speeds give
           a natural rolling-wave feel.                          */
        vec2 windUV1 = bladeRoot * 0.30 + vec2(time * 0.55, time * 0.35);
        vec2 windUV2 = bladeRoot * 0.65 + vec2(time * 0.90, time * 0.60);
        float w1 = (vnoise(windUV1) - 0.5) * 2.0;  // -1..1
        float w2 = (vnoise(windUV2) - 0.5) * 2.0;
        float wind = w1 * 0.22 + w2 * 0.10;

        pos.x += wind * h2;
        pos.z += wind * 0.45 * h2;

        /* ── Mouse push ───────────────────────────────────────
           Distance from blade root to mouse in world XZ.
           Push is radial, falls off with distance, strongest
           at tip (h2).                                          */
        vec2  toMouse = bladeRoot - mousePos;
        float dist    = length(toMouse);
        float RADIUS  = 2.6;
        float push    = max(0.0, 1.0 - dist / RADIUS);
        push = push * push * 1.6;        // sharpen falloff

        vec2  pushDir = dist > 0.001
          ? normalize(toMouse)
          : vec2(0.0, 1.0);

        pos.x += pushDir.x * push * h2;
        pos.z += pushDir.y * push * h2;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,

    /* ── Fragment shader ─────────────────────────────────────── */
    fragmentShader: /* glsl */`
      varying float vHeight;
      varying vec2  vUv;

      void main() {
        /* Root → mid → tip colour ramp */
        vec3 rootCol = vec3(0.05, 0.22, 0.03);
        vec3 midCol  = vec3(0.14, 0.48, 0.07);
        vec3 tipCol  = vec3(0.36, 0.72, 0.10);

        vec3 col = mix(rootCol, midCol, smoothstep(0.0,  0.45, vHeight));
             col = mix(col,     tipCol, smoothstep(0.38, 1.00, vHeight));

        /* Edge ambient-occlusion: darken near left/right edges */
        float edgeDist = abs(vUv.x - 0.5) * 2.0;  // 0 centre, 1 edge
        float ao       = 1.0 - 0.28 * edgeDist * edgeDist;

        /* Very slight specular highlight on upper-facing tip */
        float spec = pow(max(0.0, vHeight - 0.7), 3.0) * 0.18;

        gl_FragColor = vec4(col * ao + spec, 1.0);
      }
    `,

    side: THREE.DoubleSide,
  });
}
