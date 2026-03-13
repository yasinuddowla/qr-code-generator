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
  { id: 'dots', label: 'Dots' },
  { id: 'markers', label: 'Markers' },
  { id: 'background', label: 'Background' },
  { id: 'logo', label: 'Logo' },
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
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 flex flex-col">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Customization
      </h2>

      {/* Tab navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-5 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
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
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              QR Code Content
            </label>
            <textarea
              value={config.text}
              onChange={(e) => update({ text: e.target.value })}
              placeholder="Enter text or URL"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={5}
              maxLength={1000}
            />
            <div className="mt-1 text-right text-xs text-zinc-500 dark:text-zinc-400">
              {config.text.length} / 1000
            </div>
          </div>
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
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
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

            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
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
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Logo size is a percentage of the QR code area.
            </p>
          </>
        )}
      </div>

      {/* Generate + Reset buttons */}
      <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-700 flex gap-3">
        <button
          onClick={() => onChange({ ...createDefaultConfig(), text: config.text })}
          title="Reset all settings to default"
          className="cursor-pointer px-4 py-3 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          onClick={onGenerate}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2"
        >
          Generate QR Code
        </button>
      </div>
    </div>
  );
}
