import React from 'react';

/**
 * Skeleton Loading Component
 * For content placeholders while loading
 */
const Skeleton = ({
    variant = 'text',
    width,
    height,
    className = '',
    count = 1,
    ...props
}) => {

    const variants = {
        text: 'h-4 w-full rounded',
        title: 'h-6 w-3/4 rounded',
        circle: 'rounded-full',
        rect: 'rounded-lg',
        card: 'h-48 w-full rounded-2xl',
    };

    const skeletonBase = `
    animate-shimmer bg-white/5
    ${variants[variant]}
    ${className}
  `.trim();

    const style = {
        ...(width && { width }),
        ...(height && { height }),
    };

    if (count === 1) {
        return <div className={skeletonBase} style={style} {...props} />;
    }

    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={skeletonBase} style={style} {...props} />
            ))}
        </div>
    );
};

/**
 * Predefined Skeleton Patterns
 */
Skeleton.Card = ({ className = '', ...props }) => (
    <div className={`glass-panel p-6 ${className}`} {...props}>
        <Skeleton variant="title" className="mb-4" />
        <Skeleton count={3} className="mb-2" />
        <div className="flex gap-2 mt-4">
            <Skeleton width="80px" height="32px" />
            <Skeleton width="80px" height="32px" />
        </div>
    </div>
);

Skeleton.Form = ({ className = '', ...props }) => (
    <div className={`space-y-4 ${className}`} {...props}>
        <div>
            <Skeleton width="100px" height="14px" className="mb-2" />
            <Skeleton height="48px" />
        </div>
        <div>
            <Skeleton width="120px" height="14px" className="mb-2" />
            <Skeleton height="48px" />
        </div>
        <Skeleton height="48px" width="120px" className="mt-6" />
    </div>
);

Skeleton.Stats = ({ className = '', ...props }) => (
    <div className={`glass-panel p-6 text-center ${className}`} {...props}>
        <Skeleton variant="circle" width="120px" height="120px" className="mx-auto mb-4" />
        <Skeleton width="150px" height="20px" className="mx-auto mb-2" />
        <Skeleton width="200px" height="14px" className="mx-auto" />
    </div>
);

export default Skeleton;
