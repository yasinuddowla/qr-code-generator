interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
