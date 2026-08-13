import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
}) => {
  const cardStyles = [
    styles.base,
    variant === 'default' && styles.default,
    variant === 'outlined' && styles.outlined,
    variant === 'flat' && styles.flat,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.xs,
  },
  default: {
    ...theme.shadows.medium,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  flat: {
    backgroundColor: theme.colors.surfaceElevated,
  },
});
