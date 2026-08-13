export const Config = {
  ENV: process.env.ENV || 'development',
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.resporesence.com/v1',
  USE_MOCK_API: process.env.USE_MOCK_API !== 'false', // Defaults to mock mode for offline / test safety
  API_TIMEOUT: Number(process.env.API_TIMEOUT || 15000),
  APP_NAME: 'Respore Sence',
};
