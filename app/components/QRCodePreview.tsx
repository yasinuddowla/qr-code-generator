'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Download, ChevronDown } from 'lucide-react';
import type QRCodeStylingType from 'qr-code-styling';
import { QRConfig } from '../types';
import { buildQROptions } from '../utils/buildQROptions';

interface Props {
  config: QRConfig;
  isGenerating?: boolean;
}

const FORMATS = ['SVG', 'PNG', 'JPG'] as const;
type Format = typeof FORMATS[number];

export default function QRCodePreview({ config, isGenerating = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStylingType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<Format>('PNG');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleDownload() {
    if (!qrInstanceRef.current) return;
    const fmt = selectedFormat.toLowerCase() as 'svg' | 'png' | 'jpg';
    const extension = fmt === 'jpg' ? 'jpeg' : fmt;
    qrInstanceRef.current.download({
      name: 'qr-code',
      extension: extension as 'svg' | 'png' | 'jpeg',
    });
  }

  const hasText = config.text.trim().length > 0;

  return (
    <div
      className="rounded-4xl p-5 sm:p-8 flex flex-col"
      style={{
        background: 'rgba(252, 249, 248, 0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-ambient)',
      }}
    >

      {/* QR canvas — surface-container-lowest (white) as the illuminated output area */}
      <div
        className="relative flex items-center justify-center flex-1 min-h-[260px] rounded-3xl p-4 sm:p-8"
        style={{
          background: 'var(--surface-container-lowest)',
          boxShadow: '0px 20px 50px rgba(28, 27, 27, 0.05)',
        }}
      >
        {(isLoading || isGenerating) && hasText && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-3xl z-10"
            style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}
          >
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}
        {hasText ? (
          <div ref={containerRef} className="[&>svg]:max-w-full [&>canvas]:max-w-full" style={{ lineHeight: 0, maxWidth: '100%' }} />
        ) : (
          <p className="text-on-surface-variant text-center text-sm" style={{ lineHeight: 1.6 }}>
            Enter text or URL to generate a QR code
          </p>
        )}
      </div>

      {/* Download row: label — format dropdown — download button */}
      {hasText && (
        <div className="mt-6 flex items-center gap-3">

          {/* Format dropdown */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-full px-4 py-2 rounded-full text-xs font-semibold text-on-surface flex items-center justify-between gap-2 cursor-pointer transition-colors hover:bg-surface-container-high bg-surface-container"
              style={{ border: 'var(--border-ghost)' }}
            >
              {selectedFormat}
              <ChevronDown size={13} className={`transition-transform shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute left-0 bottom-full mb-1.5 w-full rounded-2xl overflow-hidden z-20"
                style={{
                  background: 'var(--surface-container-lowest)',
                  boxShadow: '0px 8px 24px rgba(28,27,27,0.12)',
                  border: 'var(--border-ghost)',
                }}
              >
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => { setSelectedFormat(fmt); setDropdownOpen(false); }}
                    className={`w-full px-4 py-2 text-xs font-semibold text-left transition-colors cursor-pointer ${
                      selectedFormat === fmt
                        ? 'text-primary bg-surface-container'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-full font-semibold text-xs text-on-primary transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer flex items-center gap-1.5 shrink-0"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Download size={12} />
            Download
          </button>
        </div>
      )}
    </div>
  );
}
