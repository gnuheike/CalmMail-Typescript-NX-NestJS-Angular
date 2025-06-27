import { COMMAND_HANDLER_TOKEN } from '@calm-mail/frontend-adapter';
import { SaveDraftCommandHandler } from '../commands/save-draft/save-draft.command-handler';
import { SendEmailCommandHandler } from '../commands/send-email/send-email.command-handler';
import { Provider } from '@angular/core';
import { ComposeFacade } from '../compose.facade.service';

export function provideComposeFeature(): Array<Provider> {
    return [
        ComposeFacade,
        { provide: COMMAND_HANDLER_TOKEN, useExisting: SaveDraftCommandHandler, multi: true },
        { provide: COMMAND_HANDLER_TOKEN, useExisting: SendEmailCommandHandler, multi: true },
    ];
}
