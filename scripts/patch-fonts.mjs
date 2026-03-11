import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CSS FONT FIX ---
const cssPath = path.join(__dirname, '../src/index.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
    /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Montserrat:wght@300;400;500;600;700&family=Playfair\+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'\);/,
    `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600;700&display=swap');`
);

fs.writeFileSync(cssPath, css, 'utf8');

// --- TAILWIND CONFIG FIX ---
const twPath = path.join(__dirname, '../tailwind.config.js');
let tw = fs.readFileSync(twPath, 'utf8');

tw = tw.replace(
    /fontFamily: \{\s*serif: \['Playfair Display', 'serif'\],\s*sans: \['Montserrat', 'sans-serif'\]\s*\}/g,
    `fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Outfit"', 'sans-serif']
            }`
);

fs.writeFileSync(twPath, tw, 'utf8');

console.log('Fonts updated successfully.');
