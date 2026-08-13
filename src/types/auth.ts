import { UserProfile } from './user';

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  emailOrPhone: string;
}

export interface OtpVerificationRequest {
  emailOrPhone: string;
  code: string;
}

export interface ResetPasswordCredentials {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserProfile;
}
