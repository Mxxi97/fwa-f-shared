import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CartEntity } from './cart.entity';
import { ProductEntity } from './product.entity';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OmitType } from '../util/omit-type';

//use of enum is questionable since an item already tagged as orderItem by having an orderId
//better usage would be to use the status column as "send, cannceled or returned"
//but for the scope of this project this is fine

//this is for saving in db
enum ItemStatus {
    cartItem = 1,
    orderItem = 2,
}

//use this for coding
export enum ItemStatusString {
    cartItem = 'cartItem',
    orderItem = 'orderItem',
}

@Entity({ name: 'item' })
export class ItemEntity {
    @PrimaryGeneratedColumn({ name: 'itemId' })
    @IsNumber()
    @IsOptional()
    itemId: number;

    @Column({ name: 'cartId' })
    @IsNumber()
    @IsOptional()
    cartId: number;

    @Column({ name: 'orderId' })
    @IsNumber()
    @IsOptional()
    orderId: number;

    @Column()
    @IsNumber()
    @IsOptional()
    quantity: number;

    @Column()
    @IsNumber()
    @IsOptional()
    productId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNumber()
    @IsOptional()
    price: number;

    @Column({
        type: 'numeric',
        enum: ItemStatus,
        transformer: {
            from: (value: ItemStatus) => ItemStatusString[ItemStatus[value]],
            to: (value: ItemStatusString) => ItemStatus[value],
        },
    })
    @IsEnum(ItemStatusString, {
        message: 'Allowed Values: ["cartItem", "orderItem"]',
    })
    @IsOptional()
    status: ItemStatusString;

    @ManyToOne(() => OrderEntity, (order) => order.items, { lazy: true })
    @JoinColumn({ name: 'orderId' })
    order: Promise<OrderEntity>;

    @ManyToOne(() => CartEntity, (cart) => cart.items, { lazy: true })
    @JoinColumn({ name: 'cartId' })
    cart: Promise<CartEntity>;

    @ManyToOne(() => ProductEntity, (product) => product.items, { lazy: true })
    @JoinColumn({ name: 'productId' })
    product: Promise<ProductEntity>;

    toResponse(): ItemResponse {
        return new ItemResponse(this);
    }
}

export class ItemResponse {
    constructor(item: ItemEntity) {
        this.itemId = item.itemId;
        this.cartId = item.cartId;
        this.orderId = item.orderId;
        this.quantity = item.quantity;
        this.productId = item.productId;
        this.price = item.price;
        this.status = item.status;
    }

    @IsNumber()
    itemId: number;

    @IsNumber()
    cartId: number;

    @IsNumber()
    orderId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    productId: number;

    @IsNumber()
    price: number;

    @IsString()
    status: ItemStatusString;
}

export class ItemUpdateRequest {
    @IsNumber()
    @IsOptional()
    cartId: number;

    @IsNumber()
    @IsOptional()
    orderId: number;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    productId: number;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsEnum(ItemStatusString)
    @IsOptional()
    status: ItemStatusString;
} //extends OmitType(ItemEntity, ["cart", "order", "product", "toResponse"]) { }

export class ItemFindRequest {
    @IsNumber()
    @IsOptional()
    itemId: number;

    @IsNumber()
    @IsOptional()
    cartId: number;

    @IsNumber()
    @IsOptional()
    orderId: number;

    @IsNumber()
    @IsOptional()
    productId: number;

    @IsEnum(ItemStatusString)
    @IsOptional()
    status: ItemStatusString;
} //extends OmitType(ItemUpdateRequest, ['price',	'quantity',]) {}

export class ItemCreateRequest extends ItemUpdateRequest {} //OmitType(ItemUpdateRequest, ['itemId',]) {}
