import { Canvas } from "@react-three/fiber"
import * as THREE from 'three';
import StudioLights from "./three/StudioLights"
import { featureSequence, features } from "../constants"
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
// WHY this is a separate component:
// It lives INSIDE the <Canvas> (Three.js world), so it needs access to
// Three.js context (useFrame, refs to 3D objects). Components outside
// <Canvas> can't access that context. That's why we split it out.
const ModelScroll = () => {
    const groupRef = useRef<THREE.Group>(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { setTexture } = useMacbookStore();

    // Pre-load all feature videos so they're ready when scroll triggers them
    // WHY: Without preloading, the first frame would show a blank screen
    // while the video downloads. This creates hidden <video> elements
    // that start loading immediately.
    useEffect(() => {
        featureSequence.forEach((feature) => {
            const v = document.createElement('video');

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous',
            });

            v.load();
        })
    }, [])

    useGSAP(() => {
        // Timeline 1: 3D model rotation (pinned, follows scroll)
        // The model does a full 360° spin as you scroll through this section.
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
            }
        });

        // Timeline 2: Feature cards + video texture sync
        // Each card fades in while the MacBook screen changes to show
        // the corresponding app. This is scroll-choreography.
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom top',
                scrub: 1,
            },
        });

        // Full 360° rotation
        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' });
        }

        // Sync feature cards with video textures on the 3D model screen
        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, delay: 1 })

            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0 })

    }, []);


    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading...</h1></Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}

const Features = () => {
    useEffect(() => {
        // Wait a tick for the canvas to render, then refresh GSAP
        setTimeout(() => ScrollTrigger.refresh(), 100);
    }, []);

    return (
        <section id="features" className="bg-sub-paper bg-grain relative border-b-[6px] border-zinc text-zinc">
            <h2 className="text-zinc font-heading text-6xl lg:text-8xl uppercase leading-none text-center max-w-4xl mx-auto drop-shadow-[4px_4px_0px_var(--color-sub-orange)] pt-20">A day on my machine.</h2>

            <Canvas id="f-canvas" camera={{}}>
                <StudioLights />
                <ambientLight intensity={0.5} />
                <ModelScroll />
            </Canvas>

            <div className="absolute inset-0 pointer-events-none">
                {features.map((feature, index) => (
                    <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles, 'bg-white border-4 border-zinc shadow-[12px_12px_0px_var(--color-zinc)] p-6 pointer-events-auto')}>
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
        </section>
    )
}

export default Features