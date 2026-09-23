import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName: string): string => {
    if (!fullName) return '';
    const words = fullName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          width: '32px',
          height: '32px',
          fontSize: 'var(--text-xs)',
        };
      case 'lg':
        return {
          width: '64px',
          height: '64px',
          fontSize: 'var(--text-xl)',
        };
      case 'md':
      default:
        return {
          width: '48px',
          height: '48px',
          fontSize: 'var(--text-base)',
        };
    }
  };

  const showImage = Boolean(src && !imageError);

  return (
    <div
      className={`saathi-avatar ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--saathi-nude-tint)',
        color: 'var(--saathi-maroon)',
        fontWeight: 600,
        overflow: 'hidden',
        flexShrink: 0,
        userSelect: 'none',
        lineHeight: 1,
        ...getSizeStyles(),
      }}
      aria-label={name}
      title={name}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
