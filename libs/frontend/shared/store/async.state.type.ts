/**
 * A reusable, generic interface for managing the state of an asynchronous operation.
 * @template T The type of the data.
 */
export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
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
