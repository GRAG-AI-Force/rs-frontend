import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';
import { PrimaryButton } from '../buttons/PrimaryButton';

export interface ErrorViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  title = 'Connection Error',
  message = 'Unable to fetch data from Respore Sence telemetry servers. Please check your network.',
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Icon name="alert" size={32} color={theme.colors.error} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <PrimaryButton title="Retry Connection" onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.errorBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 20,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  message: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  button: {
    minWidth: 160,
  },
});
