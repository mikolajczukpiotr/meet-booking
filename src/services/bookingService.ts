interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photo: string;
  date: string;
  time: string;
}

export const submitBooking = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate random success/failure
  const isSuccess = Math.random() > 0.1; // 90% success rate

  if (!isSuccess) {
    throw new Error('Failed to submit booking');
  }

  // Log the form data
  const bookingData: Partial<BookingData> = {};
  formData.forEach((value, key) => {
    bookingData[key as keyof BookingData] = value as string;
  });
  console.log('Submitted booking:', bookingData);

  return {
    success: true,
    message: 'Booking submitted successfully!'
  };
};
