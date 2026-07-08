import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chipInsights, mySpecs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const maskImgRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!isTablet) {
            // SVG mask reveal — the logo scales from huge (filling screen) to small (revealing video)
            // WHY: This is one of the most cinematic scroll animations possible.
            // The mask starts scaled to 80x (fills the viewport as a solid shape),
            // then as you scroll, it shrinks to reveal the video underneath.
            // The 'scrub: true' makes it follow your scroll position exactly.
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });

            timeline
                .fromTo(maskImgRef.current,
                    { scale: 80 },
                    { scale: 1.1 }
                ).to(contentRef.current, { opacity: 1, y: 0, ease: 'power1.in' });
        }
    }, [isTablet]);

    return (
        <section id="showcase" className="border-b-[6px] border-zinc bg-sub-blue bg-grain relative text-white" ref={sectionRef}>
            <div className="media aspect-video w-full border-b-[6px] border-zinc">
                <video
                    src="/videos/game.mp4"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onLoadedData={() => ScrollTrigger.refresh()}
                    className="grayscale contrast-125"
                />
                <div className="mask">
                    <img ref={maskImgRef} src="/mask-logo.svg" alt="Apple Mask" />
                </div>
            </div>

            <div className="content border-x-[6px] border-zinc mx-5 lg:mx-20" ref={contentRef}>
                <div className="wrapper p-10 lg:p-20 border-b-[6px] border-zinc bg-sub-blue">
                    <div className="lg:max-w-md">
                        <h2 className="uppercase tracking-normal text-white font-heading mb-8 text-6xl leading-none">Under the <br/>Hood</h2>

                        <div className="space-y-8 mt-7 pe-10 font-sans text-lg text-white font-medium">
                            <p>
                                The <span className="font-bold bg-sub-orange/20 px-1 border border-sub-orange text-sub-orange">M3 Pro</span> is built on TSMC's
                                3-nanometer process. {mySpecs.transistors} transistors packed into a die smaller than a coin. Pure, unfiltered power.
                            </p>
                            <p>
                                <span className="font-bold border-b-2 border-sub-orange text-sub-orange">{mySpecs.cpu}</span> — 6 Performance
                                cores for heavy lifting, 6 Efficiency cores for the background noise. It doesn't flinch.
                            </p>
                            <p>
                                The GPU uses <span className="font-bold text-sub-orange">Dynamic Caching</span>.
                                No wasted memory blocks. DaVinci Resolve runs 4K timelines like a text editor.
                            </p>
                            <p>
                                <span className="font-bold text-sub-orange">{mySpecs.memory}</span> at{" "}
                                <span className="font-bold text-sub-orange">{mySpecs.memoryBandwidth}</span>. CPU
                                and GPU share the exact same pool. Instant context switching.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14 mt-16 lg:mt-0 lg:border-l-[6px] lg:border-zinc lg:pl-16">
                        {chipInsights.slice(0, 2).map((insight) => (
                            <div key={insight.label} className="space-y-4">
                                <p className="uppercase tracking-widest text-sm text-sub-orange bg-white inline-block px-3 py-1 font-bold font-sans border-2 border-zinc shadow-[4px_4px_0px_var(--color-zinc)]">{insight.label}</p>
                                <h3 className="tracking-normal text-white font-heading text-7xl leading-none pt-2">
                                    {insight.stat} <span className="text-4xl text-white/70">{insight.unit}</span>
                                </h3>
                                <p className="text-base font-medium opacity-90 font-sans">{insight.description.split('.')[0]}.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Showcase