"use client";
import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";

interface InputSelectProps {
  label?: string;
  name: string;
  options: Record<string, string>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  onBlur: FocusEventHandler<HTMLSelectElement>;
}

export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(({ onChange, onBlur, name, label, options }, ref) => {
  return (
    <div className="flex flex-col flex-1">
      {label && <label className="">{label}</label>}
      <select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className="border p-2 rounded w-full h-10 bg-gray-100 border-none focus:outline-green-500 pr-10 focus:bg-gray-100
          focus:ring-green-500"
      >
        <option value="" className="hover:bg-gray-200 focus:bg-gray-200">
          Select...
        </option>
        {/* Додаємо пустий варіант */}
        {Object.entries(options).map(([value, display]) => (
          <option key={value} value={display} className="hover:bg-gray-200 focus:bg-gray-200">
            {display}
          </option>
        ))}
      </select>
    </div>
  );
});

InputSelect.displayName = "InputSelect";
