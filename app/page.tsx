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
      {/* Decorative gradient blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, var(--primary-container) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, var(--secondary-container) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-14">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <QRCodeControls config={config} onChange={setConfig} onGenerate={handleGenerate} />
          <QRCodePreview config={config} isGenerating={isGenerating} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
