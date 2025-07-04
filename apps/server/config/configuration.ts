import { Config, Environment } from './config.interface';

const validEnvironments: Environment[] = ['development', 'production', 'test'];

export default (): Config => {
    const environment = process.env.NODE_ENV || 'development';

    // Validate NODE_ENV
    if (!validEnvironments.includes(environment as Environment)) {
        throw new Error(`NODE_ENV must be one of: ${validEnvironments.join(', ')}`);
    }

    // Validate JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return {
        environment: environment as Environment,
        jwt: {
            secret: jwtSecret,
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        },
    };
};
