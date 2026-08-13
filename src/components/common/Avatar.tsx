import React from 'react';
import { StyleSheet, View, Text, Image, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface AvatarProps {
  name: string;
  sourceUrl?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  sourceUrl,
  size = 'medium',
  style,
}) => {
  const dimensionMap = {
    small: theme.dimensions.avatarSmall,
    medium: theme.dimensions.avatarMedium,
    large: theme.dimensions.avatarLarge,
  };

  const dimension = dimensionMap[size];
  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'RS';

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
        style,
      ]}>
      {sourceUrl ? (
        <Image
          source={{ uri: sourceUrl }}
          style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.text, { fontSize: dimension * 0.4 }]}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    ...theme.typography.button,
    color: theme.colors.textInverse,
  },
});
