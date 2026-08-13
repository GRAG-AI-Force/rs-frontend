export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_OTP: '/auth/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
  },
  TELEMETRY: {
    DASHBOARD: '/telemetry/dashboard',
    METRICS: '/telemetry/metrics',
    ACTIVITIES: '/telemetry/activities',
    DETAILS: (id: string) => `/telemetry/items/${id}`,
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
  SEARCH: '/search',
};
