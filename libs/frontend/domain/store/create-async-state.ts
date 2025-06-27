import { computed, signal } from '@angular/core';
import { LogMessage } from '../logger';
import { AsyncState, AsyncStateApi, INITIAL_ASYNC_STATE } from './async.state.type';

/**
 * Creates a Signal-based async state with data, loading, and error states.
 *
 * @template T The type of the data
 * @param initialValue Optional initial value for the data
 * @returns An object with signals and helper methods for managing async state
 */
export function createAsyncState<T>(initialValue: T | null = null): AsyncStateApi<T> {
    // Create initial state with optional initial value
    const initialState: AsyncState<T> = initialValue
        ? {
              data: initialValue,
              loading: false,
              error: null,
          }
        : INITIAL_ASYNC_STATE<T>();

    // Create the state signal
    const state = signal<AsyncState<T>>(initialState);

    // Create computed signals for each state property
    const data = computed(() => state().data);
    const loading = computed(() => state().loading);
    const error = computed(() => state().error);

    // Helper methods for updating state
    const setLoading = (value: boolean): void => {
        state.update((s) => ({ ...s, loading: value, error: null }));
    };

    const setData = (newData: T): void => {
        state.set({ data: newData, loading: false, error: null });
    };

    const setError = (err: unknown, logger?: { log: (message: LogMessage) => Promise<void> }): void => {
        const logMessage = LogMessage.fromUnknownError(err);
        if (logger) {
            logger.log(logMessage).then();
        }
        state.set({ data: null, loading: false, error: logMessage });
    };

    // Return the public API
    return {
        // State signals
        data,
        loading,
        error,

        // Helper methods
        setLoading,
        setData,
        setError,

        // Access to the raw state signal (for advanced use cases)
        _state: state,
    };
}
