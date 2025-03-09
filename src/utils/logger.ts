import pino from 'pino';

/**
 * Determine if running in development mode
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Create a base logger instance
 */
const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  enabled: true,
  timestamp: true,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
});

/**
 * Type for errors with common error properties
 */
interface ErrorWithProps {
  code?: string;
  meta?: unknown;
  message: string;
}

/**
 * Logger class that provides a wrapper around Pino
 * with synchronous console output for development
 */
export class Logger {
  private logger: pino.Logger;

  /**
   * Create a new Logger instance
   * @param logger - Pino logger instance
   */
  constructor(logger: pino.Logger) {
    this.logger = logger;
  }

  /**
   * Get the current log level
   */
  get level() {
    return this.logger.level;
  }

  /**
   * Check if the logger is silent
   */
  get silent() {
    return this.logger.silent;
  }

  /**
   * Create a child logger with additional bindings
   * @param bindings - Additional context to include with logs
   * @returns A new Logger instance with the additional context
   */
  child(bindings: Record<string, any>) {
    return new Logger(this.logger.child(bindings));
  }

  /**
   * Log a fatal error
   */
  fatal(obj: Record<string, any>, msg?: string): void;
  fatal(msg: string): void;
  fatal(objOrMsg: Record<string, any> | string, msg?: string): void {
    if (typeof objOrMsg === 'string') {
      if (isDevelopment) console.error(`[FATAL] ${objOrMsg}`);
      this.logger.fatal(objOrMsg);
    } else {
      if (isDevelopment) console.error(`[FATAL] ${msg || ''} ${JSON.stringify(objOrMsg)}`);
      this.logger.fatal(objOrMsg, msg);
    }
  }

  /**
   * Log a trace message
   */
  trace(obj: Record<string, any>, msg?: string): void;
  trace(msg: string): void;
  trace(objOrMsg: Record<string, any> | string, msg?: string): void {
    if (typeof objOrMsg === 'string') {
      if (isDevelopment) console.log(`[TRACE] ${objOrMsg}`);
      this.logger.trace(objOrMsg);
    } else {
      if (isDevelopment) console.log(`[TRACE] ${msg || ''} ${JSON.stringify(objOrMsg)}`);
      this.logger.trace(objOrMsg, msg);
    }
  }

  /**
   * Log an info message
   *
   * @example
   * ```ts
   * logger.info({ userId: '123' }, "[UserService] ⚡️ User logged in successfully");
   * ```
   */
  info(obj: Record<string, any>, msg?: string): void;
  info(msg: string): void;
  info(objOrMsg: Record<string, any> | string, msg?: string): void {
    if (typeof objOrMsg === 'string') {
      if (isDevelopment) console.log(`[INFO] ${objOrMsg}`);
      this.logger.info(objOrMsg);
    } else {
      if (isDevelopment) console.log(`[INFO] ${msg || ''} ${JSON.stringify(objOrMsg)}`);
      this.logger.info(objOrMsg, msg);
    }
  }

  /**
   * Log an error message
   */
  error(obj: Record<string, any>, msg?: string): void;
  error(msg: string): void;
  error(objOrMsg: Record<string, any> | string, msg?: string): void {
    if (typeof objOrMsg === 'string') {
      if (isDevelopment) console.error(`[ERROR] ${objOrMsg}`);
      this.logger.error(objOrMsg);
    } else {
      if (isDevelopment) console.error(`[ERROR] ${msg || ''} ${JSON.stringify(objOrMsg)}`);
      this.logger.error(objOrMsg, msg);
    }
  }

  /**
   * Log error details from an Error or unknown object
   * @param err - The error to log
   * @param context - Additional context information
   * @param message - Message to prepend to the error
   */
  logError(err: unknown, context: Record<string, any> = {}, message = 'Error'): void {
    const errorObj: Record<string, any> = { ...context };

    if (err instanceof Error) {
      errorObj.message = err.message;
      errorObj.stack = err.stack;

      // Handle specific error types with additional properties
      const errorWithProps = err as ErrorWithProps;
      if (errorWithProps.code) errorObj.code = errorWithProps.code;
      if (errorWithProps.meta) errorObj.meta = errorWithProps.meta;
    } else if (typeof err === 'string') {
      errorObj.message = err;
    } else if (err !== null && typeof err === 'object') {
      Object.assign(errorObj, err);
    }

    this.error(errorObj, message);
  }

  /**
   * Log a warning message
   */
  warn(obj: Record<string, any>, msg?: string): void;
  warn(msg: string): void;
  warn(objOrMsg: Record<string, any> | string, msg?: string): void {
    if (typeof objOrMsg === 'string') {
      if (isDevelopment) console.warn(`[WARN] ${objOrMsg}`);
      this.logger.warn(objOrMsg);
    } else {
      if (isDevelopment) console.warn(`[WARN] ${msg || ''} ${JSON.stringify(objOrMsg)}`);
      this.logger.warn(objOrMsg, msg);
    }
  }

  /**
   * Log a debug message
   */
  debug(obj: Record<string, any>, msg?: string): void;
  debug(msg: string): void;
  debug(objOrMsg: Record<string, any> | string, msg?: string): void {
    if (typeof objOrMsg === 'string') {
      if (isDevelopment) console.debug(`[DEBUG] ${objOrMsg}`);
      this.logger.debug(objOrMsg);
    } else {
      if (isDevelopment) console.debug(`[DEBUG] ${msg || ''} ${JSON.stringify(objOrMsg)}`);
      this.logger.debug(objOrMsg, msg);
    }
  }
}

// Create and export the default logger instance
const logger = new Logger(baseLogger);
export default logger;

// Export the Logger type
export { type Logger as LoggerType };
