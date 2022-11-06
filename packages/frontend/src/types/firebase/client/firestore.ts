import { FieldPath, WhereFilterOp, OrderByDirection } from 'firebase/firestore';

export namespace DB {
  export interface Field {
    fieldPath: string | FieldPath;
    opStr: WhereFilterOp;
    value: unknown;
  }

  export interface Options {
    whereA?: Field;
    whereB?: Field;
    whereC?: Field;
    limit?: any;
    orderBy?: {
      fieldPath: string | FieldPath;
      directionStr?: OrderByDirection;
    };
    startAt?: unknown | unknown[];
    startAfter?: unknown | unknown[];
    endAt?: unknown | unknown[];
    endBefore?: unknown | unknown[];
    converter?: any;
  }
}
