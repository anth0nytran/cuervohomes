import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);



    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Navigation - Fixed & Dynamic */}
            <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50">
                {/* Background pill — fades in on scroll */}
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

                {/* Nav content — always on top, consistent layout */}
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
                        <Link
                            to="/"
                            className="hover:text-neutral-300 transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                        <Link
                            to="/services"
                            className="hover:text-neutral-300 transition-colors relative group"
                        >
                            Services
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-black text-white flex flex-col p-6 md:p-12"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-xl font-serif font-bold">Cuervo Homes</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                <X className="w-8 h-8 text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 items-start">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Services', path: '/services' },
                                { name: 'Contact', path: '/contact' }
                            ].map((route, i) => (
                                <motion.div
                                    key={route.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                >
                                    <Link
                                        to={route.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-4xl font-serif hover:text-neutral-400 transition-colors capitalize block"
                                    >
                                        {route.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Contact</p>
                            <a href="tel:7143195966" className="block text-xl font-serif mb-1">714.319.5966</a>
                            <a href="mailto:info@cuervohomes.com" className="block text-sm text-neutral-400">info@cuervohomes.com</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Mobile CTA Bar */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled && !mobileMenuOpen ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-black border-t border-white/10 px-5 py-4">
                    <Link
                        to="/contact"
                        className="flex items-center justify-between w-full group"
                    >
                        <div>
                            <span className="block text-[9px] font-bold tracking-[0.25em] text-accent uppercase mb-0.5">Limited — Free for homeowners</span>
                            <span className="block text-white text-[15px] font-serif font-black tracking-tight">How Much Is Your Home Worth?</span>
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

            <footer className="bg-neutral-950 text-white border-t border-white/10 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto">
                    {/* Top Row - Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10">
                        {/* Brand Column */}
                        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                            <div>
                                <img
                                    src="/c_homes/main_logo_full_logo_only_copy.png"
                                    alt="Cuervo Homes"
                                    className="h-16 md:h-20 object-contain mb-6"
                                />
                                <p className="text-neutral-400 text-[13px] leading-[1.8] font-medium mb-10 max-w-sm">
                                    Helping families buy and sell homes across all of Orange County. 33+ homes sold. 5.0★ rating. Your trust is everything to us.
                                </p>
                            </div>
                            
                            <div className="space-y-4 pt-8 border-t border-white/10">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-white font-bold mb-1.5">Regina Cuervo, REALTOR®</p>
                                    <p className="text-[10px] text-neutral-500 font-medium">Cal DRE #02144970</p>
                                    <p className="text-[10px] text-neutral-500 font-medium tracking-wide">WE'RE Real Estate Inc</p>
                                    <p className="text-[10px] text-neutral-500 font-medium mt-1.5 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-neutral-600" /> Speaks English & Spanish
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-8 flex items-center gap-3">
                                <span className="w-4 h-[1px] bg-neutral-700" /> Navigation
                            </h4>
                            <ul className="space-y-5 text-[11px] font-bold tracking-widest uppercase text-neutral-300">
                                <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />Home</Link></li>
                                <li><Link to="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />Services</Link></li>
                                <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />Contact</Link></li>
                            </ul>
                        </div>

                        {/* Areas */}
                        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-8 flex items-center gap-3">
                                <span className="w-4 h-[1px] bg-neutral-700" /> Key Areas
                            </h4>
                            <ul className="space-y-4 text-[11px] font-medium tracking-wide text-neutral-400">
                                <li><span className="cursor-default hover:text-white transition-colors">Orange County</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Newport Beach</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Costa Mesa</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Corona Del Mar</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Huntington Beach</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">North Tustin</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Santa Ana</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Orange</span></li>
                                <li><span className="cursor-default hover:text-white transition-colors">Anaheim</span></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-8 flex items-center gap-3">
                                    <span className="w-4 h-[1px] bg-neutral-700" /> Inquiries
                                </h4>
                                <div className="space-y-3">
                                    <a href="tel:7143195966" className="block text-xl font-serif font-medium hover:text-neutral-300 transition-colors">714.319.5966</a>
                                    <a href="mailto:info@cuervohomes.com" className="block text-sm font-sans tracking-wide text-neutral-400 hover:text-white transition-colors pb-6 border-b border-white/10 inline-block w-full">info@cuervohomes.com</a>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6">
                                <p className="text-[11px] text-neutral-500 font-medium leading-[1.8]">
                                    <span className="text-white block mb-1">Operating Hours</span>
                                    8:00 AM - 8:00 PM <br />
                                    <span className="italic">(After hours available)</span><br />
                                    Orange County, CA
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Massive Graphic Watermark */}
                    <div className="w-full flex items-center justify-center pt-16 pb-10 px-6 md:px-0 select-none pointer-events-none overflow-hidden">
                        <span className="text-[15vw] md:text-[11.5vw] xl:text-[200px] font-serif font-black tracking-tighter leading-none text-white/5 whitespace-nowrap">
                            CUERVO HOMES
                        </span>
                    </div>

                    {/* Bottom Utility Bar */}
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
