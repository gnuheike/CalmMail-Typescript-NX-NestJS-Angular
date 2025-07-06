import { AttachmentEntity } from './attachment.entity';
import { IdVO, AttachmentIdType } from '@calm-mail/shared-domain';

export const mockAttachment = new AttachmentEntity({
    id: IdVO.generate<AttachmentIdType>('AttachmentId'),
    filename: 'document.pdf',
    contentType: 'application/pdf',
    size: 1024000,
    content: 'base64encodedcontent...',
    createdAt: new Date(),
    updatedAt: new Date(),
});
