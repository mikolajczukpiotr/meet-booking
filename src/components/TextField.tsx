import React from 'react';

interface TextFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  status?: 'default' | 'active' | 'error';
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  status = 'default',
  placeholder,
}) => {
  const inputClasses = {
    default: 'border border-gray-200 focus:border-purple-500',
    active: 'border border-purple-500',
    error: 'border border-red-500',
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        type="text"
        className={`px-3 py-2 rounded-md outline-none transition-colors ${inputClasses[status]}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
