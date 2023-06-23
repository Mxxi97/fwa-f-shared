import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemEntity } from './item.entity';
import { IsNumber, IsOptional } from 'class-validator';
import { OmitType } from '../util/omit-type';

@Entity({ name: 'cart' })
export class CartEntity {
    @PrimaryGeneratedColumn({ name: 'cartId' })
    @IsNumber()
    @IsOptional()
    cartId: number;

    @Column({ name: 'userId' })
    @IsNumber()
    @IsOptional()
    userId: number;

    @OneToMany(() => ItemEntity, (item) => item.cart, { lazy: true })
    items: Promise<ItemEntity[]>;

    async toResponse(): Promise<CartResponse> {
        return new CartResponse(this);
    }
}

export class CartResponse {
    constructor(cart: CartEntity) {
        this.cartId = cart.cartId;
        this.userId = cart.userId;
    }

    @IsNumber()
    @IsOptional()
    cartId: number;

    @IsNumber()
    @IsOptional()
    userId: number;
}

export class CartRequest {
    @IsNumber()
    @IsOptional()
    cartId: number;

    @IsNumber()
    @IsOptional()
    userId: number;
} //extends OmitType(CartEntity, ['items'] as const) {}

export class CartCreateOrUpdateRequest {
    @IsNumber()
    @IsOptional()
    userId: number;
} //extends OmitType(CartRequest, ['cartId',] as const) {}
