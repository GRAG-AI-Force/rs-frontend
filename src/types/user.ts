export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  bio?: string;
  avatarUrl?: string;
  medicalCondition?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  deviceConnected: boolean;
  deviceName?: string;
  deviceBattery?: number;
  createdAt: string;
}

export interface UserSession {
  user: UserProfile;
  token: string;
  refreshToken?: string;
  expiresAt?: string;
}
