import { FormField } from '../types/form';
import { validateAge, validateEmail, validateName, validateRequired } from '../utils/validation';

export const FORM_FIELDS: FormField[] = [
  {
    name: 'firstName',
    label: 'First name',
    validate: (value) => validateName(value, 'First name'),
  },
  {
    name: 'lastName',
    label: 'Last name',
    validate: (value) => validateName(value, 'Last name'),
  },
  {
    name: 'email',
    label: 'Email address',
    validate: validateEmail,
  },
  {
    name: 'age',
    label: 'Age',
    validate: validateAge,
  },
  {
    name: 'photoUrl',
    label: 'Photo',
    validate: (value) => validateRequired(value, 'upload a photo'),
  },
  {
    name: 'date',
    label: 'Date',
    validate: (value) => validateRequired(value, 'select a date'),
  },
];
