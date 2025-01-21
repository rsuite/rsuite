import { nameToPath } from '../utils';

describe('FormControl - utils', () => {
  describe('nameToPath', () => {
    it('Should return original name when no dots or brackets', () => {
      expect(nameToPath('name')).to.equal('name');
      expect(nameToPath('address')).to.equal('address');
    });

    it('Should convert dot notation to object path', () => {
      expect(nameToPath('user.name')).to.equal('user.object.name');
      expect(nameToPath('address.city.code')).to.equal('address.object.city.object.code');
    });

    it('Should convert array notation to array path', () => {
      expect(nameToPath('items[0]')).to.equal('items.array[0]');
      expect(nameToPath('data[1]')).to.equal('data.array[1]');
    });

    it('Should convert mixed dot and array notation to mixed path', () => {
      expect(nameToPath('items[0].name')).to.equal('items.array[0].object.name');
      expect(nameToPath('users[1].address.city')).to.equal(
        'users.array[1].object.address.object.city'
      );
      expect(nameToPath('data.items[0].value')).to.equal('data.object.items.array[0].object.value');
    });

    it('Should handle multiple array indexes', () => {
      expect(nameToPath('matrix[0][1]')).to.equal('matrix.array[0].array[1]');
      expect(nameToPath('data[0][1].value')).to.equal('data.array[0].array[1].object.value');
    });

    it('Should handle complex nested paths', () => {
      expect(nameToPath('users[0].addresses[1].city.code')).to.equal(
        'users.array[0].object.addresses.array[1].object.city.object.code'
      );
      expect(nameToPath('data.items[0].subitems[1].name')).to.equal(
        'data.object.items.array[0].object.subitems.array[1].object.name'
      );
    });
  });
});
