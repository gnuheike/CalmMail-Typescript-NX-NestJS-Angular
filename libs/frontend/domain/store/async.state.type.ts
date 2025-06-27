import { LogMessage } from '../logger';
import { Signal, WritableSignal } from '@angular/core';

export interface AsyncStateApi<T> {
    data: Signal<T | null>;
    loading: Signal<boolean>;
    error: Signal<LogMessage | null>;
    setLoading: (value: boolean) => void;
    setData: (newData: T) => void;
    setError: (err: unknown, logger?: { log: (message: LogMessage) => Promise<void> }) => void;
    _state: WritableSignal<AsyncState<T>>;
}

/**
 * A reusable, generic interface for managing the state of an asynchronous operation.
 * @template T The type of the data.
 */
export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: LogMessage | null;
}

/**
 * Creates a default initial state for an asynchronous operation.
 * @template T The type of the data.
 */
export const INITIAL_ASYNC_STATE = <T>(): AsyncState<T> => ({
    data: null,
    loading: false,
    error: null,
});
