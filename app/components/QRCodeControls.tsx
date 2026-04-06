'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { QRConfig, DotType, CornerSquareType, CornerDotType, createDefaultConfig } from '../types';
import GradientColorPicker from './GradientColorPicker';
import SelectInput from './SelectInput';
import SliderInput from './SliderInput';
import LogoUpload from './LogoUpload';

const DOT_STYLE_OPTIONS = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

const MARKER_BORDER_OPTIONS = [
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Rounded' },
  { value: 'dot', label: 'Dot' },
];

const MARKER_CENTER_OPTIONS = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'logo', label: 'Logo' },
  { id: 'dots', label: 'Dots' },
  { id: 'markers', label: 'Markers' },
  { id: 'background', label: 'Background' },
];

interface Props {
  config: QRConfig;
  onChange: (config: QRConfig) => void;
  onGenerate: () => void;
}

export default function QRCodeControls({ config, onChange, onGenerate }: Props) {
  const [activeTab, setActiveTab] = useState('content');

  function update(partial: Partial<QRConfig>) {
    onChange({ ...config, ...partial });
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => update({ logo: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div
      className="rounded-4xl p-5 sm:p-7 flex flex-col"
      style={{
        background: 'rgba(252, 249, 248, 0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-ambient)',
      }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold text-on-surface mb-5"
        style={{ letterSpacing: '-0.02em' }}
      >
        Customize Appearance
      </h2>

      {/* Chip tab navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'text-on-secondary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
            style={
              activeTab === tab.id
                ? { background: 'var(--secondary)' }
                : {}
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 space-y-5">

        {/* ---- Content ---- */}
        {activeTab === 'content' && (
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">
              QR Code Content
            </label>
            <textarea
              value={config.text}
              onChange={(e) => update({ text: e.target.value })}
              placeholder="Enter text or URL"
              className="w-full px-4 py-3 rounded-2xl bg-surface-container text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm"
              style={{ border: 'var(--border-ghost)', lineHeight: 1.6 }}
              rows={5}
              maxLength={1000}
            />
            <div className="mt-1.5 text-right text-xs text-on-surface-variant">
              {config.text.length} / 1000
            </div>
          </div>
        )}

        {/* ---- Logo ---- */}
        {activeTab === 'logo' && (
          <>
            <LogoUpload
              logo={config.logo}
              logoSize={config.logoSize}
              onLogoUpload={handleLogoUpload}
              onLogoRemove={() => update({ logo: null })}
              onLogoSizeChange={(v) => update({ logoSize: v })}
            />
            <p className="text-xs text-on-surface-variant">
              Logo size is a percentage of the QR code area.
            </p>
          </>
        )}

        {/* ---- Dots ---- */}
        {activeTab === 'dots' && (
          <>
            <SelectInput
              label="Dot Style"
              value={config.dotStyle}
              options={DOT_STYLE_OPTIONS}
              onChange={(v) => update({ dotStyle: v as DotType })}
            />
            <GradientColorPicker
              label="Dot Color"
              value={config.dotColor}
              onChange={(v) => update({ dotColor: v })}
            />
          </>
        )}

        {/* ---- Markers ---- */}
        {activeTab === 'markers' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  Border (outer square)
                </p>
                <SelectInput
                  label="Border Style"
                  value={config.markerBorderStyle}
                  options={MARKER_BORDER_OPTIONS}
                  onChange={(v) => update({ markerBorderStyle: v as CornerSquareType })}
                />
                <GradientColorPicker
                  label="Border Color"
                  value={config.markerBorderColor}
                  onChange={(v) => update({ markerBorderColor: v })}
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  Center (inner dot)
                </p>
                <SelectInput
                  label="Center Style"
                  value={config.markerCenterStyle}
                  options={MARKER_CENTER_OPTIONS}
                  onChange={(v) => update({ markerCenterStyle: v as CornerDotType })}
                />
                <GradientColorPicker
                  label="Center Color"
                  value={config.markerCenterColor}
                  onChange={(v) => update({ markerCenterColor: v })}
                />
              </div>
            </div>
          </>
        )}

        {/* ---- Background ---- */}
        {activeTab === 'background' && (
          <>
            <GradientColorPicker
              label="Background Color"
              value={config.backgroundColor}
              onChange={(v) => update({ backgroundColor: v })}
            />
            <SliderInput
              label="Background Roundness"
              value={config.backgroundRoundness}
              min={0}
              max={50}
              onChange={(v) => update({ backgroundRoundness: v })}
              unit="%"
            />
            <SliderInput
              label="Margin Size"
              value={config.margin}
              min={0}
              max={50}
              onChange={(v) => update({ margin: v })}
              unit=""
            />
          </>
        )}
      </div>

      {/* Generate + Reset buttons */}
      <div className="mt-7 flex gap-3">
        <button
          onClick={() => onChange({ ...createDefaultConfig(), text: config.text })}
          title="Reset all settings to default"
          className="cursor-pointer px-5 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
        >
          <RotateCcw size={15} />
          Reset
        </button>
        <button
          onClick={onGenerate}
          className="flex-1 py-3 rounded-full font-semibold text-sm text-on-primary transition-opacity hover:opacity-90 active:opacity-80 flex items-center justify-center gap-2 cursor-pointer"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Generate QR Code
        </button>
      </div>
    </div>
  );
}
