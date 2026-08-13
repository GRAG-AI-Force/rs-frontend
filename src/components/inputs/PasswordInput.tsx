import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput, TextInputProps } from './TextInput';
import { Icon } from '../common/Icon';
import { theme } from '../../theme';

export const PasswordInput: React.FC<TextInputProps> = props => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <TextInput
      {...props}
      secureTextEntry={isSecure}
      leftIcon={props.leftIcon || <Icon name="lock" size={18} color={theme.colors.textMuted} />}
      rightIcon={
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          accessibilityRole="button"
          accessibilityLabel={isSecure ? 'Show Password' : 'Hide Password'}>
          <Icon name={isSecure ? 'eye' : 'eyeOff'} size={20} color={theme.colors.textMuted} />
        </TouchableOpacity>
      }
    />
  );
};
