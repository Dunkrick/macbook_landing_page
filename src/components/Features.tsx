import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import StudioLights from "./three/StudioLights"
import { features } from "../constants"
import clsx from "clsx"
import { Suspense, useEffect, useRef, useState } from "react"
import { Html } from "@react-three/drei"
import { useMediaQuery } from "react-responsive"
import MacbookModel from "./models/Macbook"
import useMacbookStore from "../store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Texture breakpoints — which video plays at which scroll progress range
const TEXTURE_RANGES = [
    { texture: '/videos/feature-1.mp4', from: 0,    to: 0.2  },
    { texture: '/videos/feature-2.mp4', from: 0.2,  to: 0.4  },
    { texture: '/videos/feature-3.mp4', from: 0.4,  to: 0.6  },
    { texture: '/videos/feature-4.mp4', from: 0.6,  to: 0.8  },
    { texture: '/videos/feature-5.mp4', from: 0.8,  to: 1.01 },
];

// ModelScroll — The 3D MacBook model that spins as you scroll.
// We pass the 3D group ref UP to the parent so GSAP can drive the rotation.
const ModelScroll = ({ setGroupNode }: { setGroupNode: (node: THREE.Group) => void }) => {
    const groupRef = useRef<THREE.Group>(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useEffect(() => {
        if (groupRef.current) {
            setGroupNode(groupRef.current);
        }
    }, [setGroupNode]);

    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading...</h1></Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}

const Features = () => {
    // BUG 2 FIX: containerRef now points to the outer <section> so GSAP pins
    // the correct element without conflicting with any outer padding.
    const containerRef = useRef<HTMLElement>(null);
    const [groupNode, setGroupNode] = useState<THREE.Group | null>(null);
    const { setTexture } = useMacbookStore();

    useGSAP(() => {
        // Only run once the 3D model ref is available
        if (!groupNode || !containerRef.current) return;

        // BUG 3 FIX: Use gsap.set() to initialise all card states from JavaScript,
        // not from Tailwind CSS classes. This gives GSAP full control of the transform.
        gsap.set('.feat-box', { opacity: 0, y: 30 });

        // ONE master timeline — prevents multiple pin-spacers and conflicting triggers
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                // BUG 5 FIX: Use onUpdate to set video texture based on scroll progress.
                // This fires in BOTH directions (scroll down AND back up), unlike .call()
                // which is forward-only. The correct texture always reflects current position.
                onUpdate: (self) => {
                    const p = self.progress;
                    for (const range of TEXTURE_RANGES) {
                        if (p >= range.from && p < range.to) {
                            setTexture(range.texture);
                            break;
                        }
                    }
                },
            }
        });

        // 1. Rotate 3D model continuously across the full scroll range
        timeline.to(groupNode.rotation, { y: Math.PI * 2, ease: 'none', duration: 5 }, 0);

        // 2. BUG 3 FIX: Use .fromTo() so GSAP knows the start AND end state for y.
        // The initial state is managed by gsap.set() above — no Tailwind conflicts.
        timeline
            .fromTo('.feat-box1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0)
            .fromTo('.feat-box2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1)
            .fromTo('.feat-box3', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 2)
            .fromTo('.feat-box4', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 3)
            .fromTo('.feat-box5', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 4);

    }, { scope: containerRef, dependencies: [groupNode] });

    return (
        // BUG 2 FIX: ref is on the <section> — this is what GSAP pins.
        // No pt-40 in CSS either (removed from #features rule).
        <section ref={containerRef} id="features" className="bg-sub-paper bg-grain border-b-[6px] border-zinc text-zinc grunge-border">
            <div id="features-container" className="relative h-screen overflow-hidden">

                <h2 className="absolute top-10 inset-x-0 z-30 text-zinc font-heading text-6xl lg:text-8xl uppercase leading-none text-center max-w-4xl mx-auto drop-shadow-[4px_4px_0px_var(--color-sub-orange)] pointer-events-none pt-10">
                    A day on my machine.
                </h2>

                {/* BUG 1 FIX: Canvas is z-10 so the cards overlay (z-20) renders above it. */}
                {/* BUG 4 FIX: Explicit camera config instead of empty camera={{}} */}
                <Canvas
                    id="f-canvas"
                    className="!absolute !inset-0"
                    camera={{ position: [0, 1.5, 7], fov: 50, near: 0.1, far: 100 }}
                >
                    <StudioLights />
                    <ambientLight intensity={0.5} />
                    <ModelScroll setGroupNode={setGroupNode} />
                </Canvas>

                {/* BUG 1 FIX: z-20 puts cards above the z-10 canvas */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={clsx(
                                'absolute feat-box',
                                `feat-box${index + 1}`,
                                feature.styles,
                                'bg-white border-4 border-zinc shadow-[12px_12px_0px_var(--color-zinc)] p-6 pointer-events-auto grunge-border max-w-xs'
                            )}
                        >
                            <img src={feature.icon} alt={feature.highlight} className="w-12 h-12 lg:w-16 lg:h-16 mb-4 object-contain" />
                            <p className="font-sans font-medium text-lg text-zinc/90 mt-2">
                                <span className="font-bold text-sub-orange bg-sub-orange/10 px-2 py-1 border border-sub-orange mr-2 inline-block">
                                    {feature.highlight}
                                </span>
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Features