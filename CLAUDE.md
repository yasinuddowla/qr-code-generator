# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server (localhost:3000)
pnpm build    # Production build (static export to /out)
pnpm lint     # Run ESLint
pnpm start    # Run production server
```

No test suite is configured.

## Architecture

This is a static Next.js (v16) single-page app for customizing and downloading QR codes. All components use `'use client'` and the output is a fully static site (`output: 'export'` in next.config).

**State lives entirely in `app/page.tsx`** as a single `QRConfig` object, passed down via props -- no external state management.

```
page.tsx (QRConfig state owner)
├── QRCodeControls  -- tab-based control panel, calls onChange(newConfig)
│   ├── GradientColorPicker  -- reused 4x for dot/marker/bg colors
│   ├── SelectInput, SliderInput, LogoUpload
└── QRCodePreview   -- renders QR and handles downloads
```

**Key files:**
- `app/types.ts` -- all TypeScript interfaces (`QRConfig`, `ColorConfig`, `DotType`, etc.) and default factory functions
- `app/utils/buildQROptions.ts` -- transforms `QRConfig` into `qr-code-styling` library options
- `app/components/QRCodePreview.tsx` -- dynamically imports `qr-code-styling`, renders into a div, exposes download (SVG/PNG/JPG)

**Data flow:**
1. User changes a control -> `QRCodeControls` calls `onChange(newConfig)`
2. `page.tsx` updates state -> config flows to `QRCodePreview` via props
3. `useEffect` in preview re-renders QR on every config change using a dynamic import of `qr-code-styling`

**`QRConfig` shape (abridged):**
```typescript
{
  text: string                       // QR content (max 1000 chars)
  dotStyle: DotType                  // square | dots | rounded | classy | classy-rounded | extra-rounded
  dotColor: ColorConfig              // solid or gradient
  markerBorderStyle: CornerSquareType
  markerBorderColor: ColorConfig
  markerCenterStyle: CornerDotType
  markerCenterColor: ColorConfig
  backgroundColor: ColorConfig
  backgroundRoundness: number        // 0-50
  margin: number                     // 0-50
  logo: string | null                // base64 data URL
  logoSize: number                   // 10-40 (%)
}

// ColorConfig supports both solid and two-stop gradients (linear/radial)
```

## Styling

Tailwind CSS v4 with PostCSS. Custom theme variables in `app/globals.css`. Dark mode is supported throughout via `dark:` utilities.
