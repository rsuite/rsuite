import stringToObject from '../stringToObject';

describe('[utils] stringToObject', () => {
  it('Should create an object', () => {
    const obj = stringToObject('foo', 'value', 'label') as {
      value: string;
      label: string;
    };

    assert.equal(obj.value, 'foo');
    assert.equal(obj.label, 'foo');
  });

  it('Should keep the default object', () => {
    const obj = { foo: 1 };
    const newObj = stringToObject(obj, 'value', 'label');

    assert.equal(obj, newObj);
  });
});
