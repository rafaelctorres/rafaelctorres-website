'use client';
import { useEffect, useRef } from 'react';

const N=90, MAX_D=165, REPEL_R=140, REPEL_STR=7, LERP=0.045;
interface Node { ox:number;oy:number;x:number;y:number;vx:number;vy:number;r:number; }

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let nodes: Node[] = [], mx=-9999, my=-9999, raf=0;

    function build() {
      const w=canvas!.offsetWidth, h=canvas!.offsetHeight;
      nodes = Array.from({length:N}, () => {
        const x=Math.random()*w, y=Math.random()*h;
        return {ox:x,oy:y,x,y,vx:0,vy:0,r:2+Math.random()*2};
      });
    }

    function tick() {
      const w=canvas!.offsetWidth, h=canvas!.offsetHeight;
      if (!w||!h) { raf=requestAnimationFrame(tick); return; }
      ctx!.clearRect(0,0,w,h);
      for (const n of nodes) {
        const dx=n.x-mx, dy=n.y-my, d=Math.hypot(dx,dy)||1;
        if (d<REPEL_R) { const f=Math.pow(1-d/REPEL_R,2)*REPEL_STR; n.vx+=(dx/d)*f; n.vy+=(dy/d)*f; }
        n.vx*=0.84; n.vy*=0.84; n.x+=n.vx; n.y+=n.vy;
        n.x+=(n.ox-n.x)*LERP; n.y+=(n.oy-n.y)*LERP;
      }
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if (d<MAX_D) {
          ctx!.save(); ctx!.globalAlpha=(1-d/MAX_D)*0.32;
          ctx!.strokeStyle='#F97316'; ctx!.lineWidth=1.4;
          ctx!.beginPath(); ctx!.moveTo(a.x,a.y); ctx!.lineTo(b.x,b.y); ctx!.stroke(); ctx!.restore();
        }
      }
      for (const n of nodes) {
        const near=Math.hypot(n.x-mx,n.y-my)<REPEL_R;
        ctx!.save(); ctx!.globalAlpha=1; ctx!.fillStyle='#0D0D0F';
        ctx!.beginPath(); ctx!.arc(n.x,n.y,n.r+2,0,Math.PI*2); ctx!.fill(); ctx!.restore();
        ctx!.save(); ctx!.globalAlpha=near?0.95:0.65; ctx!.fillStyle=near?'#F97316':'#0EA5E9';
        ctx!.beginPath(); ctx!.arc(n.x,n.y,n.r,0,Math.PI*2); ctx!.fill(); ctx!.restore();
      }
      raf=requestAnimationFrame(tick);
    }

    function resize() {
      const dpr=devicePixelRatio||1;
      canvas!.width=canvas!.offsetWidth*dpr; canvas!.height=canvas!.offsetHeight*dpr;
      ctx!.scale(dpr,dpr); build();
    }

    const onMove=(e:PointerEvent)=>{const r=canvas!.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;};
    const onLeave=()=>{mx=-9999;my=-9999;};
    let timer: ReturnType<typeof setTimeout>;
    const onResize=()=>{clearTimeout(timer);timer=setTimeout(()=>{cancelAnimationFrame(raf);resize();tick();},100);};

    canvas.addEventListener('pointermove',onMove);
    canvas.addEventListener('pointerleave',onLeave);
    window.addEventListener('resize',onResize);
    resize();
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) tick();

    return () => {
      cancelAnimationFrame(raf); clearTimeout(timer);
      canvas.removeEventListener('pointermove',onMove);
      canvas.removeEventListener('pointerleave',onLeave);
      window.removeEventListener('resize',onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}
