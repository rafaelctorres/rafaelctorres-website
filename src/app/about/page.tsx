import PageTransition from '@/components/PageTransition';
import VogelCanvas from '@/components/VogelCanvas';
import MathTransition from '@/components/MathTransition';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Spiral hero */}
      <section className="relative min-h-96 flex items-center justify-center overflow-hidden px-4 md:px-14 py-16 w-full" style={{minHeight:'60vh'}}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-content mx-auto">
          <div className="relative flex items-center justify-center flex-shrink-0" style={{width:'24rem',height:'24rem'}}>
            <div className="absolute inset-0 z-0">
              <VogelCanvas />
            </div>
            <img src="/rafael.png" alt="Rafael Torres"
              className="relative z-10 object-cover rounded-full shadow-2xl"
              style={{width:'14rem',height:'14rem'}} />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <p className="font-mono text-phi-xs text-orange uppercase tracking-widest mb-3">
              Systems and Digital Media · Federal University of Ceará
            </p>
            <h1 className="font-sans text-phi-lg md:text-phi-xl font-bold text-copy leading-tight">
              Rafael Torres
            </h1>
            <p className="font-sans text-phi-base text-muted leading-relaxed mt-4" style={{maxWidth:'32rem'}}>
              I am interested in problems where mathematics and computation meet visual and
              audio media: how signals encode structure, how geometry shapes perception,
              how models learn to see.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
          style={{background:'linear-gradient(to bottom, transparent, #0D0D0F)'}} />
      </section>

      {/* Fourier transition */}
      <MathTransition />

      {/* Bio */}
      <div className="w-full flex justify-center px-4 md:px-14 py-16 md:py-24">
        <div className="w-full flex flex-col items-center text-center" style={{maxWidth:'48rem',gap:'3rem'}}>
          <div className="flex flex-col items-center" style={{gap:'1.5rem'}}>
            <p className="font-sans text-phi-md text-copy leading-relaxed" style={{maxWidth:'40rem'}}>
              Graduate in Systems and Digital Media from Federal University of Ceará (UFC), Fortaleza, Brasil.
            </p>
            <p className="font-sans text-phi-base text-muted leading-relaxed" style={{maxWidth:'40rem'}}>
              My undergraduate thesis integrated PyAFAR — a facial action unit detection library —
              into a web application with an interactive dashboard, combining computer vision,
              human-computer interaction, and software engineering.
            </p>
          </div>

          <div className="border-t border-line w-16" />

          <div className="w-full grid gap-10" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
            <div className="flex flex-col items-center" style={{gap:'0.75rem'}}>
              <p className="font-mono text-phi-xs text-muted uppercase tracking-widest">focus</p>
              <ul className="flex flex-col items-center list-none m-0 p-0" style={{gap:'0.25rem'}}>
                {['Applied Math for Multimedia','Machine Learning','Web Development'].map(i=>(
                  <li key={i} className="font-sans text-phi-sm text-copy">{i}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center" style={{gap:'0.5rem'}}>
              <p className="font-mono text-phi-xs text-muted uppercase tracking-widest">education</p>
              <p className="font-sans text-phi-sm text-copy">Systems and Digital Media · UFC · 2026</p>
            </div>
            <div className="flex flex-col items-center" style={{gap:'0.5rem'}}>
              <p className="font-mono text-phi-xs text-muted uppercase tracking-widest">links</p>
              <ul className="flex flex-col items-center list-none m-0 p-0" style={{gap:'0.5rem'}}>
                <li><a href="https://github.com/rafaelctorres" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-phi-xs text-orange hover:text-orange-dim transition-colors">github →</a></li>
                <li><a href="#" className="font-mono text-phi-xs text-orange hover:text-orange-dim transition-colors">linkedin →</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
