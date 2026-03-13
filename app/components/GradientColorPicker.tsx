'use client';

import { ColorConfig, GradientType } from '../types';

interface Props {
  label: string;
  value: ColorConfig;
  onChange: (value: ColorConfig) => void;
}

export default function GradientColorPicker({ label, value, onChange }: Props) {
  const isGradient = value.mode === 'gradient';

  const previewStyle = isGradient
    ? value.gradient.type === 'linear'
      ? {
          background: `linear-gradient(${value.gradient.rotation}deg, ${value.gradient.colorStops[0].color}, ${value.gradient.colorStops[1].color})`,
        }
      : {
          background: `radial-gradient(circle, ${value.gradient.colorStops[0].color}, ${value.gradient.colorStops[1].color})`,
        }
    : { background: value.color };

  function updateGradientColor(stopIndex: 0 | 1, color: string) {
    const stops = [...value.gradient.colorStops] as typeof value.gradient.colorStops;
    stops[stopIndex] = { ...stops[stopIndex], color };
    onChange({ ...value, gradient: { ...value.gradient, colorStops: stops } });
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <div className="flex rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-600 text-xs">
          <button
            type="button"
            onClick={() => onChange({ ...value, mode: 'solid' })}
            className={`px-3 py-1 font-medium transition-colors ${
              !isGradient
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600'
            }`}
          >
            Solid
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, mode: 'gradient' })}
            className={`px-3 py-1 font-medium transition-colors ${
              isGradient
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600'
            }`}
          >
            Gradient
          </button>
        </div>
      </div>

      {/* Preview bar */}
      <div
        className="h-6 rounded-md border border-zinc-300 dark:border-zinc-600 w-full"
        style={previewStyle}
      />

      {!isGradient ? (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value.color}
            onChange={(e) => onChange({ ...value, color: e.target.value })}
            className="h-9 w-12 cursor-pointer rounded border border-zinc-300 dark:border-zinc-600"
          />
          <input
            type="text"
            value={value.color}
            onChange={(e) => onChange({ ...value, color: e.target.value })}
            className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="#000000"
          />
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {/* Type selector */}
          <div className="flex gap-2">
            {(['linear', 'radial'] as GradientType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  onChange({ ...value, gradient: { ...value.gradient, type: t } })
                }
                className={`flex-1 py-1.5 text-xs rounded-md border transition-colors ${
                  value.gradient.type === t
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Rotation (linear only) */}
          {value.gradient.type === 'linear' && (
            <div>
              <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                Rotation: {value.gradient.rotation}deg
              </label>
              <input
                type="range"
                min={0}
                max={360}
                value={value.gradient.rotation}
                onChange={(e) =>
                  onChange({
                    ...value,
                    gradient: { ...value.gradient, rotation: Number(e.target.value) },
                  })
                }
                className="w-full"
              />
            </div>
          )}

          {/* Color stops */}
          <div className="grid grid-cols-2 gap-3">
            {([0, 1] as const).map((i) => (
              <div key={i}>
                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                  {i === 0 ? 'Start' : 'End'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={value.gradient.colorStops[i].color}
                    onChange={(e) => updateGradientColor(i, e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-zinc-300 dark:border-zinc-600 shrink-0"
                  />
                  <input
                    type="text"
                    value={value.gradient.colorStops[i].color}
                    onChange={(e) => updateGradientColor(i, e.target.value)}
                    className="flex-1 min-w-0 px-2 py-1.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
