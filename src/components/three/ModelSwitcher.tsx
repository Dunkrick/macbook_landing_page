import { PresentationControls } from "@react-three/drei";
import * as THREE from 'three';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14";
import MacbookModel16 from "../models/Macbook-16";

// ─── constants ───────────────────────────────────────────────────────────────
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE    = 5;

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

    // ── drive rotation + explosion from scroll (useFrame = safe inside R3F) ──
    // scroll 0..0.4  → full Y rotation
    // scroll 0.4..1  → explode layers in Y
    useFrame(() => {
        const t = window.__pvScroll ?? 0;
        const activeRef = showLarge ? largeRef : smallRef;
        const group = activeRef.current;
        if (!group) return;

        // Rotation phase (0 → 0.4 of scroll)
        const rotT = Math.min(t / 0.4, 1);
        group.rotation.y = rotT * Math.PI * 2;

        // Explosion phase (0.4 → 1 of scroll)
        const expT = Math.max((t - 0.4) / 0.6, 0);

        const screen   = group.getObjectByName("layer_screen");
        const keyboard = group.getObjectByName("layer_keyboard");
        const logic    = group.getObjectByName("layer_logic");
        const battery  = group.getObjectByName("layer_battery");
        const chassis  = group.getObjectByName("layer_chassis");

        if (screen)   screen.position.y   =  expT * 6;
        if (keyboard) keyboard.position.y =  expT * 3;
        if (logic)    logic.position.y    =  0;
        if (battery)  battery.position.y  = -expT * 3;
        if (chassis)  chassis.position.y  = -expT * 6;
    });

    const controlsConfig = {
        snap:    true,
        speed:   1,
        zoom:    1,
        polar:   [-Math.PI / 4, Math.PI / 4] as [number, number],
        azimuth: [-Infinity, Infinity] as [number, number],
        config:  { mass: 1, tension: 0, friction: 26 },
    };

    return (
        // Single PresentationControls wrapping both models keeps one event context
        <PresentationControls {...controlsConfig}>
            <group ref={largeRef}>
                <MacbookModel16 scale={isMobile ? SCALE_LARGE_MOBILE : SCALE_LARGE_DESKTOP} />
            </group>
            <group ref={smallRef} position={[OFFSET_DISTANCE, 0, 0]}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
        </PresentationControls>
    );
};

export default ModelSwitcher;