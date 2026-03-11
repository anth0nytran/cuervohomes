import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- EXPERTISE LIST FIX ---
const expertisePath = path.join(__dirname, '../src/components/Expertise.tsx');
let expertise = fs.readFileSync(expertisePath, 'utf8');

const newExpertise = `const expertise = [
    {
        title: "Sell for the Highest Price",
        description: "Maximize your returns with our proven marketing strategies and master negotiation.",
        list: ["Strategic Pricing", "Premium Marketing", "Negotiation Expertise"],
        value: "selling"
    },
    {
        title: "Find Your Dream Home",
        description: "Access exclusive listings and expert guidance to secure the perfect property for your lifestyle.",
        list: ["Market Analysis", "Private Showings", "Offer Strategy"],
        value: "buying"
    },
    {
        title: "Home Value & Equity Report",
        description: "Get an instant, accurate assessment of your property's current market value and built-up equity.",
        list: ["CMA Reports", "Equity Analysis", "Market Trends"],
        value: "selling"
    },
    {
        title: "Relocation Services",
        description: "Seamless transitions whether you're moving across town or across the country.",
        list: ["Area Tours", "Logistics Support", "Timeline Coordination"],
        value: "relocation"
    },
    {
        title: "First Time Buyers",
        description: "Step-by-step guidance to navigate your first home purchase with confidence and clarity.",
        list: ["Buyer Education", "Financing Guidance", "Process Navigation"],
        value: "buying"
    },
    {
        title: "Investment Opportunities",
        description: "Exclusive access to off-market properties and high-yield real estate investments.",
        list: ["Off-Market Access", "ROI Analysis", "Portfolio Strategy"],
        value: "distressed"
    }
];`;

expertise = expertise.replace(/const expertise = \[[\s\S]*?\];/, newExpertise);
fs.writeFileSync(expertisePath, expertise, 'utf8');

// --- SERVICE AREAS FIX ---
const areasPath = path.join(__dirname, '../src/components/ServiceAreas.tsx');
let areas = fs.readFileSync(areasPath, 'utf8');

const newAreas = `const areas = [
    "Orange County",
    "Newport Beach",
    "Costa Mesa",
    "Corona Del Mar",
    "Huntington Beach",
    "North Tustin",
    "Santa Ana",
    "Orange",
    "Anaheim"
];`;

areas = areas.replace(/const areas = \[[\s\S]*?\];/, newAreas);
fs.writeFileSync(areasPath, areas, 'utf8');

console.log('Services and Areas patched successfully.');
