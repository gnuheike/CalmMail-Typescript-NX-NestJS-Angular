import { inject, Inject, Injectable } from '@angular/core';

import { Storage as IonicStorageDriver } from '@ionic/storage-angular';

import { PermanentStorageService } from '../../Domain/permanent-storage.service';

/**
 * IonicStorage<T>
 *
 * Generic, strongly-typed storage service using @ionic/storage-angular as the backend.
 *
 * - Supports any serializable data type via generics.
 * - Handles storage initialization and namespacing by key.
 * - Used as the base for feature-specific storage providers (e.g., lead form storage).
 * - Methods: getItem, setItem, removeItem, clear.
 */
@Injectable()
export class IonicPermanentStorageService<T> extends PermanentStorageService<T> {
    private _storage: IonicStorageDriver | null = null;
    private readonly storageDriver = inject(IonicStorageDriver);

    constructor(@Inject('STORAGE_KEY') private readonly storageKey: string) {
        super();
    }

    async getItem(): Promise<T | undefined> {
        const storage = await this.getStorage();
        const value = await storage.get(this.storageKey);
        return value ?? undefined;
    }

    async setItem(data: T): Promise<void> {
        const storage = await this.getStorage();
        await storage.set(this.storageKey, data);
    }

    async removeItem(): Promise<void> {
        const storage = await this.getStorage();
        await storage.remove(this.storageKey);
    }

    async clear(): Promise<void> {
        const storage = await this.getStorage();
        await storage.clear();
    }

    private async getStorage(): Promise<IonicStorageDriver> {
        if (!this._storage) {
            this._storage = await this.storageDriver.create();
        }
        return this._storage;
    }
}
