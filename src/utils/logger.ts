const IS_DEV = process.env.NODE_ENV !== 'production';

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console.info(`[INFO] ${message}`, ...args);
    }
  },

  warn: (message: string, ...args: any[]) => {
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[WARN] ${message}`, ...args);
    }
  },

  error: (message: string, ...args: any[]) => {
    // Sanitized logging to prevent sensitive information leakage
    const sanitizedArgs = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        const copy = { ...arg };
        delete copy.password;
        delete copy.token;
        delete copy.otp;
        return copy;
      }
      return arg;
    });

    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`, ...sanitizedArgs);
  },
};
