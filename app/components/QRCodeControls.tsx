import ColorPicker from './ColorPicker';
import LogoUpload from './LogoUpload';
import SliderInput from './SliderInput';

interface QRCodeControlsProps {
  text: string;
  dotColor: string;
  backgroundColor: string;
  logo: string | null;
  logoSize: number;
  padding: number;
  onTextChange: (text: string) => void;
  onDotColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  onLogoSizeChange: (size: number) => void;
  onPaddingChange: (padding: number) => void;
}

export default function QRCodeControls({
  text,
  dotColor,
  backgroundColor,
  logo,
  logoSize,
  padding,
  onTextChange,
  onDotColorChange,
  onBackgroundColorChange,
  onLogoUpload,
  onLogoRemove,
  onLogoSizeChange,
  onPaddingChange,
}: QRCodeControlsProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Customization
      </h2>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          QR Code Content
        </label>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter text or URL"
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          maxLength={1000}
        />
        <div className="mt-1 text-right text-xs text-zinc-500 dark:text-zinc-400">
          {text.length} / 1000
        </div>
      </div>

      {/* Pattern Color and Background Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorPicker
          label="Pattern Color"
          value={dotColor}
          onChange={onDotColorChange}
          placeholder="#000000"
        />
        <ColorPicker
          label="Background Color"
          value={backgroundColor}
          onChange={onBackgroundColorChange}
          placeholder="#FFFFFF"
        />
      </div>

      <LogoUpload
        logo={logo}
        logoSize={logoSize}
        onLogoUpload={onLogoUpload}
        onLogoRemove={onLogoRemove}
        onLogoSizeChange={onLogoSizeChange}
      />

      <SliderInput
        label="Margin Size"
        value={padding}
        min={0}
        max={50}
        onChange={onPaddingChange}
      />
    </div>
  );
}

