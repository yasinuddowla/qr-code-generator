# QR Code Generator

A beautiful, customizable QR code generator built with Next.js 16, React 19, and TypeScript. Create professional QR codes with custom colors, logos, and margin sizes.

Created by [Yasin Uddowla](https://yasinuddowla.com)

## Features

- **Dot Styles**: Choose from Square, Dots, Rounded, Classy, Classy Rounded, or Extra Rounded dot patterns
- **Dot Color**: Solid or gradient color for QR dots
- **Marker Customization**: Independently style the border (outer square) and center (inner dot) of corner markers
- **Marker Colors**: Separate solid or gradient colors for marker border and center
- **Background Color**: Solid or gradient background with adjustable roundness (0-50%)
- **Margin Control**: Adjust QR code margin size (0-50)
- **Logo Support**: Upload a logo and adjust its size as a percentage of the QR code area
- **Download**: Download QR codes as PNG images
- **Dark Mode**: Beautiful dark mode support
- **Responsive**: Works perfectly on all devices
- **Fast**: Built with Next.js 16 for optimal performance

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **QR Code**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qr-code-generator
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your text or URL in the "QR Code Content" field (max 1000 characters)
2. Customize the pattern color and background color
3. (Optional) Upload a logo and adjust its size
4. Adjust the margin size to your preference
5. Preview your QR code in real-time
6. Click "Download QR Code" to save as PNG


## Building for Production

```bash
pnpm build
pnpm start
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Yasin Uddowla**
- Website: [yasinuddowla.com](https://yasinuddowla.com)
- GitHub: [@yasinuddowla](https://github.com/yasinuddowla)

## Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ by [Yasin Uddowla](https://yasinuddowla.com)
