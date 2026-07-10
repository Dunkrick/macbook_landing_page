// ─────────────────────────────────────────────────────────────
// NAVIGATION — Story-driven anchors, not generic Apple categories
// ─────────────────────────────────────────────────────────────
// 1. Define the shape of a single navigation link
interface NavLink {
    label: string;
    href: string;
}

// 2. Tell TypeScript that navLinks is an array of NavLink objects
const navLinks: NavLink[] = [
    { label: "The Journey", href: "journey" },
    { label: "The Machine", href: "product-viewer" },
    { label: "Under the Hood", href: "showcase" },
    { label: "My Workflow", href: "features" },
    { label: "The Numbers", href: "highlights" },
];


// ─────────────────────────────────────────────────────────────
// 3D MODEL — Parts that shouldn't change color when toggling
// ─────────────────────────────────────────────────────────────
const noChangeParts: string[] = [
    "Object_84",
    "Object_37",
    "Object_34",
    "Object_12",
    "Object_80",
    "Object_35",
    "Object_36",
    "Object_13",
    "Object_125",
    "Object_76",
    "Object_33",
    "Object_42",
    "Object_58",
    "Object_52",
    "Object_21",
    "Object_10",
];

// ─────────────────────────────────────────────────────────────
// RITHWICK'S EXACT SPECS
// ─────────────────────────────────────────────────────────────
// 1. Define the shape of the nested price object first
interface PriceDetails {
    original: string;
    paid: string;
    savings: string;
    condition: string;
}

// 2. Define the shape of the main specs object
interface Specs {
    model: string;
    chip: string;
    cpu: string;
    gpu: string;
    memory: string;
    storage: string;
    display: string;
    adapter: string;
    process: string;
    transistors: string;
    memoryBandwidth: string;
    batteryAppleClaim: string;
    batteryRealWorld: string;
    fansHeard: string;
    price: PriceDetails; // <-- We use our custom PriceDetails interface here!
}

// 3. Apply the Specs type to the actual data
const mySpecs: Specs = {
    model: 'MacBook Pro 16"',
    chip: "Apple M3 Pro",
    cpu: "12-core (6 Performance + 6 Efficiency)",
    gpu: "18-core",
    memory: "18GB Unified Memory",
    storage: "512GB SSD",
    display: '16.2" Liquid Retina XDR',
    adapter: "140W USB-C Power Adapter",
    process: "3nm (TSMC N3B)",
    transistors: "37 billion",
    memoryBandwidth: "150 GB/s",
    batteryAppleClaim: "22 hours",
    batteryRealWorld: "All day without charger",
    fansHeard: "Twice in a whole year",
    price: {
        original: "₹2,60,000",
        paid: "₹1,35,000",
        savings: "₹1,25,000",
        condition: "Display model, ~40 days of use, 2 minor scratches on top",
    },
};

// ─────────────────────────────────────────────────────────────
// PERFORMANCE IMAGES — Scattered workflow screenshots
// (Keep existing assets; user will replace with real screenshots later)
// ─────────────────────────────────────────────────────────────
const performanceImages = [
    { id: "p1", src: "/performance1.png", alt: "DaVinci Resolve timeline" },
    { id: "p2", src: "/performance2.png", alt: "Brave browser with research tabs" },
    { id: "p3", src: "/performance3.png", alt: "Figma design prototype" },
    { id: "p4", src: "/performance4.png", alt: "Antigravity IDE workspace" },
    { id: "p5", src: "/performance5.jpg", alt: "Obsidian notes vault" },
    { id: "p6", src: "/performance6.png", alt: "Terminal with running processes" },
    { id: "p7", src: "/performance7.png", alt: "Full workflow overview" },
];

const performanceImgPositions = [
    { id: "p1", left: 5, bottom: 65 },
    { id: "p2", right: 10, bottom: 60 },
    { id: "p3", right: -5, bottom: 45 },
    { id: "p4", right: -10, bottom: 0 },
    { id: "p5", left: 20, bottom: 50 },
    { id: "p6", left: 2, bottom: 30 },
    { id: "p7", left: -5, bottom: 0 },
];

// ─────────────────────────────────────────────────────────────
// FEATURES — My actual daily workflow, not generic app descriptions
// ─────────────────────────────────────────────────────────────
const features = [
    {
        id: 1,
        icon: "/davinci-resolve.svg",
        highlight: "DaVinci Resolve.",
        text: "4K raw timelines, color grading, ProRes exports - this is where the M3 Pro's 18-core GPU earns its keep. Zero dropped frames, fans stay quiet.",
        annotation: "color graded a 20-min short film at 3am. Not even a blink.",
        styles: "left-5 md:left-20 top-[20%]",
    },
    {
        id: 2,
        icon: "/figma.svg",
        highlight: "Figma.",
        text: "UI prototypes, design systems, iterating on dream-wall layouts - pixel-perfect on the Liquid Retina XDR. Colors I couldn't see on my old display.",
        annotation: "3 design systems on this display. finally saw real colors.",
        styles: "right-5 md:right-20 top-[30%]",
    },
    {
        id: 3,
        icon: "/antigravity.svg",
        highlight: "Antigravity IDE.",
        text: "Software dev on dream-wall, GSAP animations on this very page, AI agents building alongside me - multiple servers running, no thermal throttle.",
        annotation: "me, AI, 4 dev servers. zero throttle. literally all day.",
        styles: "left-5 md:left-20 top-[50%]",
    },
    {
        id: 4,
        icon: "/obsidian.svg",
        highlight: "Obsidian + Brave.",
        text: "Research in Brave with 30+ tabs, notes in Obsidian, all while DaVinci or the IDE runs in the background. 18GB unified memory means no context-switching tax.",
        annotation: "30 tabs, renders, notes - all live. 18gb just laughs.",
        styles: "right-5 md:right-20 top-[70%]",
    },
    {
        id: 5,
        icon: "/terminal.svg",
        highlight: "Terminal.",
        text: "Unix-based terminal was a lock-in factor. Coming from dual-booting Linux, macOS felt like home. CLI workflows, Docker, git - all native and snappy.",
        annotation: "unix native. moved from linux. felt like home on day one.",
        styles: "left-5 md:left-20 top-[90%]",
    },
];

const featureSequence = [
    { videoPath: "/videos/feature-1.mp4", boxClass: ".box1", delay: 1 },
    { videoPath: "/videos/feature-2.mp4", boxClass: ".box2", delay: 0 },
    { videoPath: "/videos/feature-3.mp4", boxClass: ".box3", delay: 0 },
    { videoPath: "/videos/feature-4.mp4", boxClass: ".box4", delay: 0 },
    { videoPath: "/videos/feature-5.mp4", boxClass: ".box5", delay: 0 },
];

// ─────────────────────────────────────────────────────────────
// M3 PRO R&D INSIGHTS — Why Apple made these specific choices
// ─────────────────────────────────────────────────────────────
const chipInsights = [
    {
        label: "3nm Process",
        stat: "37B",
        unit: "transistors",
        description: "Built on TSMC's 3-nanometer tech — same fab that makes iPhone chips. More transistors per mm² means more performance without burning more power.",
    },
    {
        label: "6P + 6E Cores",
        stat: "12",
        unit: "CPU cores",
        description: "6 Performance cores (30% faster than M1 Pro) for heavy lifting, 6 Efficiency cores (50% faster) for background tasks. This split is why battery lasts all day.",
    },
    {
        label: "Dynamic Caching",
        stat: "18",
        unit: "GPU cores",
        description: "Traditional GPUs waste memory by reserving fixed amounts. M3 Pro allocates GPU memory in real-time — only what's needed, nothing wasted. This is why it handles 4K edits so smoothly.",
    },
    {
        label: "Unified Memory",
        stat: "150",
        unit: "GB/s bandwidth",
        description: "CPU and GPU share the same memory pool — no copying data between separate RAM chips. This is why switching between Figma, DaVinci, and the IDE feels instant.",
    },
];

// ─────────────────────────────────────────────────────────────
// RESEARCH JOURNEY — The story of choosing the M3 Pro
// ─────────────────────────────────────────────────────────────
const researchStory = [
    {
        id: "ch1",
        date: "The Need",
        title: "Wanted a workhorse, didn't want a Mac.",
        description: "I needed something powerful for 4K video editing and heavy coding, but I wanted it compact. Coming from a Windows and Linux background, a MacBook wasn't even on my radar. I had my eyes set on the ROG Zephyrus G14 with an OLED display."
    },
    {
        id: "ch2",
        date: "The Pivot",
        title: "A single text changed the trajectory.",
        description: "I texted a friend who owned a MacBook for a long-term review. His response about the battery life, durability, performance, display, and the Unix-based terminal completely sold me. It hit every preference I had."
    },
    {
        id: "ch3",
        date: "The Hunt",
        title: "Calling every store in town.",
        description: "Since M3 and M4 had little difference, I started hunting for an M3 to get a better deal. Online stores were out of stock. I started cold-calling retail stores until one told me to come in person to discuss an unboxed model."
    },
    {
        id: "ch4",
        date: "The Deal",
        title: "₹2,60,000 → ₹1,35,000.",
        description: "It was a display model, used for ~40 days. M3 Pro, 16.2\", max spec with a 140W adapter. Two minor scratches on top, otherwise picture perfect. The discount was massive. Best investment I've made."
    }
];

// ─────────────────────────────────────────────────────────────
// HIGHLIGHTS — The numbers, with personal annotations
// ─────────────────────────────────────────────────────────────
const highlightCards = [
    {
        id: "battery",
        icon: "/battery.png",
        stat: "22h",
        label: "Apple's claim",
        annotation: "Reality: I go all day without a charger. Forget it exists.",
        gradient: "green",
    },
    {
        id: "silence",
        icon: "/laptop.png",
        stat: "2x",
        label: "Fans heard in a year",
        annotation: "Once for a heavy AI auto-editor, once for Bruno (that app eats battery, bro).",
        gradient: null,
    },
    {
        id: "display",
        icon: "/sun.png",
        stat: "XDR",
        label: "Liquid Retina Display",
        annotation: "Coming from OLED, I was skeptical. The XDR is just as good — 1600 nits peak, ProMotion 120Hz.",
        gradient: null,
    },
    {
        id: "deal",
        icon: "/ai.png",
        stat: "48%",
        label: "off retail price",
        annotation: "₹2,60,000 → ₹1,35,000. Display model, ~40 days used, basically brand new. Best investment I've made.",
        gradient: "apple",
    },
];

// ─────────────────────────────────────────────────────────────
// FOOTER — Social links (all active and verified)
// ─────────────────────────────────────────────────────────────
const footerLinks = [
    { label: "GitHub", link: "https://github.com/Dunkrick" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/rithwick-gurram-599463304/" },
    { label: "YouTube", link: "https://www.youtube.com/@DunkRick" },
    { label: "Instagram", link: "https://www.instagram.com/dunkrick_/" },
    { label: "X", link: "https://x.com/RithwickGurram" },
    { label: "Portfolio", link: "https://dunkrick.github.io/Dunkrick" },
];

export {
    chipInsights,
    features,
    featureSequence,
    footerLinks,
    highlightCards,
    mySpecs,
    navLinks,
    noChangeParts,
    performanceImages,
    performanceImgPositions,
    researchStory,
};
