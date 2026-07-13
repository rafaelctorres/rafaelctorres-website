(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/HeroCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const N = 90, MAX_D = 165, REPEL_R = 140, REPEL_STR = 7, LERP = 0.045;
function HeroCanvas() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCanvas.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            let nodes = [], mx = -9999, my = -9999, raf = 0;
            function build() {
                const w = canvas.offsetWidth, h = canvas.offsetHeight;
                nodes = Array.from({
                    length: N
                }, {
                    "HeroCanvas.useEffect.build": ()=>{
                        const x = Math.random() * w, y = Math.random() * h;
                        return {
                            ox: x,
                            oy: y,
                            x,
                            y,
                            vx: 0,
                            vy: 0,
                            r: 2 + Math.random() * 2
                        };
                    }
                }["HeroCanvas.useEffect.build"]);
            }
            function tick() {
                const w = canvas.offsetWidth, h = canvas.offsetHeight;
                if (!w || !h) {
                    raf = requestAnimationFrame(tick);
                    return;
                }
                ctx.clearRect(0, 0, w, h);
                for (const n of nodes){
                    const dx = n.x - mx, dy = n.y - my, d = Math.hypot(dx, dy) || 1;
                    if (d < REPEL_R) {
                        const f = Math.pow(1 - d / REPEL_R, 2) * REPEL_STR;
                        n.vx += dx / d * f;
                        n.vy += dy / d * f;
                    }
                    n.vx *= 0.84;
                    n.vy *= 0.84;
                    n.x += n.vx;
                    n.y += n.vy;
                    n.x += (n.ox - n.x) * LERP;
                    n.y += (n.oy - n.y) * LERP;
                }
                for(let i = 0; i < nodes.length; i++)for(let j = i + 1; j < nodes.length; j++){
                    const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < MAX_D) {
                        ctx.save();
                        ctx.globalAlpha = (1 - d / MAX_D) * 0.32;
                        ctx.strokeStyle = '#F97316';
                        ctx.lineWidth = 1.4;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                for (const n of nodes){
                    const near = Math.hypot(n.x - mx, n.y - my) < REPEL_R;
                    ctx.save();
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = '#0D0D0F';
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                    ctx.save();
                    ctx.globalAlpha = near ? 0.95 : 0.65;
                    ctx.fillStyle = near ? '#F97316' : '#0EA5E9';
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                    ctx.fill();
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
                "HeroCanvas.useEffect.onMove": (e)=>{
                    const r = canvas.getBoundingClientRect();
                    mx = e.clientX - r.left;
                    my = e.clientY - r.top;
                }
            }["HeroCanvas.useEffect.onMove"];
            const onLeave = {
                "HeroCanvas.useEffect.onLeave": ()=>{
                    mx = -9999;
                    my = -9999;
                }
            }["HeroCanvas.useEffect.onLeave"];
            let timer;
            const onResize = {
                "HeroCanvas.useEffect.onResize": ()=>{
                    clearTimeout(timer);
                    timer = setTimeout({
                        "HeroCanvas.useEffect.onResize": ()=>{
                            cancelAnimationFrame(raf);
                            resize();
                            tick();
                        }
                    }["HeroCanvas.useEffect.onResize"], 100);
                }
            }["HeroCanvas.useEffect.onResize"];
            canvas.addEventListener('pointermove', onMove);
            canvas.addEventListener('pointerleave', onLeave);
            window.addEventListener('resize', onResize);
            resize();
            if (!matchMedia('(prefers-reduced-motion:reduce)').matches) tick();
            return ({
                "HeroCanvas.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    clearTimeout(timer);
                    canvas.removeEventListener('pointermove', onMove);
                    canvas.removeEventListener('pointerleave', onLeave);
                    window.removeEventListener('resize', onResize);
                }
            })["HeroCanvas.useEffect"];
        }
    }["HeroCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        "aria-hidden": "true",
        className: "absolute inset-0 w-full h-full"
    }, void 0, false, {
        fileName: "[project]/src/components/HeroCanvas.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, this);
}
_s(HeroCanvas, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = HeroCanvas;
var _c;
__turbopack_context__.k.register(_c, "HeroCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
]);

//# sourceMappingURL=src_components_0327778c._.js.map