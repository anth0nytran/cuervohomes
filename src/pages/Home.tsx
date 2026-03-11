import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShieldCheck, HomeIcon, Briefcase, MapPin, Quote, LineChart } from "lucide-react";
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

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-32 md:pb-28 flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
                {/* Left side — Text */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block py-1 px-3 border border-white/30 text-white/80 text-xs tracking-[0.2em] uppercase font-bold mb-6 bg-black/40 backdrop-blur-sm"
                    >
                        Trusted By Families Across Orange County
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white leading-[1.05] tracking-tight mb-6 drop-shadow-2xl"
                    >
                        SELL YOUR HOME <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">FOR THE HIGHEST PRICE.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base md:text-lg text-neutral-300 max-w-xl font-sans mb-8 leading-relaxed drop-shadow-lg lg:mx-0 mx-auto"
                    >
                        We fight for your money like it's our own. Get the highest price for your home, or let us find the exact dream home your family deserves.
                    </motion.p>

                    {/* Mobile-only CTA button (form is hidden on mobile) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-4 lg:hidden"
                    >
                        <Link
                            to="/contact"
                            className="group inline-flex items-center justify-center gap-3 bg-white text-black px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            Get Free Home Equity Report
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/30 text-white px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                        >
                            See How We Help You
                        </Link>
                    </motion.div>

                    {/* Desktop-only stats row under text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:flex items-center gap-10 mt-10 border-t border-white/15 pt-8"
                    >
                        {[
                            { number: "33+", label: "Homes Sold" },
                            { number: "5.0★", label: "Client Rating" },
                            { number: "$1.2M", label: "Avg. Sale Price" },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <span className="block text-2xl font-serif font-black text-white leading-none mb-1 tracking-tight">{stat.number}</span>
                                <span className="block text-[8px] tracking-[0.2em] font-bold text-white/40 uppercase">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right side — Form (desktop only) */}
                <motion.div
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden lg:block w-full max-w-md flex-shrink-0"
                >
                    <div className="bg-[#111]/95 backdrop-blur-md border border-white/10 p-8 xl:p-10 shadow-2xl">
                        <h3 className="text-lg font-serif font-black text-white mb-1 tracking-tight">Get Your Free Home Equity Report</h3>
                        <p className="text-[11px] text-neutral-500 font-sans mb-6">Find out what your home is really worth. 100% free.</p>

                        <form className="space-y-3" autoComplete="off">
                            <div>
                                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-1.5 block">Full Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-1.5 block">Phone *</label>
                                <input
                                    type="tel"
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700"
                                    placeholder="(714) 555-0198"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-1.5 block">Email *</label>
                                <input
                                    type="email"
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700"
                                    placeholder="john@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-1.5 block">Property Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700"
                                    placeholder="123 Main St, Newport Beach, CA"
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-1.5 block">I'm Interested In... *</label>
                                <select className="w-full bg-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer" required>
                                    <option value="" disabled selected>Choose one...</option>
                                    <option value="selling">Selling My Home</option>
                                    <option value="buying">Buying A Home</option>
                                    <option value="equity">Free Home Equity Report</option>
                                    <option value="investing">Investment Properties</option>
                                    <option value="relocating">Relocating to Orange County</option>
                                    <option value="first-time">First-Time Home Buyer</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="group w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all duration-300 mt-3"
                            >
                                Get My Free Report
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-center text-[9px] text-neutral-600 uppercase tracking-widest">
                                Zero Obligation · Your info stays private
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Trust logos embedded at very bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-5">
                <div className="w-full px-4 md:px-12 lg:px-24 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-12">
                    <span className="text-[10px] tracking-[0.3em] font-bold text-white/30 uppercase">Trusted By</span>
                    <div className="flex items-center gap-4 md:gap-12 flex-wrap justify-center">
                        <img src="/c_homes/broker_logo_copy.png" alt="Brokerage" className="h-5 md:h-7 object-contain brightness-0 invert opacity-40" />
                        {["Zillow", "Redfin", "Realtor.com", "MLS", "Homes.com"].map((name) => (
                            <span key={name} className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/30 uppercase">{name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};



const RecentSalesSection = () => {
    const sectionRef = useRef(null);

    const sales = [
        { price: "$1,860,000", beds: 4, baths: 3, sqft: "2,728", city: "Santa Ana, CA", address: "13241 Orange Knoll Dr", soldAgo: "26 days ago", role: "Buyer" },
        { price: "$904,000", beds: 2, baths: 2, sqft: "1,089", city: "Anaheim, CA", address: "203 S Kroeger St", soldAgo: "26 days ago", role: "Seller" },
        { price: "$488,000", beds: 3, baths: 1, sqft: "840", city: "Los Angeles, CA", address: "1257 S McBride Ave", soldAgo: "1 month ago", role: "Seller" },
        { price: "$1,375,000", beds: 4, baths: 2, sqft: "2,160", city: "Orange, CA", address: "822 E Lomita Ave", soldAgo: "2 months ago", role: "Buyer" },
        { price: "$1,200,000", beds: 2, baths: 2, sqft: "1,394", city: "Santa Ana, CA", address: "12931 Prospect Ave", soldAgo: "3 months ago", role: "Buyer · Seller" },
    ];

    const featured = [
        {
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=100&w=1600&auto=format&fit=crop",
            price: "$1,860,000",
            address: "13241 Orange Knoll Dr, Santa Ana",
            specs: "4 Beds · 3 Baths · 2,728 Sq.Ft.",
            status: "SOLD — BUYER SIDE"
        },
        {
            image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=100&w=1600&auto=format&fit=crop",
            price: "$1,375,000",
            address: "822 E Lomita Ave, Orange",
            specs: "4 Beds · 2 Baths · 2,160 Sq.Ft.",
            status: "SOLD — BUYER SIDE"
        },
        {
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=100&w=1600&auto=format&fit=crop",
            price: "$1,200,000",
            address: "12931 Prospect Ave, Santa Ana",
            specs: "2 Beds · 2 Baths · 1,394 Sq.Ft.",
            status: "SOLD — BUYER & SELLER"
        }
    ];

    return (
        <section ref={sectionRef} className="bg-black text-white relative z-20 overflow-hidden">
            {/* Compact strip header — minimal interruption */}
            <div className="w-full px-6 md:px-12 lg:px-24 py-6 md:py-8 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-accent text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">Real Results</span>
                        <div className="hidden md:block w-px h-5 bg-white/20" />
                        <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight leading-none text-white">RECENT SALES</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-6 md:gap-10">
                        {[
                            { number: "11", label: "Last 12 Mo." },
                            { number: "33", label: "Total Sales" },
                            { number: "$148K–$4.1M", label: "Price Range" },
                            { number: "$1.2M", label: "Avg. Price" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <span className="block text-lg md:text-2xl font-serif font-black text-white leading-none mb-0.5 tracking-tight">{stat.number}</span>
                                <span className="block text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-white/40 uppercase">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured property photo cards - Truly Full Width */}
            <div className="w-full border-b border-black bg-black border-y">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {featured.map((prop, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`group cursor-pointer relative overflow-hidden ${idx !== 2 ? 'border-b border-black md:border-b-0 md:border-r' : ''} bg-black hover:bg-neutral-900 transition-colors duration-500 min-h-[350px] md:min-h-[600px] flex flex-col justify-end`}
                        >
                            <div className="absolute inset-0 w-full z-0">
                                <img
                                    src={prop.image}
                                    alt={prop.address}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="absolute top-6 left-6 bg-black text-white px-3 py-1.5 text-[8px] font-bold tracking-[0.2em] uppercase z-10 border border-white/20">
                                {prop.status}
                            </div>

                            <div className="relative z-10 p-8 md:p-10 flex flex-col space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-white">{prop.price}</h3>
                                <p className="text-xs font-bold text-neutral-300 flex items-center gap-1.5 pt-2">
                                    <MapPin className="w-3 h-3 text-accent" /> {prop.address}
                                </p>
                                <p className="text-[9px] tracking-[0.15em] text-neutral-400 uppercase font-bold pt-2">{prop.specs}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Re-open container for table */}
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
                        5.0★ client rating &nbsp;·&nbsp; 6+ years experience &nbsp;·&nbsp; English & Spanish
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
                        With 6+ years of experience and 33+ homes sold, Regina has earned a perfect 5.0-star rating from 17 verified client reviews. Every single client rates her 5 out of 5 for local knowledge, negotiation skills, responsiveness, and process expertise.
                    </p>
                    <p className="text-[13px] text-neutral-500 font-sans leading-relaxed mb-12 font-medium">
                        She speaks both English and Spanish and is committed to giving every family the personal attention they deserve.
                    </p>

                    <div className="grid grid-cols-3 gap-0 border-y border-neutral-200">
                        <div className="py-6 border-r border-neutral-200">
                            <span className="block text-3xl font-serif font-black text-black mb-1 tracking-tight">33+</span>
                            <span className="block text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Homes Sold</span>
                        </div>
                        <div className="py-6 px-6 border-r border-neutral-200">
                            <span className="block text-3xl font-serif font-black text-black mb-1 tracking-tight">5.0</span>
                            <span className="block text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Star Rating</span>
                        </div>
                        <div className="py-6 pl-6">
                            <span className="block text-3xl font-serif font-black text-black mb-1 tracking-tight">6+</span>
                            <span className="block text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Years Exp.</span>
                        </div>
                    </div>
                </div>
            </motion.div>
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
        <section className="bg-white py-32 md:py-40 border-t border-neutral-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-neutral-200 pb-12">
                    <div>
                        <span className="inline-block text-accent text-[9px] tracking-[0.2em] font-bold uppercase mb-4 border border-accent/20 bg-accent/5 px-2 py-1">
                            Verified Client Reviews
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-black leading-none">
                            WHAT OUR <br /> CLIENTS SAY
                        </h2>
                    </div>
                    <div className="flex flex-col items-end gap-4 mt-8 md:mt-0">
                        <div className="flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-full shadow-sm bg-neutral-50">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}
                            <span className="text-xs text-black font-bold font-sans ml-2 tracking-wide">5.0 <span className="text-neutral-500 font-medium">from 17 reviews</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:border-neutral-300 shadow-sm">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase w-12 text-center">{page + 1} / {totalPages}</span>
                            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:border-neutral-300 shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Testimonial Cards — 3 at a time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {visible.map((review, idx) => (
                        <motion.div
                            key={`${page}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            <div className="bg-white border border-neutral-200 p-10 md:p-12 flex flex-col h-full hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.03)] group-hover:border-neutral-300">
                                <div className="flex mb-8">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent mr-0.5" />)}
                                </div>
                                <div className="relative flex-grow mb-10">
                                    <Quote className="absolute -top-2 -left-2 w-10 h-10 text-neutral-100 rotate-180" />
                                    <p className="text-[15px] text-neutral-600 font-sans leading-[1.8] relative z-10">
                                        "{review.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 border-t border-neutral-100 pt-8">
                                    <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-serif font-black text-white">{review.initials}</span>
                                    </div>
                                    <div>
                                        <span className="font-serif font-black text-black block text-base tracking-tight">{review.name}</span>
                                        <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">{review.detail}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom trust line */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-neutral-500 font-sans mb-8">
                        Every client rates Regina 5.0 stars for local knowledge, negotiation skills, responsiveness, and process expertise.
                    </p>
                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-neutral-800 transition-colors">
                        Work With Regina <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <p className="text-lg md:text-xl text-neutral-400 font-sans mb-12 max-w-2xl mx-auto">
                    Stop guessing. Get a free, accurate home equity report and see exactly how much you could walk away with. No strings attached.
                </p>

                <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-white text-black px-8 py-5 md:px-12 md:py-6 text-sm md:text-lg font-black tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                >
                    Get Free Equity Report
                </Link>
                <p className="text-xs text-neutral-500 mt-8 font-bold uppercase tracking-widest">
                    No Obligation. 100% Free.
                </p>
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
            <DirectorProfile />
            <NeighborhoodShowcase />
            <CinematicTestimonials />
            <BookingFunnelCTA />
        </div>
    );
}
