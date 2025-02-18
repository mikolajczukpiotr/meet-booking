import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'inactive' | 'hover';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  disabled = false,
  type = 'button',
  onClick,
}) => {
  const variantClasses = {
    default: 'bg-purple-600 hover:bg-purple-700 text-white',
    inactive: 'bg-purple-200 text-white cursor-not-allowed',
    hover: 'bg-purple-700 text-white',
  };

  const currentVariant = disabled ? 'inactive' : variant;

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${variantClasses[currentVariant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
