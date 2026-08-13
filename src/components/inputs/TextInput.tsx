import React, { ReactNode, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../../theme';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          !!error && styles.inputWrapperError,
        ]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <RNTextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={theme.colors.textMuted}
          onFocus={e => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...restProps}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.xs,
  },
  label: {
    ...theme.typography.captionMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xxs,
  },
  inputWrapper: {
    height: theme.dimensions.inputHeight,
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  inputWrapperFocused: {
    borderColor: theme.colors.inputFocusedBorder,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  inputWrapperError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
    paddingVertical: 0,
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
  },
  errorText: {
    ...theme.typography.small,
    color: theme.colors.error,
    marginTop: theme.spacing.xxs,
  },
});
