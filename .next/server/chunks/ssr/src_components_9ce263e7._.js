module.exports = [
"[project]/src/components/PageTransition.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function PageTransition({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
}),
"[project]/src/components/blog/CanvasDemo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CanvasDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// ── Nodes appearing one by one ────────────────────────────────────────────────
function NodesDemo({ canvas }) {
    const ctx = canvas.getContext('2d');
    const N = 40, MAX_D = 90;
    const w = canvas.offsetWidth, h = canvas.height / (devicePixelRatio || 1);
    const nodes = Array.from({
        length: N
    }, ()=>({
            x: 24 + Math.random() * (w - 48),
            y: 24 + Math.random() * (h - 48)
        }));
    let visible = 0;
    function draw() {
        ctx.fillStyle = '#0D0D0F';
        ctx.fillRect(0, 0, w, h);
        for(let i = 0; i < visible; i++){
            for(let j = i + 1; j < visible; j++){
                const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (d < MAX_D) {
                    ctx.save();
                    ctx.globalAlpha = (1 - d / MAX_D) * 0.35;
                    ctx.strokeStyle = '#F97316';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
            ctx.fillStyle = '#0D0D0F';
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0EA5E9';
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    let timer;
    function run() {
        draw();
        if (visible < N) {
            visible++;
            timer = setTimeout(run, 80);
        } else setTimeout(()=>{
            visible = 0;
            run();
        }, 1200);
    }
    run();
    return ()=>clearTimeout(timer);
}
// ── Repulsion demo with simulated cursor ──────────────────────────────────────
function RepulsionDemo({ canvas }) {
    const ctx = canvas.getContext('2d');
    const N = 35, MAX_D = 100, REPEL_R = 80;
    const w = canvas.offsetWidth, h = canvas.height / (devicePixelRatio || 1);
    const nodes = Array.from({
        length: N
    }, ()=>{
        const x = 24 + Math.random() * (w - 48), y = 24 + Math.random() * (h - 48);
        return {
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0
        };
    });
    let t = 0, raf = 0;
    function tick() {
        t += 0.018;
        const cx = w * 0.5 + Math.cos(t * 0.7) * w * 0.28;
        const cy = h * 0.5 + Math.sin(t) * h * 0.28;
        ctx.fillStyle = '#0D0D0F';
        ctx.fillRect(0, 0, w, h);
        for (const n of nodes){
            const dx = n.x - cx, dy = n.y - cy, d = Math.hypot(dx, dy) || 1;
            if (d < REPEL_R) {
                const f = Math.pow(1 - d / REPEL_R, 2) * 6;
                n.vx += dx / d * f;
                n.vy += dy / d * f;
            }
            n.vx *= 0.82;
            n.vy *= 0.82;
            n.x += n.vx;
            n.y += n.vy;
            n.x += (n.ox - n.x) * 0.05;
            n.y += (n.oy - n.y) * 0.05;
        }
        for(let i = 0; i < nodes.length; i++){
            for(let j = i + 1; j < nodes.length; j++){
                const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (d < MAX_D) {
                    ctx.save();
                    ctx.globalAlpha = (1 - d / MAX_D) * 0.3;
                    ctx.strokeStyle = '#F97316';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
            const near = Math.hypot(nodes[i].x - cx, nodes[i].y - cy) < REPEL_R;
            ctx.fillStyle = '#0D0D0F';
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = near ? '#F97316' : '#0EA5E9';
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        // simulated cursor ring
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = '#F97316';
        ctx.lineWidth = 1;
        ctx.setLineDash([
            4,
            4
        ]);
        ctx.beginPath();
        ctx.arc(cx, cy, REPEL_R, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#F97316';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
        raf = requestAnimationFrame(tick);
    }
    tick();
    return ()=>cancelAnimationFrame(raf);
}
function CanvasDemo({ type }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = ref.current;
        if (!canvas) return;
        const dpr = devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = 220 * dpr;
        canvas.getContext('2d').scale(dpr, dpr);
        const cleanup = type === 'nodes' ? NodesDemo({
            canvas
        }) : RepulsionDemo({
            canvas
        });
        return cleanup ?? undefined;
    }, [
        type
    ]);
    const label = type === 'nodes' ? 'nós aparecendo aleatoriamente e se conectando por proximidade' : 'cursor simulado empurrando os nós (anel laranja = raio de repulsão)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        style: {
            margin: '2em 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: ref,
                "aria-label": label,
                style: {
                    width: '100%',
                    height: '220px',
                    borderRadius: '8px',
                    display: 'block',
                    border: '1px solid var(--color-line)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/blog/CanvasDemo.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                style: {
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-muted)',
                    marginTop: '0.5em',
                    textAlign: 'center',
                    letterSpacing: '0.06em'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/blog/CanvasDemo.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/blog/CanvasDemo.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/blog/FileTree.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ASTRO = {
    name: 'src/',
    type: 'dir',
    children: [
        {
            name: 'components/',
            type: 'dir',
            children: [
                {
                    name: 'Layout.astro',
                    type: 'file'
                },
                {
                    name: 'Nav.astro',
                    type: 'file'
                },
                {
                    name: 'HeroCanvas.astro',
                    type: 'file'
                },
                {
                    name: 'VogelCanvas.astro',
                    type: 'file'
                },
                {
                    name: 'MathTransition.astro',
                    type: 'file'
                }
            ]
        },
        {
            name: 'content/',
            type: 'dir',
            children: [
                {
                    name: 'config.ts',
                    type: 'file',
                    note: 'schema das coleções'
                },
                {
                    name: 'blog/',
                    type: 'dir'
                },
                {
                    name: 'portfolio/',
                    type: 'dir'
                }
            ]
        },
        {
            name: 'pages/',
            type: 'dir',
            children: [
                {
                    name: 'index.astro',
                    type: 'file',
                    note: 'home'
                },
                {
                    name: 'about.astro',
                    type: 'file'
                },
                {
                    name: 'blog/',
                    type: 'dir',
                    children: [
                        {
                            name: 'index.astro',
                            type: 'file'
                        },
                        {
                            name: '[slug].astro',
                            type: 'file'
                        }
                    ]
                },
                {
                    name: 'portfolio/',
                    type: 'dir',
                    children: [
                        {
                            name: 'index.astro',
                            type: 'file'
                        },
                        {
                            name: '[slug].astro',
                            type: 'file'
                        }
                    ]
                }
            ]
        },
        {
            name: 'styles/',
            type: 'dir',
            children: [
                {
                    name: 'global.css',
                    type: 'file'
                }
            ]
        }
    ]
};
const NEXTJS = {
    name: 'src/',
    type: 'dir',
    children: [
        {
            name: 'app/',
            type: 'dir',
            note: 'App Router',
            children: [
                {
                    name: 'layout.tsx',
                    type: 'file',
                    note: 'raiz global'
                },
                {
                    name: 'page.tsx',
                    type: 'file',
                    note: 'home'
                },
                {
                    name: 'about/page.tsx',
                    type: 'file'
                },
                {
                    name: 'blog/page.tsx',
                    type: 'file'
                },
                {
                    name: 'blog/[slug]/page.tsx',
                    type: 'file'
                },
                {
                    name: 'portfolio/page.tsx',
                    type: 'file'
                },
                {
                    name: 'portfolio/[slug]/page.tsx',
                    type: 'file'
                }
            ]
        },
        {
            name: 'components/',
            type: 'dir',
            children: [
                {
                    name: 'Nav.tsx',
                    type: 'file'
                },
                {
                    name: 'HeroCanvas.tsx',
                    type: 'file'
                },
                {
                    name: 'VogelCanvas.tsx',
                    type: 'file'
                },
                {
                    name: 'MathTransition.tsx',
                    type: 'file'
                },
                {
                    name: 'blog/',
                    type: 'dir',
                    note: 'componentes MDX',
                    children: [
                        {
                            name: 'Term.tsx',
                            type: 'file'
                        },
                        {
                            name: 'Callout.tsx',
                            type: 'file'
                        },
                        {
                            name: 'CanvasDemo.tsx',
                            type: 'file'
                        },
                        {
                            name: 'FileTree.tsx',
                            type: 'file'
                        },
                        {
                            name: 'SandpackDemo.tsx',
                            type: 'file'
                        }
                    ]
                }
            ]
        },
        {
            name: 'lib/content.ts',
            type: 'file',
            note: 'lê os arquivos .md'
        },
        {
            name: 'styles/global.css',
            type: 'file'
        }
    ]
};
function Node({ node, depth = 0 }) {
    const isDir = node.type === 'dir';
    const indent = depth * 14;
    const color = isDir ? 'var(--color-blue)' : 'var(--color-copy)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.5em',
                    paddingLeft: `${indent}px`,
                    lineHeight: 1.9
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            opacity: isDir ? 0.9 : 0.75
                        },
                        children: [
                            isDir ? '▸ ' : '  ',
                            node.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/blog/FileTree.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    node.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: 'var(--color-orange)',
                            opacity: 0.7
                        },
                        children: [
                            "← ",
                            node.note
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/blog/FileTree.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/blog/FileTree.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            node.children?.map((child, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Node, {
                    node: child,
                    depth: depth + 1
                }, i, false, {
                    fileName: "[project]/src/components/blog/FileTree.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/blog/FileTree.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
function FileTree() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('astro');
    const btn = (id, label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>setTab(id),
            style: {
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.4em 1em',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: tab === id ? 'var(--color-orange)' : 'var(--color-line)',
                color: tab === id ? 'var(--color-orange)' : 'var(--color-muted)',
                background: tab === id ? 'rgba(249,115,22,0.08)' : 'transparent',
                borderRadius: '4px',
                transition: 'all 0.15s'
            },
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/blog/FileTree.tsx",
            lineNumber: 103,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        style: {
            margin: '2em 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '0.5em',
                    marginBottom: '1em'
                },
                children: [
                    btn('astro', 'Astro (antes)'),
                    btn('nextjs', 'Next.js (depois)')
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/blog/FileTree.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'var(--color-raised)',
                    border: '1px solid var(--color-line)',
                    borderRadius: '8px',
                    padding: '1.25rem'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Node, {
                    node: tab === 'astro' ? ASTRO : NEXTJS
                }, void 0, false, {
                    fileName: "[project]/src/components/blog/FileTree.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/blog/FileTree.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                style: {
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-muted)',
                    marginTop: '0.5em',
                    textAlign: 'center',
                    letterSpacing: '0.06em'
                },
                children: [
                    "estrutura de arquivos — ",
                    tab === 'astro' ? 'versão Astro' : 'versão Next.js'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/blog/FileTree.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/blog/FileTree.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/blog/SandpackDemo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SandpackDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codesandbox$2f$sandpack$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codesandbox/sandpack-react/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const THEME = {
    colors: {
        surface1: '#1C1C21',
        surface2: '#0D0D0F',
        surface3: '#3A3A42',
        clickable: '#8A8A96',
        base: '#F0F0F4',
        disabled: '#3A3A42',
        hover: '#F97316',
        accent: '#F97316',
        error: '#FF6B6B',
        errorSurface: '#2D1F1F'
    },
    syntax: {
        plain: '#F0F0F4',
        comment: {
            color: '#8A8A96',
            fontStyle: 'italic'
        },
        keyword: '#0EA5E9',
        tag: '#F97316',
        punctuation: '#8A8A96',
        definition: '#F0F0F4',
        property: '#0EA5E9',
        static: '#F97316',
        string: '#4ade80'
    },
    font: {
        body: "'Space Grotesk', system-ui, sans-serif",
        mono: "'JetBrains Mono', Consolas, monospace",
        size: '13px',
        lineHeight: '1.7'
    }
};
const HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0D0D0F; display: flex; justify-content: center; align-items: center; height: 100vh; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script src="/index.js"></script>
</body>
</html>`;
const DEMOS = {
    vogel: {
        title: 'Espiral de Vogel — edite numPoints e scale',
        code: `const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
canvas.width  = 400;
canvas.height = 400;

// ── edite aqui ─────────────────────────
const numPoints = 200;
const scale     = 8;    // distância entre pontos
// ───────────────────────────────────────

const PHI = Math.PI * (3 - Math.sqrt(5)); // ângulo de ouro ≈ 137.5°
const cx  = canvas.width  / 2;
const cy  = canvas.height / 2;

ctx.fillStyle = '#0D0D0F';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let i = 0;
function frame() {
  if (i >= numPoints) return;

  const r     = scale * Math.sqrt(i);
  const angle = i * PHI;
  const x     = cx + r * Math.cos(angle);
  const y     = cy + r * Math.sin(angle);

  ctx.globalAlpha = 0.3 + (i / numPoints) * 0.7;
  ctx.fillStyle   = '#F97316';
  ctx.beginPath();
  ctx.arc(x, y, 1.5 + (i / numPoints) * 4, 0, Math.PI * 2);
  ctx.fill();

  i++;
  setTimeout(frame, 12);
}
frame();
`
    },
    graph: {
        title: 'Malha de grafos — edite MAX_D para ver o grafo se fragmentar ou adensar',
        code: `const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
canvas.width  = 400;
canvas.height = 380;

// ── edite aqui ─────────────────────────
const N     = 50;    // número de nós
const MAX_D = 120;   // raio máximo de conexão (px)
// ───────────────────────────────────────

const nodes = Array.from({ length: N }, () => ({
  x: 20 + Math.random() * 360,
  y: 20 + Math.random() * 340,
}));

ctx.fillStyle = '#0D0D0F';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// arestas
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
    if (d < MAX_D) {
      ctx.save();
      ctx.globalAlpha  = (1 - d / MAX_D) * 0.45;
      ctx.strokeStyle  = '#F97316';
      ctx.lineWidth    = 1;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// nós
for (const n of nodes) {
  ctx.fillStyle = '#0D0D0F';
  ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0EA5E9';
  ctx.beginPath(); ctx.arc(n.x, n.y, 3, 0, Math.PI * 2); ctx.fill();
}
`
    }
};
function SandpackDemo({ demo }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setMounted(true), []);
    const { title, code } = DEMOS[demo];
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            margin: '2em 0',
            background: 'var(--color-raised)',
            border: '1px solid var(--color-line)',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-muted)'
        },
        children: "carregando editor…"
    }, void 0, false, {
        fileName: "[project]/src/components/blog/SandpackDemo.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        style: {
            margin: '2em 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codesandbox$2f$sandpack$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sandpack"], {
                template: "vanilla",
                theme: THEME,
                files: {
                    '/index.html': {
                        code: HTML,
                        hidden: true
                    },
                    '/index.js': {
                        code,
                        active: true
                    }
                },
                options: {
                    showNavigator: false,
                    showTabs: false,
                    showLineNumbers: true,
                    editorHeight: 340,
                    externalResources: []
                }
            }, void 0, false, {
                fileName: "[project]/src/components/blog/SandpackDemo.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                style: {
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-muted)',
                    marginTop: '0.5em',
                    textAlign: 'center',
                    letterSpacing: '0.06em'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/blog/SandpackDemo.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/blog/SandpackDemo.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_9ce263e7._.js.map