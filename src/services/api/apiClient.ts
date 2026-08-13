import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../../config/env';
import { storage, STORAGE_KEYS } from '../../utils/storage';
import { logger } from '../../utils/logger';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: Config.API_BASE_URL,
      timeout: Config.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async config => {
        const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        logger.info(`[API Outgoing] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        logger.error('[API Request Error]', error);
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.info(`[API Response] ${response.status} from ${response.config.url}`);
        return response.data;
      },
      error => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message || 'An unexpected error occurred.';
        logger.error(`[API Error ${status}] ${message}`);

        return Promise.reject({
          message,
          status,
          raw: error,
        });
      },
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.get(url, config)) as unknown as T;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.post(url, data, config)) as unknown as T;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.put(url, data, config)) as unknown as T;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.delete(url, config)) as unknown as T;
  }
}

export const apiClient = new ApiClient();
