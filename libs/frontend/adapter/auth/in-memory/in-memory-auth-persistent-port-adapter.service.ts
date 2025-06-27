import { Injectable } from '@angular/core';
import { AuthModel, AuthPersistencePort } from '@calm-mail/frontend-domain';

@Injectable({ providedIn: 'root' })
export class InMemoryAuthPersistentAdapter extends AuthPersistencePort {
    private authState: AuthModel | null = null;

    async load(): Promise<AuthModel | null> {
        return this.authState;
    }

    async save(state: AuthModel): Promise<void> {
        this.authState = state;
    }

    async clear(): Promise<void> {
        this.authState = null;
    }
}
