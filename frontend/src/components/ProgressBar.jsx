import React, { useEffect, useState } from 'react';

/**
 * Professional ProgressBar Component
 * Animated progress indicator with labels and glow effects
 */
const ProgressBar = ({
    value = 0,
    max = 100,
    label,
    showValue = true,
    color = 'green',
    size = 'md',
    animated = true,
    glow = true,
    className = '',
    ...props
}) => {
    const [currentValue, setCurrentValue] = useState(0);

    // Animate to target value
    useEffect(() => {
        if (animated) {
            const timeout = setTimeout(() => {
                setCurrentValue(value);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setCurrentValue(value);
        }
    }, [value, animated]);

    const percentage = Math.min(Math.max((currentValue / max) * 100, 0), 100);

    const colors = {
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
    };

    const sizes = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
    };

    return (
        <div className={className} {...props}>
            {/* Label Row */}
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-2">
                    {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
                    {showValue && (
                        <span className="text-sm font-semibold text-green-400">
                            {percentage.toFixed(0)}%
                        </span>
                    )}
                </div>
            )}

            {/* Progress Track */}
            <div className={`
        w-full bg-white/5 rounded-full overflow-hidden border border-white/5
        ${sizes[size]}
      `}>
                {/* Progress Fill */}
                <div
                    className={`
            h-full ${colors[color]}
            ${glow ? `shadow-[0_0_10px_currentColor]` : ''}
            ${animated ? 'transition-all duration-1000 ease-out' : ''}
          `}
                    style={{
                        width: `${percentage}%`,
                        opacity: 0.8
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
