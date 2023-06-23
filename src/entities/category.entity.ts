import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'categoryId' })
    @IsNumber()
    @IsOptional()
    categoryId: number;

    @Column()
    @IsString()
    @IsOptional()
    name: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.category, {
        lazy: true,
    })
    products: Promise<ProductEntity[]>;

    toResponse(): CategoryResponse {
        return new CategoryResponse(this);
    }
}

export class CategoryResponse {
    constructor(category: CategoryEntity) {
        this.categoryId = category.categoryId;
        this.name = category.name;
        this.description = category.description;
    }

    @IsNumber()
    categoryId: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}

export class CategoryCreateOrUpdateRequest {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
} // extends OmitType(CategoryEntity, [  "categoryId",]) {}
