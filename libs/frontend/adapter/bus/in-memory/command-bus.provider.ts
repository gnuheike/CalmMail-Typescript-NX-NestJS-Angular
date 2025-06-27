import { InjectionToken, Provider } from '@angular/core';
import { InMemoryCommandBus } from './command-bus.service';
import { CommandBus, CommandHandler } from '@calm-mail/shared-domain';

export const COMMAND_HANDLER_TOKEN = new InjectionToken<CommandHandler[]>('COMMAND_HANDLER_TOKEN');

/**
 * Provider for the CommandBus
 * This provider registers the CommandBusService as the implementation of the CommandBus interface
 */
export function provideBus(): Provider[] {
    return [
        {
            provide: CommandBus,
            useClass: InMemoryCommandBus,
        },
    ];
}
