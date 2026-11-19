"use client";
import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Calculator from "./Calculator";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
const FONT_HREF = "https://fonts.googleapis.com/css2?family=Anton&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Caveat:wght@500..700&display=swap";
const CASHFREE_CHECKOUT = "https://merchant.cashfree.com/checkout";
const DEFAULT_PRODUCTS = [
  { name: "Basic", line: "Starter site, hosting and domain included.", price: "\u20b9599/mo", kind: "clear" },
  { name: "Business", line: "5-page site, SEO and domain included.", price: "\u20b91,199/mo", kind: "print" },
  { name: "Premium", line: "Full suite with booking, admin and maps.", price: "\u20b92,199/mo", kind: "masking" }
];
const KIND_LABEL = { clear: "SITE", print: "SEO", masking: "BRAND", washi: "CARE", duct: "SHIP" };
const TierBadge = { business: "Best value", premium: "Signature plan" };
const useIso = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
const REDUCE = "(prefers-reduced-motion: reduce)";
const FACETS = Array.from({ length: 32 }, (_, i) => i);
const REPEAT = 6;
const v = (o) => o;
/* Sage & Off-white — single source of truth for colours used inside SVG */
const C = { forest: "#18352B", off: "#F4F5EF", sage: "#DDE3D5", muted: "#899982", white: "#FFFFFF", ink: "#202522" };
function scallop(r, bump, n) {
  const f = (a, rr) => (60 + rr * Math.cos(a)).toFixed(2) + " " + (60 + rr * Math.sin(a)).toFixed(2);
  let d = "M" + f(0, r);
  for (let i = 0; i < n; i++) {
    const a0 = i / n * Math.PI * 2;
    const a1 = (i + 1) / n * Math.PI * 2;
    d += " Q" + f((a0 + a1) / 2, r + bump * 2) + " " + f(a1, r);
  }
  return d + "Z";
}
const BADGE_OUT = scallop(51, 4.2, 14);
const BADGE_IN = scallop(46, 3.6, 14);
const MK_L = 2600;
const MK_W = 92;
const MK_STRIPS = [
  { cx: 800, cy: 285, a: -10 },
  { cx: 800, cy: 545, a: 6 },
  { cx: 800, cy: 790, a: -4 }
];
function BrandBadge({ size, className }) {
  return <svg className={"ht-badge" + (className ? " " + className : "")} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="WebRivo symbol">
    <path className="ht-badge-shell" d={BADGE_OUT} />
    <path className="ht-badge-core" d={BADGE_IN} />
    <circle className="ht-badge-ring" cx="60" cy="60" r="38" />
    <g className="ht-badge-mark">
      <path className="ht-badge-w" d="M29 47 42.5 81 60 48 77.5 81 91 47 80.5 41 72.5 61 60 36 47.5 61 39.5 41Z" />
      <path className="ht-badge-arrow" d="M47 39 60 26l13 13" />
    </g>
  </svg>;
}
function RollFace({ kind, brand }) {
  return <div className={"ht-face ht-k-" + kind}><div className="ht-face-core" /><div className="ht-face-label"><span className="ht-face-brand">{brand}</span><span className="ht-face-kind">{KIND_LABEL[kind]}</span></div><div className="ht-face-gloss" /></div>;
}
function Roll3D({ kind, brand }) {
  return <div className={"ht-roll ht-k-" + kind} aria-hidden="true"><div className="ht-roll-shadow" /><div className="ht-roll-body">{FACETS.map((i) => <i key={i} className="ht-roll-facet" style={v({ "--i": i })} />)}<div className="ht-roll-cap ht-roll-cap-a"><RollFace kind={kind} brand={brand} /></div><div className="ht-roll-cap ht-roll-cap-b"><RollFace kind={kind} brand={brand} /></div></div></div>;
}
function Tape({ kind, x, y, w, r, peel }) {
  const pos = v({ left: x, top: y, width: w, "--r": r + "deg" });
  return peel ? <i className={"ht-tp ht-tp-" + kind + " ht-peel"} style={pos} role="button" tabIndex={0} aria-label="Peel off this piece of tape"><b className="ht-tp-in" /></i> : <i className={"ht-tp ht-tp-" + kind} style={pos} aria-hidden="true"><b className="ht-tp-in" /></i>;
}
function Daisy({ petals, color, center, className }) {
  const angles = Array.from({ length: petals }, (_, i) => i * 360 / petals);
  const rx = petals > 6 ? 11 : 15;
  return <svg className={"ht-daisy " + className} viewBox="-62 -62 124 124" aria-hidden="true"><g fill={C.white} stroke={C.white} strokeWidth="10" strokeLinejoin="round">{angles.map((a) => <ellipse key={a} cx="0" cy="-25" rx={rx} ry="25" transform={"rotate(" + a + ")"} />)}</g><g fill={color}>{angles.map((a) => <ellipse key={a} cx="0" cy="-25" rx={rx} ry="25" transform={"rotate(" + a + ")"} />)}</g><g fill={C.forest} opacity="0.08">{angles.map((a) => <ellipse key={a} cx="3" cy="-22" rx={rx * 0.5} ry="18" transform={"rotate(" + a + ")"} />)}</g><circle r="15" fill={center} /><g fill={C.forest} opacity="0.4"><circle cx="-5" cy="-4" r="2" /><circle cx="4" cy="-6" r="1.8" /><circle cx="6" cy="4" r="2" /><circle cx="-3" cy="6" r="1.6" /><circle cx="0" cy="0" r="1.6" /></g><ellipse cx="-16" cy="-34" rx="6" ry="13" fill={C.white} opacity="0.4" transform="rotate(-32 -16 -34)" /></svg>;
}
function TapeLanding({
  height = "100svh",
  brand = "WEBRIVO",
  headline = ["GET FOUND", "GET CHOSEN"],
  story = "A pin three streets off, a page that takes nine seconds, a form nobody sends. We fix all of it, then make you the best in town.",
  todo = ["claim the map pin", "write the service pages", "shoot the team photos", "wire up the booking form", "chase the last invoice"],
  marquee = ["GET FOUND", "GET CHOSEN"],
  maskHeadline = ["BRIEF", "BUILD", "SHIP"],
  products = DEFAULT_PRODUCTS,
  preloader = true,
  fontHref = FONT_HREF,
  className
}) {
  const rootRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [added, setAdded] = React.useState(-1);
  const [joined, setJoined] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const cycle = React.useMemo(() => {
    const out = [];
    for (const p of marquee) {
      for (const ch of p) out.push(ch);
      out.push(" ", "@", " ");
    }
    return out;
  }, [marquee]);
  const items = React.useMemo(() => {
    const out = [];
    for (let r = 0; r < REPEAT; r++) out.push(...cycle);
    return out;
  }, [cycle]);
  const go = (sec) => () => {
    const el = rootRef.current?.querySelector('[data-sec="' + sec + '"]');
    const smooth = !window.matchMedia(REDUCE).matches;
    el?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };
  const sendPlanRequest = (planName) => () => {
    window.dispatchEvent(new CustomEvent("openBooking", { detail: planName.toLowerCase() }));
  };
  const customizePlan = (planName) => () => {
    window.dispatchEvent(new CustomEvent("switchPlan", { detail: planName.toLowerCase() }));
    go("estimate")();
  };
  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const nav = rootRef.current?.querySelector(".ht-nav");
      if (!nav) return;
      const darks = rootRef.current.querySelectorAll(".ht-mask, .ht-banner");
      const navH = nav.offsetHeight;
      let isDark = false;
      for (const el of darks) {
        const r = el.getBoundingClientRect();
        if (r.top <= navH && r.bottom > 0) { isDark = true; break; }
      }
      nav.classList.toggle("ht-nav--dark", isDark);
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(0);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useIso(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    const cleanups = [];
    let alive = true;
    const ctx = gsap.context(() => {
      const run = q(".ht-run");
      const hero = q(".ht-hero");
      const roll = q(".ht-run .ht-roll");
      const body = q(".ht-run .ht-roll-body");
      const strip = q(".ht-strip");
      const tape = { p: 0, dy: 0, y0: 0, y1: 0, D: 160 };
      const measureTape = () => {
        if (!run || !hero || !roll || !strip) return;
        tape.D = roll.offsetWidth;
        tape.y0 = hero.offsetHeight - tape.D * 0.46;
        tape.y1 = run.offsetHeight - tape.D * 0.62;
        strip.style.top = tape.y0 + "px";
      };
      const drawTape = (full) => {
        if (!roll || !body || !strip) return;
        const { p, dy, y0, y1, D } = tape;
        const dist = (y1 - y0) * p;
        const y = y0 + dist + dy;
        const spin = -(dist + dy * 0.6) / (D / 2) * 57.2958;
        const tilt = -52 + 30 * Math.min(1, p * 7) - 22 * Math.max(0, (p - 0.92) * 12.5) + Math.sin(dist / 240) * 4;
        roll.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
        body.style.setProperty("--tilt", tilt.toFixed(2) + "deg");
        body.style.setProperty("--spin", spin.toFixed(2) + "deg");
        strip.style.height = Math.max(0, full ? y1 - y0 : dist + D * 0.04).toFixed(1) + "px";
        strip.style.setProperty("--gy", (dist * 0.55).toFixed(1) + "px");
      };
      const banner = q(".ht-banner");
      const bsvg = q(".ht-bn-svg");
      const glyphLayer = q(".ht-bn-glyphs");
      const bClip = q(".ht-bn-cliprect");
      const bRoll = q(".ht-bn-roll");
      const glyphs = qa(".ht-mq-i");
      const perCycle = glyphs.length / REPEAT;
      const bn = { W: 0, H: 0, A: 0, A0: 0, k: 0, mid: 0, T: 0, ph: 0.9, X: [0], Y: [0], S: [0], w: [0], h: [0], cum: [0], cyc: 1, off: 0, reveal: 0, boost: 0 };
      const buildWave = (A) => {
        if (!bsvg) return;
        const { W, H, T, mid, k, ph } = bn;
        const X = [];
        const Y = [];
        const S = [];
        let s = 0;
        for (let x = -240; x <= W + 240; x += 4) {
          const y = mid + A * Math.sin(k * x + ph);
          if (X.length) s += Math.hypot(x - X[X.length - 1], y - Y[Y.length - 1]);
          X.push(x);
          Y.push(y);
          S.push(s);
        }
        Object.assign(bn, { A, X, Y, S });
        let d = "";
        for (let i = 0; i < X.length; i += 2) d += (i ? " L" : "M") + X[i].toFixed(1) + " " + Y[i].toFixed(1);
        for (const p of Array.from(bsvg.querySelectorAll(".ht-bn-line"))) {
          p.setAttribute("d", d);
          const f = Number(p.getAttribute("data-w"));
          p.setAttribute("stroke-width", (T * f).toFixed(1));
        }
        const sheen = bsvg.querySelector(".ht-bn-sheen");
        if (sheen) sheen.setAttribute("transform", "translate(0 " + (-T * 0.24).toFixed(1) + ")");
        const fill = bsvg.querySelector(".ht-bn-fill");
        if (fill) fill.setAttribute("d", d + " L" + (W + 240) + " " + (H + 0.5) + " L-240 " + (H + 0.5) + "Z");
      };
      const measureBanner = () => {
        if (!banner || !bsvg || !glyphLayer) return;
        const W = banner.clientWidth;
        const H = banner.clientHeight;
        const T = H * 0.34;
        Object.assign(bn, { W, H, T, A0: H * 0.12, mid: H * 0.5, k: 2 * Math.PI / Math.max(620, W * 0.7) });
        bsvg.setAttribute("viewBox", "0 0 " + W + " " + H);
        buildWave(bn.A0);
        glyphLayer.style.setProperty("--fs", (T * 0.58).toFixed(1) + "px");
        if (bRoll) bRoll.style.setProperty("--d", (T * 1.9).toFixed(1) + "px");
        bn.w = glyphs.map((g) => g.offsetWidth);
        bn.h = glyphs.map((g) => g.offsetHeight);
        bn.cum = [];
        let c = 0;
        for (const w of bn.w) {
          bn.cum.push(c);
          c += w;
        }
        bn.cyc = Math.max(1, perCycle ? bn.cum[perCycle] ?? c : c);
      };
      const drawBanner = () => {
        if (!bn.W || !glyphLayer) return;
        const { X, Y, S, A, k, W, mid } = bn;
        const xr = -240 + (W + 480) * bn.reveal;
        if (bClip) bClip.setAttribute("width", Math.max(0, xr + 240).toFixed(1));
        glyphLayer.style.clipPath = "polygon(-10% -60%, " + xr.toFixed(1) + "px -60%, " + xr.toFixed(1) + "px 160%, -10% 160%)";
        const base = -((bn.off % bn.cyc + bn.cyc) % bn.cyc);
        const last = S[S.length - 1];
        let j = 0;
        for (let i = 0; i < glyphs.length; i++) {
          const el = glyphs[i];
          const s = base + bn.cum[i] + bn.w[i] / 2 + 60;
          if (s < 0 || s > last) {
            el.style.visibility = "hidden";
            continue;
          }
          while (j < S.length - 2 && S[j + 1] < s) j++;
          const t = (s - S[j]) / Math.max(1e-3, S[j + 1] - S[j]);
          const x = X[j] + (X[j + 1] - X[j]) * t;
          const y = Y[j] + (Y[j + 1] - Y[j]) * t;
          const ang = Math.atan(A * k * Math.cos(k * x + bn.ph));
          el.style.visibility = x > W + 60 ? "hidden" : "visible";
          el.style.transform = "translate(" + (x - bn.w[i] / 2).toFixed(1) + "px," + (y - bn.h[i] / 2).toFixed(1) + "px) rotate(" + ang.toFixed(4) + "rad)";
        }
        if (bRoll) {
          const d = bn.T * 1.9;
          const y = mid + A * Math.sin(k * xr + bn.ph);
          bRoll.style.opacity = bn.reveal > 1e-3 && bn.reveal < 0.999 ? "1" : "0";
          bRoll.style.transform = "translate(" + (xr - d / 2).toFixed(1) + "px," + (y - d / 2).toFixed(1) + "px) rotate(" + (xr / (d / 2) * 57.3).toFixed(1) + "deg)";
        }
      };
      const mask = q(".ht-mask");
      const mkBodies = qa(".ht-mk-body");
      const mkLeads = qa(".ht-mk-lead");
      const mkCurls = qa(".ht-mk-curl");
      const mkClip = q(".ht-mk-cliprect");
      const mkRoller = q(".ht-mk-roller");
      const mkFace = q(".ht-mask-roll .ht-face");
      const ms = { l0: 0, l1: 0, l2: 0, p0: 0, p1: 0, p2: 0, paint: 0, t: 0 };
      const drawMask = () => {
        const lays = [ms.l0, ms.l1, ms.l2];
        const peels = [ms.p0, ms.p1, ms.p2];
        for (let i = 0; i < 3; i++) {
          const xa = -MK_L / 2 + peels[i] * MK_L;
          const xb = -MK_L / 2 + lays[i] * MK_L;
          for (const r of Array.from(mkBodies[i]?.children || [])) {
            r.setAttribute("x", xa.toFixed(1));
            r.setAttribute("width", Math.max(0, xb - xa).toFixed(1));
          }
          const lead = mkLeads[i];
          if (lead) {
            const on = lays[i] > 1e-3 && lays[i] < 0.999;
            lead.setAttribute("opacity", on ? "1" : "0");
            lead.setAttribute("transform", "translate(" + xb.toFixed(1) + " -64) rotate(" + (xb / 78 * 57.3).toFixed(1) + ")");
          }
          const curl = mkCurls[i];
          if (curl) {
            curl.setAttribute("opacity", peels[i] > 1e-3 && peels[i] < 0.999 ? "1" : "0");
            curl.setAttribute("transform", "translate(" + xa.toFixed(1) + " 0)");
          }
        }
        const px = -200 + ms.paint * 2e3;
        if (mkClip) mkClip.setAttribute("width", Math.max(0, px + 200).toFixed(1));
        if (mkRoller) {
          mkRoller.setAttribute("opacity", ms.paint > 1e-3 && ms.paint < 0.999 ? "1" : "0");
          mkRoller.setAttribute("transform", "translate(" + px.toFixed(1) + " 0)");
        }
        if (mkFace) mkFace.style.transform = "rotate(" + (ms.t * 620).toFixed(1) + "deg)";
      };
      const maskTimeline = (tl) => {
        const e = "power1.inOut";
        tl.to(ms, { l0: 1, duration: 0.13, ease: e }, 0.02).to(ms, { l1: 1, duration: 0.13, ease: e }, 0.12).to(ms, { l2: 1, duration: 0.13, ease: e }, 0.22).to(ms, { paint: 1, duration: 0.24, ease: "none" }, 0.37).to(ms, { p0: 1, duration: 0.12, ease: e }, 0.64).to(ms, { p1: 1, duration: 0.12, ease: e }, 0.73).to(ms, { p2: 1, duration: 0.12, ease: e }, 0.82).to(ms, { t: 1, duration: 1, ease: "none" }, 0).fromTo(q(".ht-mask-stamp"), { scale: 2.2, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -9, duration: 0.05, ease: "power4.in" }, 0.95);
        return tl;
      };
      const calm = () => window.matchMedia(REDUCE).matches;
      for (const tp of qa(".ht-peel")) {
        const bit = tp.querySelector(".ht-tp-in");
        let sx = 0;
        let sy = 0;
        let held = false;
        const peel = (dx, dy) => {
          tp.classList.add("ht-peeled");
          tp.setAttribute("aria-hidden", "true");
          tp.tabIndex = -1;
          const side = dx >= 0 ? 1 : -1;
          ctx.add(() => {
            if (calm()) gsap.to(bit, { opacity: 0, duration: 0.3 });
            else gsap.to(bit, { x: dx * 3, y: dy * 3 + 280, rotation: side * 140, opacity: 0, duration: 0.95, ease: "power2.in" });
            const item = tp.closest("[data-drop]");
            if (item && !item.querySelector(".ht-peel:not(.ht-peeled)") && !calm())
              gsap.to(item, { y: "+=110", rotation: "+=" + side * 11, duration: 1.2, ease: "bounce.out" });
          });
        };
        const onDown = (e) => {
          held = true;
          sx = e.clientX;
          sy = e.clientY;
          tp.setPointerCapture(e.pointerId);
          tp.classList.add("ht-lifting");
        };
        const onMove = (e) => {
          if (!held) return;
          const dx = e.clientX - sx;
          const dy = e.clientY - sy;
          gsap.set(bit, { x: dx * 0.35, y: dy * 0.35, rotation: dx * 0.06, scale: 1.05 });
        };
        const onUp = (e) => {
          if (!held) return;
          held = false;
          tp.classList.remove("ht-lifting");
          const dx = e.clientX - sx;
          const dy = e.clientY - sy;
          if (Math.hypot(dx, dy) > 46) peel(dx, dy);
          else ctx.add(() => gsap.to(bit, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.6, ease: "elastic.out(1,.4)" }));
        };
        const onKey = (e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          peel(24, 12);
        };
        tp.addEventListener("pointerdown", onDown);
        tp.addEventListener("pointermove", onMove);
        tp.addEventListener("pointerup", onUp);
        tp.addEventListener("pointercancel", onUp);
        tp.addEventListener("keydown", onKey);
        cleanups.push(() => {
          tp.removeEventListener("pointerdown", onDown);
          tp.removeEventListener("pointermove", onMove);
          tp.removeEventListener("pointerup", onUp);
          tp.removeEventListener("pointercancel", onUp);
          tp.removeEventListener("keydown", onKey);
        });
      }
      const doodles = q(".ht-doodles");
      if (hero && doodles && window.matchMedia("(pointer: fine)").matches) {
        let cur = null;
        let ox = 0;
        let oy = 0;
        const at = (e) => {
          const r = hero.getBoundingClientRect();
          return [e.clientX - r.left, e.clientY - r.top];
        };
        const onDown = (e) => {
          if (e.button !== 0 || e.target.closest("button,a,input")) return;
          [ox, oy] = at(e);
          cur = document.createElement("i");
          cur.className = "ht-doodle";
          cur.textContent = (brand + " \u2726 ").repeat(24);
          cur.style.left = ox + "px";
          cur.style.top = oy + "px";
          doodles.appendChild(cur);
          hero.setPointerCapture(e.pointerId);
        };
        const onMove = (e) => {
          if (!cur) return;
          const [x, y] = at(e);
          cur.style.width = Math.hypot(x - ox, y - oy).toFixed(1) + "px";
          cur.style.transform = "rotate(" + Math.atan2(y - oy, x - ox).toFixed(4) + "rad)";
        };
        const onUp = () => {
          const el = cur;
          cur = null;
          if (!el) return;
          if (el.offsetWidth < 28) return el.remove();
          if (!calm()) ctx.add(() => gsap.fromTo(el, { scaleY: 1.6, opacity: 0.6 }, { scaleY: 1, opacity: 1, duration: 0.4, ease: "back.out(3)" }));
          while (doodles.children.length > 8) doodles.firstElementChild?.remove();
        };
        hero.addEventListener("pointerdown", onDown);
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerup", onUp);
        hero.addEventListener("pointercancel", onUp);
        cleanups.push(() => {
          hero.removeEventListener("pointerdown", onDown);
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerup", onUp);
          hero.removeEventListener("pointercancel", onUp);
          doodles.replaceChildren();
        });
      }
      const refreshAll = () => {
        measureTape();
        measureBanner();
      };
      const mm = gsap.matchMedia();
      mm.add(REDUCE, () => {
        const still = () => {
          refreshAll();
          tape.p = 0;
          tape.dy = 0;
          drawTape(true);
          bn.reveal = 1;
          drawBanner();
        };
        still();
        maskTimeline(gsap.timeline({ paused: true, onUpdate: drawMask })).progress(1);
        drawMask();
        gsap.from(qa(".ht-hero-copy, .ht-cue"), { opacity: 0, duration: 0.9, ease: "power1.out" });
        for (const el of qa("[data-drop], .ht-prod, .ht-word, .ht-daisy"))
          gsap.from(el, { opacity: 0, duration: 0.8, ease: "power1.out", scrollTrigger: { trigger: el, start: "top 92%" } });
        const ro = new ResizeObserver(still);
        ro.observe(root);
        if (document.fonts) document.fonts.ready.then(() => alive && still());
        return () => ro.disconnect();
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        refreshAll();
        drawTape();
        drawBanner();
        const pre = q(".ht-pre");
        const letters = qa(".ht-l");
        gsap.set(letters, { opacity: 0, transformOrigin: "50% 100%" });
        gsap.set(qa(".ht-cue"), { opacity: 0 });
        tape.dy = -(tape.y0 + tape.D * 1.2);
        drawTape();
        const intro = gsap.timeline({ paused: true });
        let t0 = 0;
        if (pre && preloader) {
          gsap.set(pre, { autoAlpha: 1 });
          const bands = qa(".ht-pre-band");
          intro.to(q(".ht-pre-label"), { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" }, 0.1).fromTo(bands, { yPercent: 64 }, { yPercent: -36, duration: 1.15, ease: "power3.inOut", stagger: 0.13 }, 0).set(pre, { autoAlpha: 0 }, 0.13 * (bands.length - 1) + 1.1);
          t0 = 0.13 * (bands.length - 1) + 0.75;
          const n = { v: 0 };
          const num = q(".ht-pre-num");
          gsap.to(n, { v: 100, duration: 0.8, ease: "power2.out", onUpdate: () => num && (num.textContent = Math.round(n.v) + "%") });
        }
        intro.to(tape, { dy: 0, duration: 1.05, ease: "bounce.out", onUpdate: () => drawTape() }, t0);
        const order = gsap.utils.shuffle(letters.slice());
        order.forEach((el, i) => {
          const t = t0 + 0.35 + i * 0.055;
          intro.fromTo(el, { opacity: 0, scaleX: 1.55, scaleY: 0.12, y: 50 }, { opacity: 1, scaleX: 0.78, scaleY: 1.32, y: -46, duration: 0.2, ease: "power2.out" }, t).to(el, { scaleX: 1.22, scaleY: 0.8, y: 0, duration: 0.14, ease: "power2.in" }, t + 0.2).to(el, { scaleX: 1, scaleY: 1, duration: 0.7, ease: "elastic.out(1,.32)" }, t + 0.34);
        });
        intro.to(qa(".ht-cue"), { opacity: 1, duration: 0.6 }, t0 + 1.1);
        let ready = false;
        const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
        Promise.race([fonts, new Promise((r) => setTimeout(r, 1600))]).then(() => {
          if (!alive) return;
          ready = true;
          refreshAll();
          ScrollTrigger.refresh();
          intro.play();
        });
        const h1 = q(".ht-h1");
        const onOver = (e) => {
          const el = e.target.closest(".ht-l");
          if (!el || !ready || intro.isActive()) return;
          ctx.add(
            () => gsap.fromTo(el, { scaleX: 1.25, scaleY: 0.72 }, { scaleX: 1, scaleY: 1, duration: 0.8, ease: "elastic.out(1,.28)", overwrite: "auto" })
          );
        };
        if (h1 && window.matchMedia("(pointer: fine)").matches) {
          h1.addEventListener("pointerover", onOver);
          cleanups.push(() => h1.removeEventListener("pointerover", onOver));
        }
        const onInit = () => refreshAll();
        const onDone = () => {
          drawTape();
          drawBanner();
        };
        ScrollTrigger.addEventListener("refreshInit", onInit);
        ScrollTrigger.addEventListener("refresh", onDone);
        cleanups.push(() => {
          ScrollTrigger.removeEventListener("refreshInit", onInit);
          ScrollTrigger.removeEventListener("refresh", onDone);
        });
        gsap.to(tape, {
          p: 1,
          ease: "none",
          onUpdate: () => drawTape(),
          scrollTrigger: {
            trigger: run,
            start: "top top",
            end: () => "+=" + Math.max(200, tape.y1 - window.innerHeight * 0.62),
            scrub: 0.7,
            invalidateOnRefresh: true
          }
        });
        qa("[data-drop]").forEach((el, i) => {
          const s = i % 2 ? 1 : -1;
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
          tl.from(el, { y: 170, x: s * 80, rotation: s * 16, scale: 1.07, opacity: 0, duration: 1.05, ease: "back.out(1.5)" });
          const bits = el.querySelectorAll(".ht-tp-in");
          if (bits.length) tl.from(bits, { scale: 1.8, opacity: 0, duration: 0.28, ease: "power4.in", stagger: 0.09 }, 0.6);
        });
        gsap.to(bn, {
          reveal: 1,
          ease: "none",
          onUpdate: drawBanner,
          scrollTrigger: { trigger: banner, start: "top 92%", end: "top 30%", scrub: 0.6 }
        });
        const tick = (_t, dt) => {
          bn.off += dt / 1e3 * (70 + bn.boost);
          if (bn.boost > 2) {
            bn.ph += dt / 1e3 * bn.boost * 4e-3;
            buildWave(bn.A0 * (1 + Math.min(0.55, bn.boost / 900)));
          } else if (bn.A !== bn.A0) buildWave(bn.A0);
          bn.boost *= 0.93;
          drawBanner();
        };
        ScrollTrigger.create({
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick),
          onUpdate: (self) => {
            bn.boost = Math.min(700, Math.max(bn.boost, Math.abs(self.getVelocity()) * 0.35));
          }
        });
        cleanups.push(() => gsap.ticker.remove(tick));
        maskTimeline(
          gsap.timeline({
            onUpdate: drawMask,
            scrollTrigger: { trigger: mask, start: "top top", end: "bottom bottom", scrub: 0.6 }
          })
        );
        gsap.from(qa(".ht-daisy"), {
          scale: 0,
          rotation: -120,
          duration: 0.9,
          ease: "back.out(2.4)",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: mask, start: "top 55%", toggleActions: "play none none reverse" }
        });
        // Heading stays pinned; only tape/stamp/daisies animate
        for (const el of qa(".ht-daisy")) {
          gsap.to(el, { yPercent: -60 * Number(el.getAttribute("data-depth") || 1), ease: "none", scrollTrigger: { trigger: mask, start: "top bottom", end: "bottom top", scrub: true } });
        }
        for (const j of qa(".ht-join")) {
          gsap.fromTo(
            j.querySelector(".ht-join-in"),
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: j, start: "top 96%", end: "top 50%", scrub: 0.5 } }
          );
        }
        const cards = qa(".ht-prod");
        const shopTl = gsap.timeline({ scrollTrigger: { trigger: q(".ht-shop-grid"), start: "top 82%", toggleActions: "play none none reverse" } });
        shopTl.fromTo(
          cards,
          { y: 220, x: (i) => (1.5 - i) * 90, rotation: (i) => [-16, 11, -8, 14][i % 4], opacity: 0 },
          { y: 0, x: 0, rotation: 0, opacity: 1, duration: 1.05, ease: "back.out(1.4)", stagger: 0.1 }
        );
        shopTl.from(qa(".ht-prod .ht-tp-in"), { scale: 1.8, opacity: 0, duration: 0.26, ease: "power4.in", stagger: 0.05 }, 0.7);
        const word = q(".ht-word");
        const footTl = gsap.timeline({ scrollTrigger: { trigger: word, start: "top 85%", toggleActions: "play none none reverse" } });
        footTl.from(qa(".ht-word-l"), { yPercent: 70, scaleY: 0.3, opacity: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.07 }).from(qa(".ht-word .ht-tp-in"), { scale: 2, opacity: 0, duration: 0.25, ease: "power4.in", stagger: 0.06 }, 0.55);
        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(root);
        return () => ro.disconnect();
      });
    }, root);
    ctxRef.current = ctx;
    return () => {
      alive = false;
      ctx.revert();
      ctxRef.current = null;
      for (const fn of cleanups) fn();
    };
  }, [preloader, items.length, brand]);
  return <div ref={rootRef} className={"ht-root" + (className ? " " + className : "")} style={v({ "--h": height })}>{fontHref && <link rel="stylesheet" href={fontHref} />}<style>{CSS}</style>{preloader && <div className="ht-pre" aria-hidden="true"><div className="ht-pre-label"><span className="ht-pre-word">Building</span><span className="ht-pre-num">0%</span></div>{[C.off, C.sage, C.muted, C.forest, C.ink].map((c) => <i key={c} className="ht-pre-band" style={{ background: c }} />)}</div>}<header className={"ht-nav" + (menuOpen ? " ht-nav--mobile-open" : "")}><div className="ht-nav-in"><button type="button" className="ht-nav-brand" onClick={() => { setMenuOpen(false); go("top")(); }} aria-label={brand + ", back to top"}><BrandBadge brand={brand} /><span className="ht-brand-text">WebRivo</span></button><button type="button" className="ht-nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}><span></span><span></span><span></span></button><nav className="ht-nav-links" aria-label="Sections"><button type="button" onClick={() => { setMenuOpen(false); go("stories")(); }} data-num="01" >
              Work
            </button><button type="button" onClick={() => { setMenuOpen(false); go("tricks")(); }} data-num="02" >
              Process
            </button><button type="button" onClick={() => { setMenuOpen(false); go("shop")(); }} data-num="03" >
              Pricing
            </button><button type="button" onClick={() => { setMenuOpen(false); go("estimate")(); }} data-num="04" >
              Estimate
            </button></nav></div></header><div className="ht-run"><section className="ht-hero" data-sec="top"><svg className="ht-hill" viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150 Q800 -10 1600 150 L1600 300 L0 300Z" fill="rgba(221,227,213,.55)" /><path d="M0 176 Q800 16 1600 176 L1600 300 L0 300Z" fill={C.muted} /></svg><div className="ht-doodles" aria-hidden="true" /><div className="ht-hero-copy"><span className="ht-hero-mark" aria-hidden="true" /><h1 className="ht-h1" aria-label={headline.join(" ")}>{headline.map((line, li) => <span key={li} className="ht-h1-line" aria-hidden="true">{Array.from(line).map(
    (ch, i) => ch === " " ? <span key={i} className="ht-sp" /> : <span key={i} className="ht-l">{ch}</span>
  )}</span>)}</h1></div><p className="ht-cue"><span className="ht-cue-drag">Drag to look &middot; </span>Scroll, keep going <span aria-hidden="true">&darr;</span></p></section><section className="ht-collage" data-sec="stories" aria-label="Work"><div className="ht-board"><div className="ht-item ht-i-head" style={v({ "--r": "-3deg" })}><div className="ht-in" data-drop><p className="ht-label">02 &mdash; The studio wall</p><p className="ht-hint">psst, peel the tape off &rarr;</p><h2 className="ht-collage-h">
                  Made for
                  <br />
                  main street
                </h2></div></div><div className="ht-item ht-i-card" style={v({ "--r": "2.5deg" })}><div className="ht-in" data-drop><article className="ht-card ht-paper"><p className="ht-card-k">Our story &middot; small studio</p><p className="ht-card-t">{story}</p><p className="ht-card-sign">&mdash; the webrivo crew</p></article><Tape kind="masking" x="88%" y="2%" w="30%" r={38} peel /><Tape kind="masking" x="86%" y="98%" w="26%" r={-30} peel /></div></div><div className="ht-item ht-i-note" style={v({ "--r": "-7deg" })}><div className="ht-in" data-drop><div className="ht-note"><p className="ht-note-h">to-do list</p><ul>{todo.map((t, i) => <li key={i} className={i === 2 ? "ht-done" : void 0}>{t}</li>)}</ul></div><Tape kind="clear" x="50%" y="1%" w="56%" r={-4} peel /></div></div><div className="ht-item ht-i-seal" style={v({ "--r": "12deg" })}><div className="ht-in" data-drop><div className="ht-seal"><span>Live in</span><b>3 days</b><span>per site*</span></div></div></div></div></section><div className="ht-tape" aria-hidden="true"><div className="ht-strip"><div className="ht-strip-print">{(brand + " GET FOUND \u2726 ").repeat(24)}</div></div><Roll3D kind="clear" brand={brand} /></div></div><div className="ht-banner" aria-hidden="true"><svg className="ht-bn-svg" preserveAspectRatio="none"><defs><clipPath id={uid + "bc"}><rect className="ht-bn-cliprect" x="-240" y="-400" width="0" height="2000" /></clipPath></defs><path className="ht-bn-fill" fill={C.forest} /><g className="ht-bn-band" clipPath={"url(#" + uid + "bc)"}><path className="ht-bn-line" data-w="1.06" fill="none" stroke="rgba(244,245,239,.18)" transform="translate(0 7)" /><path className="ht-bn-line" data-w="1" fill="none" stroke={C.sage} /><path className="ht-bn-line" data-w="0.9" fill="none" stroke="rgba(221,227,213,.55)" /><g className="ht-bn-sheen"><path className="ht-bn-line" data-w="0.2" fill="none" stroke="rgba(255,255,255,.22)" /></g></g></svg><div className="ht-bn-glyphs">{items.map(
    (ch, i) => ch === "@" ? <span key={i} className="ht-mq-i ht-mq-logo"><BrandBadge brand={brand} /></span> : <span key={i} className="ht-mq-i">{ch}</span>
  )}</div><div className="ht-bn-roll"><RollFace kind="print" brand={brand} /></div></div><p className="ht-sr">{marquee.join(". ")}</p><section className="ht-mask" data-sec="tricks" aria-label="How we build"><div className="ht-mask-stage"><svg className="ht-mask-svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><mask id={uid + "mm"} maskUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1800"><rect x="-400" y="-400" width="2400" height="1800" fill="#fff" />{MK_STRIPS.map((s, i) => <rect key={i} x={-MK_L / 2} y={-MK_W / 2} width={MK_L} height={MK_W} fill="#000" transform={"translate(" + s.cx + " " + s.cy + ") rotate(" + s.a + ")"} />)}</mask><clipPath id={uid + "mc"}><rect className="ht-mk-cliprect" x="-200" y="-400" width="0" height="1800" /></clipPath><pattern id={uid + "pt"} width="420" height="26" patternUnits="userSpaceOnUse"><rect width="420" height="26" fill={C.sage} /><rect y="3" width="420" height="2" fill="rgba(24,53,43,.07)" /><rect y="11" width="300" height="1.5" fill="rgba(24,53,43,.13)" /><rect x="120" y="18" width="300" height="3" fill="rgba(255,255,255,.45)" /></pattern><pattern id={uid + "mt"} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-62)"><rect width="10" height="10" fill={C.sage} /><rect width="10" height="1.2" fill="rgba(24,53,43,.16)" /><rect y="5" width="10" height="0.8" fill={C.off} /></pattern><linearGradient id={uid + "me"} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.forest} stopOpacity="0.3" /><stop offset="0.07" stopColor={C.white} stopOpacity="0.22" /><stop offset="0.5" stopColor={C.white} stopOpacity="0" /><stop offset="0.93" stopColor={C.forest} stopOpacity="0.05" /><stop offset="1" stopColor={C.forest} stopOpacity="0.32" /></linearGradient><linearGradient id={uid + "mcu"} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.muted} /><stop offset="0.35" stopColor={C.off} /><stop offset="0.7" stopColor={C.sage} /><stop offset="1" stopColor={C.forest} /></linearGradient><linearGradient id={uid + "rl"} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.ink} /><stop offset="0.3" stopColor={C.muted} /><stop offset="0.55" stopColor={C.sage} /><stop offset="1" stopColor={C.forest} /></linearGradient></defs><g mask={"url(#" + uid + "mm)"}><g clipPath={"url(#" + uid + "mc)"}><rect x="-400" y="-400" width="2400" height="1800" fill={"url(#" + uid + "pt)"} /></g></g><g className="ht-mk-roller" opacity="0"><rect x="-150" y="-400" width="150" height="1800" fill={C.forest} opacity="0.35" /><rect x="-38" y="-400" width="76" height="1800" rx="38" fill={"url(#" + uid + "rl)"} /><rect x="-38" y="-400" width="76" height="1800" fill="none" stroke={C.ink} strokeWidth="2" strokeDasharray="3 9" opacity="0.5" /></g>{MK_STRIPS.map((s, i) => <g key={i} transform={"translate(" + s.cx + " " + s.cy + ") rotate(" + s.a + ")"}><g className="ht-mk-body" filter="drop-shadow(0 3px 2px rgba(24,53,43,.28))"><rect y={-MK_W / 2} height={MK_W} width="0" fill={"url(#" + uid + "mt)"} /><rect y={-MK_W / 2} height={MK_W} width="0" fill={"url(#" + uid + "me)"} /></g><g className="ht-mk-curl" opacity="0"><rect x="4" y={-MK_W / 2 - 4} width="34" height={MK_W + 8} rx="10" fill="rgba(24,53,43,.22)" /><rect x="-18" y={-MK_W / 2 - 8} width="34" height={MK_W + 16} rx="17" fill={"url(#" + uid + "mcu)"} /></g><g className="ht-mk-lead" opacity="0"><circle r="80" cy="6" fill="rgba(24,53,43,.28)" /><circle r="78" fill={C.off} /><circle r="78" fill="none" stroke={C.muted} strokeWidth="14" strokeDasharray="1 3" opacity="0.45" /><circle r="50" fill={C.muted} /><circle r="42" fill={C.forest} /><text y="5" textAnchor="middle" className="ht-mk-lead-t" fill={C.off} fontSize="17">{brand}</text><ellipse cx="-34" cy="-46" rx="20" ry="8" fill={C.white} opacity="0.3" transform="rotate(-36 -34 -46)" /></g></g>)}</svg><h2 className="ht-mask-h" aria-label={maskHeadline.join(" ")}>{maskHeadline.map((l, i) => <span key={i} className="ht-ml-wrap" aria-hidden="true"><span className="ht-ml">{l}</span></span>)}</h2><div className="ht-mask-roll" aria-hidden="true"><RollFace kind="masking" brand={brand} /></div><div className="ht-mask-stamp" aria-hidden="true">
            Live in
            <br />
            3 days
          </div><Daisy petals={8} color={C.sage} center={C.forest} className="ht-d1" /><Daisy petals={6} color={C.off} center={C.muted} className="ht-d2" /><Daisy petals={10} color={C.white} center={C.forest} className="ht-d3" /><Daisy petals={6} color={C.muted} center={C.white} className="ht-d4" /><Daisy petals={8} color={C.sage} center={C.muted} className="ht-d5" /></div></section><section className="ht-shop ht-grainy" data-sec="shop" aria-label="Shop"><div className="ht-join ht-join-masking" aria-hidden="true"><i className="ht-join-in" /></div><div className="ht-shop-head"><p className="ht-label">04 &mdash; The plans</p><h2 className="ht-shop-h">
            Pick your
            <br />
            plan
          </h2><p className="ht-shop-sub">Three ways in. Every plan includes hosting, maintenance, and a domain — you only pay a monthly subscription.</p></div><div className="ht-shop-grid">{products.map((p, i) => {
  const tier = p.name.toLowerCase() === "business" ? "business" : p.name.toLowerCase() === "premium" ? "premium" : "";
  const tierClass = tier ? ` ht-prod--${tier}` : "";
  return (
    <article key={p.name} className={"ht-prod" + tierClass}>
      {tier && <span className="ht-prod-badge">{TierBadge[tier]}</span>}
      <>
        <Tape kind="washi" x="18%" y="7%" w="36%" r={-28} />
        <Tape kind="washi" x="84%" y="7%" w="30%" r={22} />
      </>
      <div className="ht-prod-roll"><Roll3D kind={p.kind} brand={brand} /></div>
      <h3 className="ht-prod-name">{p.name}</h3>
      <p className="ht-prod-line">{p.line}</p>
      <div className="ht-prod-price">{p.price}</div>
      <div className="ht-prod-actions">
        <button type="button" className="ht-btn ht-btn-sm" onClick={sendPlanRequest(p.name)}>
          Send request
        </button>
        <button type="button" className="ht-btn ht-btn-sm ht-btn-customize" onClick={customizePlan(p.name)}>
          Customize
        </button>
      </div>
    </article>
  );
})}</div></section><section className="ht-estimator ht-grainy" data-sec="estimate" aria-label="Build your plan"><div className="ht-join ht-join-duct" aria-hidden="true"><i className="ht-join-in" /></div><Calculator /></section><footer className="ht-foot ht-grainy"><div className="ht-join ht-join-duct" aria-hidden="true"><i className="ht-join-in" /></div><div className="ht-foot-top"><div><p className="ht-label">05 &mdash; Say hello</p><p className="ht-foot-h">New work, local SEO notes, zero spam.</p></div><form
    className="ht-form"
    onSubmit={(e) => {
      e.preventDefault();
      setJoined(true);
    }}
  ><label className="ht-sr" htmlFor={uid + "em"}>
              Email address
            </label><input id={uid + "em"} type="email" required placeholder="you@example.com" className="ht-input" /><button type="submit" className="ht-btn">
              Send it over
            </button><p className="ht-form-msg" aria-live="polite">{joined ? "You're on the list." : ""}</p></form></div><div className="ht-word" aria-label={brand}>{Array.from(brand).map((ch, i) => <span key={i} className="ht-word-l" aria-hidden="true">{ch}<Tape kind="duct" x="50%" y="46%" w="72%" r={i % 2 ? 34 : -36} /></span>)}</div><div className="ht-foot-bar"><div className="ht-foot-addr"><div><p className="ht-label">Slv complex</p><p>Muddinapalya, Bangalore</p></div></div><div className="ht-foot-meta"><p>&copy; 2026 WebRivo &mdash; Websites for local businesses.</p><a href="mailto:support@webrivo.in">support@webrivo.in</a> · <a href="https://webrivo.in">webrivo.in</a></div></div></footer></div>
}
const CSS = `
.ht-root{
/* ---- Sage & Off-white : design tokens ---- */
--wb-off:#F4F5EF;--wb-white:#FFFFFF;--wb-sage:#DDE3D5;--wb-muted:#899982;--wb-forest:#18352B;--wb-ink:#202522;
/* palette-derived tints (no unrelated hues) */
--wb-forest-70:rgba(24,53,43,.7);--wb-forest-45:rgba(24,53,43,.45);--wb-sage-wash:rgba(221,227,213,.55);
--wb-line:rgba(137,153,130,.55);--wb-hairline:rgba(24,53,43,.14);
--wb-shadow-sm:0 1px 2px rgba(24,53,43,.06);--wb-shadow-md:0 14px 30px -18px rgba(24,53,43,.32);--wb-shadow-lg:0 32px 60px -34px rgba(24,53,43,.4);
--wb-ease:cubic-bezier(.22,.61,.36,1);--wb-card:4px;--wb-pill:999px;
/* ---- template aliases mapped onto the palette ---- */
--ht-lime:var(--wb-off);--ht-lime2:var(--wb-white);--ht-grass:var(--wb-sage);--ht-ink:var(--wb-forest);--ht-brown:var(--wb-muted);--ht-cocoa:var(--wb-forest);--ht-peach:var(--wb-sage);--ht-orange:var(--wb-forest);--ht-pink:var(--wb-sage);--ht-blush:var(--wb-off);--ht-yellow:var(--wb-sage);--ht-paper:var(--wb-white);--ht-display:"Bricolage Grotesque","Arial Narrow",system-ui,sans-serif;--ht-cond:"Anton","Impact","Arial Narrow",sans-serif;--ht-hand:"Caveat","Segoe Print","Comic Sans MS",cursive;--ht-noise:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>");position:relative;isolation:isolate;width:100%;container:ht/inline-size;overflow-x:clip;background:var(--ht-lime);color:var(--ht-ink);font-family:var(--ht-display);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.ht-root :where(button){font:inherit;color:inherit;cursor:pointer}
.ht-root :where(p,h1,h2,h3,ul){margin:0}
.ht-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ht-badge{display:block;width:100%;height:auto;max-width:none;overflow:visible;filter:drop-shadow(0 5px 7px rgba(24,53,43,.18));transition:filter .3s var(--wb-ease),transform .3s var(--wb-ease)}
.ht-badge-shell{fill:var(--wb-off);stroke:var(--wb-sage);stroke-width:2.5;transition:fill .3s var(--wb-ease),stroke .3s var(--wb-ease)}
.ht-badge-core{fill:var(--wb-forest);transition:fill .3s var(--wb-ease)}
.ht-badge-ring{fill:none;stroke:var(--wb-sage);stroke-width:1.6;stroke-dasharray:2.5 4;transition:stroke .3s var(--wb-ease)}
.ht-badge-mark{transform-origin:60px 60px;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.ht-badge-w{fill:var(--wb-off);transition:fill .3s var(--wb-ease)}
.ht-badge-arrow{fill:none;stroke:var(--wb-sage);stroke-width:5.5;stroke-linecap:round;stroke-linejoin:round;transition:stroke .3s var(--wb-ease)}
.ht-nav-brand:hover .ht-badge{filter:drop-shadow(0 9px 12px rgba(24,53,43,.26))}
.ht-nav-brand:hover .ht-badge-mark{transform:rotate(-6deg) scale(1.06)}
.ht-nav-brand:active .ht-badge-mark{transform:rotate(4deg) scale(.94)}
.ht-label{font-family:var(--ht-display);font-weight:700;font-stretch:90%;font-size:clamp(11px,1cqw,14px);letter-spacing:.14em;text-transform:uppercase}
.ht-grainy{position:relative}
.ht-grainy::before,.ht-paper::after{content:"";position:absolute;inset:0;pointer-events:none;background-image:var(--ht-noise);opacity:.14;mix-blend-mode:multiply;border-radius:inherit}
.ht-btn{display:inline-flex;align-items:center;gap:.45em;border:1px solid var(--wb-forest);background:var(--wb-forest);color:var(--wb-off);border-radius:var(--wb-pill);padding:.78em 1.35em;font-weight:600;font-stretch:92%;letter-spacing:.01em;font-size:13px;box-shadow:var(--wb-shadow-sm);transition:background .25s var(--wb-ease),color .25s var(--wb-ease),border-color .25s var(--wb-ease),transform .25s var(--wb-ease),box-shadow .25s var(--wb-ease)}
.ht-btn:hover{background:var(--wb-sage);color:var(--wb-forest);border-color:var(--wb-sage);transform:translateY(-1px);box-shadow:var(--wb-shadow-md)}
.ht-btn:active{transform:translateY(0);box-shadow:var(--wb-shadow-sm)}
.ht-btn:focus-visible,.ht-nav-in button:focus-visible,.ht-input:focus-visible{outline:2px solid var(--wb-forest);outline-offset:3px}
.ht-btn-sm{font-size:12px;padding:.7em 1.15em}

.ht-pre{position:absolute;left:0;right:0;top:0;height:max(var(--h),600px);z-index:40;overflow:hidden;background:var(--wb-off);pointer-events:none;visibility:hidden}
.ht-pre-band{position:absolute;left:-35%;width:170%;top:0;height:165%;border-radius:50% 50% 0 0/22% 22% 0 0;box-shadow:0 -10px 40px rgba(24,53,43,.08)}
.ht-pre-label{position:absolute;left:0;right:0;top:44%;display:flex;flex-direction:column;align-items:center;color:var(--wb-forest);z-index:1}
.ht-pre-word{font-weight:800;font-stretch:75%;text-transform:uppercase;font-size:clamp(28px,4cqw,56px);line-height:1}
.ht-pre-num{font-weight:700;font-size:14px;letter-spacing:.2em;margin-top:8px}

.ht-nav{position:fixed;inset:0 0 auto 0;z-index:30;height:0}
.ht-nav-in{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px clamp(14px,3cqw,40px)}
.ht-nav-brand{display:inline-flex;align-items:center;gap:.6em;padding:0;border:0;background:none;filter:drop-shadow(0 2px 2px rgba(24,53,43,.14));transition:transform .3s var(--wb-ease)}
.ht-nav-brand .ht-badge{width:clamp(48px,4.6cqw,66px);flex:none}
.ht-nav-brand:hover{transform:rotate(-8deg) scale(1.04)}
.ht-brand-text{font-family:var(--ht-cond);font-weight:400;font-size:clamp(1.1rem,2cqw,1.8rem);letter-spacing:-.02em;color:var(--wb-forest);display:inline-block;transition:color .8s cubic-bezier(.4,0,.2,1)}
.ht-nav--dark .ht-brand-text{color:var(--wb-off)}
.ht-nav-links{display:flex;gap:2px;background:rgba(255,255,255,.9);border:1px solid var(--wb-line);border-radius:var(--wb-pill);padding:4px;box-shadow:var(--wb-shadow-sm);transition:background .8s cubic-bezier(.4,0,.2,1),border-color .8s cubic-bezier(.4,0,.2,1)}
.ht-nav-links button{border:0;background:transparent;color:var(--wb-forest);padding:9px 15px;border-radius:var(--wb-pill);font-weight:600;font-stretch:92%;text-transform:uppercase;letter-spacing:.09em;font-size:11px;transition:background .2s var(--wb-ease),color .8s cubic-bezier(.4,0,.2,1)}
.ht-nav-links button:hover{background:var(--wb-sage)}
.ht-nav--dark .ht-nav-links{background:rgba(24,53,43,.88);border-color:rgba(244,245,239,.18)}
.ht-nav--dark .ht-nav-links button{color:var(--wb-off)}
.ht-nav--dark .ht-nav-links button:hover{background:rgba(221,227,213,.22)}
.ht-nav-burger{display:none;flex-direction:column;gap:5px;padding:8px 6px;border:0;background:none;cursor:pointer;align-items:center;touch-action:manipulation;position:relative;z-index:101}
.ht-nav-burger span{display:block;width:20px;height:2.5px;background:var(--wb-forest);border-radius:2px;transition:transform .35s var(--wb-ease),opacity .2s}
.ht-nav--dark .ht-nav-burger span{background:var(--wb-off)}
.ht-nav--mobile-open .ht-nav-burger{z-index:102}
.ht-nav--mobile-open .ht-nav-burger span{background:var(--wb-off)}
.ht-nav--mobile-open .ht-nav-burger span:nth-child(1){transform:translateY(7.5px) rotate(45deg)}
.ht-nav--mobile-open .ht-nav-burger span:nth-child(2){opacity:0}
.ht-nav--mobile-open .ht-nav-burger span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg)}
.ht-root{overflow-x:clip}

.ht-run{position:relative}
.ht-hero{position:relative;height:var(--h);min-height:600px;overflow:hidden;user-select:none;-webkit-user-select:none;background:radial-gradient(120% 90% at 50% 34%,var(--wb-white),var(--wb-off) 58%,var(--wb-off))}
.ht-hill{position:absolute;left:0;bottom:-1px;width:100%;height:23%;max-width:none}
.ht-hero-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding-top:max(96px,calc(var(--h) * .12))}
.ht-hero-mark{display:block;flex:none;width:clamp(64px,7cqw,112px);height:clamp(64px,7cqw,112px);margin-bottom:.1em;visibility:hidden}
.ht-kw{display:inline-block}
.ht-h1{display:flex;flex-direction:column;align-items:center;font-weight:800;font-stretch:75%;font-variation-settings:"opsz" 96;text-transform:uppercase;font-size:clamp(70px,20.5cqw,300px);line-height:.8;letter-spacing:-.015em;color:var(--wb-forest);text-shadow:0 .02em 0 rgba(24,53,43,.1)}
.ht-h1-line{display:flex;white-space:nowrap;overflow:visible}
.ht-l{display:inline-block;transform-origin:50% 100%;will-change:transform}
.ht-sp{display:inline-block;width:.18em}
.ht-cue-drag{display:none}
.ht-doodles{position:absolute;inset:0;z-index:3;pointer-events:none}
.ht-doodle{position:absolute;display:block;height:clamp(30px,3cqw,46px);margin-top:calc(clamp(30px,3cqw,46px) / -2);transform-origin:0 50%;overflow:hidden;white-space:nowrap;padding:0 10px;font-style:normal;font-weight:800;font-stretch:75%;font-size:clamp(11px,1cqw,15px);letter-spacing:.08em;line-height:clamp(30px,3cqw,46px);color:rgba(24,53,43,.3);background:linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.14) 16%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.16) 84%,rgba(255,255,255,.55)),rgba(244,245,239,.45);box-shadow:0 6px 10px rgba(24,53,43,.1);clip-path:polygon(0 0,6px 18%,0 36%,5px 54%,0 72%,6px 90%,2px 100%,calc(100% - 4px) 100%,100% 82%,calc(100% - 6px) 64%,100% 46%,calc(100% - 5px) 28%,100% 10%,calc(100% - 3px) 0)}
.ht-cue{position:absolute;z-index:3;right:clamp(14px,4cqw,64px);bottom:calc(var(--h) * .07);color:var(--wb-forest);opacity:.9;font-weight:600;font-stretch:92%;text-transform:uppercase;letter-spacing:.1em;font-size:11px}

.ht-collage{position:relative;background:radial-gradient(90% 60% at 50% 26%,rgba(244,245,239,.7),transparent 72%),radial-gradient(70% 50% at 18% 86%,rgba(244,245,239,.45),transparent 72%),var(--wb-sage);padding:clamp(30px,4cqw,70px) 0 clamp(110px,14cqw,200px)}
.ht-collage::before{content:"";position:absolute;inset:0;pointer-events:none;background:var(--ht-noise);opacity:.12;mix-blend-mode:multiply}
.ht-board{position:relative;width:min(1300px,94%);margin:0 auto;height:clamp(600px,54cqw,760px)}
.ht-item{position:absolute;z-index:2;transform:rotate(var(--r))}
.ht-in{position:relative}
.ht-i-head{z-index:1;left:2%;top:1%;width:40%;color:var(--wb-forest)}
.ht-i-head .ht-label{color:var(--wb-forest-70);margin-bottom:.8em}
.ht-collage-h{font-weight:800;font-stretch:75%;font-variation-settings:"opsz" 96;text-transform:uppercase;font-size:clamp(54px,8.4cqw,128px);line-height:.84;color:var(--wb-forest);text-shadow:0 .02em 0 rgba(24,53,43,.1)}
.ht-i-card{left:51.5%;top:5%;width:42%}
.ht-i-note{z-index:2;left:14%;top:52%;width:22%}
.ht-i-seal{left:88%;top:1%;width:11%}

.ht-paper{position:relative}
.ht-card::before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(155deg,rgba(221,227,213,.35),transparent 40%);border-radius:inherit}
.ht-card{background:var(--wb-white);color:var(--wb-forest);border:1px solid var(--wb-line);border-radius:2px;padding:clamp(24px,3cqw,48px) clamp(22px,3cqw,48px) clamp(26px,3cqw,44px);box-shadow:var(--wb-shadow-lg)}
.ht-card-k{font-family:var(--ht-display);font-weight:600;font-stretch:92%;text-transform:uppercase;letter-spacing:.14em;font-size:11px;color:var(--wb-forest);opacity:.6;margin-bottom:1.2em}
.ht-card-t{font-family:var(--ht-display);font-weight:500;font-stretch:92%;font-size:clamp(21px,2.55cqw,36px);line-height:1.26;letter-spacing:-.012em;color:var(--wb-forest);text-wrap:pretty}
.ht-card-sign{font-family:var(--ht-hand);font-weight:600;font-size:clamp(20px,2cqw,28px);margin-top:.9em;rotate:-2deg;color:var(--wb-forest-70)}

.ht-note{position:relative;background:var(--wb-white);border:1px solid var(--wb-line);border-radius:2px;padding:clamp(22px,2.4cqw,34px) clamp(20px,2.2cqw,32px) clamp(26px,3cqw,40px);color:var(--wb-forest);font-family:var(--ht-display);box-shadow:var(--wb-shadow-lg)}
.ht-note::after{content:"";position:absolute;right:0;bottom:0;width:26%;height:14%;background:linear-gradient(135deg,transparent 48%,rgba(24,53,43,.08) 50%,var(--wb-off) 52%,var(--wb-white) 100%);border-top-left-radius:60% 30%}
.ht-note-h{font-weight:600;font-stretch:92%;text-transform:uppercase;letter-spacing:.14em;font-size:clamp(11px,1.05cqw,14px);line-height:1.2;margin-bottom:1.1em;color:var(--wb-forest-70)}
.ht-note ul{list-style:none;padding:0;font-size:clamp(15px,1.28cqw,19px);line-height:1.5;font-weight:500;font-stretch:96%;letter-spacing:-.005em}
.ht-note li{position:relative;padding-left:1.35em}
.ht-note li::before{content:"";position:absolute;left:0;top:.42em;width:.5em;height:.5em;border:1.5px solid var(--wb-muted);border-radius:2px}
.ht-note li.ht-done{text-decoration:line-through;text-decoration-thickness:1px;text-decoration-color:var(--wb-muted);color:var(--wb-muted)}
.ht-note li.ht-done::after{content:"";position:absolute;left:.11em;top:.06em;width:.24em;height:.52em;border:solid var(--wb-muted);border-width:0 2px 2px 0;rotate:40deg}

.ht-lemon::before{content:"";position:absolute;right:0;bottom:0;z-index:1;width:24%;height:15%;background:linear-gradient(135deg,transparent 48%,rgba(24,53,43,.08) 50%,var(--wb-off) 52%,var(--wb-white) 100%);border-top-left-radius:60% 30%;box-shadow:-4px -4px 8px rgba(24,53,43,.05)}
.ht-seal{display:grid;place-items:center;align-content:center;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 34% 28%,rgba(221,227,213,.18),transparent 62%),var(--wb-forest);color:var(--wb-sage);text-align:center;font-weight:600;font-stretch:92%;text-transform:uppercase;line-height:1.15;font-size:clamp(10px,.95cqw,13px);letter-spacing:.1em;box-shadow:0 0 0 4px var(--wb-white),var(--wb-shadow-md)}
.ht-seal b{font-family:var(--ht-display);font-size:2.1em;font-weight:700;font-stretch:80%;letter-spacing:-.02em;color:var(--wb-white);text-transform:none}

.ht-tp{position:absolute;z-index:3;height:clamp(24px,2.3cqw,36px);transform:translate(-50%,-50%) rotate(var(--r)) translateY(var(--lift,0px));transition:transform .3s;pointer-events:none}
.ht-in:hover .ht-tp{--lift:-2px}
.ht-tp-in::after{content:"";position:absolute;inset:0;background-image:var(--ht-noise);opacity:.18;mix-blend-mode:multiply}
.ht-tp-in::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.5),transparent 14%,transparent 86%,rgba(0,0,0,.08))}
.ht-peel{pointer-events:auto;cursor:grab;touch-action:none}
.ht-peel:focus-visible{outline:3px dashed var(--ht-paper);outline-offset:4px}
.ht-peel:hover .ht-tp-in{filter:brightness(1.07)}
.ht-lifting{cursor:grabbing;filter:drop-shadow(0 12px 8px rgba(0,40,10,.4))}
.ht-peeled{pointer-events:none}
.ht-hint{font-family:var(--ht-hand);font-weight:600;font-size:clamp(19px,1.7cqw,26px);color:var(--wb-forest-70);margin:.2em 0 .5em;rotate:-2deg}
.ht-tp-in{position:absolute;inset:0;display:block;clip-path:polygon(0 4%,3% 22%,0 40%,4% 58%,1% 78%,3% 100%,97% 96%,100% 78%,96% 60%,100% 42%,97% 22%,100% 0)}
.ht-tp-clear .ht-tp-in{background:linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.22) 18%,rgba(255,255,255,.1) 55%,rgba(255,255,255,.4)),rgba(244,245,239,.5);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5)}
.ht-tp-masking .ht-tp-in{background:repeating-linear-gradient(118deg,rgba(24,53,43,.07) 0 1px,transparent 1px 6px),linear-gradient(180deg,rgba(221,227,213,.98),rgba(221,227,213,.88) 50%,rgba(137,153,130,.62));opacity:.94}
.ht-tp-print .ht-tp-in{background:repeating-linear-gradient(90deg,transparent 0 14px,rgba(24,53,43,.3) 14px 17px,transparent 17px 24px),linear-gradient(180deg,var(--wb-sage),var(--wb-off));opacity:.92}
.ht-tp-washi .ht-tp-in{background:radial-gradient(circle,rgba(255,255,255,.75) 0 1.6px,transparent 2.2px) 0 0/10px 10px,rgba(221,227,213,.95);opacity:.92}
.ht-tp-duct .ht-tp-in{background:repeating-linear-gradient(45deg,rgba(255,255,255,.16) 0 1px,transparent 1px 4px),repeating-linear-gradient(-45deg,rgba(24,53,43,.07) 0 1px,transparent 1px 4px),linear-gradient(180deg,var(--wb-muted),rgba(137,153,130,.82) 50%,rgba(24,53,43,.75));box-shadow:0 2px 4px rgba(24,53,43,.22)}

.ht-tape{position:absolute;inset:0;z-index:5;pointer-events:none}
.ht-strip{position:absolute;left:50%;top:0;width:calc(clamp(124px,16.5cqw,250px) * .5);height:0;transform:translateX(-50%);overflow:hidden;clip-path:polygon(0 9px,8% 0,17% 8px,25% 1px,34% 10px,42% 2px,50% 8px,59% 0,67% 9px,76% 1px,84% 10px,92% 2px,100% 8px,100% 100%,0 100%);background:linear-gradient(90deg,rgba(255,255,255,.62),rgba(255,255,255,.16) 9%,rgba(255,255,255,.05) 45%,rgba(255,255,255,.14) 88%,rgba(255,255,255,.6)),rgba(244,245,239,.42);box-shadow:0 0 0 1px rgba(255,255,255,.3),0 8px 16px rgba(24,53,43,.12)}
.ht-strip::before{content:"";position:absolute;inset:0;background:linear-gradient(172deg,transparent 0 38%,rgba(255,255,255,.5) 46%,rgba(255,255,255,.12) 50%,transparent 58%) 0 var(--gy,0px)/100% 520px repeat-y;mix-blend-mode:screen}
.ht-strip::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 3px 5px,rgba(255,255,255,.55),transparent) 30% 0/46px 140px,radial-gradient(ellipse 2px 4px,rgba(255,255,255,.4),transparent) 70% 60px/38px 210px;opacity:.7}
.ht-strip-print{position:absolute;left:50%;top:14px;writing-mode:vertical-rl;transform:translateX(-50%) rotate(180deg);white-space:nowrap;font-weight:800;font-stretch:75%;text-transform:uppercase;font-size:calc(clamp(124px,16.5cqw,250px) * .17);letter-spacing:.06em;color:rgba(24,53,43,.26)}

.ht-roll{--d:clamp(124px,16.5cqw,250px);--w:calc(var(--d) * .5);position:absolute;left:50%;top:0;width:var(--d);height:var(--d);margin:calc(var(--d) / -2) 0 0 calc(var(--d) / -2);perspective:1100px;z-index:5;will-change:transform}
.ht-roll-shadow{position:absolute;left:8%;right:8%;bottom:-8%;height:26%;border-radius:50%;background:radial-gradient(closest-side,rgba(24,53,43,.26),transparent);filter:blur(4px)}
.ht-roll-body{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateY(var(--tilt,-40deg)) rotateX(var(--spin,0deg))}
.ht-roll-facet{position:absolute;left:calc(50% - var(--w) / 2);top:calc(50% - var(--d) * .051);width:var(--w);height:calc(var(--d) * .102);--a:calc(var(--i) * 11.25deg + var(--spin,0deg));--s:calc(.05 + .4 * (1 - max(0,cos(var(--a)))));--g:calc(max(0,cos(var(--a) + 32deg) - .86) * 4.5);backface-visibility:hidden;transform:rotateX(calc(var(--i) * 11.25deg)) translateZ(calc(var(--d) / 2 - .5px));background:linear-gradient(rgba(255,255,255,var(--g,0)),rgba(255,255,255,var(--g,0))),linear-gradient(rgba(24,53,43,var(--s,.1)),rgba(24,53,43,var(--s,.1))),linear-gradient(90deg,var(--edge) 0 5%,var(--band) 14% 86%,var(--edge) 95%)}
.ht-roll-cap{position:absolute;inset:0;transform:rotateY(90deg) translateZ(calc(var(--w) / 2))}
.ht-roll-cap-b{transform:rotateY(-90deg) translateZ(calc(var(--w) / 2))}
.ht-roll-cap .ht-face{--d:100%;width:100%;height:100%}
.ht-k-clear{--band:var(--wb-off);--edge:var(--wb-sage)}
.ht-k-print{--band:var(--wb-sage);--edge:var(--wb-muted)}
.ht-k-masking{--band:var(--wb-white);--edge:var(--wb-muted)}
.ht-k-washi{--band:var(--wb-muted);--edge:var(--wb-forest)}
.ht-k-duct{--band:var(--wb-forest);--edge:var(--wb-ink)}

.ht-face{--d:160px;position:relative;width:var(--d);height:var(--d);border-radius:50%;container-type:size;background:radial-gradient(circle,transparent 0 30%,var(--ring2) 30.5%,var(--ring1) 34%,var(--ring2) 62%,var(--ring1) 97%,var(--rim) 99%),repeating-radial-gradient(circle,var(--ring1) 0 1.2%,var(--ring2) 1.2% 2%);box-shadow:inset 0 0 0 2px rgba(255,255,255,.5),inset -8px -10px 18px rgba(24,53,43,.12)}
.ht-face-core{position:absolute;inset:27%;border-radius:50%;background:radial-gradient(circle,var(--wb-white) 0 70%,var(--wb-off) 75%,var(--wb-sage) 88%,var(--wb-muted) 100%);box-shadow:inset 0 0 0 1px rgba(24,53,43,.16)}
.ht-face-label{position:absolute;inset:31%;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--lab);color:var(--labink);text-align:center;line-height:.9;box-shadow:inset 0 0 0 2px rgba(255,255,255,.5),inset 0 -3px 6px rgba(24,53,43,.16)}
.ht-face-brand{font-weight:800;font-stretch:75%;font-size:9.5cqw;letter-spacing:.02em}
.ht-face-kind{font-weight:700;font-stretch:85%;text-transform:uppercase;font-size:4.6cqw;letter-spacing:.12em;margin-top:2px;opacity:.85}
.ht-face-gloss{position:absolute;inset:0;border-radius:50%;background:radial-gradient(60% 34% at 32% 18%,rgba(255,255,255,.45),transparent 70%),radial-gradient(40% 20% at 70% 86%,rgba(255,255,255,.14),transparent);pointer-events:none}
.ht-face.ht-k-clear{--ring1:var(--wb-white);--ring2:var(--wb-off);--rim:var(--wb-sage);--lab:var(--wb-forest);--labink:var(--wb-off)}
.ht-face.ht-k-print{--ring1:var(--wb-sage);--ring2:rgba(244,245,239,.75);--rim:var(--wb-muted);--lab:var(--wb-sage);--labink:var(--wb-forest)}
.ht-face.ht-k-masking{--ring1:var(--wb-white);--ring2:var(--wb-sage);--rim:var(--wb-muted);--lab:var(--wb-forest);--labink:var(--wb-off)}
.ht-face.ht-k-washi{--ring1:var(--wb-sage);--ring2:var(--wb-muted);--rim:var(--wb-forest);--lab:var(--wb-muted);--labink:var(--wb-white)}
.ht-face.ht-k-duct{--ring1:var(--wb-muted);--ring2:rgba(24,53,43,.55);--rim:var(--wb-ink);--lab:var(--wb-ink);--labink:var(--wb-sage)}

.ht-banner{position:relative;z-index:6;height:clamp(170px,21cqw,320px);margin-top:calc(clamp(170px,21cqw,320px) * -.5);pointer-events:none}
.ht-bn-svg{position:absolute;inset:0;width:100%;height:100%;max-width:none;overflow:visible}
.ht-banner::after{content:"";position:absolute;inset:0;pointer-events:none;background:var(--ht-noise);opacity:.12;mix-blend-mode:multiply;-webkit-mask-image:linear-gradient(transparent 55%,#000 90%);mask-image:linear-gradient(transparent 55%,#000 90%)}
.ht-bn-band{filter:drop-shadow(0 10px 12px rgba(24,53,43,.2))}
.ht-bn-glyphs{position:absolute;inset:0}
.ht-mq-i{position:absolute;left:0;top:0;display:block;font-weight:800;font-stretch:75%;font-variation-settings:"opsz" 96;text-transform:uppercase;font-size:var(--fs,40px);line-height:1;white-space:pre;color:var(--wb-off);will-change:transform}
.ht-mq-logo{width:1.05em;height:1em;padding:0 .02em}
.ht-mq-logo .ht-badge{width:1em;height:1em}
.ht-bn-roll{position:absolute;left:0;top:0;opacity:0;filter:drop-shadow(0 8px 8px rgba(24,53,43,.3))}
.ht-bn-roll .ht-face{--d:inherit}

.ht-mask{position:relative;height:calc(max(var(--h),600px) * 2.7);background:var(--wb-forest)}
.ht-mask-stage{position:sticky;top:0;height:max(var(--h),600px);overflow:hidden}
.ht-mask-stage::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:var(--ht-noise);opacity:.12;mix-blend-mode:multiply}
.ht-mask-svg{position:absolute;inset:0;width:100%;height:100%;max-width:none}
.ht-mk-lead-t{font-family:var(--ht-display);font-weight:800;font-stretch:75%}
.ht-mask-h{position:absolute;z-index:3;left:clamp(16px,5cqw,80px);top:calc(max(var(--h),600px) * .13);display:flex;flex-direction:column;font-weight:800;font-stretch:75%;font-variation-settings:"opsz" 96;text-transform:uppercase;font-size:clamp(64px,13.5cqw,210px);line-height:.82;color:var(--wb-off);text-shadow:.02em .03em 0 rgba(221,227,213,.3)}
.ht-ml-wrap{display:block;overflow:hidden;padding:0 .06em .06em 0}
.ht-ml{display:block}
.ht-mask-roll{position:absolute;z-index:3;right:clamp(16px,7cqw,120px);top:calc(max(var(--h),600px) * .2);filter:drop-shadow(0 22px 24px rgba(9,20,16,.45))}
.ht-mask-roll .ht-face{--d:clamp(170px,26cqw,380px)}
.ht-mask-stamp{position:absolute;z-index:4;right:clamp(30px,12cqw,220px);bottom:calc(max(var(--h),600px) * .1);padding:.4em .8em .45em;border:2px solid var(--wb-off);border-radius:var(--wb-card);color:var(--wb-forest);background:rgba(244,245,239,.94);font-weight:700;font-stretch:85%;letter-spacing:-.01em;font-size:clamp(24px,3cqw,46px);line-height:1;text-align:center;opacity:0;box-shadow:var(--wb-shadow-md)}
.ht-daisy{position:absolute;z-index:2;width:clamp(56px,7cqw,110px);height:auto;max-width:none;filter:drop-shadow(0 8px 8px rgba(9,20,16,.3))}
.ht-d1{left:41%;top:7%}
.ht-d2{left:31%;top:62%;width:clamp(44px,5cqw,80px)}
.ht-d3{right:4%;top:6%}
.ht-d4{left:58%;bottom:6%;width:clamp(46px,5.5cqw,86px)}
.ht-d5{right:30%;top:64%;width:clamp(40px,4.5cqw,70px)}

.ht-join{position:absolute;left:-6%;width:112%;top:0;height:clamp(40px,4.4cqw,64px);transform:translateY(-50%) rotate(-1.6deg);z-index:7;pointer-events:none}
.ht-join-in{position:absolute;inset:0;display:block;transform-origin:0 50%}
.ht-join-masking .ht-join-in{background:repeating-linear-gradient(118deg,rgba(24,53,43,.1) 0 1px,transparent 1px 5px),linear-gradient(180deg,rgba(221,227,213,.98),rgba(221,227,213,.82) 50%,rgba(137,153,130,.7));box-shadow:0 6px 12px rgba(24,53,43,.18)}
.ht-join-duct{transform:translateY(-50%) rotate(1.4deg)}
.ht-join-duct .ht-join-in{background:repeating-linear-gradient(45deg,rgba(255,255,255,.14) 0 1px,transparent 1px 4px),repeating-linear-gradient(-45deg,rgba(24,53,43,.06) 0 1px,transparent 1px 4px),linear-gradient(180deg,var(--wb-muted),rgba(137,153,130,.85) 45%,rgba(24,53,43,.9));box-shadow:0 6px 12px rgba(24,53,43,.22)}

.ht-shop{background:var(--wb-off);color:var(--wb-forest);padding:clamp(80px,9cqw,140px) clamp(16px,4cqw,64px) clamp(90px,10cqw,160px)}
.ht-shop-head{position:relative;display:grid;grid-template-columns:auto 1fr;align-items:end;gap:12px 48px;max-width:1300px;margin:0 auto clamp(40px,5cqw,80px)}
.ht-shop-head .ht-label{grid-column:1/-1}
.ht-shop-h{font-weight:800;font-stretch:75%;font-variation-settings:"opsz" 96;text-transform:uppercase;font-size:clamp(60px,10.5cqw,170px);line-height:.82;color:var(--wb-forest)}
.ht-shop-sub{max-width:360px;font-size:15px;line-height:1.5;font-weight:400;font-stretch:96%;color:var(--wb-forest-70);padding-bottom:.6em}
.ht-shop-grid{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2.4cqw,36px);max-width:1200px;margin:0 auto}
.ht-prod{position:relative;display:flex;flex-direction:column;padding:clamp(24px,2.2cqw,34px) clamp(20px,1.8cqw,28px) 22px;background:var(--wb-white);border:1px solid var(--wb-line);border-radius:var(--wb-card);box-shadow:var(--wb-shadow-md);transition:transform .4s var(--wb-ease),box-shadow .4s var(--wb-ease)}
.ht-prod:hover{transform:translateY(-6px);box-shadow:var(--wb-shadow-lg)}
.ht-prod .ht-tp{height:clamp(22px,2cqw,30px)}

.ht-prod--business{border-color:color-mix(in srgb,var(--wb-muted) 55%,transparent);background:linear-gradient(172deg,var(--wb-white) 0%,color-mix(in srgb,var(--wb-sage) 18%,var(--wb-white)) 60%,var(--wb-sage) 100%);box-shadow:0 16px 40px -20px rgba(24,53,43,.22),inset 0 1px 0 rgba(255,255,255,.9)}
.ht-prod--business:hover{box-shadow:0 26px 56px -24px rgba(24,53,43,.32),inset 0 1px 0 rgba(255,255,255,.9)}
.ht-prod--business .ht-prod-name{background:linear-gradient(135deg,var(--wb-forest) 0%,var(--wb-muted) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ht-prod--business .ht-prod-price{color:var(--wb-forest)}
.ht-prod--business .ht-btn-sm{background:var(--wb-muted);border-color:var(--wb-muted);color:var(--wb-off)}
.ht-prod--business .ht-btn-sm:hover{background:var(--wb-forest);border-color:var(--wb-forest);color:var(--wb-off)}
.ht-prod--business .ht-prod-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--wb-muted);color:var(--wb-white);font-weight:700;font-stretch:85%;text-transform:uppercase;letter-spacing:.12em;font-size:10px;padding:4px 14px;border-radius:var(--wb-pill);box-shadow:0 4px 12px rgba(24,53,43,.2);z-index:4;white-space:nowrap}

.ht-prod--premium{border:none;background:radial-gradient(ellipse at 50% 0%,rgba(221,227,213,.3) 0%,transparent 65%),var(--wb-forest);color:var(--wb-off);box-shadow:0 24px 64px -28px rgba(9,20,16,.55),0 0 0 1px rgba(221,227,213,.15),inset 0 1px 0 rgba(255,255,255,.07);overflow:hidden}
.ht-prod--premium::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background-image:var(--ht-noise);opacity:.08;z-index:0}
.ht-prod--premium::after{content:"";position:absolute;left:10%;right:10%;bottom:6%;height:45%;background:radial-gradient(ellipse,rgba(137,153,130,.22) 0%,transparent 72%);filter:blur(32px);z-index:0;pointer-events:none}
.ht-prod--premium:hover{transform:translateY(-8px);box-shadow:0 36px 80px -32px rgba(9,20,16,.65),0 0 0 1px rgba(221,227,213,.24),inset 0 1px 0 rgba(255,255,255,.1)}
.ht-prod--premium{overflow:visible}
.ht-prod--premium > *{z-index:1}
.ht-prod--premium .ht-prod-name{background:linear-gradient(135deg,var(--wb-off) 0%,var(--wb-sage) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none}
.ht-prod--premium .ht-prod-line{color:rgba(221,227,213,.72)}
.ht-prod--premium .ht-prod-price{color:var(--wb-sage)}
.ht-prod--premium .ht-btn-sm{background:var(--wb-off);border-color:var(--wb-off);color:var(--wb-forest);font-weight:700}
.ht-prod--premium .ht-btn-sm:hover{background:var(--wb-sage);border-color:var(--wb-sage);transform:translateY(-1px)}
.ht-prod--premium .ht-prod-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--wb-off);color:var(--wb-forest);font-weight:800;font-stretch:80%;text-transform:uppercase;letter-spacing:.16em;font-size:10px;padding:4px 14px;border-radius:var(--wb-pill);box-shadow:0 4px 14px rgba(9,20,16,.35);z-index:5;white-space:nowrap}
.ht-prod-roll{position:relative;height:clamp(150px,15cqw,220px);margin:6px 0 14px}
.ht-prod-roll .ht-roll{--d:clamp(118px,12cqw,180px);top:50%}
.ht-prod-roll .ht-roll-body{--tilt:-58deg;--spin:-24deg;transition:transform 1.1s cubic-bezier(.25,1.2,.4,1)}
.ht-prod:hover .ht-roll-body{transform:rotateY(var(--tilt)) rotateX(calc(var(--spin) - 360deg))}
.ht-prod-name{font-weight:800;font-stretch:75%;text-transform:uppercase;font-size:clamp(30px,2.8cqw,42px);line-height:.9}
.ht-prod-line{margin:.6em 0 1.4em;font-size:14px;line-height:1.55;font-weight:400;font-stretch:96%;color:var(--wb-forest-70);flex:1}
.ht-prod-foot{display:flex;align-items:center;justify-content:space-between;gap:10px}
.ht-prod-price{font-family:var(--ht-display);font-weight:800;font-stretch:80%;font-size:clamp(24px,2.2cqw,30px);letter-spacing:-.02em;line-height:1;margin-bottom:18px}
.ht-prod-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto}
.ht-prod-actions .ht-btn{justify-content:center;text-align:center;text-decoration:none;white-space:nowrap}
.ht-prod-actions .ht-btn-customize{background:transparent;color:var(--wb-forest);border-color:var(--wb-line);font-weight:600}
.ht-prod-actions .ht-btn-customize:hover{background:var(--wb-sage);border-color:var(--wb-sage);color:var(--wb-forest)}
.ht-prod-actions .ht-btn-customize{grid-column:1/-1}
.ht-prod--premium .ht-prod-actions .ht-btn-customize{background:transparent;color:var(--wb-off);border-color:rgba(221,227,213,.36);font-weight:600}
.ht-prod--premium .ht-prod-actions .ht-btn-customize:hover{background:rgba(221,227,213,.12);border-color:var(--wb-sage);color:var(--wb-white)}

.ht-estimator {
  background: var(--wb-off);
  color: var(--wb-forest);
  padding: clamp(80px,9cqw,140px) clamp(16px,4cqw,64px);
}

.ht-foot{background:var(--wb-sage);color:var(--wb-forest);padding:clamp(80px,8cqw,130px) clamp(16px,4cqw,64px) 26px;overflow:hidden}

.ht-foot-top{position:relative;display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:24px;max-width:1300px;margin:0 auto}
.ht-foot-h{font-weight:800;font-stretch:75%;text-transform:uppercase;font-size:clamp(34px,4.4cqw,64px);line-height:.88;max-width:13ch;margin-top:.3em}
.ht-form{display:flex;flex-wrap:wrap;gap:10px;align-items:center;max-width:480px}
.ht-input{flex:1 1 220px;min-width:0;height:50px;padding:0 20px;border:1px solid var(--wb-line);border-radius:var(--wb-pill);background:var(--wb-white);color:var(--wb-forest);font:inherit;font-size:15px;font-weight:500;transition:border-color .25s var(--wb-ease),box-shadow .25s var(--wb-ease)}
.ht-input::placeholder{color:var(--wb-forest-45)}
.ht-input:focus{border-color:var(--wb-forest);box-shadow:0 0 0 3px rgba(24,53,43,.08);outline:none}
.ht-form-msg{flex-basis:100%;min-height:1.3em;font-family:var(--ht-hand);font-size:22px;font-weight:600;color:var(--wb-forest)}
.ht-word{position:relative;display:flex;justify-content:center;margin:clamp(30px,4cqw,60px) auto 0;font-weight:800;font-stretch:75%;font-variation-settings:"opsz" 96;font-size:clamp(110px,29cqw,470px);line-height:.78;color:var(--wb-muted);letter-spacing:-.02em}
.ht-word-l{position:relative;display:inline-block}
.ht-word .ht-tp{height:.11em;z-index:2}
.ht-foot-bar{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:24px 64px;max-width:1300px;margin:clamp(24px,3cqw,40px) auto 0;padding-top:28px;border-top:1px solid var(--wb-hairline)}
.ht-foot-addr{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex:1}
.ht-foot-addr .ht-label{margin-bottom:.2em}
.ht-foot-addr p{margin:2px 0;font-size:13px;font-weight:500;color:var(--wb-forest-70)}
.ht-foot-addr a{font-size:13px;font-weight:600;color:var(--wb-forest);text-decoration:none;white-space:nowrap;transition:color .2s}
.ht-foot-addr a:hover{color:var(--wb-muted)}
.ht-foot-meta{font-size:12px;font-weight:500;font-stretch:94%;color:var(--wb-forest-70);white-space:nowrap}
.ht-foot-meta p{margin:0 0 3px}
.ht-foot-meta a{color:inherit;text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px;transition:color .2s}
.ht-foot-meta a:hover{color:var(--wb-forest)}

@container ht (max-width:900px){
.ht-shop-grid{grid-template-columns:repeat(2,1fr)}
.ht-prod:nth-child(even){margin-top:0}
.ht-prod:last-child{grid-column:1/-1;justify-self:center;width:calc(50% - 12px)}
.ht-shop-head{grid-template-columns:1fr}
}
@container ht (max-width:720px){
.ht-nav-burger{display:flex}
.ht-nav-links{display:none}
.ht-nav--mobile-open .ht-nav-in{position:relative;z-index:101}
@keyframes ht-menu-slide{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes ht-menu-item-in{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
.ht-nav--mobile-open .ht-nav-links{display:flex;flex-direction:column;position:fixed;inset:0;z-index:100;background:var(--wb-forest);padding:88px 32px 48px;justify-content:center;gap:0;border:0;border-radius:0;box-shadow:none;animation:ht-menu-slide .5s cubic-bezier(.32,0,0,1) both}
.ht-nav--mobile-open .ht-nav-links::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--wb-sage)}
.ht-nav--mobile-open .ht-nav-links button{width:100%;padding:12px 0;border:0;background:transparent;color:var(--wb-off);font-family:var(--ht-cond);font-size:clamp(1.8rem,12cqw,3.6rem);font-weight:400;letter-spacing:.06em;text-transform:uppercase;text-align:left;line-height:1.1;cursor:pointer;opacity:0;animation:ht-menu-item-in .45s ease forwards;transition:color .25s}
.ht-nav--mobile-open .ht-nav-links button::before{content:attr(data-num);display:block;font-size:.38em;font-weight:400;color:var(--wb-sage);opacity:.7;letter-spacing:.12em;margin-bottom:2px;transition:opacity .25s}
.ht-nav--mobile-open .ht-nav-links button:hover{color:var(--wb-sage)}
.ht-nav--mobile-open .ht-nav-links button:hover::before{opacity:1}
.ht-nav--mobile-open .ht-nav-links button:nth-child(1){animation-delay:.12s}
.ht-nav--mobile-open .ht-nav-links button:nth-child(2){animation-delay:.22s}
.ht-nav--mobile-open .ht-nav-links button:nth-child(3){animation-delay:.32s}
.ht-nav--mobile-open .ht-nav-links button:nth-child(4){animation-delay:.42s}
.ht-nav--dark.ht-nav--mobile-open .ht-nav-links button{color:var(--wb-off)}
.ht-nav--dark.ht-nav--mobile-open .ht-nav-links button::before{color:var(--wb-sage)}
.ht-hero-copy{position:absolute;inset:0 0 24% 0;justify-content:center;padding-top:60px}
.ht-hero-mark{width:64px;height:64px}
.ht-h1{font-size:clamp(52px,25cqw,300px);line-height:.82}
.ht-cue{bottom:calc(var(--h) * .2)}
.ht-board{height:auto;display:flex;flex-direction:column;gap:46px;padding-bottom:20px}
.ht-item{position:relative;left:auto;top:auto}
.ht-i-head{width:94%;order:0}
.ht-i-card{width:94%;align-self:center;order:1}
.ht-i-note{width:72%;order:2}
.ht-i-seal{width:34%;order:6;margin-left:8%}
.ht-collage-h{font-size:17cqw}
.ht-card-t{font-size:8.6cqw}
.ht-note ul{font-size:24px}
.ht-mask-h{font-size:19cqw;top:calc(max(var(--h),600px) * .11)}
.ht-mask-roll{right:auto;left:50%;top:auto;bottom:calc(max(var(--h),600px) * .3);translate:-50% 0}
.ht-mask-roll .ht-face{--d:44cqw}
.ht-mask-stamp{right:18px;bottom:calc(max(var(--h),600px) * .5)}
.ht-d2,.ht-d5{display:none}
.ht-d1{left:auto;right:6%;top:30%}
.ht-shop-grid{grid-template-columns:1fr;gap:34px}
.ht-prod,.ht-prod:last-child{width:88%;justify-self:center;grid-column:auto}
.ht-prod-roll{height:52cqw}
.ht-prod-roll .ht-roll{--d:40cqw}
.ht-word{font-size:36cqw}
}

@media (pointer: fine){.ht-cue-drag{display:inline}}
@media (prefers-reduced-motion: reduce){
.ht-pre{display:none}
.ht-mask{height:auto}
.ht-mask-stage{position:relative}
.ht-l,.ht-mq-i,.ht-roll{will-change:auto}
.ht-btn,.ht-prod,.ht-roll-body,.ht-tp,.ht-nav-brand{transition:none}
.ht-prod:hover,.ht-prod:hover .ht-roll-body{transform:rotateY(var(--tilt)) rotateX(var(--spin))}
.ht-prod:hover{transform:none}
.ht-mask-stamp{opacity:1;rotate:-9deg}
}
`;
export {
  BrandBadge,
  TapeLanding as default
};
