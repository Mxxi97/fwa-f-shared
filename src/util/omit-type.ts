import { Type } from './type';

export declare function OmitType<T, K extends keyof T>(classRef: Type<T>, keys: readonly K[]): Type<Omit<T, (typeof keys)[number]>>;
