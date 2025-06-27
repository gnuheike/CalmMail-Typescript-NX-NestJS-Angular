import { Injectable } from '@angular/core';
import { GetEmailsRequest, mockEmails } from '@calm-mail/contract';
import { EmailEntity, EmailRepositoryPort } from '@calm-mail/frontend-domain';
import { mapToEmailContractsToEntities } from '../mapper/email.mapper';
import { simulateNetworkRequestPromise } from '../../util';

/**
 * Mock implementation of HttpEmailGateway
 *
 * Provides mock implementations of email-related gateway methods
 * for development and testing purposes.
 */
@Injectable()
export class InMemoryEmailRepositoryAdapter extends EmailRepositoryPort {
    private emails: EmailEntity[] = mapToEmailContractsToEntities(mockEmails);

    getEmails(input: GetEmailsRequest): Promise<EmailEntity[]> {
        const filteredEmails = this.emails.filter((email) => email.folderId === input.folderId);
        return simulateNetworkRequestPromise(() => {
            return filteredEmails;
        });
    }

    createEmail(input: EmailEntity): Promise<EmailEntity> {
        this.emails.push(input);
        return simulateNetworkRequestPromise(() => {
            return input;
        });
    }
}
