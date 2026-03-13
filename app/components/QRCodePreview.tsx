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
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 flex flex-col">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Preview</h2>

      <div className="relative flex items-center justify-center flex-1 min-h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg p-8">
        {(isLoading || isGenerating) && hasText && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/80 dark:bg-zinc-900/80 rounded-lg z-10">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        )}
        {hasText ? (
          <div
            ref={containerRef}
            style={{
              borderRadius: `${config.backgroundRoundness}%`,
              overflow: 'hidden',
              lineHeight: 0,
            }}
          />
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-center text-sm">
            Enter text or URL to generate a QR code
          </p>
        )}
      </div>

      {hasText && (
        <div className="mt-6 flex justify-end gap-3">
          {(['svg', 'png', 'jpg'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleDownload(fmt)}
              className="px-4 py-2 rounded-lg font-medium transition-colors text-sm cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
