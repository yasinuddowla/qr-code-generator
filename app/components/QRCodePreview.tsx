import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { downloadQRCode, DownloadFormat } from '../utils/downloadQRCode';

interface QRCodePreviewProps {
  text: string;
  dotColor: string;
  backgroundColor: string;
  logo: string | null;
  logoSize: number;
  padding: number;
  qrRef: React.RefObject<HTMLDivElement | null>;
}

const QRCodePreview = forwardRef<HTMLDivElement, QRCodePreviewProps>(
  ({ text, dotColor, backgroundColor, logo, logoSize, padding, qrRef }, ref) => {
    const handleDownload = async (format: DownloadFormat) => {
      await downloadQRCode(qrRef, format);
    };

    return (
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Preview
        </h2>
        <div className="flex items-center justify-center min-h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg p-8">
          {text.trim() ? (
            <div ref={ref} className="inline-block">
              <QRCodeSVG
                value={text}
                size={300}
                bgColor={backgroundColor}
                fgColor={dotColor}
                level="H"
                marginSize={padding}
                imageSettings={
                  logo
                    ? {
                        src: logo,
                        height: logoSize,
                        width: logoSize,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 text-center">
              Enter text or URL to generate QR code
            </p>
          )}
        </div>
        
        {/* Download Buttons */}
        {text.trim() && (
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => handleDownload('svg')}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-sm"
            >
              SVG
            </button>
            <button
              onClick={() => handleDownload('png')}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-sm"
            >
              PNG
            </button>
            <button
              onClick={() => handleDownload('jpg')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              JPG
            </button>
          </div>
        )}
      </div>
    );
  }
);

QRCodePreview.displayName = 'QRCodePreview';

export default QRCodePreview;

