import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
    // GSAP staggered reveal
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(
            "#hero-title",
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2 }
        )
        .fromTo(
            "#hero-p",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=0.8"
        )
        .fromTo(
            "#hero-cta",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.6"
        );
    });

    return (
        <section className="w-full relative min-h-screen bg-black bg-grain flex flex-col justify-center border-b-[6px] border-sub-orange" id="hero">
            <div className="w-full flex-center flex-col z-10 px-6 mt-10">
                <h1 id="hero-title" className="text-white text-[12vw] font-heading text-center uppercase leading-[0.85] m-0 p-0">
                    My Daily <br/> <span className="text-sub-orange">Driver.</span>
                </h1>
                
                <p className="mt-8 md:mt-12 text-gray-300 max-w-2xl text-center text-lg md:text-xl font-sans opacity-0" id="hero-p">
                    The M3 Pro MacBook. Stripped of the marketing jargon.<br className="hidden md:block"/> This is what it actually feels like to use it.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-6 opacity-0" id="hero-cta">
                    <a href="#product-viewer" className="btn-primary">
                        Explode the Machine
                    </a>
                    <a href="#journey" className="px-8 py-3 bg-transparent border-2 border-white text-white font-heading text-xl uppercase tracking-wide hover:bg-white hover:text-black transition-colors text-center shadow-[4px_4px_0px_#fff]">
                        Read the Story
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;