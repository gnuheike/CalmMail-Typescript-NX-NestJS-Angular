import { Injectable, Signal, signal } from '@angular/core';
import { AuthModel, AuthStatePort, AuthTokenModel } from '@calm-mail/frontend-domain';

@Injectable({ providedIn: 'root' })
export class InMemoryAuthStateAdapter extends AuthStatePort {
    private readonly _state = signal<AuthModel>(AuthModel.createUnauthenticated());

    override updateTokens(tokens: AuthTokenModel): Promise<void> {
        // Update only the tokens part of the state, preserving other properties
        this._state.update((state) => state.addTokens(tokens));
        return Promise.resolve();
    }

    override getState(): Signal<AuthModel> {
        return this._state;
    }

    override clear(): Promise<void> {
        this._state.set(AuthModel.createUnauthenticated());
        return Promise.resolve();
    }

    setState(state: AuthModel): Promise<void> {
        this._state.set(state);
        return Promise.resolve();
    }
}
