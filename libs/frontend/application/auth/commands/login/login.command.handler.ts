import { CommandHandler } from '@calm-mail/shared-domain';
import { LOGIN_COMMAND_TYPE, LoginCommand } from './login.command';
import { AuthModel, AuthPersistencePort, AuthRepositoryPort, AuthStatePort, mapAuthResponseToVm } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoggerPort } from '@calm-mail/frontend-shared';
import { AuthContractMapper } from '@calm-mail/frontend-adapter';

@Injectable({
    providedIn: 'root',
})
export class LoginCommandHandler implements CommandHandler<LoginCommand> {
    readonly commandType = LOGIN_COMMAND_TYPE;

    private readonly logger = inject(LoggerPort);
    private readonly repository = inject(AuthRepositoryPort);
    private readonly state = inject(AuthStatePort);
    private readonly storage = inject(AuthPersistencePort);

    async execute(command: LoginCommand): Promise<void> {
        try {
            const contractRequest = AuthContractMapper.toContractLogin(command.payload);
            const response = await firstValueFrom(this.repository.login(contractRequest));
            const { user, tokens } = mapAuthResponseToVm(response);
            const authModel = new AuthModel(true, user, tokens);

            await Promise.all([this.state.setState(authModel), this.storage.save(authModel)]);
        } catch (error) {
            await this.logger.error('Login failed', error);
            throw new Error('Authentication failed. Please check your credentials and try again.');
        }
    }
}
