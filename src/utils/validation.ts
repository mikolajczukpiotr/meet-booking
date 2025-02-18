export const validateName = (value: string, fieldName: string) =>
  !value ? `Please enter your ${fieldName.toLowerCase()}`
    : value.length < 2 ? `${fieldName} must be at least 2 characters long`
    : undefined;

export const validateEmail = (value: string) =>
  !value ? 'Please enter your email address'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address'
    : undefined;

export const validateAge = (value: string) => {
  const age = parseInt(value);
  return !value ? 'Please enter your age'
    : isNaN(age) || age < 8 || age > 100 ? 'Age must be between 8 and 100 years'
    : undefined;
};

export const validateRequired = (value: string | null, fieldName: string) =>
  !value ? `Please ${fieldName.toLowerCase().startsWith('select') ? fieldName.toLowerCase() : `enter your ${fieldName.toLowerCase()}`}` : undefined;
