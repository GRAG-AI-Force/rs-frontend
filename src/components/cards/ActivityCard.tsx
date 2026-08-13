import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from '../common/Card';
import { Icon } from '../common/Icon';
import { theme } from '../../theme';
import { ActivityLog } from '../../types/data';
import { formatDate } from '../../utils/formatters';

export interface ActivityCardProps {
  activity: ActivityLog;
  onPress?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Icon name="check" size={16} color={theme.colors.primary} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.description}>{activity.description}</Text>
          <Text style={styles.time}>{formatDate(activity.timestamp)}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xxs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    ...theme.typography.bodyBold,
    fontSize: 14,
    color: theme.colors.text,
  },
  description: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  time: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
});
