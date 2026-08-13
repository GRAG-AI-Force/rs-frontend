import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
      style={[
        styles.button,
        isInteractionDisabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={isInteractionDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: isInteractionDisabled }}>
      {loading ? (
        <ActivityIndicator color={theme.colors.textInverse} size="small" testID="button-loader" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: theme.dimensions.buttonHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    ...theme.shadows.small,
  },
  disabledButton: {
    backgroundColor: theme.colors.textDisabled,
    elevation: 0,
  },
  text: {
    ...theme.typography.button,
    color: theme.colors.textInverse,
  },
});
