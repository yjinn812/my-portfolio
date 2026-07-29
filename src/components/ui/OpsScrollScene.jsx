import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import "./OpsScrollScene.css";

/** Parametric point on a Möbius strip (Stark / Endgame style band). */
function mobiusPoint(u, v, radius, halfWidth) {
  const cosHalf = Math.cos(u * 0.5);
  const sinHalf = Math.sin(u * 0.5);
  const stretch = radius + v * halfWidth * cosHalf;
  return new THREE.Vector3(
    stretch * Math.cos(u),
    v * halfWidth * sinHalf * 1.15,
    stretch * Math.sin(u)
  );
}

function createMobiusGeometry(radius, halfWidth, uSeg, vSeg) {
  const positions = [];
  const indices = [];
  const uCount = uSeg + 1;
  const vCount = vSeg + 1;

  for (let i = 0; i < uCount; i += 1) {
    const u = (i / uSeg) * Math.PI * 2;
    for (let j = 0; j < vCount; j += 1) {
      const v = (j / vSeg) * 2 - 1;
      const p = mobiusPoint(u, v, radius, halfWidth);
      positions.push(p.x, p.y, p.z);
    }
  }

  for (let i = 0; i < uSeg; i += 1) {
    for (let j = 0; j < vSeg; j += 1) {
      const a = i * vCount + j;
      const b = (i + 1) * vCount + j;
      const c = i * vCount + (j + 1);
      const d = (i + 1) * vCount + (j + 1);
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createEdgeCurve(radius, halfWidth, v, samples) {
  const points = [];
  for (let i = 0; i <= samples; i += 1) {
    const u = (i / samples) * Math.PI * 2;
    points.push(mobiusPoint(u, v, radius, halfWidth));
  }
  return new THREE.CatmullRomCurve3(points, true);
}

function createGuideRings(radius, halfWidth, count, samples) {
  const group = new THREE.Group();
  for (let i = 0; i < count; i += 1) {
    const v = (i / (count - 1)) * 2 - 1;
    const curve = createEdgeCurve(radius, halfWidth, v, samples);
    const geo = new THREE.TubeGeometry(curve, samples, 0.012, 5, true);
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: i === 0 || i === count - 1 ? 0xffb347 : 0xff6b35,
        transparent: true,
        opacity: i === 0 || i === count - 1 ? 0.45 : 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    group.add(mesh);
  }
  return group;
}

/**
 * Endgame / Stark-lab Möbius hologram — translucent amber band, edge glow, bloom.
 * Night Ops void + ember signal (Stark orange) with cyan particle dust.
 */
export default function OpsScrollScene() {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = mobile ? 160 : 380;
    const dprCap = mobile ? 1 : 1.25;
    const uSeg = mobile ? 72 : 140;
    const vSeg = mobile ? 8 : 14;
    const useBloom = !mobile;
    const R = 2.55;
    const W = 0.72;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080c10, 0.038);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0.6, 1.4, 9.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.78;

    let composer = null;
    let bloom = null;
    if (useBloom) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.32,
        0.4,
        0.35
      );
      composer.addPass(bloom);
    }

    scene.add(new THREE.AmbientLight(0x1a2230, 0.7));

    const amberKey = new THREE.PointLight(0xff9a3c, 1.2, 48);
    amberKey.position.set(4, 3, 5);
    scene.add(amberKey);

    const cyanFill = new THREE.PointLight(0x00d4ff, 0.35, 36);
    cyanFill.position.set(-5, -1, 4);
    scene.add(cyanFill);

    const hologram = new THREE.Group();
    scene.add(hologram);

    const bandGeo = createMobiusGeometry(R, W, uSeg, vSeg);

    // Translucent holographic membrane (Stark glass)
    const membrane = new THREE.Mesh(
      bandGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0xc45f28,
        emissive: 0xff6b35,
        emissiveIntensity: 0.12,
        metalness: 0.05,
        roughness: 0.35,
        transmission: 0.25,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    hologram.add(membrane);

    // Wire lattice — HUD construction lines
    const lattice = new THREE.Mesh(
      bandGeo.clone(),
      new THREE.MeshBasicMaterial({
        color: 0xd4894a,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    hologram.add(lattice);

    // Concentric guide rings + bright lip edges
    const guides = createGuideRings(R, W, mobile ? 5 : 7, mobile ? 100 : 180);
    hologram.add(guides);

    // Outer lip — hottest glow (Tony’s bright edge)
    const outerCurve = createEdgeCurve(R, W, 1, mobile ? 140 : 240);
    const outerLip = new THREE.Mesh(
      new THREE.TubeGeometry(outerCurve, mobile ? 140 : 240, 0.03, 8, true),
      new THREE.MeshBasicMaterial({
        color: 0xe8a060,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    hologram.add(outerLip);

    const innerCurve = createEdgeCurve(R, W, -1, mobile ? 140 : 240);
    const innerLip = new THREE.Mesh(
      new THREE.TubeGeometry(innerCurve, mobile ? 140 : 240, 0.024, 8, true),
      new THREE.MeshBasicMaterial({
        color: 0xd4783c,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    hologram.add(innerLip);

    // Floating measurement ticks along the strip (lab hologram detail)
    const tickCount = mobile ? 24 : 48;
    const tickGeo = new THREE.BoxGeometry(0.012, 0.14, 0.012);
    const tickMat = new THREE.MeshBasicMaterial({
      color: 0xc48a55,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ticks = new THREE.Group();
    for (let i = 0; i < tickCount; i += 1) {
      const u = (i / tickCount) * Math.PI * 2;
      const p = mobiusPoint(u, 0, R, W);
      const tick = new THREE.Mesh(tickGeo, tickMat);
      tick.position.copy(p);
      tick.lookAt(0, 0, 0);
      ticks.add(tick);
    }
    hologram.add(ticks);

    hologram.rotation.x = 0.65;
    hologram.rotation.z = -0.15;
    hologram.scale.setScalar(1.05);

    // Dust / signal particles
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0xb87a45,
        size: mobile ? 0.018 : 0.022,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(particles);

    let target = { p: 0 };
    let current = { p: 0 };
    let projectsTarget = 0;
    let projectsCurrent = 0;
    let running = true;
    let raf = 0;
    let lastFrame = 0;
    let scrollBoostUntil = 0;

    const readProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      target.p = Math.min(1, Math.max(0, window.scrollY / max));
    };

    const onScroll = () => {
      readProgress();
      scrollBoostUntil = performance.now() + 180;
    };

    const onProjectsProgress = (event) => {
      const next = Number(event?.detail?.p);
      projectsTarget = Number.isFinite(next) ? Math.min(1, Math.max(0, next)) : 0;
      scrollBoostUntil = performance.now() + 180;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
      renderer.setSize(w, h);
      composer?.setSize(w, h);
      bloom?.setSize(w, h);
      readProgress();
    };

    const kick = () => {
      if (!running || raf) return;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) kick();
    };

    /** About → contact: keep strip on, drop bloom/particles for FPS. */
    let lowPower = false;
    const lowerVisible = { about: false, skills: false, contact: false };
    const sectionIo =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const id = entry.target.id;
                if (id in lowerVisible) {
                  lowerVisible[id] = entry.isIntersecting;
                }
              }
              lowPower = Object.values(lowerVisible).some(Boolean);
              kick();
            },
            { rootMargin: "10% 0px", threshold: [0, 0.12] }
          )
        : null;

    for (const id of Object.keys(lowerVisible)) {
      const el = document.getElementById(id);
      if (el) sectionIo?.observe(el);
    }

    const tick = (t) => {
      raf = 0;
      if (!running) return;

      const settling =
        Math.abs(target.p - current.p) > 0.0008 ||
        Math.abs(projectsTarget - projectsCurrent) > 0.0008;
      const boosted = t < scrollBoostUntil;
      const idleFps = lowPower ? 24 : 30;
      const minDelta =
        settling || boosted ? (lowPower ? 1000 / 30 : 1000 / 60) : 1000 / idleFps;
      if (t - lastFrame < minDelta) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = t;
      raf = requestAnimationFrame(tick);

      current.p += (target.p - current.p) * 0.075;
      projectsCurrent += (projectsTarget - projectsCurrent) * 0.09;
      const p = current.p;
      const pp = projectsCurrent;
      const time = t * 0.001;

      hologram.rotation.y = time * 0.28 + p * Math.PI * 1.15 + pp * Math.PI * 0.55;
      hologram.rotation.x = 0.65 + Math.sin(time * 0.4) * 0.08 + p * 0.4 + pp * 0.22;
      hologram.rotation.z = -0.15 + Math.sin(time * 0.25) * 0.06 + pp * 0.12;
      hologram.position.y = Math.sin(time * 0.5) * 0.08 - p * 0.75 - pp * 0.35;
      hologram.scale.setScalar(1.05 + pp * 0.08);

      membrane.material.opacity = 0.1 + Math.sin(time * 2.2) * 0.015 + pp * 0.03;
      lattice.material.opacity = 0.14 + Math.sin(time * 1.6 + 1) * 0.02 + pp * 0.04;
      if (bloom) {
        bloom.strength = lowPower
          ? 0.16
          : 0.3 + Math.sin(time * 1.2) * 0.025 + pp * 0.06;
      }

      particles.visible = !lowPower;
      if (!lowPower) {
        particles.rotation.y = time * 0.02 + p * 0.4 + pp * 0.35;
        particles.rotation.x = p * 0.15 + pp * 0.1;
      }

      camera.position.x = 0.6 + Math.sin(p * Math.PI * 0.5) * 1.1 + Math.sin(pp * Math.PI) * 0.45;
      camera.position.y = 1.4 + p * 0.9 + pp * 0.35;
      camera.position.z = 9.2 - p * 2.4 - pp * 1.1;
      camera.lookAt(0, hologram.position.y * 0.35, 0);

      amberKey.intensity = 1.05 + Math.sin(time * 1.2) * 0.12 + pp * 0.2;
      cyanFill.intensity = 0.28 + Math.cos(time) * 0.06 + pp * 0.08;

      const base = mobile ? 0.2 : 0.28;
      canvas.style.opacity = String(
        Math.min(0.48, base + pp * 0.14 + (lowPower ? 0.08 : 0))
      );

      if (composer && !lowPower) composer.render();
      else renderer.render(scene, camera);
    };

    readProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("ops-projects-progress", onProjectsProgress);
    document.addEventListener("visibilitychange", onVisibility);
    kick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      sectionIo?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ops-projects-progress", onProjectsProgress);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.style.opacity = "";

      particleGeo.dispose();
      particles.material.dispose();
      bandGeo.dispose();
      lattice.geometry.dispose();
      membrane.material.dispose();
      lattice.material.dispose();
      outerLip.geometry.dispose();
      outerLip.material.dispose();
      innerLip.geometry.dispose();
      innerLip.material.dispose();
      tickGeo.dispose();
      tickMat.dispose();
      guides.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      composer?.dispose();
      renderer.dispose();
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="ops-scroll-scene"
      aria-hidden="true"
    />
  );
}
