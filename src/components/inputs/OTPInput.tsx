import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput as RNTextInput, Text } from 'react-native';
import { theme } from '../../theme';

export interface OTPInputProps {
  length?: number;
  onCodeChanged?: (code: string) => void;
  onCodeFilled?: (code: string) => void;
  error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onCodeChanged,
  onCodeFilled,
  error,
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<RNTextInput | null>>([]);

  useEffect(() => {
    const fullCode = code.join('');
    onCodeChanged?.(fullCode);
    if (fullCode.length === length) {
      onCodeFilled?.(fullCode);
    }
  }, [code, length, onCodeChanged, onCodeFilled]);

  const handleChangeText = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, '');

    // Handle full paste
    if (cleanText.length >= length) {
      const newCode = cleanText.substring(0, length).split('');
      setCode(newCode);
      inputRefs.current[length - 1]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = cleanText.substring(cleanText.length - 1);
    setCode(newCode);

    if (cleanText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsRow}>
        {Array.from({ length }).map((_, index) => (
          <RNTextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.box,
              !!code[index] && styles.boxFilled,
              !!error && styles.boxError,
            ]}
            keyboardType="number-pad"
            maxLength={length}
            value={code[index]}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            selectTextOnFocus
            accessibilityLabel={`Digit ${index + 1}`}
          />
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  boxFilled: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  boxError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    ...theme.typography.small,
    color: theme.colors.error,
    marginTop: theme.spacing.sm,
  },
});
