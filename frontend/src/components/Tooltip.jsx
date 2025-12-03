import React, { useState } from 'react';

/**
 * Professional Tooltip Component
 * Shows a floating label on hover
 */
const Tooltip = ({
    content,
    children,
    position = 'top',
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900/90 border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900/90 border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900/90 border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900/90 border-t-transparent border-b-transparent border-l-transparent',
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {/* Tooltip Content */}
            <div
                className={`
          absolute z-50 px-3 py-1.5 text-xs font-bold text-white bg-slate-900/90 rounded-lg 
          whitespace-nowrap pointer-events-none border border-white/10 shadow-xl backdrop-blur-md
          transition-all duration-200 ease-out origin-center
          ${positionClasses[position]}
          ${isVisible
                        ? 'opacity-100 transform translate-y-0 scale-100'
                        : 'opacity-0 transform translate-y-2 scale-95'}
        `}
            >
                {content}

                {/* Arrow */}
                <div
                    className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
                ></div>
            </div>
        </div>
    );
};

export default Tooltip;
