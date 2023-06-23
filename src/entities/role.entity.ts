import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'role' })
export class RoleEntity {
    @PrimaryGeneratedColumn({ name: 'roleId' })
    @IsNumber()
    @IsOptional()
    roleId: number;

    @Column()
    @IsString()
    @IsOptional()
    name: string;

    @OneToMany(() => UserEntity, (user) => user.role, { lazy: true })
    users: Promise<UserEntity[]>;
}
