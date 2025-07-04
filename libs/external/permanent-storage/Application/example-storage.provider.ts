import { InjectionToken, Provider } from '@angular/core';

import { PermanentStorageService } from '../Domain/permanent-storage.service';
import { IonicPermanentStorageService } from '../Infrastructure/Port/ionic-storage.service';

const storageKey = 'example_storage';

interface ExampleTypeToSave {
    name: string;
    age: number;
    email: string;
    // ... other properties
}

export const exampleGenericStorageToken = new InjectionToken<PermanentStorageService<ExampleTypeToSave>>(storageKey);

/**
 * exampleGenericStorageProvider
 *
 * Example provider factory for creating a strongly-typed storage service.
 *
 * - Creates an IonicGenericStorage instance for the ExampleTypeToSave data type
 * - Uses 'example_storage' as the storage key for namespacing
 * - Demonstrates how to create feature-specific storage providers
 * - Can be used as a template for implementing real feature storage providers
 *
 * @returns An array of Angular providers that can be included in a module
 */
export const exampleGenericStorageProvider = (): Provider[] => {
    return [
        {
            provide: exampleGenericStorageToken,
            useFactory: () => new IonicPermanentStorageService<ExampleTypeToSave>(storageKey),
            // optional dependencies can be injected here
            // deps: [CustomStorageDriver]
        },
    ];
};
