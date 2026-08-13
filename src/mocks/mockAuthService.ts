import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import { UserProfile } from '../types/user';
import { MOCK_USER } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(600); // Simulate network latency

    if (!credentials.emailOrPhone || !credentials.password) {
      return { success: false, message: 'Email and password are required.' };
    }

    if (credentials.password === 'WrongPass123') {
      return { success: false, message: 'Invalid credentials provided. Please try again.' };
    }

    return {
      success: true,
      message: 'Login successful.',
      token: 'jwt_mock_token_respore_sence_88910023',
      user: {
        ...MOCK_USER,
        email: credentials.emailOrPhone.includes('@') ? credentials.emailOrPhone : MOCK_USER.email,
      },
    };
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await delay(750);

    if (credentials.email === 'taken@resporesence.org') {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: credentials.fullName,
      email: credentials.email,
      phone: credentials.phone,
      deviceConnected: false,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: 'Registration successful! Verification code sent.',
      token: 'jwt_mock_token_respore_sence_new',
      user: newUser,
    };
  },

  async requestPasswordReset(emailOrPhone: string): Promise<AuthResponse> {
    await delay(500);
    return {
      success: true,
      message: `OTP verification code sent to ${emailOrPhone}.`,
    };
  },

  async verifyOtp(code: string): Promise<AuthResponse> {
    await delay(600);
    if (code === '000000') {
      return { success: false, message: 'Invalid or expired OTP code.' };
    }
    return {
      success: true,
      message: 'OTP verified successfully.',
      token: 'jwt_mock_token_verified_9921',
    };
  },

  async resetPassword(_newPassword: string): Promise<AuthResponse> {
    await delay(600);
    return {
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    };
  },
};
