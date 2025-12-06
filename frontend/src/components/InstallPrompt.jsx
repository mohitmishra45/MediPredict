import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[100] animate-slide-in">
            <div className="glass-panel p-4 flex items-center justify-between border-green-500/30 bg-black/80 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                        <Download size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Install App</h3>
                        <p className="text-xs text-gray-400">Add to Home Screen for faster access</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleInstallClick}
                        className="px-4 py-2 bg-green-500 text-black text-sm font-bold rounded-lg hover:bg-green-400 transition-colors"
                    >
                        Install
                    </button>
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;
