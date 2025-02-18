import React, { useState } from 'react';
import { TextField } from './TextField';
import { RangeInput } from './RangeInput';
import { FileUpload } from './FileUpload';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { submitBooking } from '../services/bookingService';
import { BookingFormData } from '../types/form';
import { INITIAL_FORM_DATA } from '../types/form';
import { FORM_FIELDS } from '../constants/formFields';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const validateField = (name: keyof BookingFormData, value: string | null) => {
    const field = FORM_FIELDS.find((f) => f.name === name);
    return field?.validate(value || '');
  };

  const handleChange = (field: keyof BookingFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (isSubmitAttempted) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error || '' }));
    }
  };

  const handleDateTimeChange = (date: string | null, time?: string) => {
    setFormData((prev) => ({
      ...prev,
      date: date || '',
      ...(time && { time }),
    }));

    if (isSubmitAttempted) {
      setErrors((prev) => ({
        ...prev,
        date: validateField('date', date) || '',
        ...(time && { time: !time ? 'Please select a time' : '' }),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = Object.fromEntries(
      FORM_FIELDS.map((field) => [
        field.name,
        validateField(field.name, formData[field.name]?.toString() || null) || '',
      ])
    );

    setErrors(newErrors);
    setIsSubmitAttempted(true);

    if (!Object.values(newErrors).some(Boolean)) {
      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) formDataToSend.append(key, value);
        });

        const result = await submitBooking(formDataToSend);
        setFormData(INITIAL_FORM_DATA);
        setIsSubmitAttempted(false);
        setErrors({});
        alert(result.message);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.');
      }
    }
  };

  const renderField = ({ name, label }: (typeof FORM_FIELDS)[0]) => {
    const showError = isSubmitAttempted && errors[name];

    if (name === 'age') {
      return (
        <RangeInput
          label={label}
          value={formData[name]}
          onChange={handleChange(name)}
          min="8"
          max="100"
        />
      );
    }

    if (name === 'photoUrl') {
      return (
        <FileUpload
          label={label}
          value={formData.photoUrl}
          fileId={formData.photoId}
          onChange={(fileId, url) => {
            setFormData((prev) => ({
              ...prev,
              photoUrl: url,
              photoId: fileId,
            }));
          }}
        />
      );
    }

    if (name === 'date') {
      return (
        <Calendar
          value={formData.date}
          selectedTime={formData.time}
          onChange={handleDateTimeChange}
        />
      );
    }

    return (
      <TextField
        label={label}
        value={formData[name] || ''}
        onChange={handleChange(name)}
        status={showError ? 'error' : 'default'}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto space-y-8 p-8" noValidate>
      <div>
        <h1 className="text-purple-950 text-2xl font-semibold mb-8">Personal info</h1>
        <div className="space-y-6">
          {FORM_FIELDS.slice(0, 5).map((field) => (
            <div key={field.name}>
              {renderField(field)}
              {isSubmitAttempted && errors[field.name] && (
                <p className="mt-1 text-sm text-red-500" role="alert">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-purple-950 text-2xl font-semibold mb-8">Your workout</h2>
        <div className="space-y-6">
          {renderField(FORM_FIELDS[5])}
          {isSubmitAttempted && (errors.date || errors.time) && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.date || errors.time}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" disabled={isSubmitAttempted && Object.values(errors).some(Boolean)}>
        Send Application
      </Button>
    </form>
  );
};
