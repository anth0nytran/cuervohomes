import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight, Clock, Star, ShieldCheck, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function Contact() {
    const reviews = [
        { quote: "Regina did an excellent job of guiding us through this tough market. As first time homebuyers, we did not know what to expect. Regina was with us every step of the way and constantly in communication with us. She was the perfect agent for us.", name: "Kathy C.", detail: "First-Time Buyer · Santa Ana, CA", initials: "KC" },
        { quote: "Regina was absolutely incredible throughout our first buying process. She was knowledgeable, responsive, and truly had our best interests at heart every step of the way. She made what could have been overwhelming feel manageable and exciting.", name: "Mara Paredes", detail: "First-Time Buyer · Orange, CA", initials: "MP" },
        { quote: "As a first time home buyer the process can be scary and intimidating. Regina has a wonderful way of validating your concerns, calming your nerves, and actively listening to your needs. Her communication is on point and you are never left wondering.", name: "Adrienne R.", detail: "First-Time Buyer · Lakewood, CA", initials: "AR" },
        { quote: "Regina did an amazing job helping us buy our first home. She was extremely knowledgeable, approachable, friendly and informative. She walked us through every step of the way with sound advice and a positive attitude.", name: "Macy Q.", detail: "First-Time Buyer · Whittier, CA", initials: "MQ" },
        { quote: "Great service! She was very knowledgeable about the area I was looking into. She walked me through the process and responded on a timely matter. When it came to make an offer I was very confident on her negotiating skills.", name: "Jeannette", detail: "Buyer · Santa Ana, CA", initials: "JN" },
    ];
    const [idx, setIdx] = useState(0);
    const review = reviews[idx];
    return (
        <div className="bg-black w-full min-h-screen text-white overflow-x-hidden selection:bg-accent selection:text-white">

            {/* Full-screen Hero — matches homepage style */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/contact/hero.png" 
                        alt="Contact Cuervo Homes Orange County" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/90" />
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center mt-20">
                    <span className="inline-block py-1 px-3 border border-white/30 text-white/80 text-xs tracking-[0.2em] uppercase font-bold mb-6 bg-black/40 backdrop-blur-sm">
                        100% Free · Zero Obligation
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
                        GET YOUR FREE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">HOME EQUITY REPORT.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-lg">
                        Find out exactly what your home is worth right now. Fill out the form below and Regina will send your personalized report fast.
                    </p>
                    <div className="mt-10">
                        <a href="#form" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm md:text-base font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            Fill Out The Form Below
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Proof Strip — matches homepage */}
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

            {/* Split Layout: Form + Contact Info — cinematic style */}
            <section id="form" className="py-0 flex flex-col md:flex-row min-h-screen">
                
                {/* Left: Form on dark background */}
                <div className="w-full md:w-3/5 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#0a0a0a] relative">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
                    
                    <div className="w-full max-w-xl relative z-10">
                        <span className="inline-block text-accent text-xs tracking-[0.2em] font-bold uppercase mb-4">
                            Free Home Equity Report
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight mb-4 text-white leading-tight">
                            GET YOUR <br/> FREE REPORT
                        </h2>
                        <div className="w-12 h-1 bg-white mb-8" />
                        <p className="text-sm text-neutral-500 font-sans mb-10">
                            Fill out the form below. Regina will reach out within 24 hours with your custom equity report.
                        </p>

                        <form className="space-y-6" autoComplete="off">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Full Name *</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700" 
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        className="w-full bg-black border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700" 
                                        placeholder="(714) 555-0198"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Email Address *</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-black border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700" 
                                    placeholder="john@email.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Property Address</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-black border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700" 
                                    placeholder="123 Main St, Newport Beach, CA"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">I'm Interested In... *</label>
                                    <select className="w-full bg-black border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer" required>
                                        <option value="" disabled selected>Choose one...</option>
                                        <option value="selling">Selling My Home</option>
                                        <option value="buying">Buying A Home</option>
                                        <option value="equity">Free Home Equity Report</option>
                                        <option value="investing">Investment Properties</option>
                                        <option value="relocating">Relocating to Orange County</option>
                                        <option value="first-time">First-Time Home Buyer</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Timeline</label>
                                    <select className="w-full bg-black border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer">
                                        <option value="" disabled selected>When are you looking?</option>
                                        <option value="asap">As Soon As Possible</option>
                                        <option value="1-3">1 - 3 Months</option>
                                        <option value="3-6">3 - 6 Months</option>
                                        <option value="6-12">6 - 12 Months</option>
                                        <option value="exploring">Just Exploring</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="group w-full flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm font-black tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] mt-2"
                            >
                                Get My Free Report
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-center text-[10px] text-neutral-600 uppercase tracking-widest mt-4">
                                100% Free. Zero Obligation. Your info stays private.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right: Contact info over cinematic photo */}
                <div className="w-full md:w-2/5 relative overflow-hidden min-h-[60vh] md:min-h-0">
                    <img 
                        src="/contact/panel.png" 
                        alt="Luxury Home in Orange County"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/75" />
                    <div className="absolute inset-6 border border-white/20 hidden md:block pointer-events-none" />

                    <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-12 lg:p-16">
                        <div className="mb-12">
                            <ShieldCheck className="w-12 h-12 text-accent mb-6" strokeWidth={1} />
                            <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-4">Why Families Choose Regina</h3>
                            <ul className="space-y-3">
                                {[
                                    "Perfect 5.0★ rating — 17 verified reviews",
                                    "33+ homes sold across Orange County",
                                    "$1.2M average sale price",
                                    "Speaks English & Spanish",
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300 font-sans">
                                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="space-y-6 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-accent" />
                                <div>
                                    <span className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Call Direct</span>
                                    <a href="tel:7143195966" className="text-lg font-sans font-medium text-white hover:text-accent transition-colors">(714) 319-5966</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-accent" />
                                <div>
                                    <span className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Email</span>
                                    <a href="mailto:info@cuervohomes.com" className="text-lg font-sans font-medium text-white hover:text-accent transition-colors">info@cuervohomes.com</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Clock className="w-5 h-5 text-accent" />
                                <div>
                                    <span className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Hours</span>
                                    <span className="text-sm font-sans text-neutral-300">8:00 AM - 8:00 PM · After hours available</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-accent" />
                                <div>
                                    <span className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Serving</span>
                                    <span className="text-sm font-sans text-neutral-300">Newport Beach · Costa Mesa · Huntington Beach · Santa Ana · Irvine · Orange · North Tustin · Anaheim</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                                Regina Cuervo, REALTOR® · Cal DRE #02144970 · WE'RE Real Estate Inc
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Carousel — 1 at a time with arrows */}
            <section className="bg-white py-24 text-black">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-center gap-8 md:gap-12">
                        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-12 h-12 border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-20 flex-shrink-0">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="text-center flex-1 min-w-0">
                            <div className="flex justify-center gap-1 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-accent fill-accent" />)}
                            </div>
                            <p className="text-xl md:text-2xl font-serif font-black italic max-w-3xl mx-auto mb-6 leading-relaxed min-h-[140px] flex items-center justify-center">
                                "{review.quote}"
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                    <span className="text-xs font-serif font-black text-white">{review.initials}</span>
                                </div>
                                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
                                    {review.name} · {review.detail}
                                </span>
                            </div>
                            <div className="flex justify-center gap-2 mt-8">
                                {reviews.map((_, i) => (
                                    <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-black w-6' : 'bg-neutral-300 hover:bg-neutral-400'}`} />
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))} disabled={idx === reviews.length - 1} className="w-12 h-12 border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-20 flex-shrink-0">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-10 text-center">
                        <Link to="/" className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-neutral-800 transition-colors">
                            See Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
