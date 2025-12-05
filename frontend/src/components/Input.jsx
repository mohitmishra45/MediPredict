import React, { useState, useId } from 'react';
import { X } from 'lucide-react';

/**
 * Professional Input Component
 * Features: floating labels, error/success states, helper text, icons, clear button
 */
const Input = React.forwardRef(({
    label,
    type = 'text',
    error,
    success,
    helperText,
    icon: Icon,
    clearable = false,
    className = '',
    value,
    onChange,
    ...props
}, ref) => {
    const [localValue, setLocalValue] = useState(value !== undefined && value !== null ? value : '');
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();

    const currentValue = value !== undefined ? value : localValue;
    // Fix: Convert to string to check length for numbers
    const hasValue = currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (value === undefined) {
            setLocalValue(newValue);
        }
        onChange?.(e);
    };

    const handleClear = () => {
        const event = { target: { value: '', name: props.name } };
        if (value === undefined) {
            setLocalValue('');
        }
        onChange?.(event);
    };

    const inputClasses = `
    input
    ${Icon ? 'pl-11' : ''}
    ${clearable && hasValue ? 'pr-10' : ''}
    ${error ? 'input-error' : ''}
    ${success ? 'input-success' : ''}
    ${className}
  `.trim();

    return (
        <div className="relative">
            {/* Input Field */}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        <Icon size={18} />
                    </div>
                )}

                <input
                    ref={ref}
                    id={id}
                    type={type}
                    value={currentValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={inputClasses}
                    placeholder={label ? '' : props.placeholder}
                    {...props}
                />

                {/* Floating Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className={`
              absolute left-3 transition-all duration-200 pointer-events-none
              ${Icon ? 'left-11' : 'left-4'}
              ${isFocused || hasValue
                                ? '-top-2 text-xs bg-black/40 px-2 rounded text-green-400'
                                : 'top-1/2 -translate-y-1/2 text-gray-500'
                            }
            `}
                    >
                        {label}
                    </label>
                )}

                {/* Clear Button */}
                {clearable && hasValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        aria-label="Clear input"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Helper Text / Error Message */}
            {(helperText || error || (isFocused && (props.min !== undefined || props.max !== undefined))) && (
                <p className={`
          mt-1.5 text-sm px-1
          ${error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-500'}
        `}>
                    {error || (isFocused && (props.min !== undefined || props.max !== undefined)
                        ? `Please fill (Min: ${props.min}, Max: ${props.max})`
                        : helperText)}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
