import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { performanceImages, performanceImgPositions, mySpecs } from "../constants/index.js";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            // Text fade-in on scroll
            // WHY: The text reveals as you scroll down, creating a sense of discovery.
            // 'scrub: true' means the opacity follows your scroll position exactly.
            gsap.fromTo(
                "#performance .content p",
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: "#performance .content p",
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            if (isMobile) return;

            // Image scatter animation — images float to their final positions as you scroll
            // WHY: This creates visual energy. Static grids feel boring.
            // Scattered, floating images feel alive and dynamic.
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return;

                const selector = `.${item.id}`;
                const vars: Record<string, any> = {};

                if (typeof item.left === "number") vars.left = `${item.left}%`;
                if (typeof item.right === "number") vars.right = `${item.right}%`;
                if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

                if ((item as any).transform) vars.transform = (item as any).transform;

                tl.to(selector, vars, 0);
            });
        },
        { scope: sectionRef, dependencies: [isMobile] }
    );

    return (
        <section id="performance" className="border-b-[6px] border-zinc bg-sub-orange bg-grain min-h-screen py-32 flex flex-col items-center relative overflow-hidden" ref={sectionRef}>
            <h2 className="text-white text-5xl lg:text-[8rem] uppercase font-heading leading-none text-center z-10 drop-shadow-lg">
                Relentless <br/> <span className="text-zinc">Performance.</span>
            </h2>

            <div className="wrapper w-full max-w-[100rem] h-[60vh] relative mt-20 border-y-[6px] border-zinc bg-sub-paper">
                {performanceImages.map((img) => (
                    <img 
                        key={img.id} 
                        src={img.src} 
                        alt={img.alt} 
                        className={clsx("absolute object-cover object-center grayscale hover:grayscale-0 hover:z-50 hover:scale-105 transition-all duration-300 border-[4px] border-zinc shadow-[8px_8px_0px_var(--color-zinc)]", img.id)} 
                    />
                ))}
            </div>

            <div className="content relative z-10 mx-auto max-w-4xl mt-32 px-5 text-center bg-white border-[6px] border-zinc p-12 shadow-[16px_16px_0px_var(--color-zinc)]">
                <p className="text-xl lg:text-3xl font-heading text-zinc uppercase tracking-wide border-4 border-zinc p-6 inline-block bg-sub-orange text-white">
                    It doesn't break a sweat. Period.
                </p>
                <div className="mt-12 font-sans text-lg text-zinc text-left border-l-[6px] border-zinc pl-8 space-y-6 font-medium">
                    <p>
                        Some days it's a 4K DaVinci Resolve timeline with color nodes stacked deep.
                        Other days it's dream-wall running full-stack with multiple servers.{" "}
                        <span className="text-white bg-zinc font-bold px-2 py-1">
                            The M3 Pro doesn't care — it handles both without the fans ever spinning up.
                        </span>
                    </p>
                    <p>
                        I've heard them exactly twice in a year: once for a heavy AI auto-editor,
                        and once for Bruno — that API testing app drinks battery juice like nothing else.
                        Every other day? Dead silent. The {mySpecs.adapter} stays in my bag
                        most of the time because this machine genuinely lasts all day.
                    </p>
                </div>
            </div>
        </section>
    )
}
export default Performance