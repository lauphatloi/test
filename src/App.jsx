import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const headlineRefs = useRef([]);
  const headlineContainerRef = useRef(null);
  const motoARef = useRef(null);
  const displacementRef = useRef(null);
  const inkBleedRef = useRef(null);
  const motoBRef = useRef(null);
  const zenTextRef = useRef(null);
  const shockwavesRef = useRef([]);

  useEffect(() => {
    gsap.to(bannerRef.current, {
      scale: 1.15,
      duration: 25,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });

    gsap.fromTo(headlineRefs.current, {
      yPercent: 120,
      opacity: 0,
      filter: 'blur(10px) drop-shadow(0px 10px 10px rgba(255,255,255,0.5))'
    }, {
      yPercent: 0,
      opacity: 1,
      filter: 'blur(0px) drop-shadow(0px 0px 0px rgba(255,255,255,0))',
      duration: 2.5,
      stagger: 0.3,
      ease: 'power3.out',
      delay: 0.5
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=5000',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    const filterVal = { scale: 0 };

    tl.to(bannerRef.current, {
      scale: 1.3,
      opacity: 0,
      filter: 'blur(30px) brightness(0)',
      duration: 2
    }, 0)
    .to(headlineContainerRef.current, {
      opacity: 0,
      y: -150,
      filter: 'blur(15px)',
      duration: 1.5
    }, 0)
    .fromTo(motoARef.current, {
      y: '100vh',
      rotation: 15,
      rotationX: 30,
      rotationZ: -10,
      filter: 'blur(20px)',
      scale: 0.6,
      opacity: 0
    }, {
      y: '0vh',
      rotation: 0,
      rotationX: 0,
      rotationZ: 0,
      filter: 'blur(0px)',
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    }, 0.5)
    .to(filterVal, {
      scale: 120,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (displacementRef.current) {
          displacementRef.current.setAttribute('scale', filterVal.scale);
        }
      }
    }, 2.5)
    .fromTo(inkBleedRef.current, {
      scale: 0,
      opacity: 0
    }, {
      scale: 150,
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut'
    }, 2.5)
    .fromTo(motoBRef.current, {
      clipPath: 'circle(0% at 50% 50%)'
    }, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 2.5,
      ease: 'power3.inOut'
    }, 3.5)
    .fromTo(zenTextRef.current, {
      y: -100,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'bounce.out'
    }, 5)
    .fromTo(shockwavesRef.current, {
      scale: 0.1,
      opacity: 1,
      borderWidth: '4px'
    }, {
      scale: 4,
      opacity: 0,
      borderWidth: '0px',
      duration: 1.5,
      stagger: 0.2,
      ease: 'power2.out'
    }, 6.5);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white font-sans selection:bg-red-900">
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
        
        <svg className="hidden">
          <filter id="liquid-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap 
              ref={displacementRef}
              in="SourceGraphic" 
              in2="noise" 
              scale="0" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </svg>

        <div 
          ref={bannerRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 origin-center"
          style={{ backgroundImage: 'url(/images/banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div ref={headlineContainerRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="overflow-hidden">
            <h1 ref={el => headlineRefs.current[0] = el} className="text-6xl md:text-8xl font-light tracking-widest uppercase mb-6 opacity-0 text-center text-white">
              Pure Force
            </h1>
          </div>
          <div className="overflow-hidden">
            <p ref={el => headlineRefs.current[1] = el} className="text-xl md:text-3xl font-light tracking-[0.4em] opacity-0 text-center text-gray-300">
              The New Standard
            </p>
          </div>
        </div>

        <div 
          ref={motoARef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-0"
        >
          <img 
            src="/images/motocycle-main.png" 
            alt="" 
            className="w-full max-w-6xl object-contain drop-shadow-2xl"
            style={{ filter: 'url(#liquid-ripple)' }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <div 
            ref={inkBleedRef}
            className="w-[10vw] h-[10vw] rounded-full bg-[#7a0016] blur-[40px] opacity-0 mix-blend-screen"
          />
        </div>

        <div 
          ref={motoBRef}
          className="absolute inset-0 z-50 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/motorcycle-red.jpg)', clipPath: 'circle(0% at 50% 50%)' }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="relative flex flex-col items-center">
            
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
               {[0, 1, 2].map(i => (
                 <div 
                   key={i}
                   ref={el => shockwavesRef.current[i] = el}
                   className="absolute w-[300px] h-[300px] rounded-full border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.7)] opacity-0"
                 />
               ))}
            </div>
            
            <div ref={zenTextRef} className="text-center opacity-0 z-10">
              <h2 className="text-7xl md:text-9xl font-thin tracking-tighter mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] text-white">SH350i</h2>
              <p className="text-2xl font-light tracking-[0.5em] text-white/90 drop-shadow-lg">$5,499</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
