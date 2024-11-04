import { ChangeEvent } from "react";

interface SelectPropsInterface {
  value: string | number;
  label: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  isDisabled?: boolean;
}

const Select = ({
  value,
  label,
  onChange,
  options,
  isDisabled,
}: SelectPropsInterface) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={label} className="text-xs text-gray-300 ml-1">
        {label}
      </label>
      <select
        disabled={isDisabled}
        className="bg-gray-700 cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full"
        value={value}
        id={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
