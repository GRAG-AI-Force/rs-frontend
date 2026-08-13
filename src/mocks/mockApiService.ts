import { DashboardSummary } from '../types/data';
import { AppNotification } from '../types/notification';
import { SearchResultItem } from '../types/search';
import { UserProfile } from '../types/user';
import { MOCK_DASHBOARD, MOCK_NOTIFICATIONS, MOCK_SEARCH_RESULTS, MOCK_USER } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    await delay(400);
    return { ...MOCK_DASHBOARD };
  },

  async getNotifications(): Promise<AppNotification[]> {
    await delay(350);
    return [...MOCK_NOTIFICATIONS];
  },

  async markNotificationRead(id: string): Promise<AppNotification[]> {
    await delay(200);
    return MOCK_NOTIFICATIONS.map(n => (n.id === id ? { ...n, read: true } : n));
  },

  async markAllNotificationsRead(): Promise<AppNotification[]> {
    await delay(250);
    return MOCK_NOTIFICATIONS.map(n => ({ ...n, read: true }));
  },

  async search(query: string, category: string = 'all'): Promise<SearchResultItem[]> {
    await delay(400);
    if (!query || query.trim() === '') return MOCK_SEARCH_RESULTS;

    const q = query.toLowerCase();
    return MOCK_SEARCH_RESULTS.filter(item => {
      const matchCategory = category === 'all' || item.category === category;
      const matchText = item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
      return matchCategory && matchText;
    });
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await delay(600);
    return { ...MOCK_USER, ...updates };
  },

  async getItemDetails(itemId: string) {
    await delay(450);
    const searchMatch = MOCK_SEARCH_RESULTS.find(i => i.id === itemId);
    if (searchMatch) {
      return {
        id: searchMatch.id,
        title: searchMatch.title,
        subtitle: searchMatch.subtitle,
        category: searchMatch.category,
        content: `Detailed telemetry analysis and telemetry log breakdown for item "${searchMatch.title}". Respore Sence real-time sensor array monitor active.`,
        createdDate: searchMatch.date || '2026-08-12',
        author: 'Respore Sence Diagnostic Engine',
        status: 'Active',
      };
    }
    return {
      id: itemId,
      title: 'Telemetry Node Details',
      subtitle: 'Real-time sensor telemetry record',
      category: 'telemetry',
      content: 'Detailed telemetry analysis and live sensor monitoring data for Respore Sence device.',
      createdDate: '2026-08-13',
      author: 'Respore Sence System',
      status: 'Normal',
    };
  },
};
