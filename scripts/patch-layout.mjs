import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const layoutPath = path.join(__dirname, '../src/components/Layout.tsx');

let content = fs.readFileSync(layoutPath, 'utf8');

// 1. Add missing imports
if (!content.includes('import { Link, useLocation }')) {
  content = content.replace(
    'import { X } from "lucide-react";',
    'import { X } from "lucide-react";\nimport { Link, useLocation } from "react-router-dom";'
  );
}

// 2. Add useLocation and scroll effect
if (!content.includes('const location = useLocation();')) {
  content = content.replace(
    /const \[mobileMenuOpen, setMobileMenuOpen\] = useState\(false\);/g,
    `const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n    const location = useLocation();\n\n    useEffect(() => {\n        window.scrollTo(0, 0);\n    }, [location.pathname]);`
  );
}

// 3. Fix Areas
content = content.replace(
  /<li><span className="cursor-default">Newport Beach<\/span><\/li>\s*<li><span className="cursor-default">Irvine<\/span><\/li>\s*<li><span className="cursor-default">Huntington Beach<\/span><\/li>\s*<li><span className="cursor-default">Laguna Beach<\/span><\/li>\s*<li><span className="cursor-default">Corona Del Mar<\/span><\/li>\s*<li><span className="cursor-default">Dana Point<\/span><\/li>/g,
  `<li><span className="cursor-default">Orange County</span></li>
                                <li><span className="cursor-default">Newport Beach</span></li>
                                <li><span className="cursor-default">Costa Mesa</span></li>
                                <li><span className="cursor-default">Corona Del Mar</span></li>
                                <li><span className="cursor-default">Huntington Beach</span></li>
                                <li><span className="cursor-default">North Tustin</span></li>
                                <li><span className="cursor-default">Santa Ana</span></li>
                                <li><span className="cursor-default">Orange</span></li>
                                <li><span className="cursor-default">Anaheim</span></li>`
);

// 4. Fix Contact
content = content.replace(/714\.732\.1429/g, '714.319.5966');
content = content.replace(/tel:7147321429/g, 'tel:7143195966');
content = content.replace(/jack@soldbytoro\.com/g, 'info@cuervohomes.com');
content = content.replace(
  /123 Pacific Coast Highway <br \/>\s*Newport Beach, CA 92660/g,
  `Operating Hours: <br />
                                    8:00 AM - 8:00 PM <br />
                                    Orange County, CA`
);

// 5. Fix Copyright
content = content.replace(
  /© 2026 The Toro Group Corp\. All Rights Reserved\./g,
  '© 2026 Cuervo Homes. All Rights Reserved.'
);

fs.writeFileSync(layoutPath, content, 'utf8');
console.log('Layout patched successfully.');
