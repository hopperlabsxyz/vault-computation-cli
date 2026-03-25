/**
 * Wraps an async action handler with graceful error handling.
 * Prevents raw graphql-request errors from leaking to stderr.
 */
export function withErrorHandler<T extends unknown[]>(
  fn: (...args: T) => Promise<void>
): (...args: T) => Promise<void> {
  return async (...args: T) => {
    try {
      await fn(...args);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      console.error(`Error: ${msg}`);
      process.exit(1);
    }
  };
}
