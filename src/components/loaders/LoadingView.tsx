import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../../theme';
import { Loader } from './Loader';

export interface LoadingViewProps {
  message?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ message = 'Loading Respore Sence...' }) => {
  return (
    <View style={styles.container}>
      <Loader size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  message: {
    ...theme.typography.captionMedium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
});
