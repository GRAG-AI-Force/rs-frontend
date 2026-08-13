import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';

export interface SuccessMessageProps {
  message: string;
  style?: ViewStyle;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name="check" size={18} color={theme.colors.success} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.success + '40',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  text: {
    ...theme.typography.captionMedium,
    color: theme.colors.text,
    flex: 1,
  },
});
