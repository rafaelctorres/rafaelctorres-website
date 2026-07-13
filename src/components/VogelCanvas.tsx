'use client';
import { useEffect, useRef } from 'react';

const GA=Math.PI*(3-Math.sqrt(5)), N=80, REPEL_R=130, REPEL_STR=8, LERP=0.055;
interface Shape { ox:number;oy:number;x:number;y:number;vx:number;vy:number;size:number;sides:number;rot:number;rs:number;alpha:number; }

export default function VogelCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas=ref.current; if (!canvas) return;
    const ctx=canvas.getContext('2d'); if (!ctx) return;
    let shapes:Shape[]=[], mx=-9999, my=-9999, raf=0;

    function build() {
      const w=canvas!.offsetWidth,h=canvas!.offsetHeight,cx=w/2,cy=h/2,R=Math.min(w,h)*0.42;
      shapes=Array.from({length:N},(_,i)=>{
        const t=i/N,r=R*Math.sqrt(t),theta=i*GA;
        const ox=cx+r*Math.cos(theta),oy=cy+r*Math.sin(theta);
        return {ox,oy,x:ox,y:oy,vx:0,vy:0,size:3+t*10,sides:3+Math.floor(t*4),
          rot:Math.random()*Math.PI*2,rs:(Math.random()-0.5)*0.007,alpha:0.10+t*0.52};
      });
    }

    function poly(x:number,y:number,n:number,r:number,rot:number) {
      ctx!.beginPath();
      for(let i=0;i<n;i++){const a=rot+(i/n)*Math.PI*2; i===0?ctx!.moveTo(x+r*Math.cos(a),y+r*Math.sin(a)):ctx!.lineTo(x+r*Math.cos(a),y+r*Math.sin(a));}
      ctx!.closePath();
    }

    function tick() {
      const w=canvas!.offsetWidth,h=canvas!.offsetHeight;
      if(!w||!h){raf=requestAnimationFrame(tick);return;}
      ctx!.clearRect(0,0,w,h);
      for(const s of shapes){
        const dx=s.x-mx,dy=s.y-my,d=Math.hypot(dx,dy)||1;
        if(d<REPEL_R){const f=Math.pow(1-d/REPEL_R,2)*REPEL_STR;s.vx+=(dx/d)*f;s.vy+=(dy/d)*f;}
        s.vx*=0.82;s.vy*=0.82;s.x+=s.vx;s.y+=s.vy;
        s.x+=(s.ox-s.x)*LERP;s.y+=(s.oy-s.y)*LERP;s.rot+=s.rs;
        ctx!.save();ctx!.globalAlpha=s.alpha;ctx!.strokeStyle='#F97316';ctx!.lineWidth=1;
        poly(s.x,s.y,s.sides,s.size,s.rot);ctx!.stroke();ctx!.restore();
      }
      raf=requestAnimationFrame(tick);
    }

    function resize(){const dpr=devicePixelRatio||1;canvas!.width=canvas!.offsetWidth*dpr;canvas!.height=canvas!.offsetHeight*dpr;ctx!.scale(dpr,dpr);build();}

    const onMove=(e:PointerEvent)=>{const r=canvas!.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;};
    const onLeave=()=>{mx=-9999;my=-9999;};
    let timer:ReturnType<typeof setTimeout>;
    const onResize=()=>{clearTimeout(timer);timer=setTimeout(()=>{cancelAnimationFrame(raf);resize();tick();},100);};

    canvas.addEventListener('pointermove',onMove);
    canvas.addEventListener('pointerleave',onLeave);
    window.addEventListener('resize',onResize);
    resize();
    if(!matchMedia('(prefers-reduced-motion:reduce)').matches) tick();

    return()=>{cancelAnimationFrame(raf);clearTimeout(timer);canvas.removeEventListener('pointermove',onMove);canvas.removeEventListener('pointerleave',onLeave);window.removeEventListener('resize',onResize);};
  },[]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}
