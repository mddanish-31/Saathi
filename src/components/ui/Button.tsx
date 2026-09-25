import React from 'react';
import { ButtonVariant, ButtonSize } from '../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  style,
  ...rest
}) => {
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: '0.45rem 1rem',
      fontSize: 'var(--text-xs)',
      borderRadius: 'var(--radius-full)',
      gap: '0.45rem',
    },
    md: {
      padding: '0.68rem 1.45rem',
      fontSize: 'var(--text-sm)',
      borderRadius: 'var(--radius-full)',
      gap: '0.6rem',
    },
    lg: {
      padding: '0.88rem 2rem',
      fontSize: 'var(--text-base)',
      borderRadius: 'var(--radius-full)',
      gap: '0.75rem',
    },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-text)',
          border: '1px solid transparent',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--btn-secondary-bg)',
          color: 'var(--btn-secondary-text)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--btn-outline-text)',
          border: '1px solid var(--btn-outline-border)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent',
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`saathi-btn saathi-btn--${variant} ${className}`}
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        letterSpacing: '0.025em',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all var(--transition-normal)',
        width: fullWidth ? '100%' : 'auto',
        position: 'relative',
        ...sizeStyles[size],
        ...getVariantStyles(),
        ...style,
      }}
      {...rest}
    >
      {isLoading ? (
        <span
          style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      ) : (
        <>
          {leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
