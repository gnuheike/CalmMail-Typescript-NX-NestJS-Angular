import { Provider } from '@angular/core';
import { FolderStateService } from '../state/inbox/folder.state.service';
import { EmailStateService } from '../state/inbox/email.state.service';
import { InboxStateFacade } from '../state';

export function inboxFacadeProvider(): Provider[] {
    return [InboxStateFacade, FolderStateService, EmailStateService];
}
