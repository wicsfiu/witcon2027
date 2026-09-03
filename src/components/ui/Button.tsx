import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2';

  const variants = {
    primary:
      'bg-witcon-forest text-white hover:-translate-y-0.5 hover:bg-witcon-deep-forest focus-visible:outline-witcon-pink',
    secondary:
      'border-2 border-witcon-deep-forest text-witcon-deep-forest hover:bg-witcon-deep-forest hover:text-witcon-cream focus-visible:outline-witcon-pink',
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}