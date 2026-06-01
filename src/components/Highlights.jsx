import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Highlights = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

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
        <section id="highlights">
            <h2>From campus to studio.</h2>
            <h3>One machine for every part of your day.</h3>

            <div className="masonry">
                <div className="left-column">
                    <div>
                        <img src="/laptop.png" alt="Laptop" />
                        <p>M3 Pro flies through demanding tasks - silently.</p>
                    </div>
                    <div>
                        <img src="/sun.png" alt="Sun" />
                        <p>A stunning <br />
                            Liquid Retina XDR <br />
                            display.</p>
                    </div>
                </div>
                <div className="right-column">
                    <div className="apple-gradient">
                        <img src="/ai.png" alt="AI" />
                        <p>Seamless with <br />
                            <span>iPhone, AirPods & iCloud.</span></p>
                    </div>
                    <div>
                        <img src="/battery.png" alt="Battery" />
                        <p>Up to
                            <span className="green-gradient">{' '}22 hours{' '}</span>
                            battery life.
                            <span className="text-dark-100">{' '}(You forget the charger exists.)
                            </span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Highlights