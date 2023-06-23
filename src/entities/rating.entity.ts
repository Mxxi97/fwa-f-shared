import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

@Entity({ name: 'rating' })
export class ReviewEntity {
    @PrimaryGeneratedColumn({ name: 'ratingId' })
    @IsNumber()
    @IsOptional()
    ratingId: number;

    @Column()
    @IsNumber()
    @IsOptional()
    productId: number;

    @Column()
    @IsNumber()
    @IsOptional()
    userId: number;

    @Column({})
    @IsNumber()
    @IsOptional()
    @Max(5)
    @Min(1)
    score: number;

    @Column()
    @IsString()
    @IsOptional()
    comment: string;

    @ManyToOne(() => ProductEntity, (product) => product.ratings, {
        lazy: true,
    })
    @JoinColumn({ name: 'productId' })
    product: Promise<ProductEntity>;

    //todo user Join

    toResponse(): ReviewResponse {
        return new ReviewResponse(this);
    }
}

export class ReviewResponse {
    constructor(rating: ReviewEntity) {
        this.ratingId = rating.ratingId;
        this.productId = rating.productId;
        this.userId = rating.userId;
        this.score = rating.score;
        this.comment = rating.comment;
    }

    @IsNumber()
    @IsOptional()
    ratingId: number;

    @IsNumber()
    @IsOptional()
    productId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    @Max(5)
    @Min(1)
    score: number;

    @IsString()
    @IsOptional()
    comment: string;
}

export class ReviewCreateUpdateRequest {
    @IsNumber()
    @IsOptional()
    productId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNumber()
    @IsOptional()
    @Max(5)
    @Min(1)
    score: number;

    @IsString()
    @IsOptional()
    comment: string;
}
