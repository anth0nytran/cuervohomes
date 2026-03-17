import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEO from "../hooks/useSEO";

const ease = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
    return (
        <div className="bg-black w-full min-h-screen text-white flex items-center justify-center selection:bg-accent selection:text-white">
            <SEO
                title="Page Not Found"
                description="The page you're looking for doesn't exist. Return to Cuervo Homes for Orange County real estate services."
                path="/404"
            />
            <div className="text-center px-6 py-32">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-6"
                >
                    Page Not Found
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                    className="text-7xl md:text-9xl font-serif font-black tracking-tighter mb-6"
                >
                    404
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                    className="text-neutral-400 font-sans text-sm md:text-base max-w-md mx-auto mb-10"
                >
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.3 }}
                >
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-black tracking-widest uppercase hover:bg-neutral-200 transition-all"
                    >
                        Back to Home
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
