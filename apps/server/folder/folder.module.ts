import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { CreateFolderUseCase, GetFoldersUseCase } from '@calm-mail/backend-application';

@Module({
    controllers: [FolderController],
    providers: [GetFoldersUseCase, CreateFolderUseCase],
})
export class FolderModule {}
