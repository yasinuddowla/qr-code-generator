'use client';

import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeControls from './components/QRCodeControls';
import QRCodePreview from './components/QRCodePreview';
import { downloadQRCode } from './utils/downloadQRCode';

export default function Home() {
  const [text, setText] = useState('https://example.com');
  const [dotColor, setDotColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(50);
  const [padding, setPadding] = useState(10);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = useCallback(async () => {
    await downloadQRCode(qrRef);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QRCodeControls
            text={text}
            dotColor={dotColor}
            backgroundColor={backgroundColor}
            logo={logo}
            logoSize={logoSize}
            padding={padding}
            onTextChange={setText}
            onDotColorChange={setDotColor}
            onBackgroundColorChange={setBackgroundColor}
            onLogoUpload={handleLogoUpload}
            onLogoRemove={() => setLogo(null)}
            onLogoSizeChange={setLogoSize}
            onPaddingChange={setPadding}
            onDownload={handleDownload}
          />

          <QRCodePreview
            ref={qrRef}
            text={text}
            dotColor={dotColor}
            backgroundColor={backgroundColor}
            logo={logo}
            logoSize={logoSize}
            padding={padding}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
