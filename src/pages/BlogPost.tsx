import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Calendar, Clock, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import { trackPhoneClick } from "../lib/analytics";
import NotFound from "./NotFound";
import { getPost, getRelatedPosts, formatDate, type BlogPost as Post } from "@/lib/blog";

/**
 * Single article view.
 *
 * The article body is plain, fully-visible HTML — no scroll-reveal animations
 * wrapping text. That keeps the prerendered markup directly extractable by
 * answer engines (ChatGPT, Perplexity, Claude, AI Overviews), which is the
 * entire point of this page existing.
 */
export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const post = getPost(slug);

    if (!post) return <NotFound />;

    const related = getRelatedPosts(post.slug);

    return (
        <div className="bg-white w-full min-h-screen overflow-x-hidden selection:bg-accent selection:text-black">
            <SEO
                title={post.title}
                description={post.description}
                path={`/blog/${post.slug}`}
                type="article"
                image={post.image}
                imageAlt={post.imageAlt}
                datePublished={post.datePublished}
                dateModified={post.dateModified}
                articleSection={post.category}
                keywords={post.tags}
                faqs={post.faqs}
                breadcrumbs={[
                    { name: "Blog", path: "/blog" },
                    { name: post.title, path: `/blog/${post.slug}` },
                ]}
            />

            <ArticleHero post={post} />
            <ArticleBody post={post} />
            <AuthorBio />
            {related.length > 0 && <RelatedPosts posts={related} />}
            <ArticleCTA />
        </div>
    );
}

const ArticleHero = ({ post }: { post: Post }) => (
    <section className="bg-black text-white">
        <div className="h-20 md:h-[72px]" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8 md:pt-14 pb-10 md:pb-14">
            {/* Visible breadcrumb trail, mirrored by BreadcrumbList schema. */}
            <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                    <li>
                        <Link to="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link to="/blog" className="hover:text-white transition-colors">
                            Blog
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-accent truncate max-w-[12rem] md:max-w-none">{post.category}</li>
                </ol>
            </nav>

            <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-5">
                {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.05] mb-7">
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-white/[0.08] text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                <span className="flex items-center gap-2 text-white">
                    <img
                        src="/c_homes/team/regina-cuervo.jpg"
                        alt="Regina Cuervo, REALTOR®"
                        width={900}
                        height={900}
                        className="w-7 h-7 rounded-full object-cover border border-white/20"
                    />
                    Regina Cuervo, REALTOR®
                </span>
                <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                </span>
            </div>
        </div>

        {post.image && (
            <div className="relative w-full h-[32vh] md:h-[46vh] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        )}
    </section>
);

const ArticleBody = ({ post }: { post: Post }) => (
    <article className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Snippet-target answer block: the ~55-word direct answer engines lift. */}
        {post.answer && (
            <div className="border-l-4 border-accent bg-neutral-50 p-6 md:p-8 mb-12">
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-3">
                    The Short Answer
                </span>
                <p className="text-[15px] md:text-lg font-sans font-medium text-black leading-[1.65]">
                    {post.answer}
                </p>
            </div>
        )}

        {post.toc.length > 2 && (
            <nav aria-label="Table of contents" className="mb-12 border border-neutral-200">
                <span className="block text-[9px] font-bold tracking-[0.25em] uppercase text-white bg-black px-5 py-3">
                    What This Guide Covers
                </span>
                <ol className="p-5 md:p-6 space-y-2.5">
                    {post.toc.map((item, i) => (
                        <li key={item.id} className="flex gap-3 items-baseline">
                            <span className="text-accent font-serif font-black text-[10px] flex-shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <a
                                href={`#${item.id}`}
                                className="text-[13px] md:text-sm font-sans font-medium text-neutral-600 hover:text-black transition-colors"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>
        )}

        {/* Markdown is authored in-repo and rendered at build time — not user input. */}
        <div className="prose-cuervo" dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.tags.length > 0 && (
            <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[9px] font-bold tracking-[0.15em] uppercase text-neutral-500 border border-neutral-200 px-3 py-1.5"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        )}
    </article>
);

/** E-E-A-T signal: a named, credentialed, verifiable human behind the analysis. */
const AuthorBio = () => (
    <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                <img
                    src="/c_homes/team/regina-cuervo.jpg"
                    alt="Regina Cuervo, Orange County REALTOR®"
                    width={900}
                    height={900}
                    loading="lazy"
                    className="w-24 h-24 md:w-32 md:h-32 object-cover flex-shrink-0 border border-neutral-200"
                />
                <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-400 block mb-3">
                        About the Author
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-black text-black tracking-tight mb-3">
                        Regina Cuervo, REALTOR®
                    </h2>
                    <p className="text-[13px] md:text-sm text-neutral-600 font-sans leading-relaxed mb-5">
                        Regina is a bilingual Orange County REALTOR® and founder of Cuervo Homes Group,
                        brokered by Nest Real Estate, working
                        with buyers and sellers across Newport Beach, Costa Mesa, Irvine, Santa Ana, Orange,
                        Anaheim, and Huntington Beach. She writes these reports from live MLS activity and
                        published C.A.R. and Freddie Mac data — not national headlines that ignore how
                        differently Orange County behaves.
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-6">
                        <span>Cal DRE #02144970</span>
                        <span>English &amp; Español</span>
                        <span>Orange County, CA</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="tel:7143195966"
                            onClick={() => trackPhoneClick("blog-post-cta")}
                            className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5" /> (714) 319-5966
                        </a>
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-2 border border-neutral-300 px-6 py-3 text-[10px] font-black tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors"
                        >
                            Ask Regina a Question
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const RelatedPosts = ({ posts: items }: { posts: Post[] }) => (
    <section className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-3">
                        Keep Reading
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-black tracking-tight">
                        RELATED GUIDES
                    </h2>
                </div>
                <Link
                    to="/blog"
                    className="hidden md:inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-black group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    All Articles
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
                {items.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group bg-white p-6 md:p-8 hover:bg-neutral-50 transition-colors"
                    >
                        <span className="text-[9px] tracking-[0.25em] font-bold uppercase text-neutral-400 block mb-3">
                            {post.category}
                        </span>
                        <h3 className="text-base md:text-lg font-serif font-black text-black tracking-tight leading-[1.25] mb-3 group-hover:text-neutral-600 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-[12px] text-neutral-500 font-sans leading-relaxed mb-5">
                            {post.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-black">
                            Read
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </section>
);

const ArticleCTA = () => (
    <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase block mb-4">
                No Pressure · No Obligation
            </span>
            <h2 className="text-2xl md:text-5xl font-serif font-black tracking-tight mb-5">
                QUESTIONS ABOUT
                <br />
                YOUR SITUATION?
            </h2>
            <p className="text-neutral-400 font-sans text-[14px] md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                Market averages are a starting point, not an answer. Tell Regina what you&apos;re weighing —
                buying, selling, or just timing it right — and get a straight read on your specific
                situation.
            </p>
            <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 md:py-5 text-xs md:text-sm font-black tracking-widest uppercase hover:bg-accent transition-all duration-300 w-full sm:w-auto"
            >
                Talk to Regina
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[9px] md:text-[10px] text-neutral-600 uppercase tracking-widest mt-6">
                Regina Cuervo, REALTOR® · Cal DRE #02144970 · Nest Real Estate
            </p>
        </div>
    </section>
);
