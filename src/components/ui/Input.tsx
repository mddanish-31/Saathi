import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightElement,
      type = 'text',
      fullWidth = true,
      id,
      className = '',
      required,
      style,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const isPasswordType = type === 'password';
    const computedType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    return (
      <div
        className={`saathi-input-wrapper ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: error ? '#C53030' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {label}
            {required && <span style={{ color: 'var(--saathi-maroon)' }}>*</span>}
          </label>
        )}

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {leftIcon && (
            <span
              style={{
                position: 'absolute',
                left: '14px',
                display: 'inline-flex',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={computedType}
            required={required}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              paddingLeft: leftIcon ? '2.5rem' : '1rem',
              paddingRight: isPasswordType || rightElement ? '2.5rem' : '1rem',
              fontSize: 'var(--text-sm)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: `1.5px solid ${error ? '#E53E3E' : 'var(--border-default)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
              ...style,
            }}
            {...rest}
          />

          {isPasswordType ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : (
            rightElement && (
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {rightElement}
              </span>
            )
          )}
        </div>

        {error ? (
          <span
            style={{
              fontSize: 'var(--text-xs)',
              color: '#E53E3E',
              fontWeight: 500,
            }}
            role="alert"
          >
            {error}
          </span>
        ) : helperText ? (
          <span
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
            }}
          >
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
