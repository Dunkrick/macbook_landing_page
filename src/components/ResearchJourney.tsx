import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { researchStory } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ResearchJourney = () => {
    const containerRef = useRef<HTMLElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.story-panel');
        
        // Horizontal scroll animation
        // WHY: Transforms vertical scrolling into a horizontal journey.
        // It gives a sense of progression through time, perfect for a story.
        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                start: "top top",
                end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0)
            }
        });

        // Fade in each card's content as it comes into view
        sections.forEach((section: any) => {
            gsap.fromTo(
                section.querySelectorAll('.reveal-text'),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: scrollTween,
                        start: "left center",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <section id="journey" className="overflow-hidden bg-sub-paper bg-grain text-zinc" ref={containerRef}>
            <div className="h-screen flex items-center" ref={scrollWrapperRef} style={{ width: `${researchStory.length * 100}vw` }}>
                {researchStory.map((chapter, index) => (
                    <div key={chapter.id} className="story-panel w-screen h-full flex flex-col justify-center items-center px-10 relative">
                        {/* Massive background number in Outline Suburbia style */}
                        <div className="absolute top-1/4 left-10 md:left-32 text-[15rem] md:text-[25rem] font-heading text-transparent z-0 pointer-events-none tracking-normal" style={{ WebkitTextStroke: '3px var(--color-sub-orange)', opacity: 0.1 }}>
                            0{index + 1}
                        </div>
                        
                        {/* Sharp editorial card */}
                        <div className="max-w-4xl z-10 space-y-6 p-8 md:p-14 relative bg-white border-4 border-zinc shadow-[12px_12px_0px_var(--color-zinc)] grunge-border">
                            {/* Grungy marker tag */}
                            <span className="absolute -top-5 right-6 rotate-[-6deg] font-marker text-sub-orange text-sm md:text-lg select-none bg-zinc text-white px-3 py-1 border-2 border-zinc shadow-[2px_2px_0px_var(--color-sub-orange)]">
                                #{chapter.id.toUpperCase()}
                            </span>
                            <h3 className="text-sub-orange font-sans font-bold text-sm tracking-widest uppercase reveal-text bg-sub-orange/10 inline-block px-4 py-2 border-2 border-sub-orange grunge-border">
                                {chapter.date}
                            </h3>
                            <h2 className="text-4xl md:text-7xl font-heading text-zinc reveal-text uppercase leading-none mt-4">
                                {chapter.title}
                            </h2>
                            <div className="w-20 h-2 bg-sub-orange reveal-text my-8 border border-zinc"></div>
                            <p className="text-lg md:text-xl text-zinc/90 font-sans font-medium leading-relaxed reveal-text">
                                {chapter.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ResearchJourney;
