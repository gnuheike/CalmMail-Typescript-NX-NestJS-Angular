import { Injectable } from '@nestjs/common';
import { GetEmailsUseCase } from '@calm-mail/backend-domain';
import { GetEmailsRequest, GetEmailsResponse, createMockGetEmailsResponse, createMockEmailsForFolder } from '@calm-mail/contract';

/**
 * In-memory implementation of GetEmailsUseCase
 * 
 * This class provides a mock implementation of the GetEmailsUseCase
 * using the mock data from the contract package.
 */
@Injectable()
export class InMemoryGetEmailsUseCase extends GetEmailsUseCase {
  /**
   * Execute the get emails use case
   * 
   * @param input Request with filtering and pagination options
   * @returns Promise with the emails response
   */
  async execute(input: GetEmailsRequest): Promise<GetEmailsResponse> {
    // If a specific folder ID is provided, create mock emails for that folder
    if (input.folderId) {
      const emails = createMockEmailsForFolder(input.folderId);
      
      // Apply pagination
      const page = input.page || 1;
      const limit = input.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEmails = emails.slice(startIndex, endIndex);
      
      return {
        emails: paginatedEmails,
        pagination: {
          page,
          limit,
          totalItems: emails.length,
          totalPages: Math.ceil(emails.length / limit),
        },
      };
    }
    
    // If no folder ID is provided, return the default mock response
    return createMockGetEmailsResponse();
  }
}
