import { PresentationControls } from "@react-three/drei";
import * as THREE from 'three';
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14";
import MacbookModel16 from "../models/Macbook-16";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: THREE.Group | null, opacity: number) => {
    if (!group) return;
    group.traverse((child: any) => {
        if (child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
        }
    });
};

const moveGroup = (group: THREE.Group | null, x: number) => {
    if (!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

interface ModelSwitcherProps {
    scale: number;
    isMobile: boolean;
}

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMacbookRef = useRef<THREE.Group>(null);
    const largeMacbookRef = useRef<THREE.Group>(null);
    // Guard so we only create the explosion ScrollTrigger once
    const explosionSetUp = useRef(false);

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    // ── EFFECT 1: Model switching (re-runs when scale changes) ──────────────
    useGSAP(() => {
        if (showLargeMacbook) {
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);
            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
    }, { dependencies: [scale] });

    // ── EFFECT 2: Explode & Rotate (runs ONCE on mount, never re-created) ──
    useGSAP(() => {
        // Poll to let the lazy-loaded GLTF fully hydrate the scene graph
        const interval = setInterval(() => {
            if (explosionSetUp.current) {
                clearInterval(interval);
                return;
            }

            const getLayers = (ref: React.RefObject<THREE.Group | null>) => ({
                chassis:  ref.current?.getObjectByName("layer_chassis")  ?? null,
                battery:  ref.current?.getObjectByName("layer_battery")  ?? null,
                logic:    ref.current?.getObjectByName("layer_logic")    ?? null,
                keyboard: ref.current?.getObjectByName("layer_keyboard") ?? null,
                screen:   ref.current?.getObjectByName("layer_screen")   ?? null,
            });

            const large = getLayers(largeMacbookRef);

            // All 5 layers must be present before we commit to pinning
            if (!large.chassis || !large.battery || !large.logic || !large.keyboard || !large.screen || !largeMacbookRef.current) {
                return;
            }

            explosionSetUp.current = true;
            clearInterval(interval);

            const small = getLayers(smallMacbookRef);

            const getTargets = (key: keyof typeof large) =>
                [large[key]?.position, small[key]?.position].filter(Boolean);

            const rotationTargets = [largeMacbookRef.current.rotation, smallMacbookRef.current?.rotation].filter(Boolean);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#product-viewer",
                    start: "top top",
                    end: "+=2000",   // 2000px of scroll consumed while pinned
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Phase 1 (0 → 0.5): rotate
            tl.to(rotationTargets, {
                y: Math.PI * 2,
                ease: "power1.inOut",
                duration: 0.5
            }, 0)
            // Phase 2 (0 → 1): explode layers apart
            .to(getTargets("screen"), {
                y: 20, z: -5,
                ease: "power2.out",
                duration: 1
            }, 0)
            .to(getTargets("keyboard"), {
                y: 10,
                ease: "power2.out",
                duration: 1
            }, 0)
            .to(getTargets("logic"), {
                y: 0,
                ease: "none",
                duration: 1
            }, 0)
            .to(getTargets("battery"), {
                y: -10,
                ease: "power2.out",
                duration: 1
            }, 0)
            .to(getTargets("chassis"), {
                y: -20,
                ease: "power2.out",
                duration: 1
            }, 0)
            // Phase 3 (0.5 → 1): fade in labels
            .to(".explode-label", {
                opacity: 1,
                ease: "power2.in",
                duration: 0.3
            }, 0.5);

            ScrollTrigger.refresh();
        }, 100);

        return () => clearInterval(interval);
    }, { dependencies: [] }); // ← empty: runs exactly once

    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        polar: [-Math.PI / 4, Math.PI / 4] as [number, number],
        azimuth: [-Infinity, Infinity] as [number, number],
        config: { mass: 1, tension: 0, friction: 26 }
    };

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? SCALE_LARGE_MOBILE : SCALE_LARGE_DESKTOP} />
                </group>
            </PresentationControls>
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    );
};

export default ModelSwitcher;