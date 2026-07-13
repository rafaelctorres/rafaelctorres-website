(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/PageTransition.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function PageTransition(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/PageTransition.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = PageTransition;
var _c;
__turbopack_context__.k.register(_c, "PageTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VogelCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VogelCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const GA = Math.PI * (3 - Math.sqrt(5)), N = 80, REPEL_R = 130, REPEL_STR = 8, LERP = 0.055;
function VogelCanvas() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VogelCanvas.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            let shapes = [], mx = -9999, my = -9999, raf = 0;
            function build() {
                const w = canvas.offsetWidth, h = canvas.offsetHeight, cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
                shapes = Array.from({
                    length: N
                }, {
                    "VogelCanvas.useEffect.build": (_, i)=>{
                        const t = i / N, r = R * Math.sqrt(t), theta = i * GA;
                        const ox = cx + r * Math.cos(theta), oy = cy + r * Math.sin(theta);
                        return {
                            ox,
                            oy,
                            x: ox,
                            y: oy,
                            vx: 0,
                            vy: 0,
                            size: 3 + t * 10,
                            sides: 3 + Math.floor(t * 4),
                            rot: Math.random() * Math.PI * 2,
                            rs: (Math.random() - 0.5) * 0.007,
                            alpha: 0.10 + t * 0.52
                        };
                    }
                }["VogelCanvas.useEffect.build"]);
            }
            function poly(x, y, n, r, rot) {
                ctx.beginPath();
                for(let i = 0; i < n; i++){
                    const a = rot + i / n * Math.PI * 2;
                    i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a)) : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
                }
                ctx.closePath();
            }
            function tick() {
                const w = canvas.offsetWidth, h = canvas.offsetHeight;
                if (!w || !h) {
                    raf = requestAnimationFrame(tick);
                    return;
                }
                ctx.clearRect(0, 0, w, h);
                for (const s of shapes){
                    const dx = s.x - mx, dy = s.y - my, d = Math.hypot(dx, dy) || 1;
                    if (d < REPEL_R) {
                        const f = Math.pow(1 - d / REPEL_R, 2) * REPEL_STR;
                        s.vx += dx / d * f;
                        s.vy += dy / d * f;
                    }
                    s.vx *= 0.82;
                    s.vy *= 0.82;
                    s.x += s.vx;
                    s.y += s.vy;
                    s.x += (s.ox - s.x) * LERP;
                    s.y += (s.oy - s.y) * LERP;
                    s.rot += s.rs;
                    ctx.save();
                    ctx.globalAlpha = s.alpha;
                    ctx.strokeStyle = '#F97316';
                    ctx.lineWidth = 1;
                    poly(s.x, s.y, s.sides, s.size, s.rot);
                    ctx.stroke();
                    ctx.restore();
                }
                raf = requestAnimationFrame(tick);
            }
            function resize() {
                const dpr = devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * dpr;
                canvas.height = canvas.offsetHeight * dpr;
                ctx.scale(dpr, dpr);
                build();
            }
            const onMove = {
                "VogelCanvas.useEffect.onMove": (e)=>{
                    const r = canvas.getBoundingClientRect();
                    mx = e.clientX - r.left;
                    my = e.clientY - r.top;
                }
            }["VogelCanvas.useEffect.onMove"];
            const onLeave = {
                "VogelCanvas.useEffect.onLeave": ()=>{
                    mx = -9999;
                    my = -9999;
                }
            }["VogelCanvas.useEffect.onLeave"];
            let timer;
            const onResize = {
                "VogelCanvas.useEffect.onResize": ()=>{
                    clearTimeout(timer);
                    timer = setTimeout({
                        "VogelCanvas.useEffect.onResize": ()=>{
                            cancelAnimationFrame(raf);
                            resize();
                            tick();
                        }
                    }["VogelCanvas.useEffect.onResize"], 100);
                }
            }["VogelCanvas.useEffect.onResize"];
            canvas.addEventListener('pointermove', onMove);
            canvas.addEventListener('pointerleave', onLeave);
            window.addEventListener('resize', onResize);
            resize();
            if (!matchMedia('(prefers-reduced-motion:reduce)').matches) tick();
            return ({
                "VogelCanvas.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    clearTimeout(timer);
                    canvas.removeEventListener('pointermove', onMove);
                    canvas.removeEventListener('pointerleave', onLeave);
                    window.removeEventListener('resize', onResize);
                }
            })["VogelCanvas.useEffect"];
        }
    }["VogelCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        "aria-hidden": "true",
        className: "absolute inset-0 w-full h-full"
    }, void 0, false, {
        fileName: "[project]/src/components/VogelCanvas.tsx",
        lineNumber: 62,
        columnNumber: 10
    }, this);
}
_s(VogelCanvas, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = VogelCanvas;
var _c;
__turbopack_context__.k.register(_c, "VogelCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MathTransition.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MathTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const PHI = (1 + Math.sqrt(5)) / 2;
const WAVES = [
    {
        n: 0,
        amp: 14,
        color: '#F97316',
        alpha: 0.80,
        speed: 0.38
    },
    {
        n: 1,
        amp: 8,
        color: '#0EA5E9',
        alpha: 0.65,
        speed: 0.62
    },
    {
        n: 2,
        amp: 5,
        color: '#8A8A96',
        alpha: 0.45,
        speed: 1.00
    }
];
function MathTransition() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MathTransition.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            function resize() {
                const dpr = devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * dpr;
                canvas.height = canvas.offsetHeight * dpr;
                ctx.scale(dpr, dpr);
            }
            function draw(phase) {
                const w = canvas.offsetWidth, h = canvas.offsetHeight, cy = h / 2;
                const k0 = 2.5 * 2 * Math.PI / w;
                ctx.clearRect(0, 0, w, h);
                for (const wave of WAVES){
                    const k = k0 * Math.pow(PHI, wave.n);
                    ctx.save();
                    ctx.globalAlpha = wave.alpha;
                    ctx.strokeStyle = wave.color;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    for(let x = 0; x <= w; x++){
                        const y = cy + Math.sin(k * x - wave.speed * phase) * wave.amp;
                        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
                ctx.save();
                ctx.globalAlpha = 0.92;
                ctx.strokeStyle = '#F0F0F4';
                ctx.lineWidth = 2;
                ctx.beginPath();
                for(let x = 0; x <= w; x++){
                    const y = cy + WAVES.reduce({
                        "MathTransition.useEffect.draw": (s, wave)=>s + Math.sin(k0 * Math.pow(PHI, wave.n) * x - wave.speed * phase) * wave.amp
                    }["MathTransition.useEffect.draw"], 0);
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.restore();
                const bg = '#0D0D0F', t = 'rgba(13,13,15,0)', ew = w * 0.07, eh = h * 0.22;
                const fills = [
                    [
                        0,
                        0,
                        ew,
                        h,
                        true,
                        false
                    ],
                    [
                        w - ew,
                        0,
                        ew,
                        h,
                        false,
                        false
                    ],
                    [
                        0,
                        0,
                        w,
                        eh,
                        false,
                        true
                    ],
                    [
                        0,
                        h - eh,
                        w,
                        eh,
                        false,
                        false
                    ]
                ];
                for (const [x, y, fw, fh, ltr, ttb] of fills){
                    const g = ttb ? ctx.createLinearGradient(0, y, 0, y + fh) : ctx.createLinearGradient(x, 0, x + fw, 0);
                    g.addColorStop(0, ltr || ttb ? bg : t);
                    g.addColorStop(1, ltr || ttb ? t : bg);
                    ctx.fillStyle = g;
                    ctx.fillRect(x, y, fw, fh);
                }
            }
            function progress() {
                const r = canvas.getBoundingClientRect();
                return (window.innerHeight - r.top) / (window.innerHeight + r.height);
            }
            function update() {
                draw(Math.max(0, Math.min(1, progress())) * Math.PI * 6);
            }
            let timer;
            function onResize() {
                clearTimeout(timer);
                timer = setTimeout({
                    "MathTransition.useEffect.onResize": ()=>{
                        resize();
                        update();
                    }
                }["MathTransition.useEffect.onResize"], 100);
            }
            window.addEventListener('scroll', update, {
                passive: true
            });
            window.addEventListener('resize', onResize);
            resize();
            update();
            return ({
                "MathTransition.useEffect": ()=>{
                    window.removeEventListener('scroll', update);
                    window.removeEventListener('resize', onResize);
                    clearTimeout(timer);
                }
            })["MathTransition.useEffect"];
        }
    }["MathTransition.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full overflow-hidden",
        style: {
            height: '120px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: ref,
                "aria-hidden": "true",
                className: "absolute inset-0 w-full h-full"
            }, void 0, false, {
                fileName: "[project]/src/components/MathTransition.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-phi-xs text-copy",
                    style: {
                        opacity: 0.15,
                        letterSpacing: '0.18em'
                    },
                    children: "f(x,t) = ∑ aₙ · sin(φⁿkx − ωt)"
                }, void 0, false, {
                    fileName: "[project]/src/components/MathTransition.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/MathTransition.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MathTransition.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(MathTransition, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = MathTransition;
var _c;
__turbopack_context__.k.register(_c, "MathTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_e1d28eff._.js.map