import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, TrendingUp, MapPin, DollarSign, Star, ChevronLeft, ChevronRight } from "lucide-react";

// --- Services: Cinematic, matching homepage & contact aesthetic ---

export default function Services() {
    return (
        <div className="bg-black w-full overflow-x-hidden selection:bg-accent selection:text-white">
            <ServicesHero />
            <ProofStrip />
            <ServiceSell />
            <ServiceBuy />
            <MoreServices />
            <ServiceTestimonial />
            <ServicesCTA />
        </div>
    );
}

// --- Full-screen cinematic hero ---
const ServicesHero = () => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="/services/hero.png" 
                alt="Orange County Real Estate Services" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/90" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center mt-20">
            <span className="inline-block py-1 px-3 border border-white/30 text-white/80 text-xs tracking-[0.2em] uppercase font-bold mb-6 bg-black/40 backdrop-blur-sm">
                Trusted By Families Across Orange County
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
                WE DO THE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">HARD WORK.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-lg">
                Whether you're selling, buying, investing, or relocating — we fight for the best deal possible and make the entire process easy for you and your family.
            </p>
            <div className="mt-10">
                <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm md:text-base font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </section>
);

// --- Proof strip matching contact page ---
const ProofStrip = () => (
    <section className="bg-black py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                    { number: "33+", label: "Homes Sold" },
                    { number: "5.0", label: "Client Rating" },
                    { number: "$1.2M", label: "Avg. Sale Price" },
                    { number: "6+", label: "Years Experience" },
                ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center text-center">
                        <span className="text-3xl md:text-4xl font-serif font-black text-white mb-2">{stat.number}</span>
                        <span className="text-xs tracking-[0.2em] font-sans text-accent uppercase font-bold">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// --- #1 Service: Sell — split layout, photo right ---
const ServiceSell = () => (
    <section className="bg-white text-black">
        <div className="flex flex-col md:flex-row min-h-[80vh]">
            {/* Content */}
            <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 lg:p-24">
                <div className="max-w-lg">
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4 block">Our #1 Service</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
                        SELL YOUR HOME FOR THE HIGHEST PRICE
                    </h2>
                    <div className="w-12 h-1 bg-black mb-8" />
                    <p className="text-neutral-600 font-sans leading-relaxed mb-6">
                        Most agents stick a sign in the yard and pray. We don't do that. We use aggressive marketing, professional photography, and hard negotiation to make sure you walk away with the most money possible.
                    </p>
                    <p className="text-sm text-neutral-500 font-sans leading-relaxed mb-8">
                        With an average sale price of $1.2M and 33+ homes closed across Newport Beach, Costa Mesa, Santa Ana, and more — Regina knows how to price it right, market it hard, and negotiate even harder.
                    </p>
                    
                    <ul className="space-y-3 mb-10">
                        {[
                            "Custom marketing plan for your home",
                            "Professional HD photos & video tours",
                            "Aggressive pricing to attract top buyers",
                            "Hard negotiation — we fight for every dollar"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-bold text-black">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>

                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-neutral-800 transition-colors">
                        Get Free Equity Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Photo */}
            <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-0 overflow-hidden">
                <img 
                    src="/services/sell.png" 
                    alt="Selling homes in Orange County" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    </section>
);

// --- #2 Service: Buy — split layout reversed, photo left ---
const ServiceBuy = () => (
    <section className="bg-black text-white">
        <div className="flex flex-col-reverse md:flex-row min-h-[80vh]">
            {/* Photo */}
            <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-0 overflow-hidden">
                <img 
                    src="/services/buy.png" 
                    alt="Find your dream home in Orange County" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-6 border border-white/20 hidden md:block pointer-events-none" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 lg:p-24">
                <div className="max-w-lg">
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4 block">Buyers & First-Timers</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
                        FIND YOUR DREAM HOME
                    </h2>
                    <div className="w-12 h-1 bg-white mb-8" />
                    <p className="text-neutral-300 font-sans leading-relaxed mb-6">
                        Looking for the perfect home for your family? Whether it's your first house or your forever home, Regina listens to exactly what you need, finds it fast, and fights to get you the best price.
                    </p>
                    <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-8">
                        First-time buyers are always welcome. No confusing paperwork, no pressure. Just honest guidance from someone who cares. Regina speaks English and Spanish, so your family will always feel comfortable.
                    </p>
                    
                    <ul className="space-y-3 mb-10">
                        {[
                            "Personalized home search for your needs",
                            "First-time buyer guidance & hand-holding",
                            "Access to homes before they hit the market",
                            "Clear, honest advice — no surprises"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-bold text-white">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>

                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-neutral-200 transition-colors">
                        Start Your Home Search <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

// --- Cinematic break header + service cards as one section ---
const MoreServices = () => (
    <section className="overflow-hidden">
        {/* Aerial photo header */}
        <div className="relative h-[40vh]">
            <img 
                src="/services/aerial.png" 
                alt="Orange County aerial" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                <div>
                    <span className="text-accent text-xs tracking-[0.2em] font-bold uppercase block mb-4">Beyond Buying & Selling</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-white tracking-tight">
                        MORE WAYS WE HELP
                    </h2>
                </div>
            </div>
        </div>

        {/* Service cards directly below */}
        <div className="bg-white py-24 md:py-32 text-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200">
                    {[
                        {
                            icon: <DollarSign className="w-8 h-8" strokeWidth={1.5} />,
                            title: "Free Home Value Report",
                            desc: "Want to know what your home is really worth right now? We'll send you a detailed, accurate equity report — completely free. No strings attached. No sales pressure.",
                            cta: "Get Yours Free",
                        },
                        {
                            icon: <TrendingUp className="w-8 h-8" strokeWidth={1.5} />,
                            title: "Investment Properties",
                            desc: "Looking to grow your wealth through real estate? Regina has access to off-market properties and investment opportunities. Price range from $148K to $4.1M — built for smart investors.",
                            cta: "See Opportunities",
                        },
                        {
                            icon: <MapPin className="w-8 h-8" strokeWidth={1.5} />,
                            title: "Relocation Services",
                            desc: "Moving to Orange County? We make it easy. From finding the right neighborhood to getting settled — Regina handles everything so you can focus on your family. English & Spanish spoken.",
                            cta: "Get Started",
                        },
                    ].map((service, idx) => (
                        <div key={idx} className="p-10 md:p-12 border-r last:border-r-0 border-neutral-200 group hover:bg-neutral-50 transition-colors">
                            <div className="text-black mb-6 group-hover:text-accent transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-serif font-black mb-4">{service.title}</h3>
                            <p className="text-sm text-neutral-600 font-sans leading-relaxed mb-8">
                                {service.desc}
                            </p>
                            <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2 group-hover:text-accent transition-colors">
                                {service.cta} <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// --- Testimonial carousel (dark, creates visual break before CTA) ---
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
        <section className="bg-black py-24 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="flex items-center justify-center gap-8 md:gap-12">
                    <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20 flex-shrink-0">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center flex-1 min-w-0">
                        <div className="flex justify-center gap-1 mb-8">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-accent fill-accent" />)}
                        </div>
                        <p className="text-2xl md:text-3xl font-serif font-black italic text-white max-w-3xl mx-auto mb-8 leading-relaxed min-h-[180px] flex items-center justify-center">
                            "{review.quote}"
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                <span className="text-sm font-serif font-black text-white">{review.initials}</span>
                            </div>
                            <div className="text-left">
                                <span className="font-serif font-black text-white block text-sm">{review.name}</span>
                                <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{review.detail}</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 mt-8">
                            {reviews.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'}`} />
                            ))}
                        </div>
                    </div>
                    <button onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))} disabled={idx === reviews.length - 1} className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20 flex-shrink-0">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- Bottom CTA with photo background (matching homepage & contact) ---
const ServicesCTA = () => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="/services/cta.png" 
                alt="Luxury home Orange County" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-black text-white tracking-tight mb-6">
                READY TO <br/> GET STARTED?
            </h2>
            <p className="text-neutral-400 font-sans text-lg max-w-2xl mx-auto mb-10">
                Get your free home equity report or schedule a buyer consultation today. No obligation, no pressure — just honest help from Regina and the Cuervo Homes team.
            </p>
            <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Contact Regina Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-6">
                Regina Cuervo, REALTOR® · Cal DRE #02144970 · WE'RE Real Estate Inc
            </p>
        </div>
    </section>
);
