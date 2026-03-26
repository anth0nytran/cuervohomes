import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShieldCheck, HomeIcon, Briefcase, MapPin, Quote, LineChart, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../hooks/useSEO";

// --- Phase 9: Magazine-Quality, Photogenic, Trust-First Homepage ---

const neighborhoodHeroImage = (slug: string, size: "1600" | "2560" = "1600") => `/neighborhoods/hero/${slug}-${size}.webp`;
const neighborhoodTileImage = (slug: string) => `/neighborhoods/tiles/${slug}.webp`;
const heroSlideEase = [0.22, 1, 0.36, 1] as const;

const heroSlides = [
    {
        src: neighborhoodHeroImage("newport-beach", "2560"),
        srcSet: `${neighborhoodHeroImage("newport-beach", "1600")} 1600w, ${neighborhoodHeroImage("newport-beach", "2560")} 2560w`,
        label: "Newport Beach",
    },
    {
        src: neighborhoodHeroImage("costa-mesa", "2560"),
        srcSet: `${neighborhoodHeroImage("costa-mesa", "1600")} 1600w, ${neighborhoodHeroImage("costa-mesa", "2560")} 2560w`,
        label: "Costa Mesa",
    },
    {
        src: neighborhoodHeroImage("huntington-beach", "2560"),
        srcSet: `${neighborhoodHeroImage("huntington-beach", "1600")} 1600w, ${neighborhoodHeroImage("huntington-beach", "2560")} 2560w`,
        label: "Huntington Beach",
    },
    {
        src: neighborhoodHeroImage("santa-ana", "2560"),
        srcSet: `${neighborhoodHeroImage("santa-ana", "1600")} 1600w, ${neighborhoodHeroImage("santa-ana", "2560")} 2560w`,
        label: "Santa Ana",
    },
    {
        src: neighborhoodHeroImage("irvine", "2560"),
        srcSet: `${neighborhoodHeroImage("irvine", "1600")} 1600w, ${neighborhoodHeroImage("irvine", "2560")} 2560w`,
        label: "Irvine",
    },
    {
        src: neighborhoodHeroImage("north-tustin", "2560"),
        srcSet: `${neighborhoodHeroImage("north-tustin", "1600")} 1600w, ${neighborhoodHeroImage("north-tustin", "2560")} 2560w`,
        label: "North Tustin",
    },
    {
        src: neighborhoodHeroImage("orange", "2560"),
        srcSet: `${neighborhoodHeroImage("orange", "1600")} 1600w, ${neighborhoodHeroImage("orange", "2560")} 2560w`,
        label: "Orange",
    },
    {
        src: neighborhoodHeroImage("anaheim", "2560"),
        srcSet: `${neighborhoodHeroImage("anaheim", "1600")} 1600w, ${neighborhoodHeroImage("anaheim", "2560")} 2560w`,
        label: "Anaheim",
    },
];

const HeroHQ = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = useCallback((next: number, dir: number) => {
        setDirection(dir);
        setCurrent(next);
    }, []);

    // Auto-rotate every 5s
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            goTo((current + 1) % heroSlides.length, 1);
        }, 5000);
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [current, goTo]);

    const slideVariants = {
        enter: (dir: number) => ({
            opacity: 0,
            scale: 1.08,
            x: dir > 0 ? "4%" : "-4%",
            rotateY: dir > 0 ? 3 : -3,
        }),
        center: {
            opacity: 1,
            scale: 1,
            x: 0,
            rotateY: 0,
            transition: { duration: 1.2, ease: heroSlideEase },
        },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 1.04,
            x: dir > 0 ? "-4%" : "4%",
            rotateY: dir > 0 ? -2 : 2,
            transition: { duration: 0.8, ease: heroSlideEase },
        }),
    };

    const cityWordmarkVariants = {
        enter: {
            opacity: 0,
            x: 0,
            y: "110%",
            filter: "blur(8px)",
        },
        center: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.92, ease: heroSlideEase },
        },
        exit: {
            opacity: 0,
            x: 28,
            y: 0,
            filter: "blur(6px)",
            transition: { duration: 0.68, ease: heroSlideEase },
        },
    };

    const currentCity = heroSlides[current].label;

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ perspective: "1200px" }}>
            {/* Rotating background images */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 z-0 will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <img
                        src={heroSlides[current].src}
                        srcSet={heroSlides[current].srcSet}
                        sizes="100vw"
                        alt={heroSlides[current].label}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Persistent overlays */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/35 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-44 flex flex-col items-center justify-center text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block py-1.5 px-4 border border-white/30 text-white/90 text-xs tracking-[0.25em] uppercase font-bold mb-8 bg-black/40 backdrop-blur-sm shadow-xl"
                >
                    Trusted Real Estate Advisor Across Orange County
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl uppercase"
                >
                    WHERE YOUR NEXT <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">CHAPTER BEGINS.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-neutral-300 max-w-2xl font-sans mb-12 leading-relaxed drop-shadow-lg mx-auto"
                >
                    Helping you buy, sell, and invest with confidence through expert guidance and personalized service.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
                >
                    <Link
                        to="/contact?intent=homeworth"
                        className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm font-black tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] min-w-[280px]"
                    >
                        Get Free Home Valuation
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/services"
                        className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/30 text-white px-8 py-5 text-sm font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm min-w-[280px]"
                    >
                        See Our Process
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-6 right-6 bottom-24 z-20 flex justify-end md:left-auto md:right-12 md:bottom-28 md:w-auto"
            >
                <div className="relative w-[calc(100vw-3rem)] max-w-[26rem] text-right">
                    <div className="relative h-[0.95rem] overflow-hidden sm:h-[1.05rem] md:h-[1.15rem] lg:h-[1.28rem]">
                        <AnimatePresence initial={false} mode="sync">
                            <motion.span
                                key={currentCity}
                                variants={cityWordmarkVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 flex items-end justify-end whitespace-nowrap font-serif text-[0.76rem] font-bold uppercase leading-none tracking-[0.16em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.42)] sm:text-[0.84rem] md:text-[0.92rem] lg:text-[1.02rem]"
                            >
                                {currentCity}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Bottom bar: marquee only */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-6 pb-5 overflow-hidden">
                <div className="w-full flex items-center pr-6">
                    <div className="pl-4 md:pl-12 lg:pl-24 hidden sm:flex items-center z-20 pr-6 mr-4">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-accent shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
                            <div className="flex flex-col justify-center">
                                <span className="text-[9px] tracking-[0.4em] font-medium text-white/50 uppercase leading-tight">
                                    Partners &
                                </span>
                                <span className="text-sm md:text-base tracking-[0.3em] font-black text-white uppercase whitespace-nowrap leading-tight">
                                    Trusted By
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden relative w-full">
                        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-48 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-48 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

                        <div className="flex animate-marquee pb-1 w-max">
                            <div className="flex flex-none items-center">
                                {[...Array(2)].map((_, i) => (
                                    <div key={`half1-${i}`} className="flex flex-none items-center gap-8 md:gap-16 px-4 md:px-8">
                                        <img src="/c_homes/broker_logo_copy.png" alt="Brokerage" className="h-5 md:h-7 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default" />
                                        {["Zillow Preferred Agent", "Redfin Partner Agent", "WE'RE Real Estate Orange County", "Realtor.com", "MLS", "Homes.com"].map((name) => (
                                            <span key={`${i}-${name}`} className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 cursor-default uppercase whitespace-nowrap">{name}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-none items-center" aria-hidden="true">
                                {[...Array(2)].map((_, i) => (
                                    <div key={`half2-${i}`} className="flex flex-none items-center gap-8 md:gap-16 px-4 md:px-8">
                                        <img src="/c_homes/broker_logo_copy.png" alt="Brokerage" className="h-5 md:h-7 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default" />
                                        {["Zillow Preferred Agent", "Redfin Partner Agent", "WE'RE Real Estate Orange County", "Realtor.com", "MLS", "Homes.com"].map((name) => (
                                            <span key={`${i}-${name}`} className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 cursor-default uppercase whitespace-nowrap">{name}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



const RecentSalesSection = () => {
    const sectionRef = useRef(null);

    const sales = [
        { price: "$1,860,000", beds: 4, baths: 3, sqft: "2,728", city: "Santa Ana, CA", address: "13241 Orange Knoll Dr", soldAgo: "1 month ago", role: "Buyer" },
        { price: "$904,000", beds: 2, baths: 2, sqft: "1,089", city: "Anaheim, CA", address: "203 S Kroeger St", soldAgo: "1 month ago", role: "Seller" },
        { price: "$488,000", beds: 3, baths: 1, sqft: "840", city: "Los Angeles, CA", address: "1257 S McBride Ave", soldAgo: "1 month ago", role: "Seller" },
        { price: "$1,375,000", beds: 4, baths: 2, sqft: "2,160", city: "Orange, CA", address: "822 E Lomita Ave", soldAgo: "2 months ago", role: "Buyer" },
        { price: "$1,200,000", beds: 2, baths: 2, sqft: "1,394", city: "Santa Ana, CA", address: "12931 Prospect Ave", soldAgo: "3 months ago", role: "Seller" },
    ];

    const teamSales = [
        { price: "$1,250,000", city: "Newport Beach", type: "Single Family", soldAgo: "3 days ago" },
        { price: "$875,000", city: "Costa Mesa", type: "Condo", soldAgo: "5 days ago" },
        { price: "$2,100,000", city: "Corona Del Mar", type: "Single Family", soldAgo: "8 days ago" },
        { price: "$690,000", city: "Santa Ana", type: "Townhouse", soldAgo: "12 days ago" },
        { price: "$1,475,000", city: "Huntington Beach", type: "Single Family", soldAgo: "15 days ago" },
    ];

    return (
        <section ref={sectionRef} className="relative z-20">
            <div className="bg-white pb-10 md:pb-16 lg:pb-20">
                {/* Section header */}
                <div className="border-b border-black/[0.08]">
                    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8 flex items-end justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <span className="text-accent text-[9px] tracking-[0.3em] font-bold uppercase block mb-2">Proven Results</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-black leading-none uppercase">
                                Our Track Record
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="hidden md:flex items-center gap-6"
                        >
                            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed text-right">
                                Selling homes with strategy.<br />Buying homes with confidence.
                            </p>
                            <Link to="/contact" className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black hover:text-accent transition-colors">
                                <span>Work With Us</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Two-column layout: Personal (left) | Team (right) */}
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* ====== LEFT COLUMN: Personal Stats + Personal Sales ====== */}
                        <div className="lg:border-r border-black/[0.08]">
                            {/* Personal Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="px-6 md:px-12 lg:px-16 pt-10 md:pt-14 pb-8 md:pb-10"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-[2px] bg-black" />
                                    <span className="text-[9px] tracking-[0.3em] font-bold text-black uppercase">Regina Cuervo · Personal</span>
                                </div>

                                <div className="flex items-end gap-4 mb-8">
                                    <span className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-serif font-black text-black leading-[0.8] tracking-tighter">
                                        33
                                    </span>
                                    <span className="text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase pb-2">
                                        Homes Sold
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-0 border-t border-black/[0.08] pt-5">
                                    {[
                                        { number: "$1.2M", label: "Avg. Sale Price" },
                                        { number: "$148K–$4.1M", label: "Price Range" },
                                        { number: "5.0", label: "Client Rating" },
                                    ].map((stat, idx) => (
                                        <div key={idx} className={idx > 0 ? "pl-5 md:pl-6 border-l border-black/[0.08]" : ""}>
                                            <span className="block text-xl md:text-2xl font-serif font-black text-black leading-none tracking-tight">{stat.number}</span>
                                            <span className="block text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-neutral-400 uppercase mt-1.5">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Personal Recent Sales */}
                            <div className="border-t border-black/[0.08]">
                                <div className="px-6 md:px-12 lg:px-16 py-3 flex items-center justify-between bg-neutral-50/50">
                                    <span className="text-[9px] tracking-[0.25em] font-bold text-black uppercase">Regina's Recent Sales</span>
                                    <span className="text-[8px] tracking-[0.2em] font-bold text-neutral-400 uppercase">Recent</span>
                                </div>
                                {sales.map((sale, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        className="px-6 md:px-12 lg:px-16 py-4 border-t border-black/[0.04] hover:bg-neutral-50/60 transition-colors group cursor-default"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline gap-3 mb-1">
                                                    <span className="text-[15px] md:text-[17px] font-serif font-black text-black tracking-tight">{sale.price}</span>
                                                    <span className="inline-block text-[7px] font-bold tracking-[0.2em] uppercase text-white bg-black px-2 py-0.5">{sale.role}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-400">
                                                    <span className="text-neutral-600">{sale.address}</span>
                                                    <span className="text-neutral-300">·</span>
                                                    <span>{sale.beds}bd {sale.baths}ba {sale.sqft}sf</span>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex flex-col items-end ml-4 flex-shrink-0">
                                                <span className="text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-500 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-neutral-400" /> {sale.city}
                                                </span>
                                                <span className="text-[9px] tracking-wider uppercase font-sans text-neutral-400 mt-0.5">{sale.soldAgo}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* ====== RIGHT COLUMN: Team Stats + Team Sales ====== */}
                        <div className="border-t lg:border-t-0 border-black/[0.08]">
                            {/* Team Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="px-6 md:px-12 lg:px-16 pt-10 md:pt-14 pb-8 md:pb-10 bg-neutral-50/50"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-[2px] bg-accent" />
                                    <span className="text-[9px] tracking-[0.3em] font-bold text-neutral-500 uppercase">WE'RE Real Estate · Team</span>
                                </div>

                                <div className="flex items-end gap-4 mb-8">
                                    <span className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-serif font-black text-black leading-[0.8] tracking-tighter">
                                        1,312
                                    </span>
                                    <span className="text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase pb-2">
                                        Team Sales
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-0 border-t border-black/[0.08] pt-5">
                                    {[
                                        { number: "$753K", label: "Avg. Sale Price" },
                                        { number: "656", label: "Verified Reviews" },
                                        { number: "5.0", label: "Team Rating" },
                                    ].map((stat, idx) => (
                                        <div key={idx} className={idx > 0 ? "pl-5 md:pl-6 border-l border-black/[0.08]" : ""}>
                                            <span className="block text-xl md:text-2xl font-serif font-black text-black leading-none tracking-tight">{stat.number}</span>
                                            <span className="block text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-neutral-400 uppercase mt-1.5">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Team Recent Sales */}
                            <div className="border-t border-black/[0.08]">
                                <div className="px-6 md:px-12 lg:px-16 py-3 flex items-center justify-between bg-neutral-50/50">
                                    <span className="text-[9px] tracking-[0.25em] font-bold text-black uppercase">Team Recent Sales</span>
                                    <span className="text-[8px] tracking-[0.2em] font-bold text-neutral-400 uppercase">Orange County</span>
                                </div>
                                {teamSales.map((sale, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        className="px-6 md:px-12 lg:px-16 py-4 border-t border-black/[0.04] hover:bg-neutral-50/60 transition-colors group cursor-default"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline gap-3 mb-1">
                                                    <span className="text-[15px] md:text-[17px] font-serif font-black text-black tracking-tight">{sale.price}</span>
                                                    <span className="inline-block text-[7px] font-bold tracking-[0.15em] uppercase text-accent">{sale.type}</span>
                                                </div>
                                                <span className="text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-400 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-neutral-400" /> {sale.city}
                                                </span>
                                            </div>
                                            <span className="text-[9px] tracking-wider uppercase font-sans text-neutral-400 flex-shrink-0 ml-4">{sale.soldAgo}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom CTA bar — mobile */}
                <div className="md:hidden border-t border-black/[0.08] px-6 py-5">
                    <Link to="/contact" className="group flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black group-hover:text-accent transition-colors">Want Results Like These?</span>
                        <ArrowRight className="w-4 h-4 text-black group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// --- Animated icon containers for WhyTrustUs panels ---
const AnimatedIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6 md:mb-8">
        {/* Outer breathing ring */}
        <motion.div
            className={`absolute inset-0 rounded-full border border-accent/20`}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Soft glow pulse */}
        <motion.div
            className="absolute inset-1 rounded-full bg-accent/[0.06] blur-sm"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner circle bg */}
        <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </div>
    </div>
);

const ContentWhyTrustUs = () => {
    const ref = useRef(null);

    const panelVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
                delay: i * 0.15,
            },
        }),
    };

    return (
        <section ref={ref} className="relative py-20 md:py-48 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                    alt="Luxury living room"
                    loading="lazy"
                    className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/85" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="inline-block text-accent text-xs tracking-[0.2em] font-bold uppercase mb-4"
                >
                    What We Do Best
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-6xl font-serif font-black tracking-tight mb-10 md:mb-20 text-white leading-tight"
                >
                    WHY FAMILIES <br /> TRUST CUERVO HOMES
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/20 bg-black/40 backdrop-blur-md">
                    {/* Panel 1: Sell Your Home */}
                    <motion.div
                        custom={0}
                        variants={panelVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative p-6 md:p-10 hover:bg-white/[0.06] transition-colors duration-500 group text-left border-b md:border-b-0 md:border-r border-white/10 flex flex-col overflow-hidden"
                    >
                        <AnimatedIcon><LineChart className="w-6 h-6 md:w-7 md:h-7 text-accent" strokeWidth={1.5} /></AnimatedIcon>
                        <h3 className="text-lg md:text-xl font-serif font-black text-white mb-4 tracking-tight leading-snug min-h-[2lh]">Sell Your Home<br className="hidden md:block" /> with Strategy</h3>
                        <div className="text-[13px] text-neutral-300 leading-[1.85] font-sans mb-8 flex-1 space-y-3">
                            <p>Selling a home takes more than simply listing it—it requires a <span className="text-white font-medium">thoughtful strategy</span>.</p>
                            <p>We combine expert pricing, high-impact marketing, and skilled negotiation to position your home for <span className="text-white font-medium">maximum exposure</span> and the strongest possible offers.</p>
                            <p>Our goal is simple: help you achieve the highest possible return on your investment.</p>
                        </div>
                        <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors mt-auto">
                            Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Panel 2: Find the Right Home */}
                    <motion.div
                        custom={1}
                        variants={panelVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative p-6 md:p-10 hover:bg-white/[0.06] transition-colors duration-500 group text-left border-b md:border-b-0 md:border-r border-white/10 flex flex-col overflow-hidden"
                    >
                        <AnimatedIcon><HomeIcon className="w-6 h-6 md:w-7 md:h-7 text-accent" strokeWidth={1.5} /></AnimatedIcon>
                        <h3 className="text-lg md:text-xl font-serif font-black text-white mb-4 tracking-tight leading-snug min-h-[2lh]">Find the Right Home<br className="hidden md:block" /> for Your Next Chapter</h3>
                        <div className="text-[13px] text-neutral-300 leading-[1.85] font-sans mb-8 flex-1 space-y-3">
                            <p>Whether you're purchasing your first home or searching for the perfect place to grow your family, we take the time to understand <span className="text-white font-medium">what matters most to you</span>.</p>
                            <p>With deep local market knowledge and a personalized approach, we guide you through <span className="text-white font-medium">every step</span> so you can make confident decisions.</p>
                        </div>
                        <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors mt-auto">
                            Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Panel 3: Proven Experience */}
                    <motion.div
                        custom={2}
                        variants={panelVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative p-6 md:p-10 hover:bg-white/[0.06] transition-colors duration-500 group text-left border-b md:border-b-0 flex flex-col overflow-hidden"
                    >
                        <AnimatedIcon><Briefcase className="w-6 h-6 md:w-7 md:h-7 text-accent" strokeWidth={1.5} /></AnimatedIcon>
                        <h3 className="text-lg md:text-xl font-serif font-black text-white mb-4 tracking-tight leading-snug min-h-[2lh]">Proven Experience<br className="hidden md:block" /> You Can Count On</h3>
                        <div className="text-[13px] text-neutral-300 leading-[1.85] font-sans mb-8 flex-1 space-y-3">
                            <p>Real estate decisions require <span className="text-white font-medium">expertise you can trust</span>.</p>
                            <p>With a strong track record of successful transactions and satisfied clients across Southern California, Cuervo Homes brings the experience, market insight, and negotiation skills needed to deliver <span className="text-white font-medium">exceptional results</span>.</p>
                        </div>
                        <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors mt-auto">
                            Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const DualCTATransition = () => {
    return (
        <section className="bg-white border-b border-black/[0.08]">
            <div className="max-w-[1800px] mx-auto">
                {/* Section header bar */}
                <div className="border-b border-black/[0.08]">
                    <div className="px-6 md:px-12 lg:px-16 py-6 md:py-8 flex items-end justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <span className="text-accent text-[9px] tracking-[0.3em] font-bold uppercase block mb-2">How Can We Help</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-black leading-none uppercase">
                                Your Next Move
                            </h2>
                        </motion.div>
                    </div>
                </div>

                {/* Two-column split */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Find Your Next Home */}
                    <Link to="/contact?intent=nexthome" className="group block md:border-r border-black/[0.08]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="px-6 md:px-12 lg:px-16 py-8 md:py-10 lg:py-12 pb-12 md:pb-14 lg:pb-16 hover:bg-neutral-50/50 transition-colors duration-500 flex flex-col items-center"
                        >
                            <div className="w-full max-w-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-[2px] bg-black" />
                                    <span className="text-[9px] tracking-[0.3em] font-bold text-black uppercase">Buying</span>
                                </div>

                                <div className="flex items-start gap-5 md:gap-6 mb-5">
                                    <div className="w-14 h-14 md:w-16 md:h-16 border border-black/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/[0.04] transition-all duration-500">
                                        <HomeIcon className="w-6 h-6 md:w-7 md:h-7 text-black/70 group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-black tracking-tight leading-[1.05] mb-3 uppercase">
                                            Find Your <br className="hidden md:block" />Next Home
                                        </h3>
                                        <p className="text-[13px] text-neutral-500 font-sans leading-[1.85] max-w-sm font-medium">
                                            Whether it's your first home or your forever home, we'll guide you to the right property with expert local knowledge and personalized attention.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black group-hover:text-accent transition-colors duration-300 ml-[4.5rem] md:ml-[5rem]">
                                    <span>Start Your Search</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Right: What's My Home Worth? */}
                    <Link to="/contact?intent=homeworth" className="group block border-t md:border-t-0 border-black/[0.08]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="px-6 md:px-12 lg:px-16 py-8 md:py-10 lg:py-12 hover:bg-neutral-50/50 transition-colors duration-500 flex flex-col items-center"
                        >
                            <div className="w-full max-w-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-[2px] bg-accent" />
                                    <span className="text-[9px] tracking-[0.3em] font-bold text-neutral-500 uppercase">Selling</span>
                                </div>

                                <div className="flex items-start gap-5 md:gap-6 mb-5">
                                    <div className="w-14 h-14 md:w-16 md:h-16 border border-black/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/[0.04] transition-all duration-500">
                                        <LineChart className="w-6 h-6 md:w-7 md:h-7 text-black/70 group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-black tracking-tight leading-[1.05] mb-3 uppercase">
                                            What's My <br className="hidden md:block" />Home Worth?
                                        </h3>
                                        <p className="text-[13px] text-neutral-500 font-sans leading-[1.85] max-w-sm font-medium">
                                            Get a free, expert-prepared home valuation based on real local market data and your home's unique features — not an algorithm.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black group-hover:text-accent transition-colors duration-300 ml-[4.5rem] md:ml-[5rem]">
                                    <span>Get Free Valuation</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const DirectorProfile = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/DA4A5VBO6FCP7M7ABSRWRG33NQ.jpg"
                    alt="Orange County luxury home interior"
                    loading="lazy"
                    className="w-full h-full object-cover brightness-[0.2]"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 py-16 md:py-20 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Label */}
                    <span className="inline-block text-accent text-[9px] tracking-[0.3em] font-bold uppercase mb-6">
                        The Person Behind the Results
                    </span>

                    {/* Headshot + Name inline */}
                    <div className="flex items-center justify-center gap-5 md:gap-6 mb-6">
                        <img
                            src="/c_homes/Regina Headshot.jpg"
                            alt="Regina Cuervo"
                            loading="lazy"
                            className="w-20 h-20 md:w-24 md:h-24 object-cover object-top border border-white/15 shadow-2xl flex-shrink-0"
                        />
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-[0.9] uppercase mb-2">
                                Regina Cuervo
                            </h2>
                            <span className="text-[9px] tracking-[0.2em] font-bold uppercase text-white/30">
                                REALTOR® · Cal DRE #02144970
                            </span>
                        </div>
                    </div>

                    <div className="w-8 h-[2px] bg-accent mx-auto mb-6" />

                    {/* Quote */}
                    <p className="text-xl md:text-2xl lg:text-[26px] text-white font-serif leading-[1.45] mb-8 italic tracking-tight max-w-3xl mx-auto">
                        "Real estate is not just about properties — it's about people, goals, and life's next chapter."
                    </p>
                </motion.div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-[13px] text-neutral-400 font-sans leading-[1.85] mb-3 font-medium max-w-3xl mx-auto">
                        With years of experience helping clients buy and sell homes across Southern California, I've built my career on one principle: treat every client's home like it's my own. My deep knowledge of the local market means I can spot opportunity and risk that others miss.
                    </p>
                    <p className="text-[13px] text-neutral-400 font-sans leading-[1.85] mb-4 font-medium max-w-3xl mx-auto">
                        I prioritize communication, transparency, and personalized attention — advocating fiercely for my clients' best interests while making the experience as smooth as possible.
                    </p>
                    <p className="text-[13px] text-white font-sans leading-[1.85] mb-8 font-bold max-w-3xl mx-auto">
                        Whether you're a first-time buyer, a growing family, or a seasoned investor — let's start the conversation.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/contact"
                        className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-accent hover:text-black transition-all duration-300 mb-10"
                    >
                        Work With Regina
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Value prop pills */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8 border-t border-white/[0.06]">
                        {[
                            { icon: <ShieldCheck className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />, label: "Honest Guidance" },
                            { icon: <CheckCircle className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />, label: "Always Available" },
                            { icon: <Star className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />, label: "Detail-Obsessed" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                {item.icon}
                                <span className="text-[9px] tracking-[0.15em] font-bold text-white/40 uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- The Cuervo Homes Signature Selling Experience ---
const SELLING_STEPS = [
    {
        number: "01",
        title: "Private Strategy Consultation",
        description: "Every successful sale begins with a thoughtful strategy. During our private consultation, we evaluate your home, review market data, and discuss your goals and timeline. From there, we craft a tailored pricing and marketing plan designed to position your home competitively and attract the right buyers.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
    },
    {
        number: "02",
        title: "Curated Preparation & Presentation",
        description: "Presentation is everything in today's market. I coordinate professional photography, elevated marketing materials, and expert staging guidance to ensure your home is showcased at its absolute best. Every detail is carefully curated to create a powerful first impression.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
    },
    {
        number: "03",
        title: "Strategic Exposure & Negotiation",
        description: "Your home is introduced to the market with a targeted marketing launch designed to generate strong buyer interest. As offers come in, I leverage experience and negotiation expertise to secure the strongest possible terms and maximize your return.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop"
    },
    {
        number: "04",
        title: "Seamless Closing & White-Glove Service",
        description: "From inspections to escrow coordination and final documentation, I oversee every detail to ensure a smooth and successful closing. My goal is to make the process seamless, so you can move forward with confidence knowing your investment was handled with care and precision.",
        image: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?q=80&w=800&auto=format&fit=crop"
    }
];

const AUTO_ADVANCE_MS = 6000;

const SignatureSellingExperience = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
        setProgress(0);

        const tick = 30;
        let elapsed = 0;
        progressRef.current = setInterval(() => {
            elapsed += tick;
            setProgress(Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100));
        }, tick);

        timerRef.current = setInterval(() => {
            setActiveStep(prev => (prev + 1) % SELLING_STEPS.length);
            elapsed = 0;
            setProgress(0);
        }, AUTO_ADVANCE_MS);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        if (progressRef.current) { clearInterval(progressRef.current); progressRef.current = null; }
    }, []);

    useEffect(() => {
        if (!paused) startTimer();
        else stopTimer();
        return stopTimer;
    }, [paused, activeStep, startTimer, stopTimer]);

    const handleStepClick = (idx: number) => {
        setActiveStep(idx);
        setProgress(0);
        setPaused(false);
    };

    const activeData = SELLING_STEPS[activeStep];

    return (
        <section className="py-16 md:py-32 bg-white relative overflow-hidden">
            {/* Subtle black structural line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-black/10" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <span className="inline-block text-accent text-[10px] tracking-[0.3em] font-bold uppercase mb-4">
                        Our Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-black leading-tight mb-5 uppercase">
                        The Cuervo Homes <br className="hidden md:block" /> Signature Selling Experience
                    </h2>
                    <div className="w-12 h-[2px] bg-black mx-auto mb-5" />
                    <p className="text-neutral-500 max-w-2xl mx-auto font-sans text-[15px] leading-relaxed">
                        A refined, strategic approach designed to position your home for maximum exposure, elite buyers, and exceptional results.
                    </p>
                </div>

                {/* Desktop: Split layout — accordion left, image right */}
                <div
                    className="hidden md:grid md:grid-cols-[1fr_1.2fr] gap-0"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Left: Accordion steps — black panel */}
                    <div className="flex flex-col bg-black">
                        {SELLING_STEPS.map((step, idx) => {
                            const isActive = idx === activeStep;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleStepClick(idx)}
                                    className={`relative cursor-pointer border-b border-white/[0.06] last:border-b-0 transition-colors duration-500 ${isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"}`}
                                >
                                    {/* Accent progress bar on left edge */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden">
                                        <motion.div
                                            className="w-full bg-accent"
                                            initial={{ height: "0%" }}
                                            animate={{ height: isActive ? `${progress}%` : "0%" }}
                                            transition={{ duration: 0.05, ease: "linear" }}
                                        />
                                    </div>

                                    <div className="pl-7 pr-6 py-5">
                                        {/* Step header row */}
                                        <div className="flex items-center gap-4">
                                            <span className={`text-2xl font-serif font-black transition-colors duration-500 ${isActive ? "text-accent" : "text-white/15"}`}>
                                                {step.number}
                                            </span>
                                            <div className={`h-[1px] w-8 transition-colors duration-500 ${isActive ? "bg-accent/30" : "bg-white/10"}`} />
                                            <h3 className={`text-[15px] font-serif font-black tracking-tight transition-colors duration-500 ${isActive ? "text-white" : "text-white/35"}`}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        {/* Expanded content */}
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-[13px] text-neutral-400 font-sans leading-[1.85] mt-4 ml-[calc(2ch+2.5rem)] pr-4">
                                                        {step.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: All images stacked, crossfade via opacity */}
                    <div className="relative overflow-hidden bg-black">
                        {SELLING_STEPS.map((step, idx) => (
                            <motion.img
                                key={idx}
                                src={step.image}
                                alt={step.title}
                                animate={{
                                    opacity: idx === activeStep ? 1 : 0,
                                    scale: idx === activeStep ? 1 : 1.05,
                                }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ))}
                        {/* Large watermark number */}
                        <motion.span
                            key={activeStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.08, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-4 right-6 text-[12rem] font-serif font-black text-white leading-none select-none pointer-events-none z-10 drop-shadow-lg"
                        >
                            {activeData.number}
                        </motion.span>
                    </div>
                </div>

                {/* Mobile: Stacked accordion with inline images */}
                <div
                    className="md:hidden flex flex-col bg-black"
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => { setTimeout(() => setPaused(false), 3000); }}
                >
                    {SELLING_STEPS.map((step, idx) => {
                        const isActive = idx === activeStep;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleStepClick(idx)}
                                className={`relative cursor-pointer border-b border-white/[0.06] last:border-b-0 transition-colors duration-300 ${isActive ? "bg-white/[0.05]" : ""}`}
                            >
                                {/* Progress bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden">
                                    <motion.div
                                        className="w-full bg-accent"
                                        initial={{ height: "0%" }}
                                        animate={{ height: isActive ? `${progress}%` : "0%" }}
                                        transition={{ duration: 0.05, ease: "linear" }}
                                    />
                                </div>

                                <div className="pl-5 pr-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xl font-serif font-black transition-colors duration-300 ${isActive ? "text-accent" : "text-white/15"}`}>
                                            {step.number}
                                        </span>
                                        <div className={`h-[1px] w-5 transition-colors duration-300 ${isActive ? "bg-accent/30" : "bg-white/10"}`} />
                                        <h3 className={`text-[13px] font-serif font-black tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-white/35"}`}>
                                            {step.title}
                                        </h3>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                {/* Inline image */}
                                                <div className="relative mt-4 aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={step.image}
                                                        alt={step.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-[12px] text-neutral-400 font-sans leading-[1.8] mt-3 pb-1">
                                                    {step.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Step indicators — dot navigation */}
                <div className="flex justify-center gap-2 mt-8">
                    {SELLING_STEPS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleStepClick(idx)}
                            className={`h-[3px] rounded-full transition-all duration-500 ${idx === activeStep ? "w-8 bg-black" : "w-3 bg-black/15 hover:bg-black/30"}`}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <Link
                        to="/contact?intent=homeworth"
                        className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-5 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300 min-w-[280px]"
                    >
                        Start Your Selling Journey
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};



// --- Neighborhoods: Full aerial banner + full-bleed photo tiles ---
const NeighborhoodShowcase = () => {
    const ref = useRef(null);
    const areas = [
        { name: "Newport Beach", img: neighborhoodTileImage("newport-beach") },
        { name: "Costa Mesa", img: neighborhoodTileImage("costa-mesa") },
        { name: "Santa Ana", img: neighborhoodTileImage("santa-ana") },
        { name: "Huntington Beach", img: neighborhoodTileImage("huntington-beach") },
    ];

    const areasRow2 = [
        { name: "North Tustin", img: neighborhoodTileImage("north-tustin") },
        { name: "Orange", img: neighborhoodTileImage("orange") },
        { name: "Irvine", img: neighborhoodTileImage("irvine") },
        { name: "Anaheim", img: neighborhoodTileImage("anaheim") },
    ];

    return (
        <section ref={ref} className="relative bg-black overflow-hidden">
            {/* Solid black header — no photo */}
            <div className="py-14 md:py-24 px-6 text-center">
                <span className="inline-block text-accent text-xs tracking-[0.2em] font-bold uppercase mb-4">
                    Serving All Of Orange County
                </span>
                <h2 className="text-3xl md:text-7xl font-serif font-black tracking-tight text-white mb-4 md:mb-6">
                    OUR NEIGHBORHOODS
                </h2>
                <p className="text-neutral-500 max-w-xl mx-auto font-sans text-base md:text-lg">
                    We know the streets, the schools, and the home values in every city we serve.
                </p>
            </div>

            {/* Neighborhood Grid — 2 per row mobile, 4 per row desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4">
                {[...areas, ...areasRow2].map((area, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative h-48 sm:h-64 md:h-96 overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 w-full z-0">
                            <img
                                src={area.img}
                                alt={`${area.name} homes for sale`}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out brightness-[0.4] group-hover:brightness-[0.6]"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-base sm:text-xl md:text-2xl font-serif font-black text-white mb-1">{area.name}</h3>
                            <span className="text-[10px] font-bold tracking-widest text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
                                View Area <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const CinematicTestimonials = () => {
    const allReviews = [
        { quote: "Regina was absolutely incredible throughout our first buying process. She was knowledgeable, responsive, and truly had our best interests at heart every step of the way. From navigating offers and negotiations to keeping us informed during escrow, she made what could have been overwhelming feel manageable and exciting.", name: "Mara Paredes", detail: "First-Time Buyer · Orange, CA", initials: "MP" },
        { quote: "Regina is awesome! She is so knowledgeable, explains everything in a clear way and has incredible patience. She is so responsive and on top of everything. I was so happy with her as both a buyer and seller. I would absolutely recommend her and will be calling her the next time I need an agent.", name: "Kelly", detail: "Buyer & Seller · Long Beach, CA", initials: "KL" },
        { quote: "Buying your first house while interest rates are rocketing and it's a short sale is a wild experience. Regina's great communication helped ease our fears and guide us through a long and stressful process. Throughout all the twists and turns she was always available, informative, and supportive.", name: "Noah R.", detail: "First-Time Buyer · Santa Ana, CA", initials: "NR" },
        { quote: "Regina did an excellent job of guiding us through this tough market. As first time homebuyers, we did not know what to expect. Regina was with us every step of the way and constantly in communication with us. She was the perfect agent for us.", name: "Kathy C.", detail: "First-Time Buyer · Santa Ana, CA", initials: "KC" },
        { quote: "From the first day until it was sold Regina was on top of every aspect of the process. Always responded to my requests in a prompt and professional manner. I was dealing with three real estate agents in three different states at the same time. She accomplished everything and went beyond expectations.", name: "Tom S.", detail: "Buyer & Seller · Lakewood, CA", initials: "TS" },
        { quote: "Regina is an exceptional real estate agent. She is knowledgeable, business savvy, and incredibly thorough. Always available, kind, and a true professional from start to finish. She truly made me feel supported every step of the way.", name: "Sandy T.", detail: "Home Seller · Santa Ana, CA", initials: "ST" },
        { quote: "I reached out to Regina for advice, and she was incredibly knowledgeable and answered all my questions. Although the process came with its challenges, she stayed on top of every detail and ensured everything went smoothly.", name: "Cesar R.", detail: "Buyer · Alameda, CA", initials: "CR" },
        { quote: "Working with Regina was a great experience. It was the first time for us in selling a home. She really made it a smooth process for us with her wealth of knowledge and her friendly and professional demeanor.", name: "N. Pete", detail: "Home Seller", initials: "NP" },
        { quote: "Regina did an excellent job of representing me as the buyer. She's knowledgeable, professional, and responsive. I would happily work with her again. I can confidently recommend Regina.", name: "Eric H.", detail: "Home Buyer", initials: "EH" },
    ];

    const [page, setPage] = useState(0);
    const perPage = 3;
    const totalPages = Math.ceil(allReviews.length / perPage);
    const visible = allReviews.slice(page * perPage, page * perPage + perPage);

    return (
        <section className="bg-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 border-b border-neutral-200 pb-8 md:pb-10">
                    <div className="text-center md:text-left">
                        <span className="inline-block text-accent text-[10px] tracking-[0.3em] font-bold uppercase mb-4 px-3 py-1 bg-white border border-neutral-200 shadow-sm">
                            Verified Client Reviews
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-black leading-none">
                            WHAT OUR <br /> CLIENTS SAY
                        </h2>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 mt-6 md:mt-0">
                        <div className="flex items-center gap-3 border border-neutral-200 px-4 md:px-5 py-2.5 md:py-3 bg-neutral-50 shadow-sm">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-accent fill-accent" />)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-black font-bold leading-none">5.0</span>
                                <span className="text-[9px] text-neutral-500 uppercase tracking-widest leading-none mt-1">17 reviews</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="w-10 h-10 md:w-12 md:h-12 border border-neutral-300 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-neutral-300 shadow-sm"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase w-12 md:w-16 text-center">
                                {page + 1} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                                className="w-10 h-10 md:w-12 md:h-12 border border-neutral-300 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-neutral-300 shadow-sm"
                            >
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Testimonial Cards — 3 at a time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {visible.map((review, idx) => (
                        <motion.div
                            key={`${page}-${idx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group h-full flex"
                        >
                            <div
                                className="relative flex flex-col w-full h-full overflow-hidden border border-neutral-800 shadow-2xl hover:border-neutral-500 transition-colors duration-500 [clip-path:inset(0)]"
                            >
                                {/* Parallax background */}
                                <div
                                    className="fixed inset-0 bg-center bg-cover"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop')" }}
                                />
                                {/* Glass Black Overlay */}
                                <div className="absolute inset-0 bg-[#0a0a0a]/90 group-hover:bg-[#0a0a0a]/75 transition-colors duration-500 z-0 backdrop-blur-[2px]" />

                                {/* Card Content */}
                                <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col h-full">
                                    <div className="flex mb-5 md:mb-8">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent fill-accent mr-0.5" />)}
                                    </div>
                                    <div className="relative flex-grow mb-6 md:mb-12">
                                        <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/5 rotate-180 pointer-events-none" />
                                        <p className="text-[14px] md:text-[15px] text-neutral-300 font-sans leading-relaxed relative z-10">
                                            "{review.quote}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 md:gap-4 mt-auto border-t border-white/10 pt-4 md:pt-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center flex-shrink-0">
                                            <span className="text-black font-serif font-black text-xs md:text-sm tracking-widest">{review.initials}</span>
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm font-bold text-white tracking-widest uppercase mb-0.5 md:mb-1">{review.name}</p>
                                            <p className="text-[9px] md:text-[10px] text-accent uppercase tracking-[0.2em] font-medium">{review.detail}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-neutral-200 pt-12">
                    <p className="text-sm text-neutral-500 font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
                        Every client rates Regina 5.0 stars for local knowledge, negotiation skills, responsiveness, and process expertise.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 text-xs font-black tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all duration-300"
                    >
                        Work With Regina
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const BookingFunnelCTA = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 w-full z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop"
                    alt="Luxury home exterior"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-black/85 z-0" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10"
            >
                <ShieldCheck className="w-16 h-16 text-accent mx-auto mb-8" strokeWidth={1} />
                <h2 className="text-3xl md:text-6xl font-serif font-black tracking-tight mb-6 text-white">
                    WANT TO KNOW WHAT YOUR HOME IS REALLY WORTH?
                </h2>
                <p className="text-lg md:text-xl text-neutral-400 font-sans mb-12 max-w-2xl mx-auto leading-relaxed">
                    Online estimates can miss the mark by tens of thousands of dollars. Receive a personalized home value report prepared by a local expert—factoring in your home's unique upgrades, condition, and the latest market activity.
                </p>

                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm md:text-base text-neutral-300 font-sans">100% Complimentary — No Obligation</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm md:text-base text-neutral-300 font-sans">Confidential Home Value & Strategy Review</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm md:text-base text-neutral-300 font-sans">Delivered Within 24 Hours</span>
                    </div>
                </div>

                <Link
                    to="/contact?intent=homeworth"
                    className="inline-flex items-center justify-center bg-white text-black px-8 py-5 md:px-12 md:py-6 text-sm md:text-lg font-black tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                >
                    Get Free Home Value Report
                </Link>
            </motion.div>
        </section>
    );
};

export default function Home() {
    return (
        <div className="bg-black w-full overflow-x-hidden selection:bg-accent selection:text-white">
            <SEO
                title="Orange County Real Estate Agent — Buy, Sell & Invest | Cuervo Homes"
                description="Regina Cuervo is a top-rated Orange County REALTOR® helping families buy, sell, and invest in homes across Newport Beach, Costa Mesa, Santa Ana, Irvine & more. 5.0★ rating · Free home valuations · Hablamos Español."
                path="/"
            />
            <HeroHQ />
            <DualCTATransition />
            <DirectorProfile />
            <RecentSalesSection />
            <ContentWhyTrustUs />
            <SignatureSellingExperience />
            <NeighborhoodShowcase />
            <CinematicTestimonials />
            <BookingFunnelCTA />
        </div>
    );
}
