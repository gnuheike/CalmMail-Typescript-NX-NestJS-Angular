import { inboxFacadeProvider } from './inbox.facade.provider';
import { FolderStateService } from '../state/inbox/folder.state.service';
import { EmailStateService } from '../state/inbox/email.state.service';
import { InboxStateFacade } from '../state';

describe('inboxFacadeProvider', () => {
  it('should return an array of providers', () => {
    const providers = inboxFacadeProvider();
    
    expect(providers).toBeInstanceOf(Array);
    expect(providers).toHaveLength(3);
  });

  it('should include InboxStateFacade, FolderStateService, and EmailStateService', () => {
    const providers = inboxFacadeProvider();
    
    expect(providers).toContain(InboxStateFacade);
    expect(providers).toContain(FolderStateService);
    expect(providers).toContain(EmailStateService);
  });
});
