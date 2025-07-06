import { EmailVO, IdVO, UserIdType, ValueObject } from '@calm-mail/shared-domain';

export class UserName extends ValueObject<string> {
    protected _type!: void;
}

export class UserEntity {
    constructor(
        public readonly id: IdVO<UserIdType>,
        public readonly email: EmailVO,
        public readonly name: UserName,
    ) {}
}
