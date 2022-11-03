import { DropdownActionType, reducer } from '../DropdownState';

// Ref: https://redux.js.org/usage/writing-tests#reducers
describe('DropdownState::reducer', () => {
  it('Should return empty items initially', () => {
    expect(reducer(undefined, {} as any)).to.eql({
      items: []
    });
  });

  it('Should add item with its props when called with RegisterItem', () => {
    const previousState = {
      items: []
    };
    expect(
      reducer(previousState, {
        type: DropdownActionType.RegisterItem,
        payload: {
          id: 'test',
          props: {
            selected: false
          }
        }
      })
    ).to.eql({
      items: [
        {
          id: 'test',
          props: {
            selected: false
          }
        }
      ]
    });
  });

  it('Should update item with new props according to payload.id when called with RegisterItem', () => {
    const previousState = {
      items: [
        {
          id: 'test',
          props: {
            selected: false
          }
        },
        {
          id: 'another',
          props: {
            selected: false
          }
        }
      ]
    };
    expect(
      reducer(previousState, {
        type: DropdownActionType.RegisterItem,
        payload: {
          id: 'test',
          props: {
            selected: true
          }
        }
      })
    ).to.eql({
      items: [
        {
          id: 'test',
          props: {
            selected: true
          }
        },
        {
          id: 'another',
          props: {
            selected: false
          }
        }
      ]
    });
  });

  it('Should remove item according to payload.id when called with UnregisterItem', () => {
    const previousState = {
      items: [
        {
          id: 'test',
          props: {
            selected: false
          }
        }
      ]
    };
    expect(
      reducer(previousState, {
        type: DropdownActionType.UnregisterItem,
        payload: {
          id: 'test'
        }
      })
    ).to.eql({
      items: []
    });
  });
});
