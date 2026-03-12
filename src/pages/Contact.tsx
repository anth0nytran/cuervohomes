import { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight, Clock, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

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

            {/* Split Layout: Info panel + Form */}
            <section id="form" className="flex flex-col md:flex-row min-h-screen">

                {/* Left: Value prop + headshot + promises */}
                <div className="w-full md:w-[45%] lg:w-[42%] bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-center p-5 pt-24 md:p-12 lg:p-16">

                    <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-4">
                        Free Home Valuation
                    </span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-[1.1] mb-5 md:mb-6">
                        WHAT IS YOUR HOME <br className="hidden md:block" />REALLY WORTH?
                    </h2>

                    {/* Agent card */}
                    <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/[0.08]">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-2 ring-offset-[#0a0a0a] flex-shrink-0">
                            <img
                                src="/c_homes/headshot_copy.png"
                                alt="Regina Cuervo, REALTOR®"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-serif font-black text-white leading-tight">Regina Cuervo</h3>
                            <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Your Local Expert · Orange County Specialist</p>
                            <p className="text-[10px] text-neutral-500 font-sans mt-0.5 flex items-center gap-1.5">
                                WE'RE Real Estate <span className="text-white/30">|</span> 5.0<Star className="w-2.5 h-2.5 text-accent fill-accent inline" /> · 656 team reviews
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] md:text-[14px] text-neutral-400 font-sans leading-relaxed mb-6 md:mb-8">
                        Online estimates can miss the mark by tens of thousands of dollars. Receive a personalized home value report prepared by a local expert—factoring in your home's unique upgrades, condition, and the latest market activity.
                    </p>

                    {/* Promises */}
                    <div className="space-y-4 mb-8">
                        {[
                            "100% Complimentary — No Obligation",
                            "Confidential Home Value & Strategy Review",
                            "Delivered Within 24 Hours",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                                <span className="text-sm text-white font-bold font-sans">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Contact details — compact */}
                    <div className="border-t border-white/[0.06] pt-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                            <a href="tel:7143195966" className="text-sm font-sans font-medium text-white hover:text-accent transition-colors">(714) 319-5966</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                            <a href="mailto:info@cuervohomes.com" className="text-sm font-sans font-medium text-white hover:text-accent transition-colors">info@cuervohomes.com</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm font-sans text-neutral-400">8 AM – 8 PM · After hours available</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm font-sans text-neutral-400">Serving all of Orange County</span>
                        </div>
                    </div>

                    <p className="text-[9px] text-neutral-600 uppercase tracking-[0.15em] mt-6">
                        Cal DRE #02144970 · English & Spanish
                    </p>
                </div>

                {/* Right: Form over background image */}
                <div className="w-full md:w-[55%] lg:w-[58%] relative min-h-[80vh] md:min-h-0">
                    {/* Background image */}
                    <img
                        src="/contact/panel.png"
                        alt="Luxury Home in Orange County"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />

                    <div className="relative z-10 flex items-center justify-center h-full p-8 md:p-14 lg:p-20 pt-28 md:pt-14">
                        <div className="w-full max-w-xl">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-2">Get Started</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-black text-white tracking-tight mb-8">
                                REQUEST YOUR FREE REPORT
                            </h3>

                            <form className="space-y-5" autoComplete="off">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Full Name *</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Phone Number *</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600"
                                            placeholder="(714) 555-0198"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Email Address *</label>
                                    <input
                                        type="email"
                                        className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600"
                                        placeholder="john@email.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Property Address</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600"
                                        placeholder="123 Main St, Newport Beach, CA"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">I'm Interested In... *</label>
                                        <select className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer" required>
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
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Timeline</label>
                                        <select className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer">
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
                            </form>

                            {/* SMS/TCPA Compliance Disclaimer */}
                            <p className="text-[9px] text-neutral-500 font-sans leading-relaxed mt-5">
                                By submitting this form, you consent to receive calls, text messages (including via automated technology), and emails from Cuervo Homes / WE'RE Real Estate Inc at the phone number and email provided, including for marketing purposes. You understand that consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. You may opt out at any time by replying STOP. View our{" "}
                                <span className="underline cursor-pointer hover:text-white transition-colors">Privacy Policy</span> and{" "}
                                <span className="underline cursor-pointer hover:text-white transition-colors">Terms of Service</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <section className="bg-[#0a0a0a] py-10 border-y border-white/[0.06]">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: "1,312", label: "Team Sales" },
                            { number: "5.0", label: "Team Rating" },
                            { number: "$753K", label: "Avg. Sale Price" },
                            { number: "656", label: "Team Reviews" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-2xl md:text-3xl font-serif font-black text-white leading-none">{stat.number}</span>
                                <span className="block text-[8px] tracking-[0.2em] font-bold text-accent uppercase mt-1.5">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-black py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block text-center mb-8">Client Reviews</span>

                    <div className="flex justify-center gap-1 mb-6">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}
                    </div>

                    <p className="text-xl md:text-2xl font-serif font-black italic text-white text-center max-w-3xl mx-auto mb-8 leading-relaxed min-h-[120px] flex items-center justify-center">
                        "{review.quote}"
                    </p>

                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                            <span className="text-[11px] font-serif font-black text-white">{review.initials}</span>
                        </div>
                        <div className="text-left">
                            <span className="font-serif font-black text-white block text-sm">{review.name}</span>
                            <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{review.detail}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-10 h-10 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex gap-2">
                            {reviews.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'bg-accent w-8' : 'bg-white/20 w-4 hover:bg-white/40'}`} />
                            ))}
                        </div>
                        <button onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))} disabled={idx === reviews.length - 1} className="w-10 h-10 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
