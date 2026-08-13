export type NotificationType = 'alert' | 'info' | 'warning' | 'device' | 'health';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
