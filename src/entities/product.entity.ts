import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { BottleEntity } from './bottle.entity';
import { ItemEntity } from './item.entity';
import { ProducerEntity } from './producer.entity';
import { ImageEntity } from './image.entity';
import { ReviewEntity } from './rating.entity';
import { TinyintToBoolTransformer } from '../util/tinyIntToBoolTransformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ name: 'productId' })
    @IsNumber()
    @IsOptional()
    productId: number;

    @Column()
    @IsString()
    @IsOptional()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNumber()
    @IsOptional()
    price: number;

    @Column()
    @IsNumber()
    @IsOptional()
    producerId: number;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Column()
    @IsNumber()
    @IsOptional()
    categoryId: number;

    @Column()
    @IsNumber()
    @IsOptional()
    bottleId: number;

    @Column({
        type: 'tinyint',
        transformer: new TinyintToBoolTransformer(),
    })
    @IsBoolean()
    @IsOptional()
    available: boolean;

    @Column({ name: 'countSold' })
    @IsNumber()
    @IsOptional()
    countSold: number;

    @Column()
    @IsNumber()
    @IsOptional()
    stock: number;

    @ManyToOne(() => BottleEntity, (bottle) => bottle.products, { lazy: true })
    @JoinColumn({ name: 'bottleId' })
    bottle: Promise<BottleEntity>;

    @ManyToOne(() => CategoryEntity, (category) => category.products, {
        lazy: true,
    })
    @JoinColumn({ name: 'categoryId' })
    category: Promise<CategoryEntity>;

    @ManyToOne(() => ProducerEntity, (producer) => producer.products, {
        lazy: true,
    })
    @JoinColumn({ name: 'producerId' })
    producer: Promise<ProducerEntity>;

    @OneToMany(() => ItemEntity, (item) => item.product, { lazy: true })
    items: Promise<ItemEntity[]>;

    @OneToMany(() => ImageEntity, (image) => image.product, { lazy: true })
    images: Promise<ImageEntity[]>;

    @OneToMany(() => ReviewEntity, (rating) => rating.product, { lazy: true })
    ratings: Promise<ReviewEntity[]>;

    toResponse(): ProductResponse {
        return new ProductResponse(this);
    }
}

export class ProductResponse {
    constructor(product: ProductEntity) {
        this.productId = product.productId;
        this.name = product.name;
        this.price = product.price;
        this.producerId = product.producerId;
        this.description = product.description;
        this.categoryId = product.categoryId;
        this.bottleId = product.bottleId;
        this.available = product.available;
        this.stock = product.stock;
    }
    @IsNumber()
    @IsOptional()
    productId: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    producerId: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsNumber()
    @IsOptional()
    bottleId: number;

    @IsOptional()
    @Transform(({ value }) => {
        return value === 'true' ? true : value === 'false' ? false : value;
    })
    @IsBoolean()
    available: boolean;

    @IsNumber()
    @IsOptional()
    stock: number;
}

export class ProductRequest {
    @IsNumber()
    @IsOptional()
    productId: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    producerId: number;

    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsNumber()
    @IsOptional()
    bottleId: number;

    @IsOptional()
    @Transform(({ value }) => {
        return value === 'true' ? true : value === 'false' ? false : value;
    })
    @IsBoolean()
    available: boolean;

    @IsNumber()
    @IsOptional()
    countSold: number;

    @IsNumber()
    @IsOptional()
    stock: number;
}

export class ProductCreateOrUpdateRequest {
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    producerId: number;

    @IsString()
    @IsOptional()
    description: string;
    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsNumber()
    @IsOptional()
    bottleId: number;

    @IsOptional()
    @Transform(({ value }) => {
        return value === 'true' ? true : value === 'false' ? false : value;
    })
    @IsBoolean()
    available: boolean;

    @IsNumber()
    @IsOptional()
    stock: number;
}
