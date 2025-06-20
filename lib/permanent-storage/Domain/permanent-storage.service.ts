/**
 * Storage<T>
 *
 * Abstract base class for strongly-typed, async storage services.
 *
 * - Defines the contract for CRUD-like operations on a single value (get, set, remove, clear).
 * - Used as the base for platform-specific or backend-specific storage implementations.
 * - Allows for dependency injection and code reuse across app features.
 */
export abstract class PermanentStorageService<T> {
    abstract getItem(): Promise<T | undefined>;

    abstract setItem(data: T): Promise<void>;

    abstract removeItem(): Promise<void>;

    abstract clear(): Promise<void>;
}
