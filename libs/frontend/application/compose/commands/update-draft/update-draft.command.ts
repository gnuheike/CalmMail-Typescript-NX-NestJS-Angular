import { Command } from '@calm-mail/shared-domain';
import { DomainUpdateEmailRequest } from '@calm-mail/frontend-domain';

export const UPDATE_DRAFT_COMMAND_TYPE = '[Compose] Update Draft';

export class UpdateDraftCommand extends Command<void> {
  readonly type = UPDATE_DRAFT_COMMAND_TYPE;
  constructor(
    public readonly id: string,
    public readonly payload: DomainUpdateEmailRequest
  ) {
    super();
  }
}
