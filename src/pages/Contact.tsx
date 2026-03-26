import { useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Clock, Star, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import SEO from "../hooks/useSEO";

// --- Shared animation helpers (same vocabulary as Home.tsx) ---
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease, delay },
});


const INTENT_CONTENT = {
    contact: {
        eyebrow: "Get In Touch",
        heading: "LET'S START THE\nCONVERSATION",
        description: "Whether you're ready to make a move or just exploring your options, we're here to help. Reach out and let's talk about your real estate goals — no pressure, no obligation.",
        promises: [
            "Personalized Guidance — No Cookie-Cutter Advice",
            "Responsive & Available When You Need Us",
            "Free Consultation — No Obligation",
        ],
    },
    nexthome: {
        eyebrow: "Find Your Next Home",
        heading: "YOUR DREAM HOME\nIS OUT THERE",
        description: "Whether it's your first home or your forever home, we'll guide you to the right property with expert local knowledge, off-market opportunities, and personalized attention every step of the way.",
        promises: [
            "Access to Off-Market & Coming-Soon Listings",
            "Expert Negotiation to Get the Best Price",
            "Guided Support From Search to Close",
        ],
    },
    homeworth: {
        eyebrow: "Free Home Valuation",
        heading: "WHAT IS YOUR HOME\nREALLY WORTH?",
        description: "Online estimates can miss the mark by tens of thousands of dollars. Receive a personalized home value report prepared by a local expert—factoring in your home's unique upgrades, condition, and the latest market activity.",
        promises: [
            "100% Complimentary — No Obligation",
            "Confidential Home Value & Strategy Review",
            "Delivered Within 24 Hours",
        ],
    },
} as const;

type Intent = keyof typeof INTENT_CONTENT;

export default function Contact() {
    const [searchParams] = useSearchParams();
    const intent = useMemo<Intent>(() => {
        const raw = searchParams.get("intent");
        if (raw === "nexthome" || raw === "homeworth") return raw;
        return "contact";
    }, [searchParams]);
    const content = INTENT_CONTENT[intent];

    const reviews = [
        { quote: "Regina did an excellent job of guiding us through this tough market. As first time homebuyers, we did not know what to expect. Regina was with us every step of the way and constantly in communication with us. She was the perfect agent for us.", name: "Kathy C.", detail: "First-Time Buyer · Santa Ana, CA", initials: "KC" },
        { quote: "Regina was absolutely incredible throughout our first buying process. She was knowledgeable, responsive, and truly had our best interests at heart every step of the way. She made what could have been overwhelming feel manageable and exciting.", name: "Mara Paredes", detail: "First-Time Buyer · Orange, CA", initials: "MP" },
        { quote: "As a first time home buyer the process can be scary and intimidating. Regina has a wonderful way of validating your concerns, calming your nerves, and actively listening to your needs. Her communication is on point and you are never left wondering.", name: "Adrienne R.", detail: "First-Time Buyer · Lakewood, CA", initials: "AR" },
        { quote: "Regina did an amazing job helping us buy our first home. She was extremely knowledgeable, approachable, friendly and informative. She walked us through every step of the way with sound advice and a positive attitude.", name: "Macy Q.", detail: "First-Time Buyer · Whittier, CA", initials: "MQ" },
        { quote: "Great service! She was very knowledgeable about the area I was looking into. She walked me through the process and responded on a timely matter. When it came to make an offer I was very confident on her negotiating skills.", name: "Jeannette", detail: "Buyer · Santa Ana, CA", initials: "JN" },
    ];
    const [idx, setIdx] = useState(0);
    const review = reviews[idx];

    // ---- Form state ----
    const [form, setForm] = useState({
        fullName: "", phone: "", email: "", address: "", service: "", timeline: "",
        website: "", fax: "", company_url: "", _ts: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const tsRef = useRef(Date.now());

    const formatPhone = (raw: string) => {
        const d = raw.replace(/\D/g, "").slice(0, 10);
        if (d.length <= 3) return d;
        if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
        return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    };

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const val = field === "phone" ? formatPhone(e.target.value) : e.target.value;
        setForm(f => ({ ...f, [field]: val }));
        if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n; });
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
        const digits = form.phone.replace(/\D/g, "");
        if (digits.length < 10) e.phone = "Please enter a valid phone number.";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email.";
        if (!form.service) e.service = "Please select a service.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: form.fullName.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim(),
                    address: form.address.trim(),
                    service: form.service,
                    timeline: form.timeline,
                    website: form.website,
                    fax: form.fax,
                    company_url: form.company_url,
                    _ts: String(tsRef.current),
                }),
            });
            const data = await res.json();
            if (!res.ok && data?.error) {
                setApiError(data.error);
            } else {
                setSubmitted(true);
            }
        } catch {
            setApiError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-black w-full min-h-screen text-white overflow-x-hidden selection:bg-accent selection:text-white">
            <SEO
                title="Contact Regina Cuervo — Free Home Valuation Orange County"
                description="Contact Regina Cuervo, top-rated Orange County REALTOR®. Get your free home valuation, schedule a buyer consultation, or start your home search. Call (714) 319-5966. No obligation. English & Spanish."
                path="/contact"
            />

            {/* Split Layout: Info panel + Form */}
            <section id="form" className="flex flex-col md:flex-row min-h-screen">

                {/* Left: Value prop + headshot + promises */}
                <div className="w-full md:w-[45%] lg:w-[42%] bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-center p-5 pt-24 md:p-12 lg:p-16">

                    <motion.span
                        key={`eyebrow-${intent}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.2 }}
                        className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-4"
                    >
                        {content.eyebrow}
                    </motion.span>
                    <motion.h2
                        key={`heading-${intent}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.3 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-[1.1] mb-5 md:mb-6"
                    >
                        {content.heading.split("\n").map((line, i, arr) => (
                            <span key={i}>{line}{i < arr.length - 1 && <br className="hidden md:block" />}</span>
                        ))}
                    </motion.h2>

                    {/* Agent card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.4 }}
                        className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/[0.08]"
                    >
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
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.5 }}
                        className="text-[13px] md:text-[14px] text-neutral-400 font-sans leading-relaxed mb-6 md:mb-8"
                    >
                        {content.description}
                    </motion.p>

                    {/* Promises */}
                    <div className="space-y-4 mb-8">
                        {content.promises.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                                <span className="text-sm text-white font-bold font-sans">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="border-t border-white/[0.06] pt-6 space-y-4"
                    >
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
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="text-[9px] text-neutral-600 uppercase tracking-[0.15em] mt-6"
                    >
                        Cal DRE #02144970 · English & Spanish
                    </motion.p>
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
                        <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="w-full max-w-xl text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, ease, delay: 0.2 }}
                                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
                                >
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.3 }}
                                    className="text-2xl md:text-3xl font-serif font-black text-white tracking-tight mb-4"
                                >
                                    YOU'RE ALL SET!
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.4 }}
                                    className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed mb-2 max-w-md mx-auto"
                                >
                                    Thank you, <strong className="text-white">{form.fullName.split(" ")[0]}</strong>! Regina will personally review your request and reach out within <strong className="text-white">24 hours</strong>.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.5 }}
                                    className="text-sm text-neutral-400 font-sans mb-8"
                                >
                                    A confirmation email has been sent to <strong className="text-neutral-200">{form.email}</strong>.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-3 justify-center"
                                >
                                    <a
                                        href="tel:7143195966"
                                        className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 text-xs font-black tracking-[0.15em] uppercase hover:bg-neutral-200 transition-all"
                                    >
                                        <Phone className="w-3.5 h-3.5" /> Call Regina Now
                                    </a>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ fullName: "", phone: "", email: "", address: "", service: "", timeline: "", website: "", fax: "", company_url: "", _ts: "" }); tsRef.current = Date.now(); }}
                                        className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-all"
                                    >
                                        Submit Another Request
                                    </button>
                                </motion.div>
                            </motion.div>
                        ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease, delay: 0.3 }}
                            className="w-full max-w-xl"
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-2">Get Started</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-black text-white tracking-tight mb-8">
                                REQUEST YOUR FREE REPORT
                            </h3>

                            {apiError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-sans px-4 py-3 mb-6"
                                >
                                    {apiError}
                                </motion.div>
                            )}

                            <form ref={formRef} className="space-y-5" autoComplete="off" onSubmit={handleSubmit} noValidate>
                                {/* Honeypot fields */}
                                <div className="absolute -left-[9999px]" aria-hidden="true">
                                    <input type="text" name="website" tabIndex={-1} value={form.website} onChange={set("website")} />
                                    <input type="text" name="fax" tabIndex={-1} value={form.fax} onChange={set("fax")} />
                                    <input type="text" name="company_url" tabIndex={-1} value={form.company_url} onChange={set("company_url")} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Full Name *</label>
                                        <input
                                            type="text"
                                            value={form.fullName}
                                            onChange={set("fullName")}
                                            className={`w-full bg-black/60 border ${errors.fullName ? 'border-red-500/60' : 'border-white/15'} p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600`}
                                            placeholder="John Doe"
                                        />
                                        {errors.fullName && <p className="text-red-400 text-[11px] font-sans">{errors.fullName}</p>}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.55 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={set("phone")}
                                            className={`w-full bg-black/60 border ${errors.phone ? 'border-red-500/60' : 'border-white/15'} p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600`}
                                            placeholder="(714) 555-0198"
                                        />
                                        {errors.phone ? (
                                            <p className="text-red-400 text-[11px] font-sans">{errors.phone}</p>
                                        ) : form.phone && form.phone.replace(/\D/g, "").length < 10 ? (
                                            <p className="text-neutral-500 text-[11px] font-sans">{form.phone.replace(/\D/g, "").length}/10 digits</p>
                                        ) : form.phone && form.phone.replace(/\D/g, "").length === 10 ? (
                                            <p className="text-green-400/70 text-[11px] font-sans flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Valid number</p>
                                        ) : null}
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Email Address *</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={set("email")}
                                        className={`w-full bg-black/60 border ${errors.email ? 'border-red-500/60' : 'border-white/15'} p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600`}
                                        placeholder="john@email.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-[11px] font-sans">{errors.email}</p>}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.65 }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Property Address</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={set("address")}
                                        className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all placeholder:text-neutral-600"
                                        placeholder="123 Main St, Newport Beach, CA"
                                    />
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.7 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">I'm Interested In... *</label>
                                        <select
                                            value={form.service}
                                            onChange={set("service")}
                                            className={`w-full bg-black/60 border ${errors.service ? 'border-red-500/60' : 'border-white/15'} p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Choose one...</option>
                                            <option value="selling">Selling My Home</option>
                                            <option value="buying">Buying A Home</option>
                                            <option value="equity">Free Home Equity Report</option>
                                            <option value="investing">Investment Properties</option>
                                            <option value="relocating">Relocating to Orange County</option>
                                            <option value="first-time">First-Time Home Buyer</option>
                                        </select>
                                        {errors.service && <p className="text-red-400 text-[11px] font-sans">{errors.service}</p>}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.75 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">Timeline</label>
                                        <select
                                            value={form.timeline}
                                            onChange={set("timeline")}
                                            className="w-full bg-black/60 border border-white/15 p-4 text-white font-sans text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>When are you looking?</option>
                                            <option value="asap">As Soon As Possible</option>
                                            <option value="1-3">1 - 3 Months</option>
                                            <option value="3-6">3 - 6 Months</option>
                                            <option value="6-12">6 - 12 Months</option>
                                            <option value="exploring">Just Exploring</option>
                                        </select>
                                    </motion.div>
                                </div>

                                <motion.button
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.85 }}
                                    type="submit"
                                    disabled={submitting}
                                    className="group w-full flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm font-black tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Get My Free Report
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* SMS/TCPA Compliance Disclaimer */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="text-[9px] text-neutral-500 font-sans leading-relaxed mt-5"
                            >
                                By submitting this form, you consent to receive calls, text messages (including via automated technology), and emails from Cuervo Homes / WE'RE Real Estate Inc at the phone number and email provided, including for marketing purposes. You understand that consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. You may opt out at any time by replying STOP. View our{" "}
                                <span className="underline cursor-pointer hover:text-white transition-colors">Privacy Policy</span> and{" "}
                                <span className="underline cursor-pointer hover:text-white transition-colors">Terms of Service</span>.
                            </motion.p>
                        </motion.div>
                        )}
                        </AnimatePresence>
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
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.1)}
                                className="text-center"
                            >
                                <span className="block text-2xl md:text-3xl font-serif font-black text-white leading-none">{stat.number}</span>
                                <span className="block text-[8px] tracking-[0.2em] font-bold text-accent uppercase mt-1.5">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-black py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <motion.span {...fadeUp()} className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block text-center mb-8">Client Reviews</motion.span>

                    <motion.div {...fadeUp(0.1)} className="flex justify-center gap-1 mb-6">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease }}
                            className="text-xl md:text-2xl font-serif font-black italic text-white text-center max-w-3xl mx-auto mb-8 leading-relaxed min-h-[120px] flex items-center justify-center"
                        >
                            "{review.quote}"
                        </motion.p>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center gap-3 mb-8"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                                <span className="text-[11px] font-serif font-black text-white">{review.initials}</span>
                            </div>
                            <div className="text-left">
                                <span className="font-serif font-black text-white block text-sm">{review.name}</span>
                                <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{review.detail}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

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
