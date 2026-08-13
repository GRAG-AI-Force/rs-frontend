import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { Icon } from './Icon';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightElement,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go Back">
            <Icon name="chevronLeft" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {rightElement ? <View style={styles.rightContainer}>{rightElement}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.dimensions.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.title,
    fontSize: 18,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
