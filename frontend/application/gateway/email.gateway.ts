import { CreateEmailRequest, CreateEmailResponse, GetEmailsRequest, GetEmailsResponse } from '@calm-mail/contract';
import { Observable } from 'rxjs';

export abstract class EmailGateway {
    /**
     * Get emails with optional filtering
     *
     * @param input Request with filtering and pagination options
     * @returns Promise with the emails response
     */
    abstract getEmails(input: GetEmailsRequest): Observable<GetEmailsResponse>;

    /**
     * Create a new email
     *
     * @param input Request with email creation details
     * @returns Promise with the created email response
     */
    abstract createEmail(input: CreateEmailRequest): Observable<CreateEmailResponse>;
}
