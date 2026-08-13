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
 * Night Ops void + ember signal. Camera is a section-keyed flight (no video):
 * far at hero, approach at profile, ride `u` through work/projects, pull back at contact.
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
    particleGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
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

    /**
     * Section-keyed camera flight. Scroll maps onto these beats; the camera
     * interpolates in world space (orbit) or rides the strip (u along Möbius).
     */
    const travel = mobile ? 0.58 : 1;
    const mixCam = (far, close) => far + (close - far) * travel;
    const allBeats = [
      {
        id: "hero",
        mode: "orbit",
        cam: [0.55, 1.35, 9.4],
        look: [0, 0.15, 0],
        holRot: [0.65, 0.04, -0.15],
        holY: 0,
        scale: 1.05,
        opacity: mobile ? 0.24 : 0.34,
        bloom: 0.3,
      },
      {
        id: "profile",
        mode: "orbit",
        cam: [mixCam(0.55, 3.05), mixCam(1.35, 0.42), mixCam(9.4, 5.15)],
        look: [0.75, 0.06, 0.18],
        holRot: [0.72, 0.38, -0.04],
        holY: -0.06,
        scale: 1.12,
        opacity: mobile ? 0.28 : 0.4,
        bloom: 0.36,
      },
      {
        id: "experience",
        mode: "ride",
        u: 0.25,
        lookAhead: 0.4,
        rideRadius: mobile ? 2.85 : 2.25,
        rideLift: 0.52,
        holRot: [0.5, 0.7, 0.04],
        holY: -0.16,
        scale: 1.08,
        opacity: mobile ? 0.16 : 0.22,
        bloom: 0.22,
      },
      {
        id: "projects",
        mode: "ride",
        u: 3.55,
        lookAhead: 0.28,
        rideRadius: mobile ? 2.2 : 1.52,
        rideLift: 0.3,
        holRot: [0.4, 1.45, 0.1],
        holY: -0.34,
        scale: 1.18,
        opacity: mobile ? 0.3 : 0.46,
        bloom: 0.4,
      },
      {
        id: "about",
        mode: "orbit",
        cam: [mixCam(0.55, -3.25), mixCam(1.35, 1.55), mixCam(9.4, 6.5)],
        look: [0, 0.05, 0],
        holRot: [0.55, 1.9, -0.1],
        holY: -0.18,
        scale: 1.06,
        opacity: mobile ? 0.22 : 0.28,
        bloom: 0.2,
      },
      {
        id: "skills",
        mode: "orbit",
        cam: [mixCam(0.55, -1.15), mixCam(1.35, 2.05), mixCam(9.4, 8.3)],
        look: [0, 0.22, 0],
        holRot: [0.6, 2.15, -0.12],
        holY: -0.04,
        scale: 1.02,
        opacity: mobile ? 0.2 : 0.24,
        bloom: 0.18,
      },
      {
        id: "contact",
        mode: "orbit",
        cam: [mixCam(0.55, 0.28), mixCam(1.35, 2.85), mixCam(9.4, 12.1)],
        look: [0, 0.4, 0],
        holRot: [0.62, 2.4, -0.15],
        holY: 0.18,
        scale: 0.98,
        opacity: mobile ? 0.14 : 0.16,
        bloom: 0.14,
      },
    ];

    const beats = allBeats.filter((beat) => document.getElementById(beat.id));
    const lastBeatIndex = Math.max(0, beats.length - 1);

    const _local = new THREE.Vector3();
    const _ahead = new THREE.Vector3();
    const _world = new THREE.Vector3();
    const _worldAhead = new THREE.Vector3();
    const _out = new THREE.Vector3();
    const _holPos = new THREE.Vector3();
    const _camA = new THREE.Vector3();
    const _lookA = new THREE.Vector3();
    const _camB = new THREE.Vector3();
    const _lookB = new THREE.Vector3();
    const _look = new THREE.Vector3();
    const lerpNum = (a, b, t) => a + (b - a) * t;
    const smoothstep = (t) => t * t * (3 - 2 * t);
    const projectsIdx = beats.findIndex((beat) => beat.id === "projects");

    function writeMobius(out, u, v) {
      const cosHalf = Math.cos(u * 0.5);
      const sinHalf = Math.sin(u * 0.5);
      const stretch = R + v * W * cosHalf;
      out.set(stretch * Math.cos(u), v * W * sinHalf * 1.15, stretch * Math.sin(u));
      return out;
    }

    function cameraFromBeat(beat, dive, outPos, outLook) {
      hologram.updateMatrixWorld(true);
      hologram.getWorldPosition(_holPos);
      if (beat.mode !== "ride") {
        outPos.set(beat.cam[0], beat.cam[1], beat.cam[2]);
        outLook.set(beat.look[0], beat.look[1], beat.look[2]);
        return;
      }
      const radius = beat.rideRadius * (1 - dive * 0.28);
      writeMobius(_local, beat.u, 0);
      writeMobius(_ahead, beat.u + beat.lookAhead, 0);
      _world.copy(_local).applyMatrix4(hologram.matrixWorld);
      _worldAhead.copy(_ahead).applyMatrix4(hologram.matrixWorld);
      _out.copy(_world).sub(_holPos);
      if (_out.lengthSq() < 0.0001) _out.set(0, 0, 1);
      else _out.normalize();
      outPos.copy(_world).addScaledVector(_out, radius);
      outPos.y += beat.rideLift;
      outLook.copy(_worldAhead);
    }

    let target = { p: 0 };
    let current = { p: 0 };
    let projectsTarget = 0;
    let projectsCurrent = 0;
    let running = true;
    let raf = 0;
    let lastFrame = 0;
    let scrollBoostUntil = 0;

    const readProgress = () => {
      if (beats.length < 2) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        target.p = Math.min(1, Math.max(0, window.scrollY / max));
        return;
      }
      const probe = window.scrollY + window.innerHeight * 0.38;
      const tops = beats.map((beat) => {
        const el = document.getElementById(beat.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      if (probe <= tops[0]) {
        target.p = 0;
        return;
      }
      if (probe >= tops[lastBeatIndex]) {
        target.p = 1;
        return;
      }
      for (let i = 0; i < lastBeatIndex; i += 1) {
        const a = tops[i];
        const b = tops[i + 1];
        if (probe >= a && probe < b) {
          const local = (probe - a) / Math.max(1, b - a);
          target.p = (i + local) / lastBeatIndex;
          return;
        }
      }
      target.p = 1;
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

      current.p += (target.p - current.p) * 0.08;
      projectsCurrent += (projectsTarget - projectsCurrent) * 0.09;
      const p = current.p;
      const pp = projectsCurrent;
      const time = t * 0.001;

      const pool = beats.length ? beats : allBeats;
      const count = pool.length;
      const span = Math.max(1, count - 1);
      const scaled = Math.min(span, Math.max(0, p * span));
      const i0 = Math.min(Math.max(0, count - 2), Math.floor(scaled));
      const i1 = Math.min(count - 1, i0 + 1);
      const local = count < 2 ? 0 : smoothstep(scaled - i0);
      const a = pool[i0];
      const b = pool[i1];

      hologram.rotation.x = lerpNum(a.holRot[0], b.holRot[0], local);
      hologram.rotation.y = lerpNum(a.holRot[1], b.holRot[1], local);
      hologram.rotation.z = lerpNum(a.holRot[2], b.holRot[2], local);
      hologram.position.y = lerpNum(a.holY, b.holY, local);
      hologram.scale.setScalar(lerpNum(a.scale, b.scale, local) + pp * 0.06);

      const nearProjects =
        projectsIdx < 0 ? 0 : Math.max(0, 1 - Math.abs(scaled - projectsIdx));
      const dive = pp * (0.22 + nearProjects * 0.78);

      if (a.mode === "ride" && b.mode === "ride") {
        cameraFromBeat(
          {
            mode: "ride",
            u: lerpNum(a.u, b.u, local),
            lookAhead: lerpNum(a.lookAhead, b.lookAhead, local),
            rideRadius: lerpNum(a.rideRadius, b.rideRadius, local),
            rideLift: lerpNum(a.rideLift, b.rideLift, local),
          },
          dive,
          camera.position,
          _look
        );
      } else {
        cameraFromBeat(a, dive, _camA, _lookA);
        cameraFromBeat(b, dive, _camB, _lookB);
        camera.position.lerpVectors(_camA, _camB, local);
        _look.copy(_lookA).lerp(_lookB, local);
      }
      camera.lookAt(_look);

      const opacity = lerpNum(a.opacity, b.opacity, local);
      membrane.material.opacity = 0.09 + opacity * 0.1 + Math.sin(time * 1.8) * 0.008 + dive * 0.04;
      lattice.material.opacity = 0.12 + opacity * 0.12 + Math.sin(time * 1.4 + 1) * 0.012 + dive * 0.05;
      if (bloom) {
        bloom.strength = lowPower
          ? 0.12
          : lerpNum(a.bloom, b.bloom, local) + Math.sin(time * 1.1) * 0.018 + dive * 0.08;
      }

      particles.visible = !lowPower;
      if (!lowPower) {
        particles.rotation.y = time * 0.008 + p * 0.12;
      }

      amberKey.position.set(
        camera.position.x + 2.1,
        camera.position.y + 1.35,
        camera.position.z + 1.4
      );
      cyanFill.position.set(
        camera.position.x - 3.1,
        camera.position.y - 0.7,
        camera.position.z + 1.1
      );
      amberKey.intensity = 1.02 + Math.sin(time * 1.15) * 0.08 + dive * 0.22;
      cyanFill.intensity = 0.26 + Math.cos(time) * 0.05 + dive * 0.08;

      canvas.style.opacity = String(Math.min(0.5, opacity + dive * 0.06));

      if (composer && !lowPower) composer.render();
      else renderer.render(scene, camera);
    };

    readProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("ops-projects-progress", onProjectsProgress);
    document.addEventListener("visibilitychange", onVisibility);
    const layoutRo =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            readProgress();
            kick();
          })
        : null;
    layoutRo?.observe(document.documentElement);
    kick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      sectionIo?.disconnect();
      layoutRo?.disconnect();
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
