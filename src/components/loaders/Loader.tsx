import React from 'react';
import { StyleSheet, View, ActivityIndicator, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = theme.colors.primary,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} testID="app-activity-loader" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
