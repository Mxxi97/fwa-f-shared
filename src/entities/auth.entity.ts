import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'auth' })
export class AuthEntity {
    @PrimaryGeneratedColumn({ name: 'authId' })
    @IsNumber()
    @IsOptional()
    authId: number;

    @Column()
    @IsNumber()
    @IsOptional()
    userId: number;

    @Column()
    @IsString()
    @IsOptional()
    token: string;

    @Column()
    @IsDate()
    @IsOptional()
    requestDate: Date;

    @Column()
    @IsDate()
    @IsOptional()
    expireDate: Date;

    @ManyToOne(() => UserEntity, (user) => user.auths, { lazy: true })
    @JoinColumn({ name: 'userId' })
    user: Promise<UserEntity>;
}

export class AuthLoginRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
export class AuthResponse {
    @IsString()
    access_token: string;

    @IsDate()
    expiresAfter: Date;
}
