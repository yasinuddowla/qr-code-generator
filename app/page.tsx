'use client';

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeControls from './components/QRCodeControls';
import QRCodePreview from './components/QRCodePreview';
import { QRConfig, defaultConfig } from './types';

export default function Home() {
  const [config, setConfig] = useState<QRConfig>(defaultConfig);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleGenerate() {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 800);
  }

  return (
    <div className="relative min-h-screen bg-surface overflow-hidden">
      {/* Decorative ambient blobs */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, #f27457 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 w-[520px] h-[520px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #f5ddb5 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #a53b23 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-14">
        <Header />

        {/* Asymmetrical layout: controls left, preview right (sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
          <QRCodeControls config={config} onChange={setConfig} onGenerate={handleGenerate} />
          <div className="lg:sticky lg:top-10">
            <QRCodePreview config={config} isGenerating={isGenerating} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
