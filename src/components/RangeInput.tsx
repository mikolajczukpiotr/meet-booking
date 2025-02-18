import React, { useEffect, useRef, useState } from 'react';

interface RangeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: string;
  max: string;
}

export const RangeInput: React.FC<RangeInputProps> = ({ label, value, onChange, min, max }) => {
  const [position, setPosition] = useState(0);
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      const percentage = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;
      const thumbPosition = (percentage / 100) * (rangeRef.current.offsetWidth - 24);
      setPosition(thumbPosition);
    }
  }, [value, min, max]);

  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-purple-950 text-base">{label}</label>
      <div className="relative mt-2 mb-8">
        <div className="absolute bottom-4 w-full flex items-center px-1 justify-between">
          <p className="text-purple-950 text-sm">{min}</p>
          <p className="text-purple-950 text-sm">{max}</p>
        </div>
        <input
          ref={rangeRef}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-1 bg-purple-100 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 cursor-pointer"
        />
        <div className="absolute mt-2 -translate-x-1/2" style={{ left: `${position + 12}px` }}>
          <div className="relative top-1">
            <div className="absolute z-10 left-1/2 -top-1.5 w-3 h-3 -translate-x-1/2 rotate-45 border-t border-l border-purple-100 border-b-white bg-white"></div>
            <div className="relative z-1 min-w-[32px] h-8 px-3 flex items-center justify-center text-sm text-purple-900 border border-purple-100 rounded-lg bg-white">
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
