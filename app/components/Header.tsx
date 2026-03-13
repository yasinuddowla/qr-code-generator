import Image from "next/image";

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-3 mb-2">
        <Image
          src="/qr-code-generator-logo.jpeg"
          alt="QR Code Generator Logo"
          width={48}
          height={48}
          className="rounded-lg"
        />
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          QR Code Generator
        </h1>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">
        Create beautiful, customizable QR codes with customization options.
      </p>
    </div>
  );
}

