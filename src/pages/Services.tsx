import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, MapPin, DollarSign, Star, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEO from "../hooks/useSEO";

// --- Shared animation helpers (same vocabulary as Home.tsx) ---
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease, delay },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const staggerItem = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, delay: i * 0.12 },
    }),
};

// --- Services Page ---

export default function Services() {
    return (
        <div className="bg-black w-full min-h-screen text-black overflow-x-hidden selection:bg-accent selection:text-white">
            <SEO
                title="Real Estate Services"
                description="Expert home selling, buying, and investment services in Orange County. Strategic marketing, hard negotiation, and white-glove service from Regina Cuervo, REALTOR® at Cuervo Homes."
                path="/services"
            />
            <ServicesHero />
            <SignatureProcess />
            <ServiceSell />
            <ServiceBuy />
            <MoreServices />
            <ServiceTestimonial />
            <ServiceFAQ />
            <ServicesCTA />
        </div>
    );
}

// --- Services hero ---
const ServicesHero = () => (
    <section className="relative">
        <div className="bg-black h-20 md:h-[72px]" />

        <div className="flex flex-col-reverse md:flex-row min-h-[60vh] md:min-h-[85vh]">
            {/* Left — white editorial panel */}
            <div className="w-full md:w-1/2 bg-white flex items-center p-6 py-10 md:p-16 lg:p-20 xl:p-24 border-t md:border-t-0 md:border-r border-neutral-200">
                <div className="w-full max-w-lg">
                    <motion.span
                        {...fadeUp(0.1)}
                        className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-4 md:mb-5"
                    >
                        Trusted Real Estate Advisor · Orange County
                    </motion.span>
                    <motion.h1
                        {...fadeUp(0.2)}
                        className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-black text-black leading-[1.05] tracking-tight mb-5 md:mb-6"
                    >
                        WE DO THE{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-neutral-500">HARD WORK.</span>
                    </motion.h1>
                    <motion.div {...fadeUp(0.3)} className="w-10 h-[2px] bg-black mb-5 md:mb-6" />
                    <motion.p
                        {...fadeUp(0.35)}
                        className="text-[14px] md:text-[15px] text-neutral-500 font-sans leading-relaxed mb-8 md:mb-10 max-w-md"
                    >
                        Whether you're selling, buying, investing, or relocating — we fight for the best deal possible and make the entire process easy for you and your family.
                    </motion.p>
                    <motion.div {...fadeUp(0.45)}>
                        <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-xs font-black tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300 w-full md:w-auto">
                            Get Started Today
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        {...fadeUp(0.55)}
                        className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-neutral-200 grid grid-cols-4 gap-0"
                    >
                        {[
                            { number: "1,312", label: "Team Sales" },
                            { number: "5.0", label: "Rating" },
                            { number: "$753K", label: "Avg. Price" },
                            { number: "656", label: "Reviews" },
                        ].map((stat, idx) => (
                            <div key={idx} className={`text-center md:text-left ${idx < 3 ? "border-r border-neutral-200 md:border-r-0" : ""}`}>
                                <span className="block text-lg md:text-2xl font-serif font-black text-black tracking-tight leading-none">{stat.number}</span>
                                <span className="block text-[6px] md:text-[7px] tracking-[0.15em] md:tracking-[0.2em] font-bold text-neutral-400 uppercase mt-1.5">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right — image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease }}
                className="w-full md:w-1/2 relative h-[45vh] md:h-auto overflow-hidden"
            >
                <img
                    src="/services/hero.png"
                    alt="Orange County Real Estate Services"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
            </motion.div>
        </div>
    </section>
);

// --- Signature Selling Experience ---
const SignatureProcess = () => {
    const steps = [
        {
            number: "01",
            title: "Private Strategy Consultation",
            description: "We evaluate your home, review market data, and craft a tailored pricing and marketing plan to position your home competitively.",
        },
        {
            number: "02",
            title: "Curated Preparation & Presentation",
            description: "Professional photography, elevated marketing materials, and expert staging guidance — every detail curated for a powerful first impression.",
        },
        {
            number: "03",
            title: "Strategic Exposure & Negotiation",
            description: "A targeted marketing launch to generate strong buyer interest, followed by expert negotiation to secure the strongest possible terms.",
        },
        {
            number: "04",
            title: "Seamless Closing & White-Glove Service",
            description: "From inspections to escrow coordination and final documentation — we oversee every detail for a smooth, successful closing.",
        },
    ];

    return (
        <section id="process" className="bg-black text-white">
            {/* Header row */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-8 md:pb-12 border-b border-white/[0.08]">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
                    <motion.div {...fadeUp()}>
                        <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-2 md:mb-3">Our Process</span>
                        <h2 className="text-xl md:text-4xl font-serif font-black tracking-tight leading-tight">
                            THE SIGNATURE SELLING EXPERIENCE
                        </h2>
                    </motion.div>
                    <motion.p {...fadeUp(0.15)} className="text-[13px] md:text-sm text-neutral-500 font-sans max-w-sm leading-relaxed md:text-right">
                        A strategic, four-step approach designed for maximum exposure and exceptional results.
                    </motion.p>
                </div>
            </div>

            {/* Steps grid — 2x2 on desktop */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`group p-5 md:p-10 border-b border-white/[0.08] ${
                                idx % 2 === 0 ? "md:border-r md:border-white/[0.08]" : ""
                            } hover:bg-white/[0.03] transition-colors duration-300`}
                        >
                            <div className="flex items-start gap-4 md:gap-5">
                                <span className="text-2xl md:text-3xl font-serif font-black text-accent leading-none flex-shrink-0 pt-0.5">
                                    {step.number}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-serif font-black text-white mb-1.5 md:mb-2 tracking-tight leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-[12px] md:text-[13px] text-neutral-400 font-sans leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA row */}
            <motion.div
                {...fadeUp()}
                className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6"
            >
                <p className="text-[11px] font-bold tracking-[0.1em] text-neutral-500 font-sans uppercase">
                    Every home. Every detail. Every dollar.
                </p>
                <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                    Start Your Selling Journey
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </section>
    );
};

// --- #1 Service: Sell ---
const ServiceSell = () => (
    <section id="sell" className="relative flex flex-col md:flex-row min-h-[80vh] [clip-path:inset(0)]">
        <div
            className="fixed inset-0 z-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/services/sell.png')" }}
        >
            <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        </div>

        {/* Mobile: image peek area */}
        <div className="relative z-10 w-full md:hidden h-[28vh] pointer-events-none" />

        {/* Content Panel */}
        <div className="relative z-10 w-full md:w-[55%] lg:w-1/2 bg-white text-black p-6 py-10 md:p-16 lg:p-24 shadow-2xl flex flex-col justify-center">
            <div className="max-w-xl">
                <motion.span {...fadeUp(0.1)} className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase mb-3 md:mb-4 block">Our #1 Service</motion.span>
                <motion.h2 {...fadeUp(0.2)} className="text-2xl md:text-5xl lg:text-6xl font-serif font-black mb-5 md:mb-6 leading-[1.05] tracking-tight">
                    SELL YOUR HOME FOR THE HIGHEST PRICE
                </motion.h2>
                <motion.div {...fadeUp(0.25)} className="w-12 h-1 bg-black mb-6 md:mb-8" />
                <motion.p {...fadeUp(0.3)} className="text-[14px] md:text-base text-neutral-600 font-sans leading-relaxed mb-4 md:mb-6">
                    Most agents stick a sign in the yard and pray. We don't do that. We use aggressive marketing, professional photography, and hard negotiation to make sure you walk away with the most money possible.
                </motion.p>
                <motion.p {...fadeUp(0.35)} className="text-[13px] md:text-sm text-neutral-500 font-sans leading-relaxed mb-6 md:mb-8">
                    With an average sale price of $1.2M and 33+ homes closed across Newport Beach, Costa Mesa, Santa Ana, and more — Regina knows how to price it right, market it hard, and negotiate even harder.
                </motion.p>

                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    {[
                        "Custom marketing plan for your home",
                        "Professional HD photos & video tours",
                        "Aggressive pricing to attract top buyers",
                        "Hard negotiation — we fight for every dollar"
                    ].map((item, idx) => (
                        <motion.li
                            key={idx}
                            custom={idx}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 md:gap-4 text-[13px] md:text-sm font-bold text-black font-sans"
                        >
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" /> {item}
                        </motion.li>
                    ))}
                </ul>

                <motion.div {...fadeUp(0.5)}>
                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 md:py-5 font-black tracking-widest uppercase text-xs hover:bg-neutral-800 transition-colors w-full md:w-auto justify-center">
                        Get Free Equity Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>

        <div className="relative z-10 hidden md:block w-[45%] lg:w-1/2 pointer-events-none"></div>
    </section>
);

// --- #2 Service: Buy ---
const ServiceBuy = () => (
    <section id="buy" className="relative flex flex-col md:flex-row min-h-[80vh] border-t border-white/10 [clip-path:inset(0)]">
        <div
            className="fixed inset-0 z-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/services/buy.png')" }}
        >
            <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Mobile: image peek area */}
        <div className="relative z-10 w-full md:hidden h-[28vh] pointer-events-none" />

        {/* Desktop: parallax window (left) */}
        <div className="relative z-10 hidden md:block w-[45%] lg:w-1/2 pointer-events-none"></div>

        {/* Content Panel */}
        <div className="relative z-10 w-full md:w-[55%] lg:w-1/2 bg-[#0a0a0a]/95 backdrop-blur-md text-white p-6 py-10 md:p-16 lg:p-24 shadow-2xl md:border-l border-white/5 flex flex-col justify-center">
            <div className="max-w-xl">
                <motion.span {...fadeUp(0.1)} className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase mb-3 md:mb-4 block">Buyers & First-Timers</motion.span>
                <motion.h2 {...fadeUp(0.2)} className="text-2xl md:text-5xl lg:text-6xl font-serif font-black mb-5 md:mb-6 leading-[1.05] tracking-tight">
                    FIND YOUR DREAM HOME
                </motion.h2>
                <motion.div {...fadeUp(0.25)} className="w-12 h-1 bg-white mb-6 md:mb-8" />
                <motion.p {...fadeUp(0.3)} className="text-[14px] md:text-base text-neutral-300 font-sans leading-relaxed mb-4 md:mb-6">
                    Looking for the perfect home for your family? Whether it's your first house or your forever home, Regina listens to exactly what you need, finds it fast, and fights to get you the best price.
                </motion.p>
                <motion.p {...fadeUp(0.35)} className="text-[13px] md:text-sm text-neutral-400 font-sans leading-relaxed mb-6 md:mb-8">
                    First-time buyers are always welcome. No confusing paperwork, no pressure. Just honest guidance from someone who cares. Regina speaks English and Spanish, so your family will always feel comfortable.
                </motion.p>

                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    {[
                        "Personalized home search for your needs",
                        "First-time buyer guidance & hand-holding",
                        "Access to homes before they hit the market",
                        "Clear, honest advice — no surprises"
                    ].map((item, idx) => (
                        <motion.li
                            key={idx}
                            custom={idx}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 md:gap-4 text-[13px] md:text-sm font-bold text-white font-sans"
                        >
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" /> {item}
                        </motion.li>
                    ))}
                </ul>

                <motion.div {...fadeUp(0.5)}>
                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 md:py-5 font-black tracking-widest uppercase text-xs hover:bg-neutral-200 transition-colors w-full md:w-auto justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        Start Your Home Search <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);

// --- More services ---
const MoreServices = () => (
    <section id="more" className="bg-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-14">
                <motion.span {...fadeUp()} className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-3">
                    Beyond Buying & Selling
                </motion.span>
                <motion.h2 {...fadeUp(0.1)} className="text-2xl md:text-4xl font-serif font-black text-black tracking-tight">
                    MORE WAYS WE HELP
                </motion.h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                {[
                    {
                        icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
                        title: "Home Equity & Value Reports",
                        desc: "Stay informed about your home's current market value and the equity you've built. We provide personalized reports so you can make smarter financial decisions.",
                        cta: "Get Your Report",
                    },
                    {
                        icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
                        title: "Investment Opportunities",
                        desc: "Looking to grow your wealth through real estate? We help clients identify strong investment properties and opportunities across Southern California.",
                        cta: "See Opportunities",
                    },
                    {
                        icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
                        title: "Market Insights & Local Expertise",
                        desc: "From neighborhood trends to pricing strategies, we provide the insights you need to make confident real estate decisions.",
                        cta: "Learn More",
                    },
                ].map((service, idx) => (
                    <motion.div
                        key={idx}
                        custom={idx}
                        variants={staggerItem}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="group relative overflow-hidden flex flex-col min-h-[220px] md:min-h-[280px] [clip-path:inset(0)]"
                    >
                        <div
                            className="fixed inset-0 bg-center bg-cover"
                            style={{ backgroundImage: "url('/services/aerial.png')" }}
                        />
                        <div className="absolute inset-0 bg-black/75 md:bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />
                        <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
                            <div className="w-9 h-9 md:w-10 md:h-10 border border-white/20 flex items-center justify-center text-accent mb-4 md:mb-5 group-hover:border-accent/40 transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-base md:text-lg font-serif font-black text-white mb-1.5 md:mb-2 tracking-tight">{service.title}</h3>
                            <p className="text-[12px] md:text-[13px] text-neutral-400 font-sans leading-relaxed mb-4 md:mb-6 flex-1">
                                {service.desc}
                            </p>
                            <Link to="/contact" className="text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2 group-hover:text-accent transition-colors">
                                {service.cta} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// --- Testimonial ---
const ServiceTestimonial = () => {
    const reviews = [
        { quote: "From the first day until it was sold Regina was on top of every aspect of the process. Always responded to my requests in a prompt and professional manner. She accomplished everything and went beyond expectations.", name: "Tom S.", detail: "Buyer & Seller · Lakewood, CA", initials: "TS" },
        { quote: "Regina is an exceptional real estate agent. She is knowledgeable, business savvy, and incredibly thorough. Always available, kind, and a true professional from start to finish. She truly made me feel supported every step of the way.", name: "Sandy T.", detail: "Home Seller · Santa Ana, CA", initials: "ST" },
        { quote: "Working with Regina was a great experience. It was the first time for us in selling a home. She really made it a smooth process for us with her wealth of knowledge and her friendly and professional demeanor.", name: "N. Pete", detail: "Home Seller", initials: "NP" },
        { quote: "Regina dedicated over a year to guiding us through the journey of finding our perfect home. With unwavering patience, she accompanied us to dozens of properties. Her commitment transformed a daunting process into an enjoyable experience.", name: "P. Belter", detail: "Home Buyer · Santa Ana, CA", initials: "PB" },
        { quote: "Regina did an excellent job working with my family and I. With over 2 years of contact we were able to seal the deal on an amazing home. She made the process stress free. I highly recommend Regina as a realtor.", name: "Wesley C.", detail: "Home Buyer · Murrieta, CA", initials: "WC" },
    ];
    const [idx, setIdx] = useState(0);
    const review = reviews[idx];

    return (
        <section id="reviews" className="relative bg-neutral-950 border-t border-white/[0.06]">
            <div className="flex flex-col md:flex-row md:min-h-[70vh]">

                {/* Left — Agent profile panel */}
                <div className="w-full md:w-[42%] lg:w-[38%] bg-black border-b md:border-b-0 md:border-r border-white/[0.06] p-5 md:p-8 lg:p-10 flex flex-col justify-center">
                    {/* Headshot + Name */}
                    <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                        <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-2 ring-offset-black flex-shrink-0">
                            <img
                                src="/c_homes/headshot_copy.png"
                                alt="Regina Cuervo, REALTOR®"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif font-black text-white tracking-tight leading-tight">Regina Cuervo</h3>
                            <p className="text-[10px] text-neutral-400 font-sans mt-0.5 tracking-wide">REALTOR® · Orange County Specialist</p>
                            <div className="flex items-center gap-1 mt-1.5">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-accent fill-accent" />)}
                                <span className="text-[10px] font-bold text-white ml-1">5.0</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats 2x2 grid */}
                    <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-0 border border-white/[0.08] mb-6">
                        {[
                            { val: "1,312", label: "Team Sales" },
                            { val: "656+", label: "Team Reviews" },
                            { val: "$753K", label: "Avg. Sale Price" },
                            { val: "33+", label: "Homes Closed" },
                        ].map((s, i) => (
                            <div key={i} className={`p-4 ${i % 2 === 0 ? "border-r border-white/[0.08]" : ""} ${i < 2 ? "border-b border-white/[0.08]" : ""}`}>
                                <span className="block text-xl font-serif font-black text-white leading-none">{s.val}</span>
                                <span className="block text-[8px] tracking-[0.2em] font-bold text-neutral-500 uppercase mt-1.5">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Detail rows */}
                    <motion.div {...fadeUp(0.3)} className="space-y-3 mb-6">
                        {[
                            { label: "Brokerage", value: "WE'RE Real Estate Inc" },
                            { label: "License", value: "Cal DRE #02144970" },
                            { label: "Specialties", value: "Buying · Selling · Investment" },
                            { label: "Areas", value: "All of Orange County" },
                            { label: "Languages", value: "English & Spanish" },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between text-[11px] py-1.5 border-b border-white/[0.04]">
                                <span className="text-neutral-500 font-bold uppercase tracking-widest text-[9px]">{row.label}</span>
                                <span className="text-white/80 font-medium text-right">{row.value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div {...fadeUp(0.4)}>
                        <Link to="/contact" className="group flex items-center justify-center gap-2 w-full py-3.5 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300">
                            Schedule a Consultation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Right — Reviews */}
                <div className="w-full md:w-[58%] lg:w-[62%] flex flex-col justify-center p-6 py-8 md:p-14 lg:p-20">
                    <motion.span {...fadeUp()} className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-5 md:mb-8">
                        Client Reviews
                    </motion.span>

                    <motion.div {...fadeUp(0.1)} className="flex gap-1 mb-4 md:mb-6">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent fill-accent" />)}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease }}
                            className="text-lg md:text-2xl lg:text-[28px] font-serif font-black italic text-white leading-[1.5] mb-6 md:mb-8 min-h-[100px] md:min-h-[160px] flex items-start"
                        >
                            "{review.quote}"
                        </motion.blockquote>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 md:gap-4 pb-6 md:pb-8 border-b border-white/[0.08]"
                        >
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] md:text-[11px] font-serif font-black text-white">{review.initials}</span>
                            </div>
                            <div>
                                <span className="font-serif font-black text-white block text-[13px] md:text-sm">{review.name}</span>
                                <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{review.detail}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-4 md:mt-6">
                        <div className="flex items-center gap-2 md:gap-3">
                            <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-9 h-9 md:w-10 md:h-10 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))} disabled={idx === reviews.length - 1} className="w-9 h-9 md:w-10 md:h-10 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex gap-1.5 md:gap-2">
                            {reviews.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'bg-accent w-6 md:w-8' : 'bg-white/20 w-3 md:w-4 hover:bg-white/40'}`} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

// --- FAQ Section ---
const faqData = [
    {
        q: "How much does it cost to work with a real estate agent?",
        a: "For buyers, our services are typically free — the seller pays the agent commission. For sellers, we charge a competitive commission that covers professional photography, marketing, negotiation, and full-service support from listing to closing."
    },
    {
        q: "How long does it take to sell a home in Orange County?",
        a: "On average, well-priced homes in Orange County sell within 30–60 days. With our strategic marketing approach — professional photography, targeted advertising, and aggressive pricing — many of our listings receive offers within the first two weeks."
    },
    {
        q: "What is a home equity report and why should I get one?",
        a: "A home equity report shows your home's current market value based on recent comparable sales, local trends, and your property's unique features. Unlike automated online estimates, our reports are prepared personally by Regina and factor in upgrades, condition, and real-time market activity — often revealing tens of thousands more in value."
    },
    {
        q: "Do you work with first-time home buyers?",
        a: "Absolutely. A large portion of our clients are first-time buyers. Regina walks you through every step — from mortgage pre-approval to closing — with clear, honest guidance. We also speak both English and Spanish so your family always feels comfortable."
    },
    {
        q: "What areas of Orange County do you serve?",
        a: "We serve all of Orange County including Newport Beach, Costa Mesa, Santa Ana, Anaheim, Irvine, Huntington Beach, Orange, Laguna Beach, Corona Del Mar, and surrounding communities. Whether you're buying or selling, we have deep knowledge of every local market."
    },
    {
        q: "How is Cuervo Homes different from other real estate agents?",
        a: "We combine aggressive marketing and hard negotiation with a personal, family-first approach. Regina is backed by WE'RE Real Estate Inc — a team with over 1,312 sales and 656 verified reviews. You get the power of a top-performing team with the dedicated, one-on-one attention of a local specialist."
    },
    {
        q: "What should I do to prepare my home for sale?",
        a: "During our free strategy consultation, we'll walk through your home and provide specific recommendations. Generally, we focus on decluttering, minor repairs, and professional staging guidance. Our goal is to maximize your home's appeal without unnecessary expense."
    },
    {
        q: "Can I get access to homes before they hit the market?",
        a: "Yes. Through our professional network and MLS access, we often know about upcoming listings before they go public. This gives our buyer clients a significant advantage in competitive markets — allowing you to see and make offers on properties before most buyers even know they exist."
    },
];

const ServiceFAQ = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-white py-16 md:py-24 border-t border-neutral-200">
            {/* FAQ Schema for Google Rich Snippets */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.map(item => ({
                            "@type": "Question",
                            "name": item.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.a,
                            },
                        })),
                    })}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="text-center mb-10 md:mb-14">
                    <motion.span {...fadeUp()} className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-3">
                        Common Questions
                    </motion.span>
                    <motion.h2 {...fadeUp(0.1)} className="text-2xl md:text-4xl font-serif font-black text-black tracking-tight">
                        FREQUENTLY ASKED QUESTIONS
                    </motion.h2>
                </div>

                <div className="divide-y divide-neutral-200">
                    {faqData.map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                            >
                                <span className="text-[14px] md:text-base font-bold text-black font-sans pr-4 group-hover:text-accent transition-colors">
                                    {item.q}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-accent" : ""}`}
                                />
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-[13px] md:text-sm text-neutral-600 font-sans leading-relaxed pb-5 md:pb-6 pr-10">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Bottom CTA ---
const ServicesCTA = () => (
    <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img
                src="/services/cta.png"
                alt="Luxury home Orange County"
                loading="lazy"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
            <motion.h2
                {...fadeUp()}
                className="text-3xl md:text-6xl font-serif font-black text-white tracking-tight mb-4 md:mb-6"
            >
                READY TO <br/> GET STARTED?
            </motion.h2>
            <motion.p
                {...fadeUp(0.15)}
                className="text-neutral-400 font-sans text-[14px] md:text-lg max-w-2xl mx-auto mb-8 md:mb-10"
            >
                Get your free home equity report or schedule a buyer consultation today. No obligation, no pressure — just honest help from Regina and the Cuervo Homes team.
            </motion.p>
            <motion.div {...fadeUp(0.3)}>
                <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 md:py-5 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] w-full sm:w-auto">
                    Contact Regina Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
            <motion.p {...fadeIn(0.5)} className="text-[9px] md:text-[10px] text-neutral-600 uppercase tracking-widest mt-5 md:mt-6">
                Regina Cuervo, REALTOR® · Cal DRE #02144970 · WE'RE Real Estate Inc
            </motion.p>
        </div>
    </section>
);
