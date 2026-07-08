import * as THREE from 'three';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14";
import MacbookModel16 from "../models/Macbook-16";

// ─── constants ───────────────────────────────────────────────────────────────
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE    = 50;

// ─── helpers ─────────────────────────────────────────────────────────────────
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

// ─── shared scroll progress (written from the DOM side via window.__pvScroll) ─
// ProductViewer sets window.__pvScroll = 0..1 via a ScrollTrigger on update
declare global { interface Window { __pvScroll?: number } }

// ─── types ───────────────────────────────────────────────────────────────────
interface ModelSwitcherProps { scale: number; isMobile: boolean; }

// ─── component ───────────────────────────────────────────────────────────────
const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE  = 0.05;

    const smallRef = useRef<THREE.Group>(null);
    const largeRef = useRef<THREE.Group>(null);

    const showLarge = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    // ── switch model on scale change ─────────────────────────────────────────
    useGSAP(() => {
        if (showLarge) {
            moveGroup(smallRef.current, -OFFSET_DISTANCE);
            moveGroup(largeRef.current, 0);
            fadeMeshes(smallRef.current, 0);
            fadeMeshes(largeRef.current, 1);
        } else {
            moveGroup(smallRef.current, 0);
            moveGroup(largeRef.current, OFFSET_DISTANCE);
            fadeMeshes(smallRef.current, 1);
            fadeMeshes(largeRef.current, 0);
        }
    }, { dependencies: [scale] });

    // ── drive explosion from scroll (useFrame = safe inside R3F) ──
    useFrame(() => {
        const t = window.__pvScroll ?? 0;
        const activeRef = showLarge ? largeRef : smallRef;
        const group = activeRef.current;
        if (!group) return;

        // Explosion phase maps directly to scroll (0 → 1)
        const expT = t;

        const screen   = group.getObjectByName("layer_screen");
        const keyboard = group.getObjectByName("layer_keyboard");
        const logic    = group.getObjectByName("layer_logic");
        const battery  = group.getObjectByName("layer_battery");
        const chassis  = group.getObjectByName("layer_chassis");

        // Compress the explosion so it stays on screen
        if (screen)   screen.position.y   =  expT * 1.5;
        if (keyboard) keyboard.position.y =  expT * 0.75;
        if (logic)    logic.position.y    =  0;
        if (battery)  battery.position.y  = -expT * 0.75;
        if (chassis)  chassis.position.y  = -expT * 1.5;
    });

    return (
        <group>
            <group ref={largeRef}>
                <MacbookModel16 scale={isMobile ? SCALE_LARGE_MOBILE : SCALE_LARGE_DESKTOP} />
            </group>
            <group ref={smallRef} position={[OFFSET_DISTANCE, 0, 0]}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
        </group>
    );
};

export default ModelSwitcher;