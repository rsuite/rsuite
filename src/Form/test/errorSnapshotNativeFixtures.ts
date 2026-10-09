import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';

export type Shape = 'object' | 'array row' | 'array sibling';
export type Producer = 'fields' | 'whole sync' | 'whole async';
export type Operation = 'check' | 'checkAsync' | 'clear' | 'remove';

export function nativeErrorFixture(shape: Shape) {
  const gate = { editedValid: false };
  const rule = () =>
    StringType().addRule(
      value => value === 'edited' && gate.editedValid,
      () => ''
    );
  const object = shape === 'object';
  const sameRow = shape === 'array row';
  const values = object
    ? Object.freeze({ profile: Object.freeze({ name: 'edited', email: 'retained' }) })
    : Object.freeze({
        users: Object.freeze(
          sameRow
            ? [Object.freeze({ name: 'edited', email: 'retained' })]
            : [Object.freeze({ name: 'edited' }), Object.freeze({ name: 'retained' })]
        )
      });
  return {
    gate,
    values,
    model: SchemaModel<any>(
      object
        ? { profile: ObjectType().shape({ name: rule(), email: rule() }) }
        : {
            users: ArrayType().of(
              ObjectType().shape({ name: rule(), ...(sameRow ? { email: rule() } : {}) })
            )
          }
    ),
    edited: object ? 'profile.name' : 'users[0].name',
    retained: object ? 'profile.email' : sameRow ? 'users[0].email' : 'users[1].name',
    readEdited: (errors: any) =>
      object ? errors.profile.object.name : errors.users.array[0].object.name,
    readRetained: (errors: any) =>
      object
        ? errors.profile.object.email
        : sameRow
          ? errors.users.array[0].object.email
          : errors.users.array[1].object.name
  };
}
