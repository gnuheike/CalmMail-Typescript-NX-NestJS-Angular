import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { AppLogger } from '../service/app-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: AppLogger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const { method, url, ip, headers } = request;

        // Skip health checks and static files
        if (url.includes('/health') || url.includes('/favicon.ico')) {
            return next.handle();
        }

        const correlationId = (headers['x-correlation-id'] as string) || (headers['x-request-id'] as string) || crypto.randomUUID();

        const startTime = Date.now();

        const logContext = {
            correlationId,
            userId: (request as any).user?.id,
            userEmail: (request as any).user?.email,
            operation: `${method} ${url}`,
            component: 'HTTP',
            metadata: {
                ip,
                userAgent: headers['user-agent'],
                method,
                url,
            },
        };

        this.logger.debug(`Incoming request: ${method} ${url}`, 'HTTP', logContext);

        return next.handle().pipe(
            tap({
                next: () => {
                    const duration = Date.now() - startTime;
                    this.logger.log(`${method} ${url} - ${response.statusCode} - ${duration}ms`, 'HTTP', {
                        ...logContext,
                        metadata: {
                            ...logContext.metadata,
                            statusCode: response.statusCode,
                            duration,
                        },
                    });
                },
                error: (error) => {
                    const duration = Date.now() - startTime;
                    this.logger.error(`${method} ${url} - Error - ${duration}ms: ${error.message}`, error.stack, 'HTTP', {
                        ...logContext,
                        metadata: {
                            ...logContext.metadata,
                            duration,
                            error: {
                                name: error.name,
                                message: error.message,
                            },
                        },
                    });
                },
            }),
        );
    }
}
