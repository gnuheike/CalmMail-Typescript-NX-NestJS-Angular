import { Command } from '@calm-mail/shared-domain';
import { DomainCreateEmailRequest } from '@calm-mail/frontend-domain';

export const SAVE_DRAFT_COMMAND_TYPE = '[Compose] Save Draft';

export class SaveDraftCommand extends Command<void> {
    readonly type = SAVE_DRAFT_COMMAND_TYPE;

    constructor(public readonly payload: DomainCreateEmailRequest) {
        super();
    }
}
