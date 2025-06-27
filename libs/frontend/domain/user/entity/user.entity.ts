import { ValueObject } from '@calm-mail/shared-domain';
import { email } from '@calm-mail/contract';

export class UserId extends ValueObject<string> {
    protected _type!: void;
}

export class UserName extends ValueObject<string> {
    protected _type!: void;
}

export class UserEmail extends ValueObject<string> {
    protected _type!: void;

    constructor(value: email) {
        super(value);
    }
}

export class UserEntity {
    constructor(
        public readonly id: UserId,
        public readonly email: UserEmail,
        public readonly name: UserName,
    ) {}
}
