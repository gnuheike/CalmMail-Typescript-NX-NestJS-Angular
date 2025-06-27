import { AuthModel } from '../entity/auth.model';

export abstract class AuthPersistencePort {
    abstract load(): Promise<AuthModel | null>;

    abstract save(state: AuthModel): Promise<void>;

    abstract clear(): Promise<void>;
}
