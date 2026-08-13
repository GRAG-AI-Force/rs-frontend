export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OtpVerification: { emailOrPhone: string; isPasswordReset?: boolean };
  ResetPassword: { code: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  Details: { itemId: string; title: string; category?: string };
  EditProfile: undefined;
  Settings: undefined;
};
