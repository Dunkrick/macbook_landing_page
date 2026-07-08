import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useMacbookStore from '../store';
import StudioLights from './three/StudioLights';
import ModelSwitcher from './three/ModelSwitcher';
import { useMediaQuery } from 'react-responsive';
import { mySpecs } from '../constants';

gsap.registerPlugin(ScrollTrigger);

// ─── Explode label data ───────────────────────────────────────────────────────
const LABELS = [
    { id: 'label-screen',   text: 'Liquid Retina XDR',  top: '12%' },
    { id: 'label-keyboard', text: 'Keyboard & Trackpad', top: '30%' },
    { id: 'label-logic',    text: 'M3 Pro Logic Board',  top: '50%' },
    { id: 'label-battery',  text: 'Battery & Cooling',   top: '68%' },
    { id: 'label-chassis',  text: 'Aluminum Shell',      top: '86%' },
];

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore();
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const pinRef   = useRef<HTMLDivElement>(null);

    // ── DOM-side GSAP: pin the section and write scroll progress to window ──
    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Initialise scroll value
            window.__pvScroll = 0;

            const st = ScrollTrigger.create({
                trigger:       pinRef.current,
                start:         'top top',
                end:           '+=2500',
                scrub:         1.2,
                pin:           true,
                anticipatePin: 1,
                pinSpacing:    true,   // ← keeps layout of sections below intact
                onUpdate: (self) => {
                    window.__pvScroll = self.progress;
                    // fade in labels in the second half of scroll
                    const opacity = self.progress > 0.4 ? (self.progress - 0.4) / 0.6 : 0;
                    document.querySelectorAll<HTMLElement>('.explode-label').forEach(el => {
                        el.style.opacity = String(opacity);
                    });
                },
            });

            return () => st.kill();
        });
        return () => ctx.revert();
    }, { scope: pinRef });

    // Refresh ScrollTrigger once Canvas has rendered
    useEffect(() => {
        const t = setTimeout(() => ScrollTrigger.refresh(), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        // pinRef wraps EVERYTHING so GSAP pins the correct DOM node
        <div ref={pinRef} id="product-viewer" className="relative h-screen bg-black overflow-hidden">

            {/* Title */}
            <div className="absolute top-24 inset-x-0 z-20 text-center pointer-events-none">
                <h2 className="text-white font-heading text-5xl lg:text-7xl uppercase leading-none">
                    My Exact Machine.
                </h2>
                <p className="text-gray-400 font-sans text-sm mt-3 tracking-widest uppercase">
                    MacBook Pro 16&quot; · M3 Pro · 18GB · Space Black
                </p>
            </div>

            {/* DOM labels — absolutely positioned, fade in via onUpdate */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {LABELS.map(l => (
                    <div
                        key={l.id}
                        className="explode-label absolute right-8 lg:right-20 opacity-0 transition-none
                                   bg-black border-2 border-sub-orange text-sub-orange
                                   font-sans font-bold text-xs uppercase tracking-widest
                                   px-4 py-2 shadow-[4px_4px_0px_var(--color-sub-orange)]"
                        style={{ top: l.top }}
                    >
                        {l.text}
                    </div>
                ))}
            </div>

            {/* 3D Canvas — fills the section */}
            <Canvas
                camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
                className="!absolute !inset-0"
                gl={{ alpha: false, antialias: true }}
                style={{ background: '#050505' }}
            >
                <StudioLights />
                <Suspense fallback={null}>
                    <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>

            {/* Controls */}
            <div className="absolute bottom-10 inset-x-0 z-20 flex flex-col items-center gap-3">
                <div className="flex items-center gap-5">
                    {/* Color swatches */}
                    <div className="flex items-center gap-4 bg-neutral-900/80 backdrop-blur rounded-full px-6 py-3">
                        <div onClick={() => setColor('#adb5bd')}
                             className={clsx('size-7 rounded-full cursor-pointer bg-neutral-300',
                                 color === '#adb5bd' && 'ring-4 ring-white ring-offset-2 ring-offset-neutral-900')} />
                        <div onClick={() => setColor('#2e2c2e')}
                             className={clsx('size-7 rounded-full cursor-pointer bg-neutral-900 border border-neutral-600',
                                 color === '#2e2c2e' && 'ring-4 ring-white ring-offset-2 ring-offset-neutral-900')} />
                    </div>
                    {/* Size toggle */}
                    <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur rounded-full px-2 py-2">
                        <div onClick={() => setScale(0.06)}
                             className={clsx('px-4 py-1.5 rounded-full cursor-pointer font-sans text-sm font-medium transition-all',
                                 scale === 0.06 ? 'bg-white text-black' : 'text-white')}>14&quot;</div>
                        <div onClick={() => setScale(0.08)}
                             className={clsx('px-4 py-1.5 rounded-full cursor-pointer font-sans text-sm font-medium transition-all',
                                 scale === 0.08 ? 'bg-white text-black' : 'text-white')}>16&quot;</div>
                    </div>
                </div>
                <p className="font-sans text-xs text-gray-500 tracking-wider uppercase">
                    {mySpecs.chip} · {mySpecs.cpu.split(' (')[0]} · {mySpecs.gpu} GPU · {mySpecs.memory}
                </p>
            </div>
        </div>
    );
};

export default ProductViewer;