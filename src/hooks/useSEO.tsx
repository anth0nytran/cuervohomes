import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    path: string;
    type?: string;
}

const SITE_URL = "https://www.cuervohomes.com";
const OG_IMAGE = `${SITE_URL}/og/cuervo-og.jpg`;

export default function SEO({ title, description, path, type = "website" }: SEOProps) {
    const url = `${SITE_URL}${path}`;
    const fullTitle = path === "/" ? title : `${title} | Cuervo Homes`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={OG_IMAGE} />

            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={OG_IMAGE} />
        </Helmet>
    );
}
