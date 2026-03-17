import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            // Small delay so the target page renders before scrolling
            setTimeout(() => {
                const el = document.querySelector(location.hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Navigation */}
            <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50">
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: scrolled ? '10px' : '0px',
                        width: scrolled ? 'min(56rem, calc(100% - 2rem))' : '100%',
                        height: scrolled ? '52px' : '72px',
                        backgroundColor: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
                        borderRadius: scrolled ? '9999px' : '0px',
                        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
                        border: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                        backdropFilter: scrolled ? 'blur(24px)' : 'none',
                        transition: 'background-color 400ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 400ms cubic-bezier(0.22,1,0.36,1), border-color 400ms cubic-bezier(0.22,1,0.36,1), border-radius 700ms cubic-bezier(0.22,1,0.36,1), width 900ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1), top 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                />

                <div className={cn(
                    "relative z-10 flex items-center justify-between mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    scrolled
                        ? "max-w-3xl md:max-w-4xl px-6 h-[52px] mt-2.5"
                        : "max-w-none px-6 md:px-12 h-[72px]"
                )}>
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="cursor-pointer flex items-center gap-2.5"
                    >
                        <img
                            src="/c_homes/main_logo_full_logo_only_copy.png"
                            alt="Cuervo Homes Logo"
                            className={cn(
                                "object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                scrolled ? "h-5" : "h-7 md:h-8"
                            )}
                        />
                        <span className={cn(
                            "font-serif font-bold text-white tracking-widest uppercase transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            scrolled ? "text-xs" : "text-lg md:text-xl"
                        )}>
                            Cuervo Homes
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-white">
                        <Link to="/" className={cn("hover:text-neutral-300 transition-colors relative group", isActive("/") && "text-accent")}>
                            Home
                            <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300", isActive("/") ? "w-full bg-accent" : "w-0 group-hover:w-full")} />
                        </Link>
                        <Link to="/services" className={cn("hover:text-neutral-300 transition-colors relative group", isActive("/services") && "text-accent")}>
                            Services
                            <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300", isActive("/services") ? "w-full bg-accent" : "w-0 group-hover:w-full")} />
                        </Link>
                        <Link
                            to="/contact"
                            className={cn(
                                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                scrolled
                                    ? "px-5 py-1.5 border border-white/30 text-white hover:bg-white hover:text-black rounded-full text-[10px]"
                                    : "px-5 py-2 border border-white bg-white text-black hover:bg-transparent hover:text-white"
                            )}
                        >
                            Contact
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden uppercase text-xs tracking-widest font-bold text-white"
                    >
                        Menu
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-black text-white flex flex-col overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-white/[0.08]">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                                <img src="/c_homes/main_logo_full_logo_only_copy.png" alt="Cuervo Homes" className="h-5 object-contain" />
                                <span className="text-sm font-serif font-bold tracking-widest uppercase">Cuervo Homes</span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Main Nav Links */}
                        <div className="p-5 border-b border-white/[0.08]">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Services", path: "/services" },
                                { name: "Contact", path: "/contact" },
                            ].map((route, i) => (
                                <motion.div
                                    key={route.name}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.06 }}
                                >
                                    <Link
                                        to={route.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between py-3.5 text-2xl font-serif font-black tracking-tight transition-colors",
                                            isActive(route.path) ? "text-accent" : "text-white hover:text-neutral-300"
                                        )}
                                    >
                                        {route.name}
                                        <ArrowRight className="w-4 h-4 text-neutral-600" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Links */}
                        <div className="p-5 border-b border-white/[0.08]">
                            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-3">Quick Links</span>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                                {[
                                    { name: "Sell Your Home", path: "/services#sell" },
                                    { name: "Buy a Home", path: "/services#buy" },
                                    { name: "Free Home Report", path: "/contact" },
                                    { name: "Our Process", path: "/services#process" },
                                    { name: "Reviews", path: "/services#reviews" },
                                    { name: "FAQ", path: "/services#faq" },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-[13px] font-sans font-medium text-neutral-400 hover:text-white transition-colors py-1"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="p-5 border-b border-white/[0.08] space-y-3">
                            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-3">Get in Touch</span>
                            <a href="tel:7143195966" className="flex items-center gap-3 text-sm font-sans font-medium text-white">
                                <Phone className="w-3.5 h-3.5 text-accent" /> (714) 319-5966
                            </a>
                            <a href="mailto:info@cuervohomes.com" className="flex items-center gap-3 text-sm font-sans text-neutral-400">
                                <Mail className="w-3.5 h-3.5 text-accent" /> info@cuervohomes.com
                            </a>
                            <span className="flex items-center gap-3 text-sm font-sans text-neutral-500">
                                <MapPin className="w-3.5 h-3.5 text-accent" /> Orange County, CA
                            </span>
                        </div>

                        {/* Bottom CTA */}
                        <div className="p-5 mt-auto">
                            <Link
                                to="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="group flex items-center justify-center gap-3 w-full bg-white text-black py-4 text-xs font-black tracking-widest uppercase"
                            >
                                Get Free Home Report
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="text-[8px] text-neutral-600 uppercase tracking-[0.15em] text-center mt-3">
                                Regina Cuervo, REALTOR® · Cal DRE #02144970
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Mobile CTA Bar */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled && !mobileMenuOpen ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
                    <Link
                        to="/contact"
                        className="flex items-center justify-between w-full group"
                    >
                        <div>
                            <span className="block text-[8px] font-bold tracking-[0.25em] text-accent uppercase mb-0.5">Free for Homeowners</span>
                            <span className="block text-white text-[14px] font-serif font-black tracking-tight">Get Your Home Equity Report</span>
                        </div>
                        <div className="bg-white text-black w-10 h-10 flex items-center justify-center flex-shrink-0 group-active:scale-95 transition-transform">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </div>

            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-neutral-950 text-white border-t border-white/10 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10">
                        {/* Brand Column */}
                        <div className="p-6 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                            <div>
                                <img
                                    src="/c_homes/main_logo_full_logo_only_copy.png"
                                    alt="Cuervo Homes"
                                    className="h-14 md:h-20 object-contain mb-5"
                                />
                                <p className="text-neutral-400 text-[12px] md:text-[13px] leading-[1.8] font-medium mb-8 max-w-sm">
                                    Selling Homes with Strategy. Buying Homes with Confidence. Your trusted real estate advisor across Orange County.
                                </p>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white font-bold mb-1.5">Regina Cuervo, REALTOR®</p>
                                <p className="text-[10px] text-neutral-500 font-medium">Cal DRE #02144970</p>
                                <p className="text-[10px] text-neutral-500 font-medium tracking-wide">WE'RE Real Estate Inc</p>
                                <p className="text-[10px] text-neutral-500 font-medium mt-1.5 flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-neutral-600" /> English & Spanish
                                </p>
                            </div>
                        </div>

                        {/* Navigation + Services */}
                        <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6 flex items-center gap-3">
                                <span className="w-4 h-[1px] bg-neutral-700" /> Pages
                            </h4>
                            <ul className="space-y-3.5 text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-8">
                                <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />Home</Link></li>
                                <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />Services</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />Contact</Link></li>
                            </ul>

                            <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-5 flex items-center gap-3">
                                <span className="w-4 h-[1px] bg-neutral-700" /> Services
                            </h4>
                            <ul className="space-y-3 text-[11px] font-medium tracking-wide text-neutral-400">
                                <li><Link to="/services#sell" className="hover:text-white transition-colors">Sell Your Home</Link></li>
                                <li><Link to="/services#buy" className="hover:text-white transition-colors">Buy a Home</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Free Home Equity Report</Link></li>
                                <li><Link to="/services#more" className="hover:text-white transition-colors">Investment Properties</Link></li>
                                <li><Link to="/services#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Areas */}
                        <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6 flex items-center gap-3">
                                <span className="w-4 h-[1px] bg-neutral-700" /> Areas We Serve
                            </h4>
                            <ul className="space-y-3 text-[11px] font-medium tracking-wide text-neutral-400">
                                {[
                                    "Orange County",
                                    "Newport Beach",
                                    "Costa Mesa",
                                    "Corona Del Mar",
                                    "Huntington Beach",
                                    "North Tustin",
                                    "Santa Ana",
                                    "Orange",
                                    "Anaheim",
                                    "Irvine",
                                    "Laguna Beach",
                                ].map((area) => (
                                    <li key={area}><span className="cursor-default hover:text-white transition-colors">{area}</span></li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="p-6 md:p-12 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6 flex items-center gap-3">
                                    <span className="w-4 h-[1px] bg-neutral-700" /> Contact
                                </h4>
                                <div className="space-y-3 mb-6">
                                    <a href="tel:7143195966" className="flex items-center gap-3 text-base font-serif font-bold hover:text-accent transition-colors">
                                        <Phone className="w-3.5 h-3.5 text-accent" /> (714) 319-5966
                                    </a>
                                    <a href="mailto:info@cuervohomes.com" className="flex items-center gap-3 text-sm font-sans text-neutral-400 hover:text-white transition-colors">
                                        <Mail className="w-3.5 h-3.5 text-accent" /> info@cuervohomes.com
                                    </a>
                                    <span className="flex items-center gap-3 text-sm font-sans text-neutral-500">
                                        <MapPin className="w-3.5 h-3.5 text-accent" /> Orange County, CA
                                    </span>
                                </div>

                                <div className="pt-5 border-t border-white/[0.08]">
                                    <p className="text-[11px] text-neutral-500 font-medium leading-[1.8]">
                                        <span className="text-white block mb-1 text-[10px] font-bold uppercase tracking-widest">Hours</span>
                                        8:00 AM – 8:00 PM<br />
                                        <span className="italic">(After hours available)</span>
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="group flex items-center justify-center gap-2 w-full py-3.5 mt-8 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Get Free Report <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div className="w-full flex items-center justify-center pt-16 pb-10 px-6 md:px-0 select-none pointer-events-none overflow-hidden">
                        <span className="text-[11vw] md:text-[11.5vw] xl:text-[200px] font-serif font-black tracking-tighter leading-none text-white/5 whitespace-nowrap">
                            CUERVO HOMES
                        </span>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 p-6 md:px-12 md:py-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-black/50">
                        <p className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-bold">
                            © 2026 Cuervo Homes. All Rights Reserved.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="https://quicklaunchweb.us"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-bold hover:text-white transition-colors flex items-center gap-2"
                            >
                                Website by <span className="text-white">QuickLaunchWeb</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
