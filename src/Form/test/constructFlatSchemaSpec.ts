import { ObjectType, StringType, ArrayType, SchemaModel } from 'schema-typed';
import { constructFlatSchema } from '../utils/constructFlatSchema';

describe('constructFlatSchema', () => {
  const valueShape = {
    name: '',
    address: {
      city: '',
      street: ''
    },
    items: ['', ''],
    users: [
      {
        name: '',
        address: {
          city: ''
        }
      }
    ],
    customer: {
      name: '',
      address: {
        city: '',
        street: ''
      },
      items: [''],
      users: [
        {
          name: '',
          address: {
            city: ''
          }
        }
      ]
    }
  };
  const type1 = StringType().isRequired();
  const type2 = StringType().isRequiredOrEmpty();
  const finalSchema = {
    name: type1,
    address: ObjectType()
      .shape({
        city: type1,
        street: type1
      })
      .isRequired(),
    items: ArrayType().of(type1, type2),
    users: ArrayType().of(
      ObjectType().shape({
        name: type1,
        address: ObjectType().shape({
          city: type1
        })
      })
    ),
    customer: ObjectType().shape({
      address: ObjectType().shape({
        city: type1,
        street: type1
      }),
      items: ArrayType().of(
        type1,
        ObjectType().shape({
          city: type1,
          street: type1
        })
      )
    })
  };
  const flatSchema = {
    name: type1,
    'address.city': type1,
    'address.street': type1,
    'items[0]': type1,
    'items[1]': type2,
    'users[0].name': type1,
    'users[0].address.city': type1,
    'customer.address.city': type1,
    'customer.address.street': type1,
    'customer.items[0]': type1,
    'customer.items[1].city': type1,
    'customer.items[1].street': type1
  };
  it('should convert a flat schema object to a nested schema object', () => {
    Object.keys(flatSchema).forEach(key => {
      assert.deepEqual(
        SchemaModel(constructFlatSchema(flatSchema)).checkForField(key, valueShape, {
          nestedObject: true
        }),
        SchemaModel(finalSchema).checkForField(key as any, valueShape, {
          nestedObject: true
        })
      );
    });
  });
});
