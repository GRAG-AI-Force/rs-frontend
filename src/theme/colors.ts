export const colors = {
  // Brand Primary & Accent Palette
  primary: '#00A896',        // Deep Teal / Cyan
  primaryDark: '#028090',    // Dark Cyan
  primaryLight: '#E0F2F1',   // Light Mint tint
  secondary: '#05668D',      // Deep Ocean Blue
  secondaryLight: '#EBF4F6', // Soft ocean tint
  accent: '#02C39A',         // Emerald / Fresh Mint
  accentLight: '#D8F3DC',    // Pastel mint

  // Neutral Palette (Dark Slate to Pure White)
  background: '#F8FAFC',     // Clean slate off-white background
  surface: '#FFFFFF',        // Pure white container surface
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text Colors
  text: '#0F172A',           // Dark slate primary text
  textSecondary: '#475569',  // Medium slate body text
  textMuted: '#94A3B8',      // Light slate caption text
  textDisabled: '#CBD5E1',   // Disabled state text
  textInverse: '#FFFFFF',    // White text on dark background

  // System & Feedback States
  success: '#10B981',        // Emerald success
  successBackground: '#D1FAE5',
  warning: '#F59E0B',        // Amber warning
  warningBackground: '#FEF3C7',
  error: '#EF4444',          // Soft Red error
  errorBackground: '#FEE2E2',
  info: '#3B82F6',           // Bright Blue info
  infoBackground: '#DBEAFE',

  // Borders, Dividers & Outlines
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  divider: '#F1F5F9',
  inputBackground: '#F8FAFC',
  inputBorder: '#E2E8F0',
  inputFocusedBorder: '#00A896',

  // Special Respiratory Metrics Colors
  aqiGood: '#10B981',       // Good Air Quality
  aqiModerate: '#F59E0B',   // Moderate
  aqiUnhealthy: '#EF4444',  // Unhealthy
  spo2Normal: '#00A896',    // Oxygen Saturation normal
  bpmNormal: '#3B82F6',     // Respiratory rate normal

  // Overlays & Translucency
  overlay: 'rgba(15, 23, 42, 0.5)',
  shimmer: '#E2E8F0',
};

export type Colors = typeof colors;
