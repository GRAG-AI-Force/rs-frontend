import { Config } from '../../config/env';
import { DashboardSummary } from '../../types/data';
import { AppNotification } from '../../types/notification';
import { SearchResultItem } from '../../types/search';
import { UserProfile } from '../../types/user';
import { mockApiService } from '../../mocks/mockApiService';
import { apiClient } from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const dataService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    if (Config.USE_MOCK_API) {
      return mockApiService.getDashboardSummary();
    }
    return apiClient.get<DashboardSummary>(ENDPOINTS.TELEMETRY.DASHBOARD);
  },

  async getNotifications(): Promise<AppNotification[]> {
    if (Config.USE_MOCK_API) {
      return mockApiService.getNotifications();
    }
    return apiClient.get<AppNotification[]>(ENDPOINTS.NOTIFICATIONS.LIST);
  },

  async markNotificationRead(id: string): Promise<AppNotification[]> {
    if (Config.USE_MOCK_API) {
      return mockApiService.markNotificationRead(id);
    }
    return apiClient.put<AppNotification[]>(ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  },

  async markAllNotificationsRead(): Promise<AppNotification[]> {
    if (Config.USE_MOCK_API) {
      return mockApiService.markAllNotificationsRead();
    }
    return apiClient.put<AppNotification[]>(ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },

  async search(query: string, category: string = 'all'): Promise<SearchResultItem[]> {
    if (Config.USE_MOCK_API) {
      return mockApiService.search(query, category);
    }
    return apiClient.get<SearchResultItem[]>(ENDPOINTS.SEARCH, { params: { query, category } });
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (Config.USE_MOCK_API) {
      return mockApiService.updateProfile(updates);
    }
    return apiClient.put<UserProfile>(ENDPOINTS.USER.UPDATE_PROFILE, updates);
  },

  async getItemDetails(itemId: string) {
    if (Config.USE_MOCK_API) {
      return mockApiService.getItemDetails(itemId);
    }
    return apiClient.get(ENDPOINTS.TELEMETRY.DETAILS(itemId));
  },
};
