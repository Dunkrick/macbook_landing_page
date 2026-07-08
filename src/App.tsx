import { Suspense, lazy } from "react";
import Hero from "./components/Hero.js"
import NavBar from "./components/NavBar.js"
import ResearchJourney from "./components/ResearchJourney.js"
import Showcase from "./components/Showcase.js";
import Performance from "./components/Performance.js";
import Highlights from "./components/Highlights.js";
import Footer from "./components/Footer.js";

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all"

import ProductViewer from "./components/ProductViewer.js";
const Features = lazy(() => import("./components/Features.js"))

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <ResearchJourney />
            <ProductViewer />
            <Showcase />
            <Performance />
            <div>
                <Suspense fallback={<div className="h-screen w-full bg-black" ></div> }>
                    <Features />
                </Suspense>
            </div>
            <Highlights />
            <Footer />
        </main>
    )
}

export default App