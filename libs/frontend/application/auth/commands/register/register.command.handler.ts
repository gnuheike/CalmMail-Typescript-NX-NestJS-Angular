import { CommandHandler } from '@calm-mail/shared-domain';
import { REGISTER_COMMAND_TYPE, RegisterCommand } from './register.command';
import { AuthModel, AuthPersistencePort, AuthRepositoryPort, AuthStatePort, mapAuthResponseToVm } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoggerPort } from '@calm-mail/frontend-shared';
import { AuthContractMapper } from '@calm-mail/frontend-adapter';

@Injectable({
    providedIn: 'root',
})
export class RegisterCommandHandler implements CommandHandler<RegisterCommand> {
    readonly commandType = REGISTER_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly repository = inject(AuthRepositoryPort);
    private readonly state = inject(AuthStatePort);
    private readonly storage = inject(AuthPersistencePort);

    async execute(command: RegisterCommand): Promise<void> {
        try {
            const contractRequest = AuthContractMapper.toContractRegister(command.payload);
            const response = await firstValueFrom(this.repository.register(contractRequest));
            const { user, tokens } = mapAuthResponseToVm(response);
            const authModel = new AuthModel(true, user, tokens);

            await Promise.all([this.state.setState(authModel), this.storage.save(authModel)]);
        } catch (error) {
            this.logger.error('Registration failed', error).then();
            throw new Error('Registration failed. Please check your information and try again.');
        }
    }
}
