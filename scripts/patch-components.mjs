import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- HERO FIX ---
const heroPath = path.join(__dirname, '../src/components/Hero.tsx');
let hero = fs.readFileSync(heroPath, 'utf8');

// Add useNavigate import
if (!hero.includes('import { useNavigate }')) {
  hero = hero.replace(
    'import { motion } from "framer-motion";',
    'import { motion } from "framer-motion";\nimport { useNavigate } from "react-router-dom";'
  );
}

// Replace scrollToContact
hero = hero.replace(
    /const scrollToContact = \(\) => \{\s*const contactSection = document\.getElementById\('contact'\);\s*if \(contactSection\) \{\s*contactSection\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\s*\};/g,
    `const navigate = useNavigate();
    const scrollToContact = () => {
        navigate('/contact');
    };`
);

// Replace headings and text
hero = hero.replace(/THE TORO <br \/> GROUP CORP\./g, 'CUERVO <br /> HOMES');
hero = hero.replace(
    /Orange County real estate guidance for buying, selling, relocation, and distressed-property strategy with confidence and clarity\./g,
    'Orange County real estate guidance for buyers, sellers, and investors with confidence and clarity.'
);

// Replace CTA text
hero = hero.replace(
    /Start Your Journey/g,
    'Free Home Equity Report'
);

// Replace second CTA routing
hero = hero.replace(
    /onClick=\{\(\) => document\.getElementById\('areas'\)\?.scrollIntoView\(\{ behavior: 'smooth' \}\)\}/g,
    "onClick={() => navigate('/services')}"
);

fs.writeFileSync(heroPath, hero, 'utf8');
console.log('Hero patched successfully.');

// --- CONTACT FORM FIX ---
const contactPath = path.join(__dirname, '../src/components/ContactForm.tsx');
let contact = fs.readFileSync(contactPath, 'utf8');

// Replace services options
const oldServices = `const services = [
    { value: "", label: "Select a Service" },
    { value: "buying", label: "Buying" },
    { value: "selling", label: "Selling" },
    { value: "relocation", label: "Relocation" },
    { value: "distressed", label: "Distressed Properties" }
];`;

const newServices = `const services = [
    { value: "", label: "Select an Interest" },
    { value: "buying", label: "Buying" },
    { value: "selling", label: "Selling" }
];`;
contact = contact.replace(oldServices, newServices);

// In Contact Side Panel
contact = contact.replace(/714\.732\.1429/g, "714.319.5966");
contact = contact.replace(/jack@soldbytoro\.com/g, "info@cuervohomes.com");

fs.writeFileSync(contactPath, contact, 'utf8');
console.log('ContactForm patched successfully.');
