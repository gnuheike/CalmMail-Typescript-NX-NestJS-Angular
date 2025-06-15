import { computed, signal, WritableSignal } from '@angular/core';
import { AsyncState, INITIAL_ASYNC_STATE } from './async.state.type';

/**
 * Small helper that any “state service” can extend.
 * Takes care of data/loading/error bookkeeping.
 */
export abstract class AsyncStore<T> {
    protected readonly _state: WritableSignal<AsyncState<T>> = signal(INITIAL_ASYNC_STATE<T>());

    readonly data = computed(() => this._state().data);
    readonly loading = computed(() => this._state().loading);
    readonly error = computed(() => this._state().error);

    /** Utilities for subclasses */
    protected setLoading(): void {
        this._state.update((s) => ({ ...s, loading: true, error: null }));
    }

    protected setData(data: T): void {
        this._state.set({ data, loading: false, error: null });
    }

    protected setError(error: unknown): void {
        const typedError = error === undefined ? null : (error as string);
        this._state.set({ data: null, loading: false, error: typedError });
    }
}
