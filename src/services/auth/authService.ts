import { Config } from '../../config/env';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../../types/auth';
import { mockAuthService } from '../../mocks/mockAuthService';
import { apiClient } from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (Config.USE_MOCK_API) {
      return mockAuthService.login(credentials);
    }
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    if (Config.USE_MOCK_API) {
      return mockAuthService.register(credentials);
    }
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, credentials);
  },

  async requestPasswordReset(emailOrPhone: string): Promise<AuthResponse> {
    if (Config.USE_MOCK_API) {
      return mockAuthService.requestPasswordReset(emailOrPhone);
    }
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { emailOrPhone });
  },

  async verifyOtp(code: string, emailOrPhone: string): Promise<AuthResponse> {
    if (Config.USE_MOCK_API) {
      return mockAuthService.verifyOtp(code);
    }
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.VERIFY_OTP, { code, emailOrPhone });
  },

  async resetPassword(newPassword: string, code: string): Promise<AuthResponse> {
    if (Config.USE_MOCK_API) {
      return mockAuthService.resetPassword(newPassword);
    }
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.RESET_PASSWORD, { newPassword, code });
  },
};
