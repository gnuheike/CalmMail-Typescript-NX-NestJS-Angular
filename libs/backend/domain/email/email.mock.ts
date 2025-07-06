import { EmailEntity } from './email.entity';
import { EmailVO, IdVO, EmailIdType } from '@calm-mail/shared-domain';

export const mockEmail = new EmailEntity({
    id: IdVO.generate<EmailIdType>('EmailId'),
    subject: 'mockSubject',
    from: EmailVO.create('from@test.com'),
    to: [EmailVO.create('to@test.com')],
    cc: [EmailVO.create('cc@test.com')],
    bcc: [EmailVO.create('bcc@test.com')],
    receivedAt: new Date(),
    sentAt: null,
    savedAt: new Date(),
    read: true,
    body: 'mockBody',
    preview: 'mockPreview',
    folderId: '1',
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});
