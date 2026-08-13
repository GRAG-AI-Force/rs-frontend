import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';
import { PrimaryButton } from '../buttons/PrimaryButton';

export interface EmptyViewProps {
  title?: string;
  message?: string;
  iconName?: string;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyView: React.FC<EmptyViewProps> = ({
  title = 'No Data Found',
  message = 'There is currently no information available in this section.',
  iconName = 'info',
  actionTitle,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Icon name={iconName} size={32} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionTitle && onActionPress && (
        <PrimaryButton title={actionTitle} onPress={onActionPress} style={styles.button} />
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
    backgroundColor: theme.colors.primaryLight,
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
