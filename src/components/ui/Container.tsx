import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  narrow = false,
  className = '',
  style,
}) => {
  return (
    <div
      className={`${narrow ? 'container-narrow' : 'container'} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
