export type Environment = 'development' | 'production' | 'test';

export interface Config {
    environment: Environment;
    jwt: {
        secret: string;
        expiresIn: string;
    };
}
