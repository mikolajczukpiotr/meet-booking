import React, { useState, useLayoutEffect } from 'react';

interface Holiday {
  name: string;
  date: string;
  type: string;
}

interface CalendarProps {
  onChange: (date: string | null, time?: string) => void;
  value?: string | null;
  selectedTime?: string;
}

const TIME_SLOTS = ['12:00', '14:00', '16:30', '18:30', '20:00'];
const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CalendarHeader: React.FC<{
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}> = ({ currentDate, onPrevMonth, onNextMonth }) => (
  <div className="mb-4 flex items-center justify-between px-2">
    <button
      type="button"
      onClick={onPrevMonth}
      className="text-purple-400 hover:text-purple-600 transition-colors"
    >
      ◀
    </button>
    <h2 className="text-base font-normal text-purple-950">
      {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </h2>
    <button
      type="button"
      onClick={onNextMonth}
      className="text-purple-400 hover:text-purple-600 transition-colors"
    >
      ▶
    </button>
  </div>
);

const WeekDays: React.FC = () => (
  <>
    {WEEK_DAYS.map((day) => (
      <div key={day} className="p-2 text-center text-xs font-normal text-purple-950">
        {day}
      </div>
    ))}
  </>
);

const TimeSlots: React.FC<{
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
}> = ({ selectedTime, onTimeSelect }) => (
  <div className="space-y-2">
    <h3 className="text-sm text-purple-950">Time</h3>
    <div className="flex flex-wrap md:flex-col gap-2">
      {TIME_SLOTS.map((time) => (
        <button
          type="button"
          key={time}
          onClick={() => onTimeSelect(time)}
          className={`w-20 rounded-lg px-4 py-2 text-center text-sm transition-colors bg-white border-purple-300 border-1 ${
            selectedTime === time
              ? 'border-2 border-purple-600 text-purple-600'
              : 'text-purple-950 hover:border hover:border-purple-600 hover:text-purple-600'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  </div>
);

const useHolidays = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useLayoutEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/holidays?country=PL', {
          headers: {
            'X-Api-Key': import.meta.env.VITE_HOLIDAYS_API_KEY,
          },
        });
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return holidays;
};

const isDateDisabled = (date: Date, holidays: Holiday[]) => {
  const holiday = holidays.find((holiday) => {
    const holidayDate = new Date(holiday.date);
    return (
      holidayDate.getFullYear() === date.getFullYear() &&
      holidayDate.getMonth() === date.getMonth() &&
      holidayDate.getDate() === date.getDate() &&
      holiday.type === 'NATIONAL_HOLIDAY'
    );
  });

  const isSunday = date.getDay() === 0;
  const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));

  return Boolean(holiday) || isSunday || isPastDate;
};

const getObservanceMessage = (date: Date, holidays: Holiday[]) => {
  const holiday = holidays.find((holiday) => {
    const holidayDate = new Date(holiday.date);
    return (
      holidayDate.getFullYear() === date.getFullYear() &&
      holidayDate.getMonth() === date.getMonth() &&
      holidayDate.getDate() === date.getDate() &&
      holiday.type === 'OBSERVANCE'
    );
  });

  return holiday ? holiday.name : null;
};

export const Calendar: React.FC<CalendarProps> = ({ onChange, value, selectedTime }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(value || null);
  const [observanceMessage, setObservanceMessage] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(selectedTime);
  const holidays = useHolidays();

  useLayoutEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  useLayoutEffect(() => {
    setTimeSlot(selectedTime);
  }, [selectedTime]);

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date, holidays)) return;

    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    // Always pass the current timeSlot to maintain consistency
    onChange(dateString, timeSlot || undefined);

    const message = getObservanceMessage(date, holidays);
    setObservanceMessage(message);
  };

  const handleTimeSelect = (time: string) => {
    setTimeSlot(time);
    if (selectedDate) {
      onChange(selectedDate, time);
    }
  };

  const { days, firstDayOfMonth } = (() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

    return { days, firstDayOfMonth };
  })();

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="rounded-2xl bg-white p-4 border-purple-300 border-1">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() =>
            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
          }
          onNextMonth={() =>
            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
          }
        />

        <div className="grid grid-cols-7 gap-1">
          <WeekDays />

          {Array.from({ length: (firstDayOfMonth + 6) % 7 }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2 text-center text-sm text-gray-300">
              ·
            </div>
          ))}

          {days.map((date) => {
            const isDisabledDate = isDateDisabled(date, holidays);
            const isSelected = date.toISOString().split('T')[0] === selectedDate;
            const hasObservance = getObservanceMessage(date, holidays) !== null;
            const isWeekend = date.getDay() === 0;
            const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <button
                type="button"
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                disabled={isDisabledDate}
                className={`relative p-2 text-center text-sm transition-colors ${
                  isDisabledDate || isWeekend || isPastDate
                    ? 'text-gray-300'
                    : isSelected
                      ? 'text-white'
                      : hasObservance
                        ? 'text-purple-600'
                        : 'text-purple-950'
                }`}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-7 w-7 rounded-full bg-purple-600"></span>
                  </span>
                )}
                <span className="relative z-10">{date.getDate()}</span>
              </button>
            );
          })}
        </div>

        {observanceMessage && (
          <div className="mt-2 text-xs text-purple-600">{observanceMessage}</div>
        )}
      </div>

      <TimeSlots selectedTime={timeSlot} onTimeSelect={handleTimeSelect} />
    </div>
  );
};
