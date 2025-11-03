interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
}

export default function SliderInput({ label, value, min, max, onChange, unit = 'px' }: SliderInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        {label}
      </label>
      <div>
        <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">
          {label}: {value}{unit}
        </label>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

