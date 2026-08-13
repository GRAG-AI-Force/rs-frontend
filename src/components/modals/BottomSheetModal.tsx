import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../common/Icon';

export interface BottomSheetModalProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  title,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              <View style={styles.dragHandle} />
              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Icon name="close" size={20} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.body}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
    maxHeight: '80%',
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.borderDark,
    alignSelf: 'center',
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  title: {
    ...theme.typography.title,
    fontSize: 18,
    color: theme.colors.text,
  },
  closeButton: {
    padding: theme.spacing.xxs,
  },
  body: {
    marginTop: theme.spacing.md,
  },
});
