import React, { FC } from "react";

export interface RadioProps {
  className?: string;
  name: string;
  id: string;
  onChange?: (value: string) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  label: string;
}

const Radio: FC<RadioProps> = ({
  className,
  name,
  id,
  onChange,
  label,
  defaultChecked,
  disabled,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base gap-2 ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className="w-6 h-6 bg-white rounded-full focus:ring-action-primary text-primary-500 border-primary border-neutral-500 dark:bg-neutral-700 dark:checked:bg-primary-500 focus:ring-primary-500"
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultChecked={defaultChecked}
        disabled={disabled}
        value={id}
      />
      <label
        htmlFor={id}
        className="block text-neutral-900 dark:text-neutral-100"
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
