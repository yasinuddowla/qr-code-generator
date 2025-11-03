import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodePreviewProps {
  text: string;
  dotColor: string;
  backgroundColor: string;
  logo: string | null;
  logoSize: number;
  padding: number;
}

const QRCodePreview = forwardRef<HTMLDivElement, QRCodePreviewProps>(
  ({ text, dotColor, backgroundColor, logo, logoSize, padding }, ref) => {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Preview
        </h2>
        <div className="flex items-center justify-center min-h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-lg p-8">
          {text.trim() ? (
            <div ref={ref} className="inline-block">
              <QRCodeSVG
                value={text}
                size={400}
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
      </div>
    );
  }
);

QRCodePreview.displayName = 'QRCodePreview';

export default QRCodePreview;

