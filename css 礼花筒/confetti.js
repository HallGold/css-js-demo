/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.0.
 * Original file: /npm/tsparticles-confetti@2.11.1/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import { isArray as t, deepExtend as i, isString as e, tsParticles as s, isSsr as a } from "/npm/tsparticles-engine@2.11.1/+esm";
import { loadBaseMover as o } from "/npm/tsparticles-move-base@2.11.1/+esm";
import { loadCardsShape as r } from "/npm/tsparticles-shape-cards@2.11.1/+esm";
import { loadCircleShape as n } from "/npm/tsparticles-shape-circle@2.11.1/+esm";
import { loadColorUpdater as p } from "/npm/tsparticles-updater-color@2.11.1/+esm";
import { loadEmittersPlugin as c } from "/npm/tsparticles-plugin-emitters@2.11.1/+esm";
import { loadHeartShape as l } from "/npm/tsparticles-shape-heart@2.11.1/+esm";
import { loadImageShape as d } from "/npm/tsparticles-shape-image@2.11.1/+esm";
import { loadLifeUpdater as m } from "/npm/tsparticles-updater-life@2.11.1/+esm";
import { loadMotionPlugin as f } from "/npm/tsparticles-plugin-motion@2.11.1/+esm";
import { loadOpacityUpdater as u } from "/npm/tsparticles-updater-opacity@2.11.1/+esm";
import { loadOutModesUpdater as h } from "/npm/tsparticles-updater-out-modes@2.11.1/+esm";
import { loadPolygonShape as y } from "/npm/tsparticles-shape-polygon@2.11.1/+esm";
import { loadRollUpdater as v } from "/npm/tsparticles-updater-roll@2.11.1/+esm";
import { loadRotateUpdater as w } from "/npm/tsparticles-updater-rotate@2.11.1/+esm";
import { loadSizeUpdater as g } from "/npm/tsparticles-updater-size@2.11.1/+esm";
import { loadSquareShape as x } from "/npm/tsparticles-shape-square@2.11.1/+esm";
import { loadStarShape as b } from "/npm/tsparticles-shape-star@2.11.1/+esm";
import { loadTextShape as z } from "/npm/tsparticles-shape-text@2.11.1/+esm";
import { loadTiltUpdater as I } from "/npm/tsparticles-updater-tilt@2.11.1/+esm";
import { loadWobbleUpdater as V } from "/npm/tsparticles-updater-wobble@2.11.1/+esm";
class k {
  constructor() {
    (this.angle = 90),
      (this.count = 50),
      (this.spread = 45),
      (this.startVelocity = 45),
      (this.decay = 0.9),
      (this.gravity = 1),
      (this.drift = 0),
      (this.ticks = 200),
      (this.position = { x: 50, y: 50 }),
      (this.colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]),
      (this.shapes = ["square", "circle"]),
      (this.scalar = 1),
      (this.zIndex = 100),
      (this.disableForReducedMotion = !0),
      (this.shapeOptions = {});
  }
  get origin() {
    return { x: this.position.x / 100, y: this.position.y / 100 };
  }
  set origin(t) {
    (this.position.x = 100 * t.x), (this.position.y = 100 * t.y);
  }
  get particleCount() {
    return this.count;
  }
  set particleCount(t) {
    this.count = t;
  }
  load(e) {
    if (!e) return;
    void 0 !== e.angle && (this.angle = e.angle);
    const s = e.count ?? e.particleCount;
    void 0 !== s && (this.count = s),
      void 0 !== e.spread && (this.spread = e.spread),
      void 0 !== e.startVelocity && (this.startVelocity = e.startVelocity),
      void 0 !== e.decay && (this.decay = e.decay),
      void 0 !== e.gravity && (this.gravity = e.gravity),
      void 0 !== e.drift && (this.drift = e.drift),
      void 0 !== e.ticks && (this.ticks = e.ticks);
    const a = e.origin;
    a && !e.position && (e.position = { x: void 0 !== a.x ? 100 * a.x : void 0, y: void 0 !== a.y ? 100 * a.y : void 0 });
    const o = e.position;
    o && (void 0 !== o.x && (this.position.x = o.x), void 0 !== o.y && (this.position.y = o.y)),
      void 0 !== e.colors && (t(e.colors) ? (this.colors = [...e.colors]) : (this.colors = e.colors));
    const r = e.shapeOptions;
    if (void 0 !== r)
      for (const t in r) {
        const e = r[t];
        e && (this.shapeOptions[t] = i(this.shapeOptions[t] ?? {}, e));
      }
    void 0 !== e.shapes && (t(e.shapes) ? (this.shapes = [...e.shapes]) : (this.shapes = e.shapes)),
      void 0 !== e.scalar && (this.scalar = e.scalar),
      void 0 !== e.zIndex && (this.zIndex = e.zIndex),
      void 0 !== e.disableForReducedMotion && (this.disableForReducedMotion = e.disableForReducedMotion);
  }
}
let M = !1,
  O = !1;
const R = new Map();
async function C() {
  if (!M) {
    if (O)
      return new Promise((t) => {
        const i = setInterval(() => {
          M && (clearInterval(i), t());
        }, 100);
      });
    (O = !0),
      await o(s),
      await c(s),
      await f(s),
      await r(s),
      await n(s),
      await l(s),
      await d(s),
      await y(s),
      await x(s),
      await b(s),
      await z(s),
      await w(s),
      await p(s),
      await m(s),
      await u(s),
      await h(s),
      await v(s),
      await g(s),
      await I(s),
      await V(s),
      (O = !1),
      (M = !0);
  }
}
async function F(t) {
  const i = new k();
  let e;
  i.load(t.options);
  const a = (1e3 * i.ticks) / 432e3;
  if (R.has(t.id) && ((e = R.get(t.id)), e && !e.destroyed)) {
    const t = e;
    if (t.addEmitter)
      return void t.addEmitter({
        startCount: i.count,
        position: i.position,
        size: { width: 0, height: 0 },
        rate: { delay: 0, quantity: 0 },
        life: { duration: 0.1, count: 1 },
        particles: {
          color: { value: i.colors },
          shape: { type: i.shapes, options: i.shapeOptions },
          life: { count: 1 },
          opacity: { value: { min: 0, max: 1 }, animation: { enable: !0, sync: !0, speed: a, startValue: "max", destroy: "min" } },
          size: { value: 5 * i.scalar },
          move: {
            angle: { value: i.spread, offset: 0 },
            drift: { min: -i.drift, max: i.drift },
            gravity: { acceleration: 9.81 * i.gravity },
            speed: 3 * i.startVelocity,
            decay: 1 - i.decay,
            direction: -i.angle,
          },
        },
      });
  }
  const o = {
    fullScreen: { enable: !t.canvas, zIndex: i.zIndex },
    fpsLimit: 120,
    particles: {
      number: { value: 0 },
      color: { value: i.colors },
      shape: { type: i.shapes, options: i.shapeOptions },
      opacity: { value: { min: 0, max: 1 }, animation: { enable: !0, sync: !0, speed: a, startValue: "max", destroy: "min" } },
      size: { value: 5 * i.scalar },
      links: { enable: !1 },
      life: { count: 1 },
      move: {
        angle: { value: i.spread, offset: 0 },
        drift: { min: -i.drift, max: i.drift },
        enable: !0,
        gravity: { enable: !0, acceleration: 9.81 * i.gravity },
        speed: 3 * i.startVelocity,
        decay: 1 - i.decay,
        direction: -i.angle,
        random: !0,
        straight: !1,
        outModes: { default: "none", bottom: "destroy" },
      },
      rotate: { value: { min: 0, max: 360 }, direction: "random", animation: { enable: !0, speed: 60 } },
      tilt: { direction: "random", enable: !0, value: { min: 0, max: 360 }, animation: { enable: !0, speed: 60 } },
      roll: { darken: { enable: !0, value: 25 }, enable: !0, speed: { min: 15, max: 25 } },
      wobble: { distance: 30, enable: !0, speed: { min: -15, max: 15 } },
    },
    detectRetina: !0,
    motion: { disable: i.disableForReducedMotion },
    emitters: {
      name: "confetti",
      startCount: i.count,
      position: i.position,
      size: { width: 0, height: 0 },
      rate: { delay: 0, quantity: 0 },
      life: { duration: 0.1, count: 1 },
    },
  };
  return (e = await s.load({ id: t.id, element: t.canvas, options: o })), R.set(t.id, e), e;
}
async function q(t, i) {
  let s, a;
  return await C(), e(t) ? ((a = t), (s = i ?? {})) : ((a = "confetti"), (s = t)), F({ id: a, options: s });
}
(q.create = async (t, i) => {
  if (!t) return q;
  await C();
  const s = t.getAttribute("id") || "confetti";
  return (
    t.setAttribute("id", s),
    async (a, o) => {
      let r, n;
      return e(a) ? ((n = a), (r = o ?? i)) : ((n = s), (r = a)), F({ id: n, canvas: t, options: r });
    }
  );
}),
  (q.version = s.version),
  a() || (window.confetti = q);
export { q as confetti };
export default null;
//# sourceMappingURL=/sm/eeb7fb6e97468236466af2c2c2e153ed6829232c4b8c77a010144b4a50a44f0c.map
