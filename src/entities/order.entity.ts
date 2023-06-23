import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ItemEntity } from './item.entity';
import { AddressEntity } from './address.entity';
import { UserEntity } from './user.entity';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OmitType } from '../util/omit-type';

//this should be used for the order overview in the frontend
//each user should be able to see their specific orders
//and the processing status of the order

//this is for saving in db
enum ShippingStatus {
    ordered = 0,
    payed = 1,
    shipped = 2,
    delivered = 3,
    cancelled = 4,
    returned = 5,
}

//use this for coding
export enum ShippingStatusString {
    ordered = 'ordered',
    payed = 'payed',
    shipped = 'shipped',
    delivered = 'delivered',
    cancelled = 'cancelled',
    returned = 'returned',
}

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn({ name: 'orderId' })
    @IsNumber()
    @IsOptional()
    orderId: number;

    @Column({ name: 'userId' })
    @IsNumber()
    @IsOptional()
    userId: number;

    @Column({ name: 'shippingAddressId' })
    @IsNumber()
    @IsOptional()
    shippingAddressId: number;

    @Column({ name: 'billingAddressId' })
    @IsNumber()
    @IsOptional()
    billingAddressId: number;

    @Column({ name: 'orderDate', type: 'date' })
    @IsNumber()
    @IsOptional()
    orderDate: Date;

    @Column({
        name: 'shippingStatus',
        type: 'numeric',
        enum: ShippingStatus,
        transformer: {
            from: (value: ShippingStatus) => ShippingStatusString[ShippingStatus[value]],
            to: (value: ShippingStatusString) => ShippingStatus[value],
        },
    })
    @IsEnum(ShippingStatusString)
    @IsOptional()
    shippingStatus: ShippingStatusString;

    @Column({ name: 'shippingTrackingId', nullable: true })
    @IsString()
    @IsOptional()
    shippingTrackingId: string;

    @OneToMany(() => ItemEntity, (item) => item.order, { lazy: true })
    items: Promise<ItemEntity[]>;

    @ManyToOne(() => AddressEntity, (address) => address.shipOrder, {
        lazy: true,
    })
    @JoinColumn({ name: 'shippingAddressId' })
    shippingAddress: Promise<AddressEntity>;

    @ManyToOne(() => AddressEntity, (address) => address.shipOrder, {
        lazy: true,
    })
    @JoinColumn({ name: 'billingAddressId' })
    billingAddress: Promise<AddressEntity>;

    @ManyToOne(() => UserEntity, (user) => user.orders, { lazy: true })
    @JoinColumn({ name: 'userId' })
    user: Promise<UserEntity>;

    toResponse(): OrdersResponse {
        return new OrdersResponse(this);
    }
}

export class OrdersResponse {
    constructor(orderEntity: OrderEntity) {
        this.orderId = orderEntity.orderId;
        this.userId = orderEntity.userId;
        this.shippingAddressId = orderEntity.shippingAddressId;
        this.billingAddressId = orderEntity.billingAddressId;
        this.orderDate = orderEntity.orderDate;
        this.shippingStatus = orderEntity.shippingStatus;
        this.shippingTrackingId = orderEntity.shippingTrackingId;
    }

    @IsNumber()
    @IsOptional()
    orderId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    shippingAddressId: number;

    @IsNumber()
    @IsOptional()
    billingAddressId: number;

    @IsDate()
    @IsOptional()
    orderDate: Date;

    @IsEnum(ShippingStatusString)
    @IsOptional()
    shippingStatus: ShippingStatusString;

    @IsString()
    @IsOptional()
    shippingTrackingId: string;
}

export class OrdersFindRequest {
    @IsNumber()
    @IsOptional()
    orderId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    shippingAddressId: number;

    @IsNumber()
    @IsOptional()
    billingAddressId: number;

    @IsEnum(ShippingStatusString)
    @IsOptional()
    shippingStatus: ShippingStatusString;

    @IsString()
    @IsOptional()
    shippingTrackingId: string;
} /* extends OmitType(OrderEntity, [
	'items',
	'shippingAddress',
	'toResponse',
	'user',
	'billingAddress',
	'orderDate',
]) {} */

export class OrderUpdateRequest {
    @IsNumber()
    @IsOptional()
    shippingAddressId: number;

    @IsNumber()
    @IsOptional()
    billingAddressId: number;

    @IsEnum(ShippingStatusString)
    @IsOptional()
    shippingStatus: ShippingStatusString;

    @IsString()
    @IsOptional()
    shippingTrackingId: string;
} /* extends OmitType(OrdersFindRequest, [
	'userId',
	'orderId',
]) {} */

export class OrderCreateRequest {
    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    cartId: number;

    @IsNumber()
    @IsOptional()
    shippingAddressId: number;

    @IsNumber()
    @IsOptional()
    billingAddressId: number;

    @IsEnum(ShippingStatusString)
    @IsOptional()
    shippingStatus: ShippingStatusString;
} /* extends OmitType(OrdersFindRequest, [
	'orderId',
	'shippingTrackingId',
]) {
	cartId: number;
} */
