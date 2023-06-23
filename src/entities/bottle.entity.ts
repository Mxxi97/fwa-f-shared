import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'bottle' })
export class BottleEntity {
    @PrimaryGeneratedColumn({ name: 'bottleId' })
    @IsNumber()
    @IsOptional()
    bottleId: number;

    @Column()
    @IsString()
    @IsOptional()
    name: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Column()
    @IsString()
    @IsOptional()
    type: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    @IsNumber()
    @IsOptional()
    deposit: number;

    @Column()
    @IsNumber()
    @IsOptional()
    volume: number;

    @OneToMany(() => ProductEntity, (product) => product.bottle, { lazy: true })
    products: Promise<ProductEntity[]>;

    toResponse(): BottleResponse {
        return new BottleResponse(this);
    }
}

export class BottleResponse {
    constructor(bottle: BottleEntity) {
        this.bottleId = bottle.bottleId;
        this.name = bottle.name;
        this.description = bottle.description;
        this.type = bottle.type;
        this.deposit = bottle.deposit;
        this.volume = bottle.volume;
    }

    @IsNumber()
    bottleId: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    type: string;

    @IsNumber()
    deposit: number;

    @IsNumber()
    volume: number;
}

export class BottleFindRequest {
    @IsNumber()
    @IsOptional()
    bottleId: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsNumber()
    @IsOptional()
    deposit: number;

    @IsNumber()
    @IsOptional()
    volume: number;
} //extends BottleEntity { }

export class BottleCreateOrUpdateRequest {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsNumber()
    @IsOptional()
    deposit: number;

    @IsNumber()
    @IsOptional()
    volume: number;
} //extends OmitType(BottleEntity, ['bottleId',]) {}
