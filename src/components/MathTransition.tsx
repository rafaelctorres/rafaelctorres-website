'use client';
import { useEffect, useRef } from 'react';

const PHI=( 1+Math.sqrt(5))/2;
const WAVES=[
  {n:0,amp:14,color:'#F97316',alpha:0.80,speed:0.38},
  {n:1,amp:8, color:'#0EA5E9',alpha:0.65,speed:0.62},
  {n:2,amp:5, color:'#8A8A96',alpha:0.45,speed:1.00},
];

export default function MathTransition() {
  const ref=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext('2d'); if(!ctx) return;

    function resize(){const dpr=devicePixelRatio||1;canvas!.width=canvas!.offsetWidth*dpr;canvas!.height=canvas!.offsetHeight*dpr;ctx!.scale(dpr,dpr);}

    function draw(phase:number){
      const w=canvas!.offsetWidth,h=canvas!.offsetHeight,cy=h/2;
      const k0=(2.5*2*Math.PI)/w;
      ctx!.clearRect(0,0,w,h);
      for(const wave of WAVES){
        const k=k0*Math.pow(PHI,wave.n);
        ctx!.save();ctx!.globalAlpha=wave.alpha;ctx!.strokeStyle=wave.color;ctx!.lineWidth=1.2;ctx!.beginPath();
        for(let x=0;x<=w;x++){const y=cy+Math.sin(k*x-wave.speed*phase)*wave.amp;x===0?ctx!.moveTo(x,y):ctx!.lineTo(x,y);}
        ctx!.stroke();ctx!.restore();
      }
      ctx!.save();ctx!.globalAlpha=0.92;ctx!.strokeStyle='#F0F0F4';ctx!.lineWidth=2;ctx!.beginPath();
      for(let x=0;x<=w;x++){
        const y=cy+WAVES.reduce((s,wave)=>s+Math.sin(k0*Math.pow(PHI,wave.n)*x-wave.speed*phase)*wave.amp,0);
        x===0?ctx!.moveTo(x,y):ctx!.lineTo(x,y);
      }
      ctx!.stroke();ctx!.restore();
      const bg='#0D0D0F',t='rgba(13,13,15,0)',ew=w*0.07,eh=h*0.22;
      const fills:Array<[number,number,number,number,boolean,boolean]>=[[0,0,ew,h,true,false],[w-ew,0,ew,h,false,false],[0,0,w,eh,false,true],[0,h-eh,w,eh,false,false]];
      for(const [x,y,fw,fh,ltr,ttb] of fills){
        const g=ttb?ctx!.createLinearGradient(0,y,0,y+fh):ctx!.createLinearGradient(x,0,x+fw,0);
        g.addColorStop(0,ltr||ttb?bg:t);g.addColorStop(1,ltr||ttb?t:bg);
        ctx!.fillStyle=g;ctx!.fillRect(x,y,fw,fh);
      }
    }

    function progress(){
      const r=canvas!.getBoundingClientRect();
      return(window.innerHeight-r.top)/(window.innerHeight+r.height);
    }

    function update(){draw(Math.max(0,Math.min(1,progress()))*Math.PI*6);}
    let timer:ReturnType<typeof setTimeout>;
    function onResize(){clearTimeout(timer);timer=setTimeout(()=>{resize();update();},100);}

    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',onResize);
    resize();update();

    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',onResize);clearTimeout(timer);};
  },[]);

  return (
    <div className="relative w-full overflow-hidden" style={{height:'120px'}}>
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-mono text-phi-xs text-copy" style={{opacity:0.15,letterSpacing:'0.18em'}}>
          
        </span>
      </div>
    </div>
  );
}
