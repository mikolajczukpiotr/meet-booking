export interface FormField {
  name: keyof BookingFormData;
  label: string;
  validate: (value: string) => string | undefined;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photoUrl: string | null;
  photoId: string | null;
  date: string;
  time: string;
}

export const INITIAL_FORM_DATA: BookingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: '8',
  photoUrl: null,
  photoId: null,
  date: '',
  time: '',
};
