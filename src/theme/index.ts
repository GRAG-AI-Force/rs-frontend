import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { dimensions } from './dimensions';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';

export const theme = {
  colors,
  typography,
  spacing,
  dimensions,
  shadows,
  borderRadius,
};

export type Theme = typeof theme;
export { colors, typography, spacing, dimensions, shadows, borderRadius };
