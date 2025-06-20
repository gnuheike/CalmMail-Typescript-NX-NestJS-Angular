import { Provider } from '@angular/core';
import { FolderStateService } from '../data-access/folder/folder.state.service';
import { EmailStateService } from '../data-access/email/email.state.service';
import { InboxStateFacade } from '../data-access/inbox.facade';

export function inboxFacadeProvider(): Provider[] {
    return [InboxStateFacade, FolderStateService, EmailStateService];
}
