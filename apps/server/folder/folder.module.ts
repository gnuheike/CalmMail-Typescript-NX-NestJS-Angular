import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { inMemoryFolderUseCaseProviders } from '@calm-mail/backend-use-case-in-memory-adapter';

@Module({
    controllers: [FolderController],
    providers: [...inMemoryFolderUseCaseProviders()],
})
export class FolderModule {}
