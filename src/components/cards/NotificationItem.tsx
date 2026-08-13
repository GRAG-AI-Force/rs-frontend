import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AppNotification } from '../../types/notification';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';
import { formatDate } from '../../utils/formatters';

export interface NotificationItemProps {
  notification: AppNotification;
  onPress?: () => void;
  onMarkRead?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  onMarkRead,
}) => {
  const getIconName = () => {
    switch (notification.type) {
      case 'warning':
        return 'alert';
      case 'device':
        return 'battery';
      case 'health':
        return 'heartbeat';
      default:
        return 'bell';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.read && styles.unreadContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.75}>
      <View style={styles.iconWrapper}>
        <Icon name={getIconName()} size={20} color={theme.colors.primary} />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          {!notification.read && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.timestamp}>{formatDate(notification.timestamp)}</Text>
          {!notification.read && onMarkRead && (
            <TouchableOpacity onPress={onMarkRead} style={styles.markButton}>
              <Text style={styles.markText}>Mark read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  unreadContainer: {
    backgroundColor: theme.colors.primaryLight + '40',
    borderColor: theme.colors.primaryLight,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  contentWrapper: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  message: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xxs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  timestamp: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  markButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  markText: {
    ...theme.typography.small,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
