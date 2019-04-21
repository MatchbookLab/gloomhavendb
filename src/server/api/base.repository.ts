import { BadRequestException, NotFoundException } from '@nestjs/common';
import { omit, pick, startCase } from 'lodash';
import { DeepPartial, FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { Props } from '../util/props';

interface EntityWithId extends ObjectLiteral {
  id?: string | number;
}

export interface BetterFindOneOptions<Entity> extends FindOneOptions<Entity> {
  relations?: Props<Entity>;
}

export interface BetterFindManyOptions<Entity> extends FindManyOptions<Entity> {
  relations?: Props<Entity>;
}

export abstract class BaseRepository<Entity extends EntityWithId> extends Repository<Entity> {
  // these are mutually exclusive: pick one
  // (autoFill will take precedence over autoExclude)
  autoFillProperties: Props<Entity> = null;
  autoExcludeProperties: Props<Entity> = null;

  get niceName(): string {
    return startCase(this.constructor.name.replace('Repository', ''));
  }

  scrub(entityLike: DeepPartial<Entity>): Entity {
    // autoFill beats out autoExclude
    if (this.autoFillProperties) {
      entityLike = <DeepPartial<Entity>>pick(entityLike, this.autoFillProperties);
    } else if (this.autoExcludeProperties) {
      entityLike = omit(entityLike, this.autoExcludeProperties);
    }

    // we always omit id, createdAt and updatedAt
    entityLike = omit(entityLike, ['id', 'createdAt', 'updatedAt']);

    return this.create(entityLike);
  }

  async smartFind(options: BetterFindManyOptions<Entity> = {}): Promise<Entity[]> {
    return this.find(options);
  }

  async smartFindOne(id: string | number, options: BetterFindOneOptions<Entity> = {}): Promise<Entity> {
    return super.findOne(+id, options);
  }

  async smartFindOneOrFail(id: string | number, options: BetterFindOneOptions<Entity> = {}): Promise<Entity> {
    const result = await this.smartFindOne(+id, options);

    if (!result) {
      throw new NotFoundException(`Cannot find ${this.niceName} with ID ${id}`);
    }

    return result;
  }

  async saveNew(entity: Entity): Promise<Entity> {
    if (entity.id) {
      throw new BadRequestException('Cannot save a new entity with an ID');
    }

    const savedEntity = await this.save(entity);

    return this.smartFindOne(savedEntity.id);
  }

  async saveExisting(id: string | number, entity: Entity) {
    const exists = await this.findOne(id, { loadEagerRelations: false });

    if (!exists) {
      throw new NotFoundException(`Cannot find ${this.niceName} with ID ${id}`);
    }

    entity.id = +id;
    await this.save(entity, { reload: false });

    return this.smartFindOne(id);
  }

  async deleteAndReturn(id: string | number, options: BetterFindOneOptions<Entity> = {}) {
    const result = await this.smartFindOneOrFail(id, options);

    await this.delete(+id);

    return result;
  }
}
