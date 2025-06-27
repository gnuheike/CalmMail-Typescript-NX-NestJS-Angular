import { AuthModel, AuthTokenModel } from '../entity/auth.model';
import { Signal } from '@angular/core';

export abstract class AuthStatePort {
    abstract getState(): Signal<AuthModel>;

    abstract setState(state: AuthModel): Promise<void>;

    abstract clear(): Promise<void>;

    abstract updateTokens(tokens: AuthTokenModel): Promise<void>;
}
