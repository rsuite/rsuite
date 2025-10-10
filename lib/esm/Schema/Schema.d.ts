import { SchemaModel, StringType, NumberType, ArrayType, DateType, ObjectType, BooleanType, MixedType } from 'schema-typed';
/**
 * SchemaTyped is a wrapper of schema-typed library to provide a more friendly API.
 * It is used to validate the data of the model.
 *
 * @see https://github.com/rsuite/schema-typed#schema-typed
 */
declare const SchemaTyped: {
    Model: typeof SchemaModel;
    Types: {
        StringType: typeof StringType;
        NumberType: typeof NumberType;
        ArrayType: typeof ArrayType;
        DateType: typeof DateType;
        ObjectType: typeof ObjectType;
        BooleanType: typeof BooleanType;
        MixedType: typeof MixedType;
    };
};
export default SchemaTyped;
