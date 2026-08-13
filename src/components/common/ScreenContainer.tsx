import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';

export interface ScreenContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  keyboardAvoiding = true,
  backgroundColor = theme.colors.background,
  barStyle = 'dark-content',
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const Content = scrollable ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[{ padding: theme.spacing.lg }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1, padding: theme.spacing.lg }, style]}>{children}</View>
  );

  return (
    <View style={containerStyle}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          {Content}
        </KeyboardAvoidingView>
      ) : (
        Content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
