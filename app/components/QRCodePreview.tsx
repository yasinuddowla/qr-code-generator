'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type QRCodeStylingType from 'qr-code-styling';
import { QRConfig } from '../types';
import { buildQROptions } from '../utils/buildQROptions';

interface Props {
  config: QRConfig;
  isGenerating?: boolean;
}

export default function QRCodePreview({ config, isGenerating = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStylingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    setIsLoading(true);
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const options = buildQROptions(config);
      qrInstanceRef.current = new QRCodeStyling(options);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        qrInstanceRef.current.append(containerRef.current);
      }
      setIsLoading(false);
    });
  }, [config]);

  function handleDownload(format: 'svg' | 'png' | 'jpg') {
    if (!qrInstanceRef.current) return;
    const extension = format === 'jpg' ? 'jpeg' : format;
    qrInstanceRef.current.download({
      name: 'qr-code',
      extension: extension as 'svg' | 'png' | 'jpeg',
    });
  }

  const hasText = config.text.trim().length > 0;

  return (
    <div
      className="bg-surface-container-lowest rounded-4xl p-12 flex flex-col"
      style={{ boxShadow: 'var(--shadow-ambient)' }}
    >
      <h2
        className="text-2xl font-bold text-on-surface mb-6"
        style={{ letterSpacing: '-0.01em' }}
      >
        Preview
      </h2>

      <div className="relative flex items-center justify-center flex-1 min-h-[300px] bg-surface-container-low rounded-4xl p-8">
        {(isLoading || isGenerating) && hasText && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container-low/80 rounded-4xl z-10">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}
        {hasText ? (
          <div
            ref={containerRef}
            style={{ lineHeight: 0 }}
          />
        ) : (
          <p className="text-on-surface-variant text-center text-sm" style={{ lineHeight: 1.6 }}>
            Enter text or URL to generate a QR code
          </p>
        )}
      </div>

      {hasText && (
        <div className="mt-8 flex justify-end gap-2.5">
          {(['svg', 'png', 'jpg'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleDownload(fmt)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm text-on-primary transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
