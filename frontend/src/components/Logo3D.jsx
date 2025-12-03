import React from 'react';
import { Stethoscope } from 'lucide-react';

const Logo3D = ({ size = 40, className = '' }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* Back Layer (Depth) */}
            <Stethoscope
                size={size}
                className="absolute text-[#004d1a] transform translate-x-[2px] translate-y-[2px]"
                strokeWidth={3}
            />
            <Stethoscope
                size={size}
                className="absolute text-[#00802b] transform translate-x-[1px] translate-y-[1px]"
                strokeWidth={3}
            />

            {/* Main Layer */}
            <Stethoscope
                size={size}
                className="relative z-10 text-[var(--color-primary)] drop-shadow-[0_0_15px_rgba(0,255,65,0.6)]"
                strokeWidth={2.5}
            />

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full z-20 pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};

export default Logo3D;
