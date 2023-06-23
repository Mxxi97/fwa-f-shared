import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

export async function createOrUpdate<T extends ObjectLiteral>(partials: Partial<T>, repository: Repository<T>, id: string): Promise<T> {
    //check if entity exists if it has an id
    if (partials[id]) {
        const entityExists: boolean = (await repository.findOne({ where: { [id]: partials[id] } as FindOneOptions<T>['where'] })) !== undefined;
        if (!entityExists) {
            //an entity has to exist for the request to be valide else it would create a new one
            throw new Error('Entity does not exist and cannot be updated.');
        }
    }

    const savedEtity = await repository.save(partials as T);

    const entity: T = await repository.findOne({ where: { [id]: savedEtity[id] } as FindOneOptions<T>['where'] });

    return entity;
}
