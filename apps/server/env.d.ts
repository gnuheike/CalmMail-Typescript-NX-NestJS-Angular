declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        JWT_SECRET: string;
        JWT_EXPIRES_IN?: string;
        LOG_LEVEL: string;
    }
}
