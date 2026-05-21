import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * Log an informational message.
   * Uses console.info internally but can be swapped for a remote logger.
   */
  info<T extends unknown[]>(message: string, ...optionalParams: T): void {
    // No direct console.log; using console.info for visibility during dev.
    console.info('[INFO]', message, ...optionalParams);
  }

  /**
   * Log a warning message.
   */
  warn<T extends unknown[]>(message: string, ...optionalParams: T): void {
    console.warn('[WARN]', message, ...optionalParams);
  }

  /**
   * Log an error message.
   */
  error<T extends unknown[]>(message: string, ...optionalParams: T): void {
    console.error('[ERROR]', message, ...optionalParams);
  }
}
