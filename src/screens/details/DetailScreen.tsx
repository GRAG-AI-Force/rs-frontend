import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { Card } from '../../components/common/Card';
import { LoadingView } from '../../components/loaders/LoadingView';
import { Icon } from '../../components/common/Icon';
import { dataService } from '../../services/data/dataService';
import { theme } from '../../theme';

export const DetailScreen = ({ route, navigation }: any) => {
  const { itemId = 'default', title = 'Details', category = 'telemetry' } = route.params || {};

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await dataService.getItemDetails(itemId);
        setDetails(res);
      } catch (e) {
        setDetails({
          title,
          subtitle: 'Respore Sence Diagnostic Telemetry',
          content: 'Real-time telemetry log breakdown for Respore Sence mobile health node.',
          createdDate: '2026-08-13',
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [itemId, title]);

  if (loading) {
    return <LoadingView message="Retrieving telemetry record..." />;
  }

  return (
    <ScreenContainer scrollable style={styles.container}>
      <AppHeader
        title={title}
        showBack
        onBackPress={() => navigation.goBack()}
        style={styles.header}
      />

      <View style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryTag}>{category.toUpperCase()}</Text>
            <Text style={styles.dateText}>{details?.createdDate || '2026-08-13'}</Text>
          </View>

          <Text style={styles.itemTitle}>{details?.title || title}</Text>
          <Text style={styles.subtitle}>{details?.subtitle}</Text>

          <View style={styles.divider} />

          <Text style={styles.contentText}>{details?.content}</Text>
        </Card>

        {/* Telemetry Technical Data Visualizer Simulation */}
        <Text style={styles.sectionHeader}>Diagnostic Metrics Breakdown</Text>
        <Card style={styles.card}>
          <View style={styles.metricRow}>
            <Icon name="pulse" size={20} color={theme.colors.primary} />
            <View style={styles.metricTextGroup}>
              <Text style={styles.metricLabel}>Sensor Sampling Rate</Text>
              <Text style={styles.metricValue}>100 Hz Continuous Optical</Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            <Icon name="shield" size={20} color={theme.colors.success} />
            <View style={styles.metricTextGroup}>
              <Text style={styles.metricLabel}>Telemetry Encryption</Text>
              <Text style={styles.metricValue}>AES-256 GCM Mobile Channel</Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            <Icon name="air" size={20} color={theme.colors.secondary} />
            <View style={styles.metricTextGroup}>
              <Text style={styles.metricLabel}>Air Quality Baseline</Text>
              <Text style={styles.metricValue}>ISO 14644-1 Cleanroom Grade</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  card: {
    padding: theme.spacing.xl,
    marginVertical: theme.spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryTag: {
    ...theme.typography.small,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  dateText: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  itemTitle: {
    ...theme.typography.h2,
    fontSize: 22,
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.lg,
  },
  contentText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  sectionHeader: {
    ...theme.typography.title,
    fontSize: 16,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  metricTextGroup: {
    marginLeft: theme.spacing.md,
  },
  metricLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  metricValue: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    marginTop: 2,
  },
});
