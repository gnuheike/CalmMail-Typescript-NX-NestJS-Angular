import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';

@Module({
    controllers: [FolderController],
    providers: [],
})
export class FolderModule {}
