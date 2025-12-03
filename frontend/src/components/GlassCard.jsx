import React from 'react';

/**
 * Enhanced GlassCard Component
 * Professional glassmorphism card with variants and states
 */
const GlassCard = ({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default',
  size = 'md',
  loading = false,
  ...props
}) => {

  const variants = {
    default: 'glass-panel',
    strong: 'glass-panel-strong',
    subtle: 'backdrop-blur-sm bg-white/3 border border-white/5 rounded-2xl',
  };

  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hoverEffect ? 'card-hover' : '';

  return (
    <div
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${hoverClass}
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-3 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default GlassCard;
