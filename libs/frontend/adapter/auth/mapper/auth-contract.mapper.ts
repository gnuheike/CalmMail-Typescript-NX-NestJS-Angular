import { LoginRequest, RegisterRequest, RefreshTokenRequest } from '@calm-mail/contract';
import { DomainLoginRequest, DomainRegisterRequest, DomainRefreshTokenRequest } from '@calm-mail/frontend-domain';

export class AuthContractMapper {
  static toDomainLogin(contract: LoginRequest): DomainLoginRequest {
    return {
      email: contract.email,
      password: contract.password
    };
  }

  static toContractLogin(domain: DomainLoginRequest): LoginRequest {
    return {
      email: domain.email,
      password: domain.password
    };
  }

  static toDomainRegister(contract: RegisterRequest): DomainRegisterRequest {
    const domain: DomainRegisterRequest = {
      email: contract.email,
      password: contract.password
    };

    if (contract.name !== undefined) {
      domain.name = contract.name;
    }

    return domain;
  }

  static toContractRegister(domain: DomainRegisterRequest): RegisterRequest {
    return {
      email: domain.email,
      password: domain.password,
      name: domain.name
    };
  }

  static toDomainRefreshToken(contract: RefreshTokenRequest): DomainRefreshTokenRequest {
    return {
      refreshToken: contract.refreshToken
    };
  }

  static toContractRefreshToken(domain: DomainRefreshTokenRequest): RefreshTokenRequest {
    return {
      refreshToken: domain.refreshToken
    };
  }
}
