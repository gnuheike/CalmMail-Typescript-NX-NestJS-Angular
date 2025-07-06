import { IdType } from '../common';

export type UserIdType = IdType & { readonly __brand: 'UserId' };
