import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger';
}

export function RetroButton({ variant = 'default', className = '', children, ...props }: Props) {
  const variantClass = variant === 'primary' ? 'retro-btn--primary' : variant === 'danger' ? 'retro-btn--danger' : '';
  return (
    <button className={`retro-btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
