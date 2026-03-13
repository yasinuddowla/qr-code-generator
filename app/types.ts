export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type GradientType = 'linear' | 'radial';

export interface ColorStop {
  offset: number;
  color: string;
}

export interface GradientConfig {
  type: GradientType;
  rotation: number; // degrees 0-360
  colorStops: [ColorStop, ColorStop];
}

export interface ColorConfig {
  mode: 'solid' | 'gradient';
  color: string;
  gradient: GradientConfig;
}

export interface QRConfig {
  text: string;
  margin: number;
  backgroundRoundness: number; // 0-50, applied as border-radius % on the container
  dotStyle: DotType;
  dotColor: ColorConfig;
  markerBorderStyle: CornerSquareType;
  markerBorderColor: ColorConfig;
  markerCenterStyle: CornerDotType;
  markerCenterColor: ColorConfig;
  backgroundColor: ColorConfig;
  logo: string | null;
  logoSize: number; // 10-40 (percent of QR size)
}

export function makeColorConfig(color: string): ColorConfig {
  return {
    mode: 'solid',
    color,
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color },
        { offset: 1, color: '#888888' },
      ],
    },
  };
}

export const defaultConfig: QRConfig = {
  text: 'https://example.com',
  margin: 5,
  backgroundRoundness: 0,
  dotStyle: 'square',
  dotColor: makeColorConfig('#000000'),
  markerBorderStyle: 'square',
  markerBorderColor: makeColorConfig('#000000'),
  markerCenterStyle: 'square',
  markerCenterColor: makeColorConfig('#000000'),
  backgroundColor: makeColorConfig('#FFFFFF'),
  logo: null,
  logoSize: 20,
};
