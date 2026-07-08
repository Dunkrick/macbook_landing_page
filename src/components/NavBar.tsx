import { useRef, useEffect, useState } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    // Scroll progress indicator — a thin line at the top of the nav
    // WHY: Gives the user spatial awareness of where they are in the page.
    // This is a micro-interaction that feels premium without being distracting.
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            if (progressRef.current) {
                progressRef.current.style.width = `${progress}%`;
            }

            // Add glassmorphism after scrolling past hero
            setScrolled(scrollTop > 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={scrolled ? "nav-scrolled" : ""}>
            {/* Scroll progress bar */}
            <div className="scroll-progress">
                <div ref={progressRef} className="scroll-progress-fill" />
            </div>

            <nav>
                <a href="#hero" className="nav-brand">
                    <span className="font-heading text-3xl tracking-normal text-white uppercase hover:text-sub-orange transition-colors cursor-pointer">
                        Rithwick
                    </span>
                </a>

                <ul>
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a href={`#${href}`} className="font-sans uppercase text-sm font-bold tracking-wider">{label}</a>
                        </li>
                    ))}
                </ul>

                <div className="flex-center gap-5">
                    <a
                        href="https://github.com/Dunkrick"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-white/80 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
                    </a>
                    <a
                        href="https://www.youtube.com/@DunkRick"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-white/80 hover:text-white transition-colors"
                        aria-label="YouTube"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;