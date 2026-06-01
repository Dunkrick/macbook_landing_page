import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const maskImgRef = useRef(null);
    const contentRef = useRef(null);
    const sectionRef = useRef(null);

    useGSAP(() => {
        if (!isTablet) {
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
        <section id="showcase" ref={sectionRef}>
            <div className="media aspect-video w-full">
                <video 
                    src="/videos/game.mp4" 
                    loop 
                    muted 
                    autoPlay 
                    playsInline 
                    onLoadedData={() => ScrollTrigger.refresh()}
                />
                <div className="mask">
                    <img ref={maskImgRef} src="/mask-logo.svg" alt="Apple Mask" />
                </div>
            </div>

            <div className="content" ref={contentRef}>
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>M3 Pro</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Powered by <span className="text-white">Apple M3 Pro - 12 core CPU, 18 core GPU</span> - this machine chews through the heavy stuff. From complex codebases to rendering 3D environments, it doesn't blink.
                            </p>
                            <p>
                                It easily balances Antigravity IDE, multiple Chrome windows, Docker containers, and Spotify without spinning up the fans. It's the silent workhorse that keeps up with every pivot.
                            </p>
                            <p>
                                The Liquid Retina XDR display makes every pixel pop, while the 18GB of unified memory ensures that switching between contexts is instantaneous.
                            </p>
                            <p className="text-primary cursor-pointer transition-colors hover:text-white">Dive deep into the specs</p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3 className="tracking-tight text-white">4x faster</h3>
                            <p>compilation times</p>
                        </div>
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3 className="tracking-tight text-white">1.5x faster</h3>
                            <p>than previous gen</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Showcase