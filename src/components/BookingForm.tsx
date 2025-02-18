import React, { useState } from 'react';
import { TextField } from './TextField';
import { RangeInput } from './RangeInput';
import { FileUpload } from './FileUpload';
import { Button } from './Button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
  photo?: string;
}

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: '8',
  photo: '',
};

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        return !value.trim()
          ? `${field === 'firstName' ? 'First' : 'Last'} name is required`
          : value.length < 2
            ? `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters long`
            : undefined;
      case 'email':
        return !value.trim()
          ? 'Email is required'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? 'Please enter a valid email address'
            : undefined;
      case 'age': {
        const age = parseInt(value);
        return isNaN(age) || age < 8 || age > 100 ? 'Age must be between 8 and 100' : undefined;
      }
      case 'photo':
        return !value ? 'Photo is required' : undefined;
    }
  };

  const handleChange = (field: keyof FormData) => (value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    if (isSubmitAttempted) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setIsSubmitAttempted(true);

    if (!hasErrors) {
      console.log('Form submitted:', formData);
      setFormData(INITIAL_FORM_DATA);
      setIsSubmitAttempted(false);
    }
  };

  const renderField = (field: keyof FormData, label: string) => {
    const showError = isSubmitAttempted && errors[field];
    return (
      <div>
        {field === 'age' ? (
          <RangeInput
            label={label}
            value={formData[field]}
            onChange={handleChange(field)}
            min="8"
            max="100"
          />
        ) : field === 'photo' ? (
          <FileUpload label={label} onChange={(urls) => handleChange('photo')(urls[0] || '')} />
        ) : (
          <TextField
            label={label}
            value={formData[field]}
            onChange={handleChange(field)}
            status={showError ? 'error' : 'default'}
          />
        )}
        {showError && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto space-y-8 p-8" noValidate>
      <div>
        <h1 className="text-purple-950 text-2xl font-semibold mb-8">Personal info</h1>
        <div className="space-y-6">
          {renderField('firstName', 'First Name')}
          {renderField('lastName', 'Last Name')}
          {renderField('email', 'Email')}
          {renderField('age', 'Age')}
          {renderField('photo', 'Photo')}
        </div>
      </div>
      <div>
        <h2 className="text-purple-950 text-2xl font-semibold mb-8">Your workout</h2>
      </div>
      <Button type="submit" disabled={isSubmitAttempted && Object.keys(errors).length > 0}>
        Send Application
      </Button>
    </form>
  );
};
