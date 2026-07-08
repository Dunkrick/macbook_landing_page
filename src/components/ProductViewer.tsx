import clsx from 'clsx';
import { Canvas } from '@react-three/fiber'
import useMacbookStore from '../store'
import StudioLights from './three/StudioLights';
import ModelSwitcher from './three/ModelSwitcher';
import { useMediaQuery } from 'react-responsive';
import { mySpecs } from '../constants';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useEffect(() => {
        // Wait longer than the 1.5s GLTF hydration delay in ModelSwitcher
        setTimeout(() => ScrollTrigger.refresh(), 2200);
    }, []);

    return (
        <section id="product-viewer" className="relative h-screen bg-black overflow-hidden">
            {/* Header text — absolutely positioned so it floats over the canvas */}
            <div className="absolute top-32 md:top-40 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none w-full px-5">
                <h2 className="text-white font-heading text-5xl lg:text-7xl uppercase tracking-normal leading-none mt-4">
                    My Exact Machine.
                </h2>
                <p className="text-gray-300 font-sans font-medium text-sm lg:text-base mt-3 tracking-wide">
                    MacBook Pro 16&quot; · M3 Pro · 18GB · Space Black
                </p>
            </div>

            {/* The 3D Canvas — full-bleed, fills the entire section */}
            <Canvas
                id="canvas"
                camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
                className="!w-full !h-full"
                gl={{ alpha: false }}
                style={{ background: '#050505' }}
            >
                <StudioLights />
                <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
            </Canvas>

            {/* Controls — floated over the canvas at the bottom */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-4 bg-neutral-800 rounded-full px-6 py-3">
                        <div
                            onClick={() => setColor('#adb5bd')}
                            className={clsx('size-7 rounded-full cursor-pointer bg-neutral-300', color === '#adb5bd' && 'ring-4 ring-white ring-offset-2 ring-offset-neutral-800')}
                        />
                        <div
                            onClick={() => setColor('#2e2c2e')}
                            className={clsx('size-7 rounded-full cursor-pointer bg-neutral-900', color === '#2e2c2e' && 'ring-4 ring-white ring-offset-2 ring-offset-neutral-800')}
                        />
                    </div>

                    <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-2 py-2">
                        <div
                            onClick={() => setScale(0.06)}
                            className={clsx('px-4 py-1.5 rounded-full cursor-pointer font-sans text-sm font-medium transition-all', scale === 0.06 ? 'bg-white text-black' : 'text-white')}
                        >14&quot;</div>
                        <div
                            onClick={() => setScale(0.08)}
                            className={clsx('px-4 py-1.5 rounded-full cursor-pointer font-sans text-sm font-medium transition-all', scale === 0.08 ? 'bg-white text-black' : 'text-white')}
                        >16&quot;</div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <p className="font-sans text-xs text-gray-400 tracking-wider uppercase">
                        {mySpecs.chip} · {mySpecs.cpu.split(' (')[0]} · {mySpecs.gpu} GPU · {mySpecs.memory}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductViewer;