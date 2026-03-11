import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONTACT FORM FIX PART 2 ---
const contactPath = path.join(__dirname, '../src/components/ContactForm.tsx');
let contact = fs.readFileSync(contactPath, 'utf8');

// The user requested lead form fields: Property Address, Name, Number, Email, Timeline, Interest- Buying or selling.
// Currently we have: First Name, Last Name, Email, Phone, Service (Interest)
// We need to add: Property Address, Timeline.

// 1. Add states for address and timeline
if (!contact.includes('const [address, setAddress] = useState("");')) {
    contact = contact.replace(
        'const [phone, setPhone] = useState("");',
        'const [phone, setPhone] = useState("");\n    const [address, setAddress] = useState("");\n    const [timeline, setTimeline] = useState("");'
    );
}

// 2. Add validation touches
if (!contact.includes('address: true,')) {
    contact = contact.replace(
        'phone: true,',
        'phone: true,\n            address: true,\n            timeline: true,'
    );
}

// 3. Add to validation condition
contact = contact.replace(
    /if \(!isFirstNameValid \|\| !isLastNameValid \|\| !isEmailValid \|\| !isPhoneValid \|\| !selectedService\) \{/g,
    'if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid || !address || !timeline || !selectedService) {'
);

// 4. Add to payload
if (!contact.includes('address,\n                    timeline,')) {
    contact = contact.replace(
        'phone,\n                    service: selectedService,',
        'phone,\n                    address,\n                    timeline,\n                    service: selectedService,'
    );
}

// 5. Add to Reset Form
if (!contact.includes('setAddress("");')) {
    contact = contact.replace(
        'setPhone("");',
        'setPhone("");\n                setAddress("");\n                setTimeline("");'
    );
}

// 6. Inject the UI fields
// Let's put Address spanning full width before Email
const addressUI = `
                            <div className="group relative">
                                <label htmlFor="address" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Property Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onBlur={() => handleBlur('address')}
                                    autoComplete="street-address"
                                    className={getInputClass(address.length > 5, 'address')}
                                    placeholder="Property Address"
                                />
                                {touched.address && address.length <= 5 && (
                                    <p className="text-xs text-red-500 mt-2">Please enter a valid address</p>
                                )}
                            </div>
`;

// Let's put Timeline span full width after Phone
const timelineUI = `
                            <div className="group relative">
                                <label htmlFor="timeline" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Timeline</label>
                                <select
                                    id="timeline"
                                    value={timeline}
                                    onChange={(e) => setTimeline(e.target.value)}
                                    onBlur={() => handleBlur('timeline')}
                                    className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent cursor-pointer appearance-none"
                                >
                                    <option value="">Select a Timeline</option>
                                    <option value="ASAP">ASAP</option>
                                    <option value="1-3 Months">1-3 Months</option>
                                    <option value="3-6 Months">3-6 Months</option>
                                    <option value="6+ Months">6+ Months</option>
                                    <option value="Just Browsing">Just Browsing</option>
                                </select>
                                {touched.timeline && !timeline && (
                                    <p className="text-xs text-red-500 mt-2 absolute">Please select a timeline</p>
                                )}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
`;

if (!contact.includes('htmlFor="address"')) {
    // Insert Address between Name Grid and Email
    contact = contact.replace(
        '                            </div>\n\n                            <div className="group relative">\n                                <label htmlFor="email"',
        '                            </div>\n' + addressUI + '\n                            <div className="group relative">\n                                <label htmlFor="email"'
    );
}

if (!contact.includes('htmlFor="timeline"')) {
    // Insert Timeline after Phone
    contact = contact.replace(
        /<p className="text-xs text-red-500 mt-2">Please enter a 10-digit phone number<\/p>\n                                \)}\n                            <\/div>/g,
        '<p className="text-xs text-red-500 mt-2">Please enter a 10-digit phone number</p>\n                                )}\n                            </div>\n' + timelineUI
    );
}

fs.writeFileSync(contactPath, contact, 'utf8');
console.log('ContactForm updated with Address and Timeline fields.');
