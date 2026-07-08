import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import StudioLights from "./three/StudioLights"
import { features } from "../constants"
import clsx from "clsx"
import { Suspense, useEffect, useRef } from "react"
import { Html } from "@react-three/drei"
import { useMediaQuery } from "react-responsive"
import MacbookModel from "./models/Macbook"
import useMacbookStore from "../store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


// ModelScroll — The 3D MacBook model that spins as you scroll
// We pass the 3D group ref UP to the parent so the parent can choreograph the GSAP timeline
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

import { useState } from "react";

const Features = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [groupNode, setGroupNode] = useState<THREE.Group | null>(null);
    const { setTexture } = useMacbookStore();

    useGSAP(() => {
        // Only run GSAP once the 3D model is loaded and the ref is passed up
        if (!groupNode || !containerRef.current) return;

        // ONE master timeline to rule them all.
        // This prevents multiple pin-spacers and conflicting triggers.
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: 1,
                pin: true,
            }
        });

        // 1. Rotate the 3D Model continuously across the entire scroll
        timeline.to(groupNode.rotation, { y: Math.PI * 2, ease: 'none', duration: 5 }, 0);

        // 2. Choreograph the DOM elements and video textures
        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, duration: 1 }, 0)
            
            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0, duration: 1 }, 1)
            
            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0, duration: 1 }, 2)
            
            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0, duration: 1 }, 3)
            
            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0, duration: 1 }, 4);

    }, { scope: containerRef, dependencies: [groupNode] });

    return (
        <section id="features" className="bg-sub-paper bg-grain border-b-[6px] border-zinc text-zinc grunge-border">
            <div ref={containerRef} id="features-container" className="relative h-screen overflow-hidden">
                <h2 className="absolute top-10 inset-x-0 z-20 text-zinc font-heading text-6xl lg:text-8xl uppercase leading-none text-center max-w-4xl mx-auto drop-shadow-[4px_4px_0px_var(--color-sub-orange)] pointer-events-none pt-10">A day on my machine.</h2>

                <Canvas id="f-canvas" className="!absolute !inset-0" camera={{}}>
                    <StudioLights />
                    <ambientLight intensity={0.5} />
                    <ModelScroll setGroupNode={setGroupNode} />
                </Canvas>

                <div className="absolute inset-0 pointer-events-none z-10">
                    {features.map((feature, index) => (
                        <div key={feature.id} className={clsx('absolute box', `box${index + 1}`, feature.styles, 'bg-white border-4 border-zinc shadow-[12px_12px_0px_var(--color-zinc)] p-6 pointer-events-auto grunge-border')}>
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