import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';

export interface ProfileItemProps {
  iconName: string;
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}

export const ProfileItem: React.FC<ProfileItemProps> = ({
  iconName,
  title,
  subtitle,
  rightElement,
  onPress,
  destructive = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress && !rightElement}
      activeOpacity={0.7}>
      <View
        style={[
          styles.iconContainer,
          destructive && styles.destructiveIconContainer,
        ]}>
        <Icon
          name={iconName}
          size={18}
          color={destructive ? theme.colors.error : theme.colors.primary}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, destructive && styles.destructiveTitle]}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {rightElement ? (
        rightElement
      ) : onPress ? (
        <Icon name="chevronRight" size={18} color={theme.colors.textMuted} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  destructiveIconContainer: {
    backgroundColor: theme.colors.errorBackground,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
  },
  destructiveTitle: {
    color: theme.colors.error,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});
