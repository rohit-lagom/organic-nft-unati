'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  className = '',
  fullWidth = false,
  type = 'button',
}) => {
  const baseClass =
    'inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full transition cursor-pointer' +
    (fullWidth ? 'w-full' : 'w-auto');

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${className} cursor-pointer`}>
      {children}
    </button>
  );
};

export default Button;
