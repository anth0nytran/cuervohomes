import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(__dirname, '../src/components/ContactForm.tsx');
let code = fs.readFileSync(p, 'utf8');

const target = `                                />
                                {touched.phone && !isPhoneValid && (
                                    <p className="text-xs text-red-500 mt-2">Please enter a 10-digit phone number</p>
                                )}
                            </div>`;

const inject = `

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                                <div className="group relative">
                                    <label htmlFor="address" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Property Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        onBlur={() => handleBlur('address')}
                                        className={getInputClass(!!address || !touched.address, 'address')}
                                        placeholder="City, Neighborhood, or Zip"
                                    />
                                    {touched.address && !address && (
                                        <p className="text-xs text-red-500 mt-2">Address is required</p>
                                    )}
                                </div>
                                <div className="group relative">
                                    <label htmlFor="timeline" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Expected Timeline</label>
                                    <select
                                        id="timeline"
                                        value={timeline}
                                        onChange={(e) => setTimeline(e.target.value)}
                                        onBlur={() => handleBlur('timeline')}
                                        className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent cursor-pointer appearance-none"
                                    >
                                        <option value="" disabled>Select Timeline</option>
                                        <option value="ASAP">ASAP (0-3 Months)</option>
                                        <option value="3-6 Months">3-6 Months</option>
                                        <option value="6-12 Months">6-12 Months</option>
                                        <option value="1+ Years">1+ Years</option>
                                    </select>
                                    {touched.timeline && !timeline && (
                                        <p className="text-xs text-red-500 mt-2 absolute">Timeline is required</p>
                                    )}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>`;

code = code.replace(target, target + inject);
fs.writeFileSync(p, code, 'utf8');
console.log("Contact form patched.");
