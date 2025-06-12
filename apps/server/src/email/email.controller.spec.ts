import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { CreateEmailUseCase, GetEmailsUseCase } from '@calm-mail/shared-domain';

describe('EmailController', () => {
  let controller: EmailController;

  beforeEach(async () => {
    // Create mock implementations of the use cases
    const mockGetEmailsUseCase = {
      execute: jest.fn(),
    };

    const mockCreateEmailUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: GetEmailsUseCase,
          useValue: mockGetEmailsUseCase,
        },
        {
          provide: CreateEmailUseCase,
          useValue: mockCreateEmailUseCase,
        },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
