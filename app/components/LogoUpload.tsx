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
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
            className="block w-full px-4 py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-zinc-600 dark:text-zinc-400"
          >
            Click to upload logo
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative inline-block">
            {logo && (
              <Image
                src={logo}
                alt="Logo preview"
                width={96}
                height={96}
                className="max-w-24 max-h-24 object-contain rounded-lg border border-zinc-300 dark:border-zinc-600"
                unoptimized
              />
            )}
            <button
              onClick={onLogoRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">
              Logo Size: {logoSize}px
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={logoSize}
              onChange={(e) => onLogoSizeChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

