import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from '../common/Card';
import { Icon } from '../common/Icon';
import { theme } from '../../theme';
import { TelemetryMetric } from '../../types/data';

export interface SummaryCardProps {
  metric: TelemetryMetric;
  onPress?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ metric, onPress }) => {
  const getStatusColor = () => {
    switch (metric.status) {
      case 'good':
        return theme.colors.success;
      case 'moderate':
        return theme.colors.warning;
      case 'warning':
      case 'alert':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const statusColor = getStatusColor();

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconBadge, { backgroundColor: statusColor + '20' }]}>
          <Icon name={metric.icon} size={20} color={statusColor} />
        </View>
        {metric.changePercentage !== undefined && (
          <Text
            style={[
              styles.changeText,
              { color: metric.changePercentage <= 0 ? theme.colors.success : theme.colors.error },
            ]}>
            {metric.changePercentage > 0 ? `+${metric.changePercentage}%` : `${metric.changePercentage}%`}
          </Text>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {metric.name}
      </Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{metric.value}</Text>
        <Text style={styles.unit}>{metric.unit}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    marginHorizontal: theme.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    ...theme.typography.small,
    fontWeight: '600',
  },
  title: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xxs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    ...theme.typography.h2,
    fontSize: 26,
    color: theme.colors.text,
  },
  unit: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginLeft: theme.spacing.xxs,
  },
});
