import { useEffect, useRef, useState } from "react"
import { features } from "../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ── Live clock for the fake menu bar ──────────────────────────
const LiveClock = () => {
    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    );
    useEffect(() => {
        const t = setInterval(() =>
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
        , 1000);
        return () => clearInterval(t);
    }, []);
    return <span>{time}</span>;
};

// ── Speech bubble tail component ──────────────────────────────
const BubbleTail = () => (
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
        {/* outer (border color) */}
        <div className="w-0 h-0 absolute left-1/2 -translate-x-1/2"
            style={{ borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '20px solid var(--color-sub-orange)' }}
        />
        {/* inner (fill color) */}
        <div className="w-0 h-0 absolute left-1/2 -translate-x-1/2 top-0"
            style={{ borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderTop: '17px solid #ffffff', marginTop: '-1px' }}
        />
    </div>
);

// ─────────────────────────────────────────────────────────────
const Features = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // GSAP owns ALL initial states — no Tailwind classes for animation state
        gsap.set('.feat-bubble', { opacity: 0, y: 28, scale: 0.9 });
        gsap.set('.feat-dock-icon', { opacity: 0.3, scale: 1 });
        gsap.set('.feat-app-label', { opacity: 0 });

        // Show feature 0 immediately on mount
        gsap.set('.feat-bubble-0', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.feat-dock-icon-0', { opacity: 1, scale: 1.3 });
        gsap.set('.feat-app-label-0', { opacity: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
            }
        });

        // 4 transitions for 5 features
        for (let i = 1; i < features.length; i++) {
            const at = i - 1; // timeline position: 0, 1, 2, 3

            // Fade out previous
            tl.to(`.feat-bubble-${i - 1}`,   { opacity: 0, y: -24, scale: 0.9, duration: 0.35 }, at);
            tl.to(`.feat-dock-icon-${i - 1}`, { opacity: 0.3, scale: 1, duration: 0.3 },          at);
            tl.to(`.feat-app-label-${i - 1}`, { opacity: 0, duration: 0.2 },                      at);

            // Bring in current
            tl.fromTo(`.feat-bubble-${i}`,
                { opacity: 0, y: 28, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
                at + 0.35
            );
            tl.to(`.feat-dock-icon-${i}`,
                { opacity: 1, scale: 1.3, duration: 0.4, ease: 'back.out(2.5)' },
                at + 0.35
            );
            tl.to(`.feat-app-label-${i}`,
                { opacity: 1, duration: 0.3 },
                at + 0.4
            );
        }

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="features"
            className="border-b-[6px] border-sub-orange grunge-border pt-[85px]"
        >
            <div
                className="flex flex-col"
                style={{
                    height: 'calc(100vh - 85px)',
                    background: 'radial-gradient(ellipse at 50% 105%, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.03) 40%, #080810 65%)',
                }}
            >
                {/* ── Fake macOS Menu Bar ── */}
                <div
                    className="flex items-center justify-between px-5 h-7 shrink-0 z-30 select-none"
                    style={{
                        background: 'rgba(8,8,16,0.90)',
                        backdropFilter: 'blur(24px)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    }}
                >
                    <div className="flex items-center gap-4 text-white">
                        {/* Apple-ish logo */}
                        <svg width="13" height="16" viewBox="0 0 814 1000" fill="currentColor" className="opacity-70 shrink-0">
                            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-97.1C27.8 752.4 0 668.8 0 590.5c0-194.3 128.4-297.5 254.5-297.5 67.3 0 123.1 44.8 164.7 44.8 39.5 0 101.1-47.6 176.3-47.6 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                        </svg>
                        <span className="text-white/80 text-[11px] font-semibold tracking-wide">Rithwick's Machine</span>
                        <span className="text-white/30 text-[11px] hidden md:inline">File</span>
                        <span className="text-white/30 text-[11px] hidden md:inline">Edit</span>
                        <span className="text-white/30 text-[11px] hidden md:inline">View</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <span>🔋 94%</span>
                        <span className="hidden md:inline">Wed</span>
                        <LiveClock />
                    </div>
                </div>

                {/* ── Main desktop area ── */}
                <div className="flex-1 flex flex-col items-center justify-between pt-6 pb-3 px-4 relative overflow-hidden">

                    {/* Subtle grid lines — gives depth to the dark desktop */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Section Heading */}
                    <h2
                        className="text-white font-heading text-4xl md:text-6xl lg:text-7xl uppercase text-center leading-none z-20 relative"
                        style={{ textShadow: '0 0 80px rgba(249,115,22,0.20)' }}
                    >
                        A day on my machine.
                    </h2>

                    {/* ── Speech bubbles (center stage) ── */}
                    <div className="relative z-20 w-full flex items-center justify-center flex-1 py-4">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`feat-bubble feat-bubble-${index} absolute`}
                                style={{ width: 'min(480px, 88vw)' }}
                            >
                                {/* App name badge */}
                                <div className={`feat-app-label feat-app-label-${index} flex items-center justify-center gap-2 mb-4`}>
                                    <img
                                        src={feature.icon}
                                        alt={feature.highlight}
                                        className="w-6 h-6 object-contain"
                                        draggable={false}
                                    />
                                    <span className="text-sub-orange font-sans font-bold text-sm uppercase tracking-widest">
                                        {feature.highlight}
                                    </span>
                                </div>

                                {/* Bubble card — explicit white background with !important to beat any dark mode global rule */}
                                <div
                                    className="relative rounded-2xl px-7 py-5 grunge-border"
                                    style={{
                                        backgroundColor: '#ffffff',
                                        border: '3px solid var(--color-sub-orange)',
                                        boxShadow: '0 0 40px rgba(249,115,22,0.18), 6px 6px 0px var(--color-sub-orange)',
                                    }}
                                >
                                    <p
                                        className="font-marker text-lg md:text-xl leading-relaxed text-center"
                                        style={{ color: '#111118' }}
                                    >
                                        "{feature.annotation}"
                                    </p>
                                    <BubbleTail />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── macOS Dock ── */}
                    <div className="z-20 flex justify-center w-full shrink-0 px-2">
                        <div
                            className="flex items-end gap-1.5 md:gap-2 lg:gap-3 px-3 md:px-4 py-3 rounded-2xl max-w-full"
                            style={{
                                background: 'rgba(255,255,255,0.07)',
                                backdropFilter: 'blur(40px)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                boxShadow: '0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                            }}
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`feat-dock-icon feat-dock-icon-${index} flex flex-col items-center gap-1 cursor-default select-none shrink-0`}
                                    style={{ transformOrigin: 'bottom center' }}
                                    title={feature.highlight}
                                >
                                    <img
                                        src={feature.icon}
                                        alt={feature.highlight}
                                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl object-contain"
                                        draggable={false}
                                    />
                                    <div className="w-1 h-1 rounded-full bg-white/60" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;