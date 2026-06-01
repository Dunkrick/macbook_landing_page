import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const Showcase = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });

            timeline
                .to('.mask img', {
                    transform: 'scale(1.1)'
                }).to('.content', { opacity: 1, y: 0, ease: 'power1.in' });
        }
    }, [isTablet])

    return (
        <section id="showcase">
            <div className="media">
                <video src="/videos/game.mp4" loop muted autoPlay playsInline />
                <div className="mask">
                    <img src="/mask-logo.svg" />
                </div>
            </div>

            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>M3 Pro</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Powered by{" "}
                                <span className="text-white">
                                    Apple M3 Pro - 12 core CPU, 18 core GPU, 18GB unified memory
                                </span>
                                . The engine behind every render, every build, every beat.
                            </p>
                            <p>
                                Edit 4K timelines in DaVinci Resolve while running a full dev environment in the background. No throttling. No fan noise. Just flow.
                            </p>
                            <p>
                                Hardware-accelerated ray tracing, ProRes encoding, and a Liquid Retina XDR display that makes every frame look exactly as you intended.
                            </p>
                            <p className="text-primary">See what M3 Pro can do →</p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>3x faster</h3>
                            <p>GPU rendering than M1 Pro</p>
                        </div>
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>22 hrs</h3>
                            <p>battery life for all-day sessions</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Showcase