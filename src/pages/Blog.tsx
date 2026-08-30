import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import SEO, { SITE_URL } from "../hooks/useSEO";
import { posts, formatDate, type BlogPost } from "@/lib/blog";
import { Helmet } from "react-helmet-async";

/**
 * Blog hub.
 *
 * Text content here is intentionally rendered without opacity-0 reveal
 * animations so the prerendered HTML is immediately readable by crawlers and
 * answer engines that never run JavaScript.
 */
export default function Blog() {
    const [featured, ...rest] = posts;

    return (
        <div className="bg-white w-full min-h-screen overflow-x-hidden selection:bg-accent selection:text-black">
            <SEO
                title="Orange County Real Estate Market Updates & Buyer/Seller Guides"
                description="Monthly Orange County housing market reports, home value guidance, and buyer and seller guides from REALTOR® Regina Cuervo — built on current C.A.R., Freddie Mac, and local MLS data."
                path="/blog"
                breadcrumbs={[{ name: "Blog", path: "/blog" }]}
            />

            {/* ItemList schema helps answer engines reason about the collection. */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "@id": `${SITE_URL}/blog#blog`,
                        name: "Cuervo Homes Group — Orange County Real Estate Insights",
                        description:
                            "Data-driven Orange County housing market reports and home buying and selling guides.",
                        url: `${SITE_URL}/blog`,
                        inLanguage: "en-US",
                        publisher: { "@id": `${SITE_URL}/#real-estate-agent` },
                        blogPost: posts.map((post) => ({
                            "@type": "BlogPosting",
                            "@id": `${SITE_URL}/blog/${post.slug}#article`,
                            headline: post.title,
                            description: post.description,
                            url: `${SITE_URL}/blog/${post.slug}`,
                            datePublished: post.datePublished,
                            dateModified: post.dateModified,
                            author: { "@id": `${SITE_URL}/#regina-cuervo` },
                        })),
                    })}
                </script>
            </Helmet>

            <BlogHero />
            {featured && <FeaturedPost post={featured} />}
            <PostGrid posts={rest} />
            <BlogCTA />
        </div>
    );
}

const BlogHero = () => (
    <section className="bg-black text-white">
        <div className="h-20 md:h-[72px]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-20 pb-12 md:pb-20">
            <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-5">
                Orange County Market Intelligence
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.02] mb-6 max-w-4xl">
                REAL NUMBERS.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                    NO GUESSWORK.
                </span>
            </h1>
            <div className="w-10 h-[2px] bg-accent mb-6" />
            <p className="text-[14px] md:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl">
                Straight answers about the Orange County housing market — what homes are actually selling
                for, what buyers are really paying, and what it means for your next move. Every figure is
                sourced and dated. Written by Regina Cuervo, REALTOR® · Cal DRE #02144970.
            </p>

            <div className="mt-10 md:mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-xl">
                {[
                    { number: String(posts.length), label: "Guides Published" },
                    { number: "11", label: "Cities Covered" },
                    { number: "Monthly", label: "Data Refresh" },
                ].map((stat) => (
                    <div key={stat.label}>
                        <span className="block text-xl md:text-3xl font-serif font-black tracking-tight leading-none">
                            {stat.number}
                        </span>
                        <span className="block text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-neutral-500 uppercase mt-2">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FeaturedPost = ({ post }: { post: BlogPost }) => (
    <section className="border-b border-neutral-200">
        <Link to={`/blog/${post.slug}`} className="group flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative h-[40vh] md:h-auto md:min-h-[28rem] overflow-hidden bg-neutral-100">
                <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="absolute top-5 left-5 bg-accent text-black text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">
                    Latest Report
                </span>
            </div>

            <div className="w-full md:w-1/2 bg-white flex items-center p-6 py-10 md:p-16 lg:p-20 border-t md:border-t-0 md:border-l border-neutral-200">
                <div className="max-w-lg">
                    <span className="text-[9px] tracking-[0.25em] font-bold uppercase text-neutral-400 block mb-4">
                        {post.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-black text-black tracking-tight leading-[1.1] mb-5 group-hover:text-neutral-600 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-[14px] text-neutral-500 font-sans leading-relaxed mb-6">
                        {post.description}
                    </p>
                    <PostMeta post={post} />
                    <span className="mt-7 inline-flex items-center gap-3 text-[11px] font-black tracking-widest uppercase text-black">
                        Read the Report
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    </section>
);

const PostGrid = ({ posts: items }: { posts: BlogPost[] }) => {
    if (!items.length) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
            <div className="flex items-end justify-between mb-10 md:mb-14">
                <div>
                    <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-3">
                        The Archive
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-black text-black tracking-tight">
                        MORE GUIDES &amp; REPORTS
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
                {items.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group bg-white flex flex-col hover:bg-neutral-50 transition-colors duration-300"
                    >
                        <div className="relative h-52 overflow-hidden bg-neutral-100">
                            <img
                                src={post.image}
                                alt={post.imageAlt}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                            />
                        </div>

                        <div className="p-6 md:p-8 flex flex-col flex-1">
                            <span className="text-[9px] tracking-[0.25em] font-bold uppercase text-neutral-400 block mb-3">
                                {post.category}
                            </span>
                            <h3 className="text-lg md:text-xl font-serif font-black text-black tracking-tight leading-[1.2] mb-3 group-hover:text-neutral-600 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-[13px] text-neutral-500 font-sans leading-relaxed mb-6 flex-1">
                                {post.description}
                            </p>
                            <PostMeta post={post} />
                        </div>
                    </Link>
                ))}

                {/* Closes out the grid so a partial final row never leaves a
                    bare cell, and adds a conversion path to the archive. */}
                <Link
                    to="/contact?intent=homeworth"
                    className="group bg-black text-white p-6 md:p-8 flex flex-col justify-between min-h-[18rem] hover:bg-neutral-900 transition-colors"
                >
                    <div>
                        <span className="text-accent text-[9px] tracking-[0.25em] font-bold uppercase block mb-4">
                            Free Report
                        </span>
                        <h3 className="text-lg md:text-xl font-serif font-black tracking-tight leading-[1.2] mb-3">
                            NOT SURE WHAT YOUR HOME IS WORTH?
                        </h3>
                        <p className="text-[13px] text-neutral-400 font-sans leading-relaxed">
                            Get a real valuation from Regina — based on homes she has actually walked
                            through, not an algorithm. Free, within 24 hours.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase mt-6">
                        Request Yours
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            </div>
        </section>
    );
};

const PostMeta = ({ post }: { post: BlogPost }) => (
    <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 text-[10px] font-bold tracking-widest uppercase text-neutral-400">
        <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
        </span>
        <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readingTime}
        </span>
    </div>
);

const BlogCTA = () => (
    <section className="bg-black text-white py-16 md:py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-4">
                Free for Orange County Homeowners
            </span>
            <h2 className="text-2xl md:text-5xl font-serif font-black tracking-tight mb-5">
                WHAT IS YOUR HOME
                <br />
                ACTUALLY WORTH?
            </h2>
            <p className="text-neutral-400 font-sans text-[14px] md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                Automated estimates miss upgrades, condition, and street-level differences that move Orange
                County values by six figures. Get a real valuation prepared by Regina — free, within 24
                hours, no obligation.
            </p>
            <Link
                to="/contact?intent=homeworth"
                className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 md:py-5 text-xs md:text-sm font-black tracking-widest uppercase hover:bg-accent transition-all duration-300 w-full sm:w-auto"
            >
                Get My Free Home Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    </section>
);
