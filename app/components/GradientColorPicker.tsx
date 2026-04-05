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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-on-surface">
          {label}
        </label>
        {/* Solid / Gradient chip toggle */}
        <div className="flex gap-1.5">
          {(['solid', 'gradient'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onChange({ ...value, mode })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                value.mode === mode
                  ? 'text-on-secondary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
              style={
                value.mode === mode
                  ? { background: 'var(--secondary)' }
                  : {}
              }
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Color preview bar — no border per no-line rule */}
      <div
        className="h-6 rounded-2xl w-full"
        style={previewStyle}
      />

      {!isGradient ? (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value.color}
            onChange={(e) => onChange({ ...value, color: e.target.value })}
            className="h-9 w-12 cursor-pointer rounded-xl"
            style={{ border: 'var(--border-ghost)' }}
          />
          <input
            type="text"
            value={value.color}
            onChange={(e) => onChange({ ...value, color: e.target.value })}
            className="flex-1 px-3 py-2 rounded-2xl bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            style={{ border: 'var(--border-ghost)' }}
            placeholder="#000000"
          />
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {/* Linear / Radial chip toggle */}
          <div className="flex gap-1.5">
            {(['linear', 'radial'] as GradientType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  onChange({ ...value, gradient: { ...value.gradient, type: t } })
                }
                className={`flex-1 py-1.5 text-xs rounded-full font-medium transition-all cursor-pointer ${
                  value.gradient.type === t
                    ? 'text-on-secondary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
                style={
                  value.gradient.type === t
                    ? { background: 'var(--secondary)' }
                    : {}
                }
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Rotation (linear only) */}
          {value.gradient.type === 'linear' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-on-surface">Rotation</label>
                <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                  {value.gradient.rotation}deg
                </span>
              </div>
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
              />
            </div>
          )}

          {/* Color stops */}
          <div className="grid grid-cols-2 gap-3">
            {([0, 1] as const).map((i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  {i === 0 ? 'Start' : 'End'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={value.gradient.colorStops[i].color}
                    onChange={(e) => updateGradientColor(i, e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded-xl shrink-0"
                    style={{ border: 'var(--border-ghost)' }}
                  />
                  <input
                    type="text"
                    value={value.gradient.colorStops[i].color}
                    onChange={(e) => updateGradientColor(i, e.target.value)}
                    className="flex-1 min-w-0 px-2 py-1.5 rounded-xl bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                    style={{ border: 'var(--border-ghost)' }}
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
