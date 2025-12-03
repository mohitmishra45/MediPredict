import React from 'react';

/**
 * Professional Badge Component
 * For status indicators, tags, and labels
 */
const Badge = ({
    children,
    variant = 'success',
    size = 'md',
    icon: Icon,
    className = '',
    ...props
}) => {

    const variants = {
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        info: 'badge-info',
        default: 'bg-white/10 text-gray-300 border border-white/20'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
    };

    return (
        <span
            className={`
        badge
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            {...props}
        >
            {Icon && <Icon size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} className="mr-1" />}
            {children}
        </span>
    );
};

export default Badge;
