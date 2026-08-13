import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

import { LoginScreen } from '../screens/auth/login/LoginScreen';
import { RegisterScreen } from '../screens/auth/register/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/forgotPassword/ForgotPasswordScreen';
import { OtpVerificationScreen } from '../screens/auth/otpVerification/OtpVerificationScreen';
import { ResetPasswordScreen } from '../screens/auth/resetPassword/ResetPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
