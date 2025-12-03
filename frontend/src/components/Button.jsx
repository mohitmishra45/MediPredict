import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Professional Button Component
 * Industry-standard button with variants, sizes, loading states, and accessibility
 */
const Button = React.forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    ...props
}, ref) => {

    const baseStyles = 'btn';

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500',
        ghost: 'text-green-400 hover:bg-green-500/10',
        danger: 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-black'
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm gap-1.5',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-2.5',
    };

    const isDisabled = disabled || loading;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            {...props}
        >
            {loading && (
                <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            )}
            {!loading && Icon && iconPosition === 'left' && (
                <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            )}
            {children}
            {!loading && Icon && iconPosition === 'right' && (
                <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
            )}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
