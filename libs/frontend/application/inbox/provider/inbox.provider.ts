import { COMMAND_HANDLER_TOKEN } from '@calm-mail/frontend-adapter';
import { Provider } from '@angular/core';
import { SelectFolderCommandHandler } from '../commands/select-folder/select-folder.command-handler';
import { InboxFacade } from '../inbox.facade.service';

export function provideInboxFeature(): Array<Provider> {
    return [InboxFacade, { provide: COMMAND_HANDLER_TOKEN, useExisting: SelectFolderCommandHandler, multi: true }];
}
