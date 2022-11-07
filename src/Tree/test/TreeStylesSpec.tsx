import React from 'react';
import { render } from '@testing-library/react';
import Tree from '../index';
import { getStyle, inChrome } from '@test/testUtils';
import { PickerHandle } from '../../Picker';

const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'tester0'
      },
      {
        label: 'tester1',
        value: 'tester1',
        children: [
          {
            label: 'tester2',
            value: 'tester2'
          }
        ]
      }
    ]
  },
  {
    label: 'Disabled node',
    value: 'disabled'
  }
];

describe('Tree styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<PickerHandle>();

    // FIXME `ref` should be type Ref<PickerHandle>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Tree virtualized={false} data={data} ref={instanceRef} />);

    const itemLabel = ((instanceRef.current as PickerHandle).root as HTMLElement).querySelector(
      '.rs-tree .rs-tree-node-label'
    ) as HTMLElement;
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '0px 0px 0px 16px');
  });
});
