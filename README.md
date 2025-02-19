# Meet Booking - Booking Form

A React-based workout booking form implementation with holiday integration and form validation.

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Vite

## Implementation Details

The project implements a custom form solution without using form libraries like Formik. Key features include:

- Custom form validation
- Holiday API integration for date availability
- File upload handling
- Responsive design

## Project Structure

```
src/
├── components/         # React components
│   ├── BookingForm.tsx
│   ├── Calendar.tsx
│   ├── FileUpload.tsx
│   └── ...
├── types/             # TypeScript types
├── utils/             # Validation and helpers
├── constants/         # Form field definitions
└── services/          # API integrations
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment

The project is configured for deployment on GitHub Pages. To deploy:

1. Make sure you have committed all your changes
2. Run `npm run deploy`
3. The site will be deployed to `https://[your-github-username].github.io/meet-booking/`

Note: Before deploying, ensure that your environment variables are properly set up in your deployment environment.

## Development

The form implementation follows these principles:
- Clean code organization
- Type safety
- Modular component structure
- Custom validation logic
- Responsive design
