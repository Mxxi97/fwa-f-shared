import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum AddressType {
    shipping = 1,
    billing = 2,
}

export enum AddressTypeString {
    shipping = 'shipping',
    billing = 'billing',
}

@Entity({ name: 'address' })
export class AddressEntity {
    @PrimaryGeneratedColumn({ name: 'addressId' })
    @IsNumber()
    @IsOptional()
    addressId: number;

    @Column({
        type: 'numeric',
        enum: AddressType,
        transformer: {
            from: (value: AddressType) => AddressTypeString[AddressType[value]],
            to: (value: AddressTypeString) => AddressType[value],
        },
    })
    @IsEnum(AddressTypeString, {
        message: 'Allowed Values: ["shipping", "billing"]',
    })
    @IsOptional()
    type: AddressTypeString;

    @Column()
    @IsString()
    @IsOptional()
    country: string;

    @Column()
    @IsNumber()
    @IsOptional()
    zipCode: number;

    @Column()
    @IsString()
    @IsOptional()
    city: string;

    @Column()
    @IsString()
    @IsOptional()
    street: string;

    @Column()
    @IsNumber()
    @IsOptional()
    number: number;

    @Column()
    @IsNumber()
    @IsOptional()
    userId: number;

    @Column()
    @IsString()
    @IsOptional()
    firstName: string;

    @Column()
    @IsString()
    @IsOptional()
    lastName: string;

    @OneToMany(() => OrderEntity, (order) => order.shippingAddress, {
        lazy: true,
    })
    shipOrder: Promise<OrderEntity[]>;

    @OneToMany(() => OrderEntity, (order) => order.billingAddress, {
        lazy: true,
    })
    billingOrder: Promise<OrderEntity[]>;

    @ManyToOne(() => UserEntity, (user) => user.addresses, { lazy: true })
    @JoinColumn({ name: 'userId' })
    user: Promise<UserEntity>;

    toResponse() {
        return new AddressResponse(this);
    }
}

export class AddressResponse {
    constructor(address: AddressEntity) {
        this.lastName = address.lastName;
        this.firstName = address.firstName;
        this.addressId = address.addressId;
        this.type = address.type;
        this.country = address.country;
        this.zipCode = address.zipCode;
        this.city = address.city;
        this.street = address.street;
        this.number = address.number;
        this.userId = address.userId;
    }

    @IsNumber()
    @IsOptional()
    addressId: number;

    @IsEnum(AddressTypeString)
    @IsOptional()
    type: AddressTypeString;

    @IsString()
    @IsOptional()
    country: string;

    @IsNumber()
    @IsOptional()
    zipCode: number;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    street: string;

    @IsNumber()
    @IsOptional()
    number: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}

export class AddressCreateOrUpdateRequest {
    @IsEnum(AddressTypeString)
    @IsOptional()
    type: AddressTypeString;

    @IsString()
    @IsOptional()
    country: string;

    @IsNumber()
    @IsOptional()
    zipCode: number;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    street: string;

    @IsNumber()
    @IsOptional()
    number: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}
