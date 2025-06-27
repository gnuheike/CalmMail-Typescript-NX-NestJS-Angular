import { Injectable } from '@nestjs/common';
import { CreateEmailUseCase } from '@calm-mail/backend-domain';
import { CreateEmailRequest, CreateEmailResponse, Email } from '@calm-mail/contract';

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
        return {
            id: `clq${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            folderId: input.folderId || 'clq1234567890drafts00000001',
            threadId: input.threadId,
            isDraft: input.saveAsDraft || false,
            read: true,
        };
    }
}
