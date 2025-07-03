export interface DomainLoginRequest {
  email: string;
  password: string;
}

export interface DomainRegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface DomainRefreshTokenRequest {
  refreshToken: string;
}
