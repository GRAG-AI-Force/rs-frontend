import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

export interface OutlineButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const isInteractionDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isInteractionDisabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={isInteractionDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}>
      {loading ? (
        <ActivityIndicator color={theme.colors.primary} size="small" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: theme.dimensions.buttonHeight,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  disabledButton: {
    borderColor: theme.colors.textDisabled,
  },
  text: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
});
