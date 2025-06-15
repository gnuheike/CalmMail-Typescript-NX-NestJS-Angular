import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Controller } from '@nestjs/common';
import { folderContract } from '@calm-mail/contract';
import { CreateFolderUseCase, GetFolderStatsUseCase, GetFoldersUseCase } from '@calm-mail/backend-domain';

@Controller()
export class FolderController {
    constructor(
        private readonly getFoldersUseCase: GetFoldersUseCase,
        private readonly getFolderStatsUseCase: GetFolderStatsUseCase,
        private readonly createFolderUseCase: CreateFolderUseCase,
    ) {}

    @TsRestHandler(folderContract.getFolders)
    async getFolders() {
        return tsRestHandler(folderContract.getFolders, async ({ query }) => {
            const result = await this.getFoldersUseCase.execute(query);
            return { status: 200, body: result };
        });
    }

    @TsRestHandler(folderContract.getFolderStats)
    async getFolderStats() {
        return tsRestHandler(folderContract.getFolderStats, async ({ params }) => {
            const result = await this.getFolderStatsUseCase.execute(params);
            return { status: 200, body: result };
        });
    }

    @TsRestHandler(folderContract.createFolder)
    async createFolder() {
        return tsRestHandler(folderContract.createFolder, async ({ body }) => {
            const result = await this.createFolderUseCase.execute(body);
            return { status: 201, body: result };
        });
    }
}
