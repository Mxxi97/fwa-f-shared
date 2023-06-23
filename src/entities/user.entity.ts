import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AddressEntity } from './address.entity';
import { OrderEntity } from './order.entity';
import { RoleEntity } from './role.entity';
import { AuthEntity } from './auth.entity';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { TinyintToBoolTransformer } from '../util/tinyIntToBoolTransformer';
import { Transform } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'userId' })
    @IsNumber()
    @IsOptional()
    userId: number;

    @Column()
    @IsEmail()
    @IsOptional()
    email: string;

    @Column()
    @IsString()
    @IsOptional()
    password: string;

    @Column({ name: 'fName' })
    @IsString()
    @IsOptional()
    firstName: string;

    @Column({ name: 'lName' })
    @IsString()
    @IsOptional()
    lastName: string;

    @Column({ default: 2 })
    @IsNumber()
    @IsOptional()
    roleId: number;

    @Column({
        type: 'tinyint',
        transformer: new TinyintToBoolTransformer(),
    })
    @IsBoolean()
    @IsOptional()
    active: boolean;

    @OneToMany(() => AddressEntity, (address) => address.user, { lazy: true })
    addresses: Promise<AddressEntity[]>;

    @OneToMany(() => OrderEntity, (order) => order.user, { lazy: true })
    orders: Promise<OrderEntity[]>;

    @ManyToOne(() => RoleEntity, (role) => role.users, { lazy: true })
    @JoinColumn({ name: 'roleId' })
    role: Promise<RoleEntity>;

    @OneToMany(() => AuthEntity, (auth) => auth.user, { lazy: true })
    auths: Promise<AuthEntity[]>;

    toResponse() {
        return new UserResponse(this);
    }
}

export class UserResponse {
    constructor(user: UserEntity) {
        this.userId = user.userId;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.roleId = user.roleId;
        this.active = user.active;
    }

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsNumber()
    @IsOptional()
    roleId: number;

    @IsOptional()
    @Transform(({ value }) => {
        return value === 'true' ? true : value === 'false' ? false : value;
    })
    @IsBoolean()
    active: boolean;
}

export class UserCreateOrUpdateRequest {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsOptional()
    @Transform(({ value }) => {
        return value === 'true' ? true : value === 'false' ? false : value;
    })
    @IsBoolean()
    active: boolean;
}
