export default function Header() {
  return (
    <div className="mb-14">
      <p className="text-sm font-semibold tracking-widest uppercase text-on-surface-variant mb-3">
        Free &amp; Open Source
      </p>
      <h1
        className="text-5xl font-extrabold text-on-surface mb-4"
        style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        QR Code
        <br />
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'var(--gradient-primary)' }}
        >
          Generator
        </span>
      </h1>
      <p className="text-base text-on-surface-variant max-w-md" style={{ lineHeight: 1.65 }}>
        Create beautiful, customizable QR codes with colors, gradients, and logos.
      </p>
    </div>
  );
}
