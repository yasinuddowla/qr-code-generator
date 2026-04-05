import { QRConfig, ColorConfig } from '../types';

function buildColorOption(colorConfig: ColorConfig) {
  if (colorConfig.mode === 'solid') {
    return { color: colorConfig.color };
  }
  return {
    gradient: {
      type: colorConfig.gradient.type,
      rotation: (colorConfig.gradient.rotation * Math.PI) / 180,
      colorStops: colorConfig.gradient.colorStops,
    },
  };
}

export function buildQROptions(config: QRConfig) {
  return {
    width: 250,
    height: 250,
    type: 'svg' as const,
    data: config.text || ' ',
    margin: config.margin,
    qrOptions: {
      errorCorrectionLevel: 'H' as const,
    },
    dotsOptions: {
      type: config.dotStyle,
      ...buildColorOption(config.dotColor),
    },
    backgroundOptions: {
      ...buildColorOption(config.backgroundColor),
      round: config.backgroundRoundness / 50,
    },
    cornersSquareOptions: {
      type: config.markerBorderStyle,
      ...buildColorOption(config.markerBorderColor),
    },
    cornersDotOptions: {
      type: config.markerCenterStyle,
      ...buildColorOption(config.markerCenterColor),
    },
    ...(config.logo
      ? {
          image: config.logo,
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: config.logoSize / 100,
            margin: 5,
          },
        }
      : {}),
  };
}
