import React, { useState } from 'react';
import { TextField } from './TextField';
import { Button } from './Button';
import { RangeInput } from './RangeInput';
import { FileUpload } from './FileUpload';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photos: string[];
}

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: '8',
    photos: [],
  });

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, photos: urls }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-[480px] mx-auto space-y-8 p-8">
      <div>
        <h1 className="text-purple-950 text-2xl font-semibold mb-8">Personal info</h1>
        <div className="space-y-6">
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            status="default"
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            status="default"
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            status="default"
          />
          <RangeInput
            label="Age"
            value={formData.age}
            onChange={handleChange('age')}
            min="8"
            max="100"
          />
          <FileUpload label="Photos" onChange={handlePhotoChange} />
        </div>
      </div>

      <div>
        <h2 className="text-purple-950 text-2xl font-semibold mb-8">Your workout</h2>
      </div>

      <Button onClick={handleSubmit} variant="default">
        Send Application
      </Button>
    </div>
  );
};
