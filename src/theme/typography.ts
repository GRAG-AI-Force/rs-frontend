import { TextStyle } from 'react-native';

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  h3: 28,
  h2: 32,
  h1: 36,
  display: 42,
};

export const fontWeights: { [key: string]: TextStyle['fontWeight'] } = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
};

export const typography = {
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.h1 * lineHeights.tight,
    letterSpacing: -0.5,
  } as TextStyle,

  display: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display * lineHeights.tight,
    letterSpacing: -1,
  } as TextStyle,

  h2: {
    fontSize: fontSizes.h2,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.h2 * lineHeights.tight,
    letterSpacing: -0.3,
  } as TextStyle,

  h3: {
    fontSize: fontSizes.h3,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.h3 * lineHeights.tight,
  } as TextStyle,

  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xxl * lineHeights.normal,
  } as TextStyle,

  subtitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.xl * lineHeights.normal,
  } as TextStyle,

  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.md * lineHeights.relaxed,
  } as TextStyle,

  bodyMedium: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.md * lineHeights.normal,
  } as TextStyle,

  bodyBold: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.md * lineHeights.normal,
  } as TextStyle,

  caption: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * lineHeights.normal,
  } as TextStyle,

  captionMedium: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.sm * lineHeights.normal,
  } as TextStyle,

  small: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xs * lineHeights.normal,
  } as TextStyle,

  button: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.2,
  } as TextStyle,
};

export type Typography = typeof typography;
