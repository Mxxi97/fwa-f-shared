import { ObjectLiteral, Repository } from 'typeorm';

export async function findByPartialT<T extends ObjectLiteral>(partials: Partial<T>, repository: Repository<T>): Promise<T[]> {
    const where = Object.keys(partials).reduce((acc, key) => {
        acc[key] = partials[key];
        return acc;
    }, {});
    const entities = await repository.find({ where });
    return entities;
}

export async function findOneByPartialT<T extends ObjectLiteral>(partials: Partial<T>, repository: Repository<T>): Promise<T> {
    const where = Object.keys(partials).reduce((acc, key) => {
        acc[key] = partials[key];
        return acc;
    }, {});
    const entity = await repository.findOneOrFail({ where });
    return entity;
}
