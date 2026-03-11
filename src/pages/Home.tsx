import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShieldCheck, HomeIcon, Briefcase, MapPin, Quote, LineChart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// --- Phase 9: Magazine-Quality, Photogenic, Trust-First Homepage ---

const HeroHQ = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=100&w=3000&auto=format&fit=crop"
                    alt="Orange County Real Estate Agent Regina Cuervo"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-40 flex flex-col items-center justify-center text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block py-1.5 px-4 border border-white/30 text-white/90 text-xs tracking-[0.25em] uppercase font-bold mb-8 bg-black/40 backdrop-blur-sm shadow-xl"
                >
                    Trusted Advisor Across Orange County
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl uppercase"
                >
                    SELL YOUR HOME <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">FOR THE HIGHEST PRICE.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-neutral-300 max-w-2xl font-sans mb-12 leading-relaxed drop-shadow-lg mx-auto"
                >
                    We fight for your money like it's our own. Get the highest price for your home, or let us find the exact dream home your family deserves.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
                >
                    <Link
                        to="/contact"
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

            {/* Trust logos embedded at very bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-5 overflow-hidden">
                <div className="w-full flex items-center pr-6">
                    <div className="pl-4 md:pl-12 lg:pl-24 hidden sm:flex items-center z-20 pr-6 mr-4 bg-transparent outline-none ring-0 drop-shadow-2xl">
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
                    
                    {/* Scrolling Marquee Container */}
                    <div className="flex-1 overflow-hidden relative w-full group/marquee">
                        {/* Gradient Fades for Smooth Entry/Exit */}
                        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-48 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-48 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />
                        
                        {/* The Scrolling Tracker (Must contain exactly two identical halves for the 50% translation constraint) */}
                        <div className="flex animate-marquee pb-1 w-max transition-all duration-300">
                            {/* HALF 1 */}
                            <div className="flex flex-none items-center">
                                {[...Array(2)].map((_, i) => (
                                    <div key={`half1-${i}`} className="flex flex-none items-center gap-8 md:gap-16 px-4 md:px-8">
                                        <img src="/c_homes/broker_logo_copy.png" alt="Brokerage" className="h-5 md:h-7 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default" />
                                        {["Zillow", "Redfin", "Realtor.com", "MLS", "Homes.com"].map((name) => (
                                            <span key={`${i}-${name}`} className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 cursor-default uppercase whitespace-nowrap">{name}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            
                            {/* HALF 2 (Exact Duplicate) */}
                            <div className="flex flex-none items-center" aria-hidden="true">
                                {[...Array(2)].map((_, i) => (
                                    <div key={`half2-${i}`} className="flex flex-none items-center gap-8 md:gap-16 px-4 md:px-8">
                                        <img src="/c_homes/broker_logo_copy.png" alt="Brokerage" className="h-5 md:h-7 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default" />
                                        {["Zillow", "Redfin", "Realtor.com", "MLS", "Homes.com"].map((name) => (
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
        { price: "$660,000", beds: 3, baths: 2, sqft: "1,133", city: "Pomona, CA", address: "251 San Juan St", soldAgo: "7 days ago", role: "Buyer" },
        { price: "$589,000", beds: 3, baths: 3, sqft: "1,521", city: "Azusa, CA", address: "750 E 5th St Unit 51", soldAgo: "10 days ago", role: "Buyer" },
        { price: "$1,051,000", beds: 2, baths: 1, sqft: "1,184", city: "Long Beach, CA", address: "28 Hermosa Ave", soldAgo: "16 days ago", role: "Buyer" },
        { price: "$1,300,000", beds: 3, baths: 3, sqft: "2,587", city: "Monrovia, CA", address: "926 Sierra Blanca Dr", soldAgo: "16 days ago", role: "Buyer" },
        { price: "$820,000", beds: 3, baths: 3, sqft: "1,380", city: "La Puente, CA", address: "16410 Francisquito Ave", soldAgo: "23 days ago", role: "Seller" },
    ];

    return (
        <section ref={sectionRef} className="bg-black text-white relative z-20 overflow-hidden">
            {/* Compact strip header — minimal interruption */}
            <div className="w-full px-6 md:px-12 lg:px-24 py-6 md:py-8 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-accent text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">Team Results</span>
                        <div className="hidden md:block w-px h-5 bg-white/20" />
                        <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight leading-none text-white">RECENT SALES</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-6 md:gap-10">
                        {[
                            { number: "198", label: "Last 12 Mo." },
                            { number: "1,312", label: "Total Team Sales" },
                            { number: "$14K–$4.6M", label: "Price Range" },
                            { number: "$753K", label: "Avg. Price" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <span className="block text-lg md:text-2xl font-serif font-black text-white leading-none mb-0.5 tracking-tight">{stat.number}</span>
                                <span className="block text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-white/40 uppercase">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Compact sales table */}
            <div className="w-full bg-white">
                {/* Sales table — all transactions */}
                <div className="bg-white">
                    {/* Table header — desktop only */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-8 md:px-12 py-5 border-b-2 border-black text-[8px] font-bold tracking-[0.2em] text-black uppercase bg-neutral-50">
                        <div className="col-span-4">Property</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-3">Details</div>
                        <div className="col-span-2">Location</div>
                        <div className="col-span-1 text-right">Side</div>
                    </div>

                    {/* Table rows */}
                    {sales.map((sale, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 px-6 md:px-12 py-6 border-b border-neutral-200 hover:bg-neutral-50 transition-colors md:items-center group cursor-default"
                        >
                            <div className="col-span-4 flex justify-between md:block items-center mb-1 md:mb-0">
                                <span className="text-sm font-sans font-bold text-black border-l-2 border-transparent group-hover:border-black pl-0 group-hover:pl-3 transition-all duration-300">{sale.address}</span>
                                <span className="md:hidden text-lg font-serif font-black text-black">{sale.price}</span>
                            </div>
                            <div className="hidden md:block col-span-2">
                                <span className="text-lg font-serif font-black text-black">{sale.price}</span>
                            </div>
                            <div className="col-span-3">
                                <span className="text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-500">{sale.beds} bd · {sale.baths} ba · {sale.sqft} sqft</span>
                            </div>
                            <div className="col-span-2 flex items-center pt-2 md:pt-0 border-t border-neutral-100 md:border-none md:justify-start justify-between">
                                <span className="text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-500 flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-black" /> {sale.city}
                                </span>
                                <span className="md:hidden text-[9px] tracking-widest font-sans font-bold text-neutral-400 uppercase">Sold {sale.soldAgo}</span>
                            </div>
                            <div className="hidden md:block col-span-1 text-right">
                                <span className="inline-block text-[8px] font-bold tracking-[0.2em] uppercase text-white bg-black px-2 py-1">{sale.role}</span>
                            </div>

                            {/* Mobile bottom tag */}
                            <div className="md:hidden flex justify-end mt-1">
                                <span className="inline-block text-[8px] font-bold tracking-[0.2em] uppercase text-white bg-black px-2 py-1">{sale.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA row */}
                <div className="py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border-b border-black">
                    <p className="text-[11px] font-bold tracking-[0.1em] text-neutral-400 font-sans uppercase">
                        5.0★ team rating &nbsp;·&nbsp; 656 team reviews &nbsp;·&nbsp; English & Spanish
                    </p>
                    <Link to="/contact" className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors">
                        Want Results Like These?
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ContentWhyTrustUs = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=100&w=3000&auto=format&fit=crop"
                    alt="Luxury living room"
                    className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/85" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                <span className="inline-block text-accent text-xs tracking-[0.2em] font-bold uppercase mb-4">
                    What We Do Best
                </span>
                <h2 className="text-3xl md:text-6xl font-serif font-black tracking-tight mb-12 md:mb-20 text-white leading-tight">
                    WHY FAMILIES <br /> TRUST CUERVO HOMES
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/20 bg-black/40 backdrop-blur-md">
                    <div className="p-6 md:p-10 hover:bg-white/10 transition-colors duration-500 group text-left border-b md:border-b-0 md:border-r border-white/10">
                        <LineChart className="w-8 h-8 text-accent mb-12 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3 tracking-tight">Sell For The Highest Price</h3>
                        <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-8">
                            We don't just put a sign in your yard. We use aggressive marketing and hard negotiation to make sure you walk away with the most money possible. Our clients average $1.2M per sale.
                        </p>
                        <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                            Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="p-6 md:p-10 hover:bg-white/10 transition-colors duration-500 group text-left border-b md:border-b-0 md:border-r border-white/10">
                        <HomeIcon className="w-8 h-8 text-accent mb-12 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3 tracking-tight">Find Your Dream Home</h3>
                        <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-8">
                            Whether it's your very first home or a forever home, we listen to exactly what your family needs and track it down fast. First-time buyers are always welcome — we walk you through every step.
                        </p>
                        <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                            Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="p-6 md:p-10 hover:bg-white/10 transition-colors duration-500 group text-left">
                        <Briefcase className="w-8 h-8 text-accent mb-12 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3 tracking-tight">Investment & Relocation</h3>
                        <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-8">
                            Looking to grow your wealth through real estate? Or moving to Orange County for the first time? We have 6+ years of experience giving families the inside edge on the best deals.
                        </p>
                        <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                            Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DirectorProfile = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="py-0 bg-white text-black flex flex-col md:flex-row min-h-screen border-b border-neutral-200">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 relative h-[50vh] md:h-auto overflow-hidden"
            >
                <div className="absolute inset-0 w-full z-0">
                    <img
                        src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=100&w=2000&auto=format&fit=crop"
                        alt="Regina Cuervo - Orange County Realtor"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-6 border border-white/20 hidden md:block pointer-events-none z-10" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 lg:p-32 bg-[#fafafa] relative border-l border-neutral-200"
            >
                <Quote className="absolute top-12 left-12 w-24 h-24 text-neutral-200/40 -z-0 rotate-180" />

                <div className="relative z-10 w-full max-w-xl">
                    <span className="inline-block text-accent text-[9px] tracking-[0.2em] font-bold uppercase mb-4 border border-accent/20 bg-accent/5 px-2 py-1">
                        REALTOR® · Cal DRE #02144970
                    </span>
                    <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tight mb-6 md:mb-8 text-black leading-none">
                        REGINA <br /> CUERVO
                    </h2>

                    <div className="w-8 h-[2px] bg-black mb-8" />

                    <p className="text-lg md:text-xl text-black font-serif leading-relaxed mb-6 italic tracking-tight">
                        "I know that buying or selling a home is one of the biggest decisions you'll ever make. I work hard to make it as stress-free and easy as possible."
                    </p>
                    <p className="text-[13px] text-neutral-500 font-sans leading-relaxed mb-6 font-medium">
                        As lead of the WE'RE Real Estate team, our team has earned a perfect 5.0-star rating from 656 verified reviews. With over 1,312 team sales and an average sale price of $753K, we bring unmatched experience to every transaction.
                    </p>
                    <p className="text-[13px] text-neutral-500 font-sans leading-relaxed mb-12 font-medium">
                        Our team speaks both English and Spanish and is committed to giving every family the personal attention they deserve.
                    </p>

                    <div className="grid grid-cols-3 gap-0 border-y border-neutral-200">
                        <div className="py-6 border-r border-neutral-200">
                            <span className="block text-3xl font-serif font-black text-black mb-1 tracking-tight">1,312</span>
                            <span className="block text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Team Sales</span>
                        </div>
                        <div className="py-6 px-6 border-r border-neutral-200">
                            <span className="block text-3xl font-serif font-black text-black mb-1 tracking-tight">5.0</span>
                            <span className="block text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Team Rating</span>
                        </div>
                        <div className="py-6 pl-6">
                            <span className="block text-3xl font-serif font-black text-black mb-1 tracking-tight">656</span>
                            <span className="block text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Team Reviews</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

// --- The Cuervo Homes Signature Selling Experience ---
const SignatureSellingExperience = () => {
    const ref = useRef(null);

    const steps = [
        {
            number: "01",
            title: "Private Strategy Consultation",
            description: "Every successful sale begins with a thoughtful strategy. During our private consultation, we evaluate your home, review market data, and discuss your goals and timeline. From there, we craft a tailored pricing and marketing plan designed to position your home competitively and attract the right buyers.",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=100&w=800&auto=format&fit=crop"
        },
        {
            number: "02",
            title: "Curated Preparation & Presentation",
            description: "Presentation is everything in today's market. I coordinate professional photography, elevated marketing materials, and expert staging guidance to ensure your home is showcased at its absolute best. Every detail is carefully curated to create a powerful first impression.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=100&w=800&auto=format&fit=crop"
        },
        {
            number: "03",
            title: "Strategic Exposure & Negotiation",
            description: "Your home is introduced to the market with a targeted marketing launch designed to generate strong buyer interest. As offers come in, I leverage experience and negotiation expertise to secure the strongest possible terms and maximize your return.",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=100&w=800&auto=format&fit=crop"
        },
        {
            number: "04",
            title: "Seamless Closing & White-Glove Service",
            description: "From inspections to escrow coordination and final documentation, I oversee every detail to ensure a smooth and successful closing. My goal is to make the process seamless, so you can move forward with confidence knowing your investment was handled with care and precision.",
            image: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?q=100&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <section ref={ref} className="py-16 md:py-24 bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block text-accent text-xs tracking-[0.2em] font-bold uppercase mb-4 border border-neutral-200 px-3 py-1 bg-white shadow-sm">
                        Our Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-black leading-tight mb-5 uppercase">
                        The Cuervo Homes <br className="hidden md:block" /> Signature Selling Experience
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto font-sans text-[15px] leading-relaxed">
                        A refined, strategic approach designed to position your home for maximum exposure, elite buyers, and exceptional results.
                    </p>
                </div>

                {/* Grid of Image Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden bg-black"
                        >
                            {/* Background Image */}
                            <img 
                                src={step.image} 
                                alt={step.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 ease-in-out group-hover:scale-105"
                            />
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />

                            {/* Content */}
                            <div className="relative p-8 md:p-10 flex flex-col z-10 h-full">
                                <div className="flex items-center gap-4 mb-5">
                                    <span className="text-3xl md:text-4xl font-serif font-black text-accent drop-shadow-md">
                                        {step.number}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-white/20" />
                                </div>
                                
                                <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3 tracking-tight leading-[1.2] drop-shadow-lg">
                                    {step.title}
                                </h3>
                                <p className="text-[13px] md:text-sm text-neutral-300 font-sans leading-relaxed drop-shadow-md">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <Link
                        to="/contact"
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
        { name: "Newport Beach", img: "/neighborhoods/newport-beach.png" },
        { name: "Costa Mesa", img: "/neighborhoods/costa-mesa.png" },
        { name: "Santa Ana", img: "/neighborhoods/santa-ana.png" },
        { name: "Huntington Beach", img: "/neighborhoods/huntington-beach.png" },
    ];

    const areasRow2 = [
        { name: "North Tustin", img: "/neighborhoods/north-tustin.png" },
        { name: "Orange", img: "/neighborhoods/orange.png" },
        { name: "Irvine", img: "/neighborhoods/irvine.png" },
        { name: "Anaheim", img: "/neighborhoods/anaheim.png" },
    ];

    return (
        <section ref={ref} className="relative bg-black overflow-hidden">
            {/* Solid black header — no photo */}
            <div className="py-24 text-center">
                <span className="inline-block text-accent text-xs tracking-[0.2em] font-bold uppercase mb-4">
                    Serving All Of Orange County
                </span>
                <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tight text-white mb-6">
                    OUR NEIGHBORHOODS
                </h2>
                <p className="text-neutral-500 max-w-xl mx-auto font-sans text-lg">
                    We know the streets, the schools, and the home values in every city we serve.
                </p>
            </div>

            {/* Row 1 */}
            <div className="flex flex-wrap sm:flex-row">
                {areas.map((area, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative w-full sm:w-1/2 md:w-1/4 h-56 sm:h-72 md:h-96 overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 w-full z-0">
                            <img
                                src={area.img}
                                alt={`${area.name} homes for sale`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out brightness-[0.4] group-hover:brightness-[0.6]"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-1">{area.name}</h3>
                            <span className="text-[10px] font-bold tracking-widest text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
                                View Area <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-col sm:flex-row">
                {areasRow2.map((area, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative w-full sm:w-1/4 h-72 md:h-96 overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 w-full z-0">
                            <img
                                src={area.img}
                                alt={`${area.name} homes for sale`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out brightness-[0.4] group-hover:brightness-[0.6]"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-1">{area.name}</h3>
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
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-10">
                    <div>
                        <span className="inline-block text-accent text-[10px] tracking-[0.3em] font-bold uppercase mb-4 px-3 py-1 bg-white border border-neutral-200 shadow-sm">
                            Verified Client Reviews
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-black leading-none">
                            WHAT OUR <br /> CLIENTS SAY
                        </h2>
                    </div>
                    
                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 mt-8 md:mt-0">
                        <div className="flex items-center gap-3 border border-neutral-200 px-5 py-3 bg-neutral-50 shadow-sm">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-accent fill-accent" />)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-black font-bold leading-none">5.0</span>
                                <span className="text-[9px] text-neutral-500 uppercase tracking-widest leading-none mt-1">from 17 reviews</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(0, p - 1))} 
                                disabled={page === 0} 
                                className="w-12 h-12 border border-neutral-300 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-neutral-300 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase w-16 text-center">
                                {page + 1} / {totalPages}
                            </span>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} 
                                disabled={page === totalPages - 1} 
                                className="w-12 h-12 border border-neutral-300 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-neutral-300 shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
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
                                className="relative flex flex-col w-full h-full overflow-hidden border border-neutral-800 shadow-2xl hover:border-neutral-500 transition-colors duration-500 bg-fixed bg-center bg-cover"
                                style={{ 
                                    backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=100&w=3000&auto=format&fit=crop')",
                                }}
                            >
                                {/* Glass Black Overlay */}
                                <div className="absolute inset-0 bg-[#0a0a0a]/90 group-hover:bg-[#0a0a0a]/75 transition-colors duration-500 z-0 backdrop-blur-[2px]" />

                                {/* Card Content */}
                                <div className="relative z-10 p-10 md:p-12 flex flex-col h-full">
                                    <div className="flex mb-8">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent mr-0.5" />)}
                                    </div>
                                    <div className="relative flex-grow mb-12">
                                        <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/5 rotate-180 pointer-events-none" />
                                        <p className="text-[15px] text-neutral-300 font-sans leading-relaxed relative z-10">
                                            "{review.quote}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                                        <div className="w-12 h-12 bg-white flex items-center justify-center flex-shrink-0">
                                            <span className="text-black font-serif font-black text-sm tracking-widest">{review.initials}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white tracking-widest uppercase mb-1">{review.name}</p>
                                            <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-medium">{review.detail}</p>
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
                    src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=100&w=3000&auto=format&fit=crop"
                    alt="Luxury home exterior"
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
                    to="/contact"
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
            <HeroHQ />
            <RecentSalesSection />
            <ContentWhyTrustUs />
            <SignatureSellingExperience />
            <DirectorProfile />
            <NeighborhoodShowcase />
            <CinematicTestimonials />
            <BookingFunnelCTA />
        </div>
    );
}
