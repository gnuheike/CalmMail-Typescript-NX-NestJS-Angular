/**
 * Network Simulation Utility
 *
 * Provides utilities to simulate network conditions like latency and errors
 * for mock implementations of use cases.
 *
 * It only used in the mock providers. No tin production
 */
import { from, Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
    errorFactory: () => new Error('Network error'),
};

/**
 * Simulates a network request with configurable delay and error rate using Observables
 * @param callback Function to execute after the delay (if no error)
 * @param options Simulation options
 * @returns Observable that emits the callback result or errors
 */
export function simulateNetworkRequestObservable<T>(callback: () => T | Promise<T> | Observable<T>, options: SimulationOptions = {}): Observable<T> {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    // Calculate random delay
    const delay = Math.floor(Math.random() * (mergedOptions.maxDelay - mergedOptions.minDelay + 1)) + mergedOptions.minDelay;

    // Create an observable that emits after the delay
    return timer(delay).pipe(
        mergeMap(() => {
            // Randomly decide whether to simulate an error
            if (Math.random() < mergedOptions.errorRate) {
                return throwError(() => mergedOptions.errorFactory());
            }

            // Execute the callback and return its result as an observable
            const result = callback();
            if (result instanceof Observable) {
                return result;
            } else if (result instanceof Promise) {
                return from(result);
            } else {
                return from(Promise.resolve(result));
            }
        }),
    );
}
