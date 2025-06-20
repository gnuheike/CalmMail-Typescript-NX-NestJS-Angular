import { Injectable } from '@nestjs/common';
import { CreateEmailUseCase } from '@calm-mail/backend-domain';
import {
    CreateEmailRequest,
    CreateEmailResponse,
    createMockDraftEmail,
    createMockEmail,
    createMockSentEmail,
    Email
} from '@calm-mail/contract';

/**
 * In-memory implementation of CreateEmailUseCase
 *
 * This class provides a mock implementation of the CreateEmailUseCase
 * using the mock data from the contract package.
 */
@Injectable()
export class InMemoryCreateEmailUseCase extends CreateEmailUseCase {
    /**
     * Execute the create email use case
     *
     * @param input Request with email creation details
     * @returns Promise with the created email response
     */
    async execute(input: CreateEmailRequest): Promise<CreateEmailResponse> {
        // Create a new email based on the input
        const email = this.createEmail(input);

        // Return the response with the created email
        return {
            email,
        };
    }

    /**
     * Create a new email based on the input
     *
     * @param input Request with email creation details
     * @returns The created email
     * @private
     */
    private createEmail(input: CreateEmailRequest): Email {
        // Generate a unique ID for the email
        const emailId = this.generateEmailId();

        // If the email is a draft, use the draft factory
        if (input.saveAsDraft) {
            return this.createDraftEmail(input, emailId);
        }

        // If the email is from the user, use the sent factory
        if (input.from === 'user@example.com') {
            return this.createSentEmail(input, emailId);
        }

        // Otherwise, use the regular email factory
        return this.createRegularEmail(input, emailId);
    }

    /**
     * Generates a unique ID for an email
     * @returns A unique ID string
     * @private
     */
    private generateEmailId(): string {
        return `clq${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`;
    }

    /**
     * Creates a draft email
     * @param input The email creation request
     * @param emailId The generated email ID
     * @returns A draft email
     * @private
     */
    private createDraftEmail(input: CreateEmailRequest, emailId: string): Email {
        return createMockDraftEmail({
            id: emailId,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            folderId: input.folderId || 'clq1234567890drafts00000001',
            threadId: input.threadId,
        });
    }

    /**
     * Creates a sent email
     * @param input The email creation request
     * @param emailId The generated email ID
     * @returns A sent email
     * @private
     */
    private createSentEmail(input: CreateEmailRequest, emailId: string): Email {
        return createMockSentEmail({
            id: emailId,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            folderId: input.folderId || 'clq1234567890drafts00000001',
            threadId: input.threadId,
        });
    }

    /**
     * Creates a regular email
     * @param input The email creation request
     * @param emailId The generated email ID
     * @returns A regular email
     * @private
     */
    private createRegularEmail(input: CreateEmailRequest, emailId: string): Email {
        return createMockEmail({
            id: emailId,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            read: false,
            isDraft: input.saveAsDraft || false,
            folderId: input.folderId || 'clq1234567890drafts00000001',
            threadId: input.threadId,
        });
    }
}
