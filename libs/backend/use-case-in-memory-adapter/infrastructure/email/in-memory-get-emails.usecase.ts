import { Injectable } from '@nestjs/common';
import { GetEmailsUseCase } from '@calm-mail/backend-domain';
import { GetEmailsRequest, GetEmailsResponse, mockEmails } from '@calm-mail/contract';

/**
 * In-memory implementation of GetEmailsUseCase
 *
 * This class provides a mock implementation of the GetEmailsUseCase
 * using the mock data from the contract package.
 */
@Injectable()
export class InMemoryGetEmailsUseCase extends GetEmailsUseCase {
    // Store emails in memory
    private readonly emails = mockEmails;

    /**
     * Execute the get emails use case
     *
     * @param input Request with filtering and pagination options
     * @returns Promise with the emails response
     */
    async execute(input: GetEmailsRequest): Promise<GetEmailsResponse> {
        if (!input.folderId) {
            return {
                emails: this.emails,
                pagination: {
                    page: 1,
                    limit: 20,
                    totalItems: this.emails.length,
                    totalPages: Math.ceil(this.emails.length / 20),
                },
            };
        }

        // Apply pagination
        const page = input.page || 1;
        const limit = input.limit || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedEmails = this.emails.slice(startIndex, endIndex);

        return {
            emails: paginatedEmails,
            pagination: {
                page,
                limit,
                totalItems: this.emails.length,
                totalPages: Math.ceil(this.emails.length / limit),
            },
        };
    }
}
