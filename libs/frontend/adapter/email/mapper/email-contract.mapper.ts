import { UpdateEmailRequest } from '@calm-mail/contract';
import { DomainCreateEmailRequest, DomainUpdateEmailRequest, EmailEntity, EmailId, AttachmentEntity, AttachmentId } from '@calm-mail/frontend-domain';

export class EmailContractMapper {
    static toEntity(domain: DomainCreateEmailRequest): EmailEntity {
        const attachments = domain.attachments.map(attachment => 
            new AttachmentEntity(
                AttachmentId.fromString(`att_${Date.now()}_${Math.random()}`), // Generate temporary ID
                attachment.filename,
                attachment.contentType,
                attachment.size,
                attachment.contentId,
                attachment.content
            )
        );

        return new EmailEntity(
            EmailId.fromString(domain.id),
            domain.subject,
            domain.from,
            domain.to,
            domain.cc,
            domain.bcc,
            domain.receivedAt,
            domain.sentAt,
            domain.savedAt,
            domain.read,
            domain.body,
            domain.body.substring(0, 100) + (domain.body.length > 100 ? '...' : ''),
            domain.folderId,
            attachments,
        );
    }

    static toDomainUpdate(contract: UpdateEmailRequest): DomainUpdateEmailRequest {
        const domain: DomainUpdateEmailRequest = {};

        if (contract.read !== undefined) domain.read = contract.read;
        if (contract.folderId !== undefined) domain.folderId = contract.folderId;
        if (contract.subject !== undefined) domain.subject = contract.subject;
        if (contract.to !== undefined) domain.to = contract.to;
        if (contract.cc !== undefined) domain.cc = contract.cc;
        if (contract.bcc !== undefined) domain.bcc = contract.bcc;
        if (contract.body !== undefined) domain.body = contract.body;

        return domain;
    }
}
