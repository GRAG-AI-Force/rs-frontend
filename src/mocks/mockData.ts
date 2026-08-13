import { UserProfile } from '../types/user';
import { DashboardSummary } from '../types/data';
import { AppNotification } from '../types/notification';
import { SearchResultItem } from '../types/search';

export const MOCK_USER: UserProfile = {
  id: 'usr_respore_9082',
  fullName: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@resporesence.org',
  phone: '+1 (555) 234-5678',
  bio: 'Respiratory Health Researcher & Sensor Beta Tester',
  avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
  medicalCondition: 'Mild Asthma / Airborne Sensitivity',
  emergencyContactName: 'Marcus Jenkins',
  emergencyContactPhone: '+1 (555) 987-6543',
  deviceConnected: true,
  deviceName: 'Respore Sence Pulse Pro v2',
  deviceBattery: 88,
  createdAt: '2025-01-15T08:30:00Z',
};

export const MOCK_DASHBOARD: DashboardSummary = {
  aqi: 34,
  aqiStatus: 'Good',
  spo2: 98,
  respiratoryRate: 16,
  humidity: 45,
  temperature: 22.5,
  deviceConnected: true,
  deviceBattery: 88,
  metrics: [
    {
      id: 'm1',
      name: 'Air Quality Index',
      value: 34,
      unit: 'AQI',
      status: 'good',
      changePercentage: -12,
      icon: 'air',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'm2',
      name: 'Blood Oxygen (SpO2)',
      value: 98,
      unit: '%',
      status: 'good',
      changePercentage: 1,
      icon: 'pulse',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'm3',
      name: 'Respiratory Rate',
      value: 16,
      unit: 'bpm',
      status: 'good',
      changePercentage: 0,
      icon: 'heartbeat',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'm4',
      name: 'Ambient Humidity',
      value: 45,
      unit: '%',
      status: 'good',
      changePercentage: 3,
      icon: 'droplet',
      updatedAt: new Date().toISOString(),
    },
  ],
  recentActivities: [
    {
      id: 'act_1',
      title: 'Morning Respiratory Sync Completed',
      description: 'Sensor recorded steady baseline SpO2 (98%) over 8 hours.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: 'device_sync',
      status: 'completed',
    },
    {
      id: 'act_2',
      title: 'Optimal Air Quality Detected',
      description: 'Indoor PM2.5 levels dropped to 8 ug/m³ following filtration.',
      timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      type: 'health_check',
      status: 'completed',
    },
    {
      id: 'act_3',
      title: 'Respore Sence Firmware Updated',
      description: 'Firmware upgraded to v2.4.1 with improved battery optimization.',
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      type: 'battery',
      status: 'completed',
    },
  ],
};

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Pollen Alert in Your Area',
    message: 'High birch pollen concentrations expected between 11 AM and 3 PM today.',
    type: 'warning',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    title: 'Daily Telemetry Digest Ready',
    message: 'Your weekly respiratory average score increased by 4.2%. Tap to view complete report.',
    type: 'info',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    title: 'Device Calibrated Successfully',
    message: 'Respore Sence Pulse Pro v2 optical sensors auto-zeroed.',
    type: 'device',
    timestamp: new Date(Date.now() - 3600 * 24 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'n4',
    title: 'Hydration & Air Reminder',
    message: 'Maintain indoor humidity between 40-50% for optimal lung airway comfort.',
    type: 'health',
    timestamp: new Date(Date.now() - 3600 * 48 * 1000).toISOString(),
    read: true,
  },
];

export const MOCK_SEARCH_RESULTS: SearchResultItem[] = [
  {
    id: 'sr1',
    title: 'Air Quality Index (AQI) Guide',
    subtitle: 'Understanding PM2.5, PM10, and Ozone thresholds for respiratory wellness',
    category: 'guides',
    badge: 'Popular',
  },
  {
    id: 'sr2',
    title: 'Respore Sence Pulse Pro v2 Calibration',
    subtitle: 'Step-by-step instructions for sensor optical cleaning and bluetooth pairing',
    category: 'device',
    badge: 'Hardware',
  },
  {
    id: 'sr3',
    title: 'Weekly Lung Capacity Telemetry',
    subtitle: 'Historical chart showing peak flow rates and SpO2 trends',
    category: 'telemetry',
    date: '2026-08-10',
  },
  {
    id: 'sr4',
    title: 'Asthma & Humidity Correlation Report',
    subtitle: 'Clinical research summary on optimal indoor moisture levels',
    category: 'reports',
    date: '2026-08-01',
  },
  {
    id: 'sr5',
    title: 'Emergency Medical Contact Setup',
    subtitle: 'Automated SMS triggers when SpO2 drops below configured limit',
    category: 'guides',
    badge: 'Safety',
  },
];
