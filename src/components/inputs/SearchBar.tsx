import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search telemetry, devices, guides...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name="search" size={18} color={theme.colors.textMuted} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          style={styles.clearButton}
          accessibilityLabel="Clear Search">
          <Icon name="close" size={16} color={theme.colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.dimensions.inputHeight,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.small,
  },
  searchIcon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
    paddingVertical: 0,
  },
  clearButton: {
    padding: theme.spacing.xxs,
  },
});
