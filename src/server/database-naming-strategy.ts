import * as pluralize from 'pluralize';
import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { startCase, snakeCase } from 'lodash';

export class DatabaseNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    if (customName) {
      return customName;
    }

    const parts = startCase(className).split(' ');
    const lastIndex = parts.length - 1;
    parts[lastIndex] = pluralize(parts[lastIndex]);
    return snakeCase(parts.join(' '));
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.join('_')) + (customName ? customName : snakeCase(propertyName));
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName: string = getTableName(tableOrName);

    return `PK_${tableName}.${columnNames.join('+')}`;
  }

  uniqueConstraintName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName: string = getTableName(tableOrName);

    return `UQ_${tableName}.${columnNames.join('+')}`;
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName: string = getTableName(tableOrName);

    return `FK_${tableName}.${columnNames.join('+')}`;
  }

  indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
    const tableName: string = getTableName(tableOrName);

    return `IDX_${tableName}.${columnNames.join('+')}`;
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return snakeCase(firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName);
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
  }

  cclassTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }
}

function getTableName(tableOrName: Table | string): string {
  const tableName: string = (<Table>tableOrName).name || <string>tableOrName;

  // remove schema (tableName will be something like public.users)
  const parts: string[] = tableName.split('.');

  return parts.length === 1 ? parts[0] : parts[parts.length - 1];
}
