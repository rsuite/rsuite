import { ObjectType, StringType, ArrayType, SchemaModel } from 'schema-typed';
import { constructFlatSchema } from '../utils/constructFlatSchema';

describe('constructFlatSchema', () => {
  const valueShape = {
    name: '',
    email: '',
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
  const type = StringType().isRequired();
  const finalSchema = {
    name: type,
    email: type,
    address: ObjectType()
      .shape({
        city: type,
        street: type
      })
      .isRequired(),
    items: ArrayType().of(type),
    users: ArrayType().of(
      ObjectType().shape({
        name: type,
        address: ObjectType().shape({
          city: type
        })
      })
    ),
    customer: ObjectType().shape({
      name: StringType().isRequired('Name is required'),
      address: ObjectType().shape({
        city: StringType().isRequired('City is required'),
        street: StringType().isRequired('Street is required')
      }),
      items: ArrayType().of(StringType().isRequired('Item is required')),
      users: ArrayType().of(
        ObjectType().shape({
          name: StringType().isRequired('Name is required'),
          address: ObjectType().shape({
            city: StringType().isRequired('City is required')
          })
        })
      )
    })
  };
  const flatSchema = {
    name: type,
    email: type,
    'address.city': type,
    'address.street': type,
    'items[0]': type,
    'users[0].name': type,
    'users[0].address.city': type,
    'customer.name': StringType().isRequired('Name is required'),
    'customer.address.city': StringType().isRequired('City is required'),
    'customer.address.street': StringType().isRequired('Street is required'),
    'customer.items[0]': StringType().isRequired('Item is required'),
    'customer.users[0].name': StringType().isRequired('Name is required'),
    'customer.users[0].address.city': StringType().isRequired('City is required')
  };
  it('should convert a flat schema object to a nested schema object', () => {
    assert.deepEqual(
      SchemaModel(constructFlatSchema(flatSchema)).check(valueShape),
      SchemaModel(finalSchema).check(valueShape)
    );
  });
});
