import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = ({ darkMode }) => {
    return (
        <footer className={`w-full py-8 mt-auto border-t transition-colors duration-300 text-base ${darkMode ? 'bg-black/40 border-white/10 text-gray-400' : 'bg-white/60 border-slate-200 text-slate-600'}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand & Copyright */}
                    <div className="text-center md:text-left">
                        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            MedPredict <span className="text-[var(--color-primary)]">AI</span>
                        </h3>
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} MedPredict AI. All rights reserved.
                        </p>
                    </div>



                    {/* Social Icons */}
                    <div className="flex gap-4">
                        {[
                            { Icon: Github, href: 'https://github.com/mohitmishra45' },
                            { Icon: Linkedin, href: 'https://www.linkedin.com/in/mohitmishra45/' },
                            { Icon: Mail, href: 'mailto:mohitmishra9707@gmail.com' }
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${darkMode ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-slate-200 hover:text-slate-900'}`}
                            >
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Made with Love */}
                <div className="mt-8 text-center text-xs opacity-60 flex items-center justify-center gap-1">
                    <span>Made with</span>
                    <Heart size={16} className="text-rose-500 fill-rose-500 animate-pulse" />
                    <span>Mohit Mishra</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
