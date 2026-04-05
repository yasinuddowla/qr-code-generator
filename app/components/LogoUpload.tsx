import Image from 'next/image';

interface LogoUploadProps {
  logo: string | null;
  logoSize: number;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  onLogoSizeChange: (size: number) => void;
}

export default function LogoUpload({
  logo,
  logoSize,
  onLogoUpload,
  onLogoRemove,
  onLogoSizeChange,
}: LogoUploadProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-2">
        Logo (Optional)
      </label>
      {!logo ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={onLogoUpload}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="block w-full px-4 py-4 rounded-2xl text-center cursor-pointer text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low"
            style={{
              border: 'var(--border-ghost-dashed)',
            }}
          >
            Click to upload logo
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative inline-block">
            {logo && (
              <Image
                src={logo}
                alt="Logo preview"
                width={96}
                height={96}
                className="max-w-24 max-h-24 object-contain rounded-2xl"
                style={{ border: 'var(--border-ghost)' }}
                unoptimized
              />
            )}
            <button
              onClick={onLogoRemove}
              className="absolute -top-2 -right-2 bg-primary text-on-primary rounded-full w-6 h-6 flex items-center justify-center text-xs hover:opacity-80 transition-opacity cursor-pointer"
            >
              ×
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-on-surface">Logo Size</label>
              <span className="text-xs font-medium text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
                {logoSize}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={logoSize}
              onChange={(e) => onLogoSizeChange(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}
