import React from 'react';

interface TimeSlotProps {
  time: string;
  variant?: 'default' | 'selected';
  onClick?: () => void;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  variant = 'default',
  onClick,
}) => {
  const variantClasses = {
    default: 'border border-gray-200 hover:border-purple-500',
    selected: 'border border-purple-500 bg-purple-50',
  };

  return (
    <button
      className={`px-3 py-1 rounded-md transition-colors ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {time}
    </button>
  );
};
