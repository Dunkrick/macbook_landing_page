import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 2;
    }, []);

    return (
        <section id="hero" >
            <div>
                <h1>One Machine. Everything.</h1>
                <img src="/title.png" alt="Macbook Title" />
            </div>

            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

            <button>Explore</button>

            <p>Where ideas become real - design, film, code, music, all on one machine.</p>
        </section>
    )
}

export default Hero