import React from 'react';
import { Text, TextStyle } from 'react-native';
import { theme } from '../../theme';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

const ICON_MAP: Record<string, string> = {
  air: '🌬️',
  pulse: '🫀',
  heartbeat: '🫁',
  droplet: '💧',
  search: '🔍',
  bell: '🔔',
  user: '👤',
  home: '🏠',
  settings: '⚙️',
  chevronRight: '›',
  chevronLeft: '‹',
  check: '✓',
  close: '✕',
  alert: '⚠️',
  info: 'ℹ️',
  shield: '🛡️',
  battery: '🔋',
  wifi: '📶',
  edit: '✏️',
  lock: '🔒',
  mail: '✉️',
  phone: '📞',
  logout: '🚪',
  refresh: '🔄',
  filter: '🌪️',
  eye: '👁️',
  eyeOff: '🙈',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = theme.colors.text,
  style,
}) => {
  const glyph = ICON_MAP[name] || '•';

  return (
    <Text
      accessibilityLabel={`Icon ${name}`}
      style={[
        {
          fontSize: size,
          color: color,
          textAlign: 'center',
          includeFontPadding: false,
        },
        style,
      ]}>
      {glyph}
    </Text>
  );
};
