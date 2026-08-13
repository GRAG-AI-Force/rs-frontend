export interface TelemetryMetric {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  status: 'good' | 'moderate' | 'warning' | 'alert';
  changePercentage?: number;
  icon: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'health_check' | 'device_sync' | 'alert' | 'battery';
  status: 'completed' | 'pending' | 'warning';
}

export interface DashboardSummary {
  aqi: number; // Air Quality Index
  aqiStatus: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  spo2: number; // Oxygen Saturation %
  respiratoryRate: number; // breaths per minute
  humidity: number; // %
  temperature: number; // Celsius
  deviceConnected: boolean;
  deviceBattery: number;
  metrics: TelemetryMetric[];
  recentActivities: ActivityLog[];
}
