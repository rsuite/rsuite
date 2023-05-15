import React from 'react';
import { render } from '@testing-library/react';
import List from '../List';

describe('List', () => {
  it('Should not throw when `itemSize` is a number', () => {
    expect(() => {
      render(
        // FIXME-Doma `itemCount` and `height` props are not declared in List's props,
        //            but they're actually required by react-window List
        <List itemSize={66} {...{ itemCount: 1, height: 400 }}>
          {() => null}
        </List>
      );
    }).to.not.throw();
  });
});
