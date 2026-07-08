import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { mySpecs } from "../constants";

const Highlights = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    // Staggered reveal — columns slide up and fade in one after another
    // WHY 'stagger': Instead of everything appearing at once (jarring),
    // each column enters with a 0.5s delay. This creates rhythm and
    // directs the eye from left to right, like reading a book.
    useGSAP(() => {
        gsap.to(['.left-column', '.right-column'], {
            scrollTrigger: {
                trigger: '#highlights',
                start: isMobile ? 'bottom bottom' : 'top center'
            },
            y: 0,
            opacity: 1,
            stagger: 0.5,
            duration: 1,
            ease: 'power1.inOut'
        });
    })

    return (
        <section id="highlights" className="bg-black bg-grain py-32 border-b-[6px] border-zinc px-5 lg:px-0">
            <h2 className="text-white font-heading text-6xl lg:text-[8rem] uppercase leading-none text-center drop-shadow-[4px_4px_0px_var(--color-sub-orange)]">The numbers that matter.</h2>
            <h3 className="text-sub-orange font-sans text-xl lg:text-2xl text-center mt-6 font-bold uppercase tracking-widest">Apple's claims vs. my reality — one year in.</h3>

            <div className="masonry max-w-6xl mx-auto">
                <div className="left-column">
                    <div className="bg-sub-paper border-4 border-zinc shadow-[8px_8px_0px_var(--color-sub-orange)] p-10 lg:pt-20 rounded-none h-full relative grunge-border">
                        <img src="/laptop.png" alt="Laptop" />
                        <p className="font-heading text-4xl text-zinc mt-4 uppercase leading-none">
                            Fans heard in a year:
                            <span className="text-sub-orange"> twice.</span>
                            <br />
                            <span className="text-zinc/80 font-sans text-lg mt-4 block font-medium tracking-normal normal-case">
                                Once for a heavy AI auto-editor. Once for Bruno.
                                Every other day — dead silent.
                            </span>
                        </p>
                        <span className="absolute bottom-6 right-6 rotate-[-12deg] font-marker text-sub-orange text-base md:text-xl select-none">
                            (only twice!)
                        </span>
                    </div>
                    <div className="bg-sub-blue border-4 border-zinc shadow-[8px_8px_0px_var(--color-zinc)] p-10 rounded-none flex items-center gap-7 relative grunge-border">
                        <img src="/sun.png" alt="Display" />
                        <p className="font-heading text-3xl text-white uppercase leading-none">Liquid Retina XDR. <br />
                            <span className="text-white/80 font-sans text-lg mt-2 block font-medium tracking-normal normal-case">
                                Coming from OLED, I was skeptical.
                                1600 nits peak brightness shut me up.
                            </span>
                        </p>
                        <span className="absolute top-4 right-4 rotate-[15deg] font-marker text-sub-pink text-sm select-none">
                            (so bright)
                        </span>
                    </div>
                </div>
                <div className="right-column">
                    <div className="bg-zinc border-4 border-sub-orange shadow-[8px_8px_0px_var(--color-sub-orange)] p-10 rounded-none flex items-center gap-7 relative grunge-border">
                        <img src="/ai.png" alt="Deal" />
                        <p className="font-heading text-4xl text-white uppercase leading-none">
                            <span className="text-sub-orange">{mySpecs.price.original} → {mySpecs.price.paid}</span>
                            <br />
                            <span className="text-white/80 font-sans text-lg block mt-4 font-medium tracking-normal normal-case">
                                Display model, ~40 days used. Basically brand new.
                                Best investment I've made.
                            </span>
                        </p>
                        <span className="absolute bottom-6 right-6 rotate-[8deg] font-marker text-sub-orange text-sm md:text-base select-none">
                            (basically new!)
                        </span>
                    </div>
                    <div className="bg-sub-paper border-4 border-zinc shadow-[8px_8px_0px_var(--color-sub-orange)] p-10 lg:pt-20 rounded-none h-full relative grunge-border">
                        <img src="/battery.png" alt="Battery" />
                        <p className="font-heading text-5xl text-zinc uppercase leading-none mt-4">Up to
                            <span className="text-sub-green">{' '}22 hours{' '}</span>
                            battery life.
                            <span className="text-zinc/80 font-sans text-lg block mt-4 font-medium tracking-normal normal-case">{' '}(I go all day without a charger.
                                The {mySpecs.adapter} stays in my bag.)
                            </span></p>
                        <span className="absolute bottom-6 right-6 rotate-[-5deg] font-marker text-sub-orange text-base md:text-xl select-none">
                            (insane!)
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Highlights