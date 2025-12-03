import React from 'react';

/**
 * Professional Card Component
 * Flexible card with header, body, footer sections
 */
const Card = ({
    children,
    header,
    footer,
    className = '',
    variant = 'default',
    hover = false,
    ...props
}) => {

    const variants = {
        default: 'card',
        elevated: 'glass-panel-strong p-6',
        outlined: 'border-2 border-green-500/20 bg-transparent p-6 rounded-2xl',
    };

    const cardClass = `
    ${variants[variant]}
    ${hover ? 'card-hover' : ''}
    ${className}
  `.trim();

    return (
        <div className={cardClass} {...props}>
            {header && (
                <div className="card-header mb-4 pb-4 border-b border-white/10">
                    {header}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
            {footer && (
                <div className="card-footer mt-4 pt-4 border-t border-white/10">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
