import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type OnConflict = {
  conflictTargets: string[];
  overwrite: string[];
};
export const bulkInsert =
  <T extends ObjectLiteral>(ds: DataSource, entity: EntityTarget<T>, onConflict?: OnConflict) =>
  async (data: QueryPartialEntity<T>[]) => {
    if (!onConflict) {
      return await ds.createQueryBuilder().insert().into(entity).values(data).orIgnore().execute();
    }

    await ds
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(data)
      .orUpdate(onConflict.conflictTargets, onConflict.overwrite)
      .execute();
  };
