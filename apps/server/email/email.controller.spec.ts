import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { inMemoryEmailUseCaseProviders } from '@calm-mail/backend-use-case-mock-adapter';

describe('EmailController', () => {
    let controller: EmailController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmailController],
            providers: [...inMemoryEmailUseCaseProviders()],
        }).compile();

        controller = module.get<EmailController>(EmailController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
