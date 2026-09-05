import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const bikesContainerRef = useRef(null);
  const greenBikeRef = useRef(null);
  const greyBikeRef = useRef(null);
  const whiteBikeRef = useRef(null);
  const darkBikeRef = useRef(null);
  const greenCharsRef = useRef([]);
  const greyTextRef = useRef(null);
  const whiteTextRef = useRef(null);
  const darkTextRef = useRef(null);

  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    gsap.fromTo(greenCharsRef.current, {
      yPercent: 120,
      opacity: 0,
      filter: 'blur(8px)'
    }, {
      yPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      stagger: 0.05,
      ease: 'power3.out',
      delay: 0.2
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    const maskVals = { grey1: 100, grey2: 150, white1: 0, white2: 0 };

    tl.to(bannerRef.current, {
      scale: 0.8,
      filter: 'blur(20px) brightness(0.2)',
      duration: 2
    }, 0)
    .fromTo(bikesContainerRef.current, {
      y: 200,
      scale: 0.8,
      opacity: 0
    }, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    }, 0)
    .to(greenBikeRef.current, {
      clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: 'power2.inOut'
    }, 2.5)
    .to(greenCharsRef.current, {
      y: () => Math.random() * 100 + 50,
      opacity: 0,
      rotation: () => Math.random() * 40 - 20,
      duration: 1.5,
      stagger: 0.02,
      ease: 'power2.in'
    }, 2.5)
    .fromTo(greyTextRef.current, {
      scale: 1.5,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, 2.5)
    .to(maskVals, {
      grey1: -50,
      grey2: 0,
      duration: 2,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (greyBikeRef.current) {
          greyBikeRef.current.style.setProperty('--mask-stop-1', `${maskVals.grey1}%`);
          greyBikeRef.current.style.setProperty('--mask-stop-2', `${maskVals.grey2}%`);
        }
      }
    }, 4.5)
    .to(greyTextRef.current, {
      x: 100,
      filter: 'blur(10px)',
      opacity: 0,
      duration: 2
    }, 4.5)
    .fromTo(whiteTextRef.current, {
      opacity: 0,
      filter: 'blur(10px)',
      x: -50
    }, {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      duration: 2,
      ease: 'power2.out'
    }, 4.5)
    .to(maskVals, {
      white1: 100,
      white2: 150,
      duration: 2,
      ease: 'power2.in',
      onUpdate: () => {
        if (whiteBikeRef.current) {
          whiteBikeRef.current.style.setProperty('--radial-stop-1', `${maskVals.white1}%`);
          whiteBikeRef.current.style.setProperty('--radial-stop-2', `${maskVals.white2}%`);
        }
      }
    }, 7)
    .to(whiteTextRef.current, {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      duration: 1.5
    }, 7)
    .fromTo(darkTextRef.current, {
      opacity: 0,
      scale: 1.2,
      textShadow: '0 0 0px rgba(255, 215, 0, 0)'
    }, {
      opacity: 1,
      scale: 1,
      textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
      duration: 1,
      ease: 'power2.out'
    }, 7)
    .to(darkTextRef.current, {
      textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
      duration: 1,
      ease: 'power2.inOut'
    }, 8);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white font-sans selection:bg-gray-800">
      <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-black flex flex-col items-center justify-center">
        
        <div 
          ref={bannerRef}
          className="absolute inset-0 bg-cover bg-center origin-center z-0"
          style={{ backgroundImage: `url(${baseUrl}images/banner-bg.jpg)` }}
        />
        
        <div className="absolute top-[15%] w-full flex flex-col items-center z-50">
          <div className="absolute w-full flex justify-center overflow-hidden h-20">
            <div className="flex text-4xl font-black tracking-tighter text-[#A1B59C] drop-shadow-lg">
              {"HONDA SH350i".split("").map((c, i) => (
                <span key={i} ref={el => greenCharsRef.current[i] = el} className="inline-block origin-bottom">
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </div>
          </div>
          
          <div ref={greyTextRef} className="absolute w-full flex justify-center opacity-0 mt-2">
            <h2 className="text-4xl font-black tracking-tighter text-[#9ca3af] drop-shadow-lg">
              TITANIUM GREY
            </h2>
          </div>
          
          <div ref={whiteTextRef} className="absolute w-full flex justify-center opacity-0 mt-2">
            <h2 className="text-4xl font-black tracking-tighter text-white drop-shadow-lg">
              PEARL WHITE
            </h2>
          </div>
          
          <div ref={darkTextRef} className="absolute w-full flex justify-center opacity-0 mt-2">
            <h2 className="text-4xl font-black tracking-tighter text-[#4b5563]">
              STEALTH BLACK
            </h2>
          </div>
        </div>

        <div 
          ref={bikesContainerRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 z-30"
        >
          <img 
            ref={darkBikeRef}
            src={`${baseUrl}images/motorcycle-dark-grey.png`} 
            alt="" 
            className="absolute w-[90%] object-contain drop-shadow-2xl z-10"
          />

          <img 
            ref={whiteBikeRef}
            src={`${baseUrl}images/motorcycle-white.png`} 
            alt="" 
            className="absolute w-[90%] object-contain drop-shadow-2xl z-20"
            style={{ 
              '--radial-stop-1': '0%', 
              '--radial-stop-2': '0%',
              WebkitMaskImage: 'radial-gradient(circle at 50% 55%, rgba(0,0,0,0) var(--radial-stop-1), rgba(0,0,0,1) var(--radial-stop-2))',
              maskImage: 'radial-gradient(circle at 50% 55%, rgba(0,0,0,0) var(--radial-stop-1), rgba(0,0,0,1) var(--radial-stop-2))'
            }}
          />

          <img 
            ref={greyBikeRef}
            src={`${baseUrl}images/motorcycle-grey.png`} 
            alt="" 
            className="absolute w-[90%] object-contain drop-shadow-2xl z-30"
            style={{ 
              '--mask-stop-1': '100%', 
              '--mask-stop-2': '150%',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) var(--mask-stop-1), rgba(0,0,0,0) var(--mask-stop-2))',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) var(--mask-stop-1), rgba(0,0,0,0) var(--mask-stop-2))'
            }}
          />

          <img 
            ref={greenBikeRef}
            src={`${baseUrl}images/motorcycle-green.png`} 
            alt="" 
            className="absolute w-[90%] object-contain drop-shadow-2xl z-40"
            style={{ 
              clipPath: 'polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
