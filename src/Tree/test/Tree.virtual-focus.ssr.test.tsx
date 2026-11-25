import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Tree from '..';
import CheckTree from '../../CheckTree';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';

describe('virtual tree server rendering', () => {
  it.each([Tree, CheckTree, TreePicker, CheckTreePicker])(
    '%s renders without a document',
    Component => {
      expect(typeof document).to.equal('undefined');
      const data = Array.from({ length: 1000 }, (_, index) => ({
        label: `Node ${index}`,
        nodeId: index === 999 ? '' : index
      }));
      const html = renderToString(<Component data={data} valueKey="nodeId" virtualized />);
      expect(html).to.be.a('string').and.not.to.be.empty;
    }
  );
});
