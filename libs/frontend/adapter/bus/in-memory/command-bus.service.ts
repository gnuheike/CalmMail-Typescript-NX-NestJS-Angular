import { inject, Injectable } from '@angular/core';
import { from, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoggerPort } from '@calm-mail/frontend-shared';
import { Command, CommandBus, CommandHandler, CommandResult } from '@calm-mail/shared-domain';
import { COMMAND_HANDLER_TOKEN } from './command-bus.provider';

@Injectable({
    providedIn: 'root',
})
export class InMemoryCommandBus extends CommandBus {
    private readonly handlerMap = new Map<string, CommandHandler<Command>>();
    private readonly logger = inject(LoggerPort);

    constructor() {
        super();
        // Inject all handlers provided via the multi-provider token.
        const handlers = inject(COMMAND_HANDLER_TOKEN, { optional: true }) ?? [];
        this.registerHandlers(handlers);
    }

    /**
     * Dispatches a command to its registered handler and returns a fully type-safe Observable of the result.
     * @param command The command to dispatch.
     * @returns An observable that emits the result of the command execution.
     */
    dispatch<T extends Command>(command: T): Promise<CommandResult<T>> {
        const handler = this.handlerMap.get(command.type);

        if (!handler) {
            const error = new Error(`No handler registered for command type: ${command.type}`);
            this.logger.error(error.message, { command }).then();
            return Promise.reject(error);
        }

        // We use `of(command).pipe()` to create a cold observable stream.
        // This ensures all execution, including synchronous errors in `execute`,
        // is captured within the RxJS error handling context.
        return new Promise<CommandResult<T>>((resolve, reject) => {
            of(command)
                .pipe(
                    // Use switchMap to handle the command execution, which might return an Observable, Promise, or a plain value.
                    switchMap((cmd) => {
                        // `from` intelligently converts a value, Promise, or Observable into an Observable stream.
                        // This greatly simplifies the logic for handling different return types from the handler.
                        return from(Promise.resolve(handler.execute(cmd)));
                    }),
                    catchError((error) => {
                        this.logger.error(`Error executing command: ${command.type}`, { error, command }).then();
                        // Re-throw the error to be handled by the subscriber.
                        return throwError(() => error);
                    }),
                )
                .subscribe({
                    next: (result) => resolve(result as CommandResult<T>),
                    error: (error) => reject(error),
                });
        });
    }

    /**
     * Registers a command handler for its declared command type.
     * @param handler The command handler to register.
     */
    handle(handler: CommandHandler): void {
        const commandType = handler.commandType;
        if (!commandType) {
            this.logger.warn(`Handler is missing the 'commandType' property and cannot be registered.`).then();
            return;
        }

        if (this.handlerMap.has(commandType)) {
            this.logger.warn(`Overwriting existing handler for command type: ${commandType}`).then();
        }

        this.handlerMap.set(commandType, handler);
        this.logger.info(`Registered handler for command: ${commandType}`).then();
    }

    /**
     * Registers all provided command handlers by mapping their declared commandType to the handler instance.
     * This method is idempotent and robust.
     * @param handlers An array of command handlers to register.
     */
    private registerHandlers(handlers: readonly CommandHandler[]): void {
        for (const handler of handlers) {
            if (!handler.commandType) {
                this.logger.warn(`Handler ${handler.constructor.name} is missing the 'commandType' property and cannot be registered.`).then();
                continue;
            }

            if (this.handlerMap.has(handler.commandType)) {
                this.logger.warn(`Duplicate handler registration for command type: ${handler.commandType}. The existing handler will be overwritten.`).then();
            }

            this.handlerMap.set(handler.commandType, handler);
            this.logger.info(`Registered handler for command: ${handler.commandType}`).then();
        }
        this.logger.info(`${this.handlerMap.size} command handlers registered successfully.`).then();
    }
}
