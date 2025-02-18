import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'inactive' | 'hover';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  disabled = false,
}) => {
  const variantClasses = {
    default: 'bg-purple-600 hover:bg-purple-700 text-white',
    inactive: 'bg-gray-200 text-gray-500 cursor-not-allowed',
    hover: 'bg-purple-700 text-white',
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled || variant === 'inactive'}
    >
      {children}
    </button>
  );
};
