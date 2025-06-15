import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { FolderModule } from '../folder/folder.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), EmailModule, FolderModule],
})
export class AppModule {}
