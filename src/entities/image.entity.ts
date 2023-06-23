import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { OmitType } from '../util/omit-type';

@Entity({ name: 'image' })
export class ImageEntity {
    @PrimaryGeneratedColumn({ name: 'imageId' })
    @IsNumber()
    @IsOptional()
    imageId: number;

    @Exclude()
    @Column({ type: 'mediumblob' })
    image: Buffer;

    @Column()
    size: number;

    @Column()
    type: string;

    @Column()
    @IsNumber()
    @IsOptional()
    productId: number;

    @Column()
    @IsNumber()
    @IsOptional()
    sortOrder: number;

    @ManyToOne(() => ProductEntity, (product) => product.images, { lazy: true })
    @JoinColumn({ name: 'productId' })
    product: Promise<ProductEntity>;

    toResponse(): ImageResponse {
        return new ImageResponse(this);
    }
}

export class ImageResponse {
    constructor(image: ImageEntity) {
        this.imageId = image.imageId;
        this.size = image.size;
        this.type = image.type;
        this.productId = image.productId;
        this.sortOrder = image.sortOrder;
    }

    @IsNumber()
    imageId: number;

    @IsNumber()
    size: number;

    @IsString()
    type: string;

    @IsNumber()
    productId: number;

    @IsNumber()
    sortOrder: number;
}

export class ImageCreateRequest {
    @IsNumber()
    @IsOptional()
    productId: number;

    @IsNumber()
    @IsOptional()
    sortOrder: number;
} //extends OmitType(ImageResponse, ["imageId", "size", "type"]) { }
