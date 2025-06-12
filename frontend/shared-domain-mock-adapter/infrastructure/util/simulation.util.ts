/**
 * Network Simulation Utility
 *
 * Provides utilities to simulate network conditions like latency and errors
 * for mock implementations of use cases.
 */

/**
 * Configuration options for network simulation
 */
export interface SimulationOptions {
  /**
   * Minimum delay in milliseconds
   * @default 100
   */
  minDelay?: number;

  /**
   * Maximum delay in milliseconds
   * @default 800
   */
  maxDelay?: number;

  /**
   * Probability of error (0-1)
   * @default 0.1 (10% chance)
   */
  errorRate?: number;

  /**
   * Custom error to throw when simulation decides to fail
   * @default new Error('Network error')
   */
  errorFactory?: () => Error;
}

/**
 * Default simulation options
 */
const DEFAULT_OPTIONS: Required<SimulationOptions> = {
  minDelay: 100,
  maxDelay: 800,
  errorRate: 0.1,
  errorFactory: () => new Error('Network error')
};

/**
 * Simulates network delay by waiting a random amount of time
 * @param options Simulation options
 * @returns Promise that resolves after the delay
 */
export async function simulateNetworkDelay(options: SimulationOptions = {}): Promise<void> {
  const { minDelay, maxDelay } = { ...DEFAULT_OPTIONS, ...options };
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Simulates a network request with configurable delay and error rate
 * @param callback Function to execute after the delay (if no error)
 * @param options Simulation options
 * @returns Promise that resolves with the callback result or rejects with an error
 */
export async function simulateNetworkRequest<T>(
  callback: () => T | Promise<T>,
  options: SimulationOptions = {}
): Promise<T> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // Simulate network delay
  await simulateNetworkDelay(mergedOptions);

  // Randomly decide whether to simulate an error
  if (Math.random() < mergedOptions.errorRate) {
    throw mergedOptions.errorFactory();
  }

  // Execute the callback and return its result
  return callback();
}
