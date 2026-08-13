import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { Avatar } from '../../components/common/Avatar';
import { Icon } from '../../components/common/Icon';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { ActivityCard } from '../../components/cards/ActivityCard';
import { LoadingView } from '../../components/loaders/LoadingView';
import { ErrorView } from '../../components/states/ErrorView';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/data/dataService';
import { DashboardSummary } from '../../types/data';
import { theme } from '../../theme';
import { getAqiStatusLabel } from '../../utils/formatters';

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      setError(false);
      const summary = await dataService.getDashboardSummary();
      setData(summary);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  if (loading && !refreshing) {
    return <LoadingView message="Loading Respore Sence telemetry..." />;
  }

  if (error || !data) {
    return <ErrorView onRetry={fetchDashboard} />;
  }

  const aqiInfo = getAqiStatusLabel(data.aqi);

  return (
    <ScreenContainer style={styles.container}>
      {/* App Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileTab')}
          style={styles.userInfo}>
          <Avatar name={user?.fullName || 'Doctor'} sourceUrl={user?.avatarUrl} size="medium" />
          <View style={styles.userTextContainer}>
            <Text style={styles.greeting}>Good day,</Text>
            <Text style={styles.userName}>{user?.fullName || 'Dr. Sarah'}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchTab')}
            style={styles.iconButton}>
            <Icon name="search" size={20} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationsTab')}
            style={styles.iconButton}>
            <Icon name="bell" size={20} color={theme.colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }>
        {/* Main AQI Banner Card */}
        <Card style={styles.aqiCard}>
          <View style={styles.aqiHeader}>
            <View style={styles.aqiTitleRow}>
              <Icon name="air" size={24} color={theme.colors.textInverse} />
              <Text style={styles.aqiTitle}>AIR QUALITY INDEX</Text>
            </View>
            <View style={styles.deviceStatusBadge}>
              <View style={styles.connectedDot} />
              <Text style={styles.deviceStatusText}>
                {user?.deviceName || 'Respore Pulse Pro v2'}
              </Text>
            </View>
          </View>

          <View style={styles.aqiContent}>
            <View style={styles.aqiNumberContainer}>
              <Text style={styles.aqiNumber}>{data.aqi}</Text>
              <Text style={styles.aqiUnit}>AQI</Text>
            </View>

            <View style={styles.aqiStatusPill}>
              <Text style={styles.aqiStatusText}>{aqiInfo.label}</Text>
            </View>
          </View>

          <Text style={styles.aqiFooterText}>
            Clean airborne particulates detected. Optimal environment for lungs.
          </Text>
        </Card>

        {/* Respiratory Telemetry Metrics Cards */}
        <Text style={styles.sectionTitle}>Real-time Biomarkers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {data.metrics.map(metric => (
            <SummaryCard
              key={metric.id}
              metric={metric}
              onPress={() =>
                navigation.navigate('Details', {
                  itemId: metric.id,
                  title: metric.name,
                  category: 'telemetry',
                })
              }
            />
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('SearchTab')}>
            <View style={[styles.actionIconBg, { backgroundColor: theme.colors.primaryLight }]}>
              <Icon name="search" size={22} color={theme.colors.primary} />
            </View>
            <Text style={styles.actionText}>Search Guides</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('NotificationsTab')}>
            <View style={[styles.actionIconBg, { backgroundColor: theme.colors.secondaryLight }]}>
              <Icon name="bell" size={22} color={theme.colors.secondary} />
            </View>
            <Text style={styles.actionText}>Alerts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Settings')}>
            <View style={[styles.actionIconBg, { backgroundColor: theme.colors.accentLight }]}>
              <Icon name="settings" size={22} color={theme.colors.accent} />
            </View>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Telemetry Activity */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Sensor Logs</Text>
        </View>

        {data.recentActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onPress={() =>
              navigation.navigate('Details', {
                itemId: activity.id,
                title: activity.title,
                category: 'activity',
              })
            }
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTextContainer: {
    marginLeft: theme.spacing.sm,
  },
  greeting: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  userName: {
    ...theme.typography.bodyBold,
    fontSize: 16,
    color: theme.colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  aqiCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  aqiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  aqiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aqiTitle: {
    ...theme.typography.captionMedium,
    color: theme.colors.textInverse,
    marginLeft: theme.spacing.xs,
    letterSpacing: 1,
  },
  deviceStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
  },
  connectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  deviceStatusText: {
    ...theme.typography.small,
    color: theme.colors.textInverse,
    fontSize: 10,
  },
  aqiContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.sm,
  },
  aqiNumberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  aqiNumber: {
    ...theme.typography.display,
    fontSize: 52,
    color: theme.colors.textInverse,
    fontWeight: '800',
  },
  aqiUnit: {
    ...theme.typography.title,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: theme.spacing.xs,
  },
  aqiStatusPill: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  aqiStatusText: {
    ...theme.typography.button,
    color: theme.colors.primary,
    fontSize: 14,
  },
  aqiFooterText: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.title,
    fontSize: 18,
    color: theme.colors.text,
    marginVertical: theme.spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalScroll: {
    marginHorizontal: -theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  actionCard: {
    flex: 0.31,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  actionText: {
    ...theme.typography.captionMedium,
    color: theme.colors.text,
    fontSize: 12,
  },
});
