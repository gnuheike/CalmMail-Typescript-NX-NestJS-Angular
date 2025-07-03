import { GetEmailsRequest } from '@calm-mail/contract';
import { EmailEntity } from '../entity/email.entity';

export abstract class EmailRepositoryPort {
    /**
     * Get emails with optional filtering
     *
     * @param input Request with filtering and pagination options
     * @returns Promise with the emails response
     */
    abstract getEmails(input: GetEmailsRequest): Promise<EmailEntity[]>;

    /**
     * Create a new email
     *
     * @param input Request with email creation details
     * @returns Promise with the created email response
     */
    abstract createEmail(input: EmailEntity): Promise<EmailEntity>;

    /**
     * Update an existing email
     *
     * @param id ID of the email to update
     * @param input Partial email entity with fields to update
     * @returns Promise with the updated email response
     */
    abstract updateEmail(id: string, input: Partial<EmailEntity>): Promise<EmailEntity>;
}
