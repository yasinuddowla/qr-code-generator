'use client';

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeControls from './components/QRCodeControls';
import QRCodePreview from './components/QRCodePreview';
import { QRConfig, defaultConfig } from './types';

export default function Home() {
  const [config, setConfig] = useState<QRConfig>(defaultConfig);

  return (
    <div className="bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QRCodeControls config={config} onChange={setConfig} />
          <QRCodePreview config={config} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
