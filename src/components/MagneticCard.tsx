import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticCardProps {
    children: React.ReactNode;
    className?: string;
}

const MagneticCard: React.FC<MagneticCardProps> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    
    // Use GSAP quickTo for highly performant physics-like updates on mouse move
    const xTo = useRef<any>(null);
    const yTo = useRef<any>(null);
    const rotateXTo = useRef<any>(null);
    const rotateYTo = useRef<any>(null);
    const glareXTo = useRef<any>(null);
    const glareYTo = useRef<any>(null);
    const glareOpacityTo = useRef<any>(null);

    useGSAP(() => {
        xTo.current = gsap.quickTo(cardRef.current, "x", { duration: 0.5, ease: "power3.out" });
        yTo.current = gsap.quickTo(cardRef.current, "y", { duration: 0.5, ease: "power3.out" });
        rotateXTo.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.5, ease: "power3.out" });
        rotateYTo.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.5, ease: "power3.out" });
        
        glareXTo.current = gsap.quickTo(glareRef.current, "x", { duration: 0.5, ease: "power3.out" });
        glareYTo.current = gsap.quickTo(glareRef.current, "y", { duration: 0.5, ease: "power3.out" });
        glareOpacityTo.current = gsap.quickTo(glareRef.current, "opacity", { duration: 0.5, ease: "power3.out" });
    }, { scope: cardRef });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the card
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        // Normalize values (-1 to 1)
        const normX = relX / (rect.width / 2);
        const normY = relY / (rect.height / 2);

        // Movement limits (how physical/magnetic it feels)
        const moveLimit = 15; // Max pixels it pulls towards mouse
        const rotateLimit = 12; // Max degrees it tilts

        if (xTo.current) xTo.current(normX * moveLimit);
        if (yTo.current) yTo.current(normY * moveLimit);
        
        // X rotation is driven by Y mouse position, Y rotation is driven by X mouse position
        if (rotateXTo.current) rotateXTo.current(-normY * rotateLimit); 
        if (rotateYTo.current) rotateYTo.current(normX * rotateLimit);

        // Glare sweeps across in the opposite direction of the tilt
        if (glareXTo.current) glareXTo.current(-normX * 150);
        if (glareYTo.current) glareYTo.current(-normY * 150);
        if (glareOpacityTo.current) glareOpacityTo.current(0.3); // Fade in glare
    };

    const handleMouseLeave = () => {
        // Snap back to original position
        if (xTo.current) xTo.current(0);
        if (yTo.current) yTo.current(0);
        if (rotateXTo.current) rotateXTo.current(0);
        if (rotateYTo.current) rotateYTo.current(0);
        
        if (glareXTo.current) glareXTo.current(0);
        if (glareYTo.current) glareYTo.current(0);
        if (glareOpacityTo.current) glareOpacityTo.current(0);
    };

    return (
        // Perspective container is required for 3D transforms to look 3D
        <div style={{ perspective: "1000px" }} className="w-full h-full">
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={className}
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
                {/* Glare Layer */}
                <div 
                    ref={glareRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 60%)',
                        mixBlendMode: 'overlay',
                        zIndex: 50,
                        transform: 'translateZ(1px)', // Sit slightly above content
                        scale: 1.5, // Make glare large enough to sweep across
                    }}
                />
                
                {children}
            </div>
        </div>
    );
};

export default MagneticCard;
