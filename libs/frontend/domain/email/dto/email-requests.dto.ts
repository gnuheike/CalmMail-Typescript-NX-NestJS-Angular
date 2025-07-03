import { CreateAttachmentRequest } from './attachement-requests.dto';

export interface DomainCreateEmailRequest {
    id: string;
    subject: string;
    from: string;
    to: string[];
    cc: string[];
    bcc: string[];
    body: string;
    attachments: CreateAttachmentRequest[];
    receivedAt: Date | null;
    sentAt: Date | null;
    savedAt: Date;
    read: boolean;
    isDraft: boolean;
    folderId: string;
    accountId: string;
    threadId?: string;
}

export interface DomainUpdateEmailRequest {
    to?: string[];
    cc?: string[];
    bcc?: string[];
    subject?: string;
    body?: string;
    folderId?: string;
    read?: boolean;
}
