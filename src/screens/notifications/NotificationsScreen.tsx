import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { NotificationItem } from '../../components/cards/NotificationItem';
import { LoadingView } from '../../components/loaders/LoadingView';
import { EmptyView } from '../../components/states/EmptyView';
import { dataService } from '../../services/data/dataService';
import { AppNotification } from '../../types/notification';
import { theme } from '../../theme';

export const NotificationsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const fetchNotifications = useCallback(async () => {
    try {
      const list = await dataService.getNotifications();
      setNotifications(list);
    } catch (e) {
      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const handleMarkRead = async (id: string) => {
    const updated = await dataService.markNotificationRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = async () => {
    const updated = await dataService.markAllNotificationsRead();
    setNotifications(updated);
  };

  const filteredNotifications = notifications.filter(item => {
    if (filter === 'unread') return !item.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading && !refreshing) {
    return <LoadingView message="Loading alerts..." />;
  }

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Alerts & Notifications</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0
              ? `You have ${unreadCount} unread health & environmental alerts`
              : 'All notifications are up to date'}
          </Text>
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllRead} style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
          onPress={() => setFilter('all')}>
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, filter === 'unread' && styles.activeFilterTab]}
          onPress={() => setFilter('unread')}>
          <Text style={[styles.filterText, filter === 'unread' && styles.activeFilterText]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {filteredNotifications.length === 0 ? (
        <EmptyView
          title={filter === 'unread' ? 'No Unread Alerts' : 'No Notifications'}
          message="You're all caught up! Respore Sence will alert you when environmental triggers change."
          iconName="bell"
        />
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          }
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onMarkRead={() => handleMarkRead(item.id)}
              onPress={() =>
                navigation.navigate('Details', {
                  itemId: item.id,
                  title: item.title,
                  category: 'notification',
                })
              }
            />
          )}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 24,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  markAllButton: {
    paddingVertical: theme.spacing.xs,
  },
  markAllText: {
    ...theme.typography.captionMedium,
    color: theme.colors.primary,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  filterTab: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: theme.colors.primary,
  },
  filterText: {
    ...theme.typography.captionMedium,
    color: theme.colors.textMuted,
  },
  activeFilterText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
