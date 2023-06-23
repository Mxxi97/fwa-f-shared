import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'producer' })
export class ProducerEntity {
    @PrimaryGeneratedColumn({ name: 'producerId' })
    @IsNumber()
    @IsOptional()
    producerId: number;

    @Column()
    @IsString()
    @IsOptional()
    name: string;

    @Column()
    @IsString()
    @IsOptional()
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.producer, {
        lazy: true,
    })
    products: Promise<ProductEntity[]>;

    toResponse(): ProducerResponse {
        return new ProducerResponse(this);
    }
}

export class ProducerResponse {
    constructor(producer: ProducerEntity) {
        this.producerId = producer.producerId;
        this.name = producer.name;
        this.description = producer.description;
    }

    @IsNumber()
    @IsOptional()
    producerId: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}

export class ProducerCreateOrUpdate {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
} //extends OmitType(ProducerEntity, ["producerId"]) { }
