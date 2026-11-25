import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it } from 'vitest';
import TreeView from '@/Tree/TreeView';
import { TreeProvider } from '@/internals/Tree/TreeProvider';
import { ComboboxContext } from '@/internals/Picker/PickerToggleTrigger';

it.each([false, true])(
  'generates distinct server row IDs from unformatted raw values custom=%s',
  custom => {
    expect(typeof document).to.equal('undefined');
    const valueKey = custom ? 'nodeId' : 'value';
    const data = [0, '0', 'Number_0'].map(value => ({
      label: `Node ${typeof value} ${value}`,
      [valueKey]: value
    }));
    const html = renderToString(
      <ComboboxContext.Provider value={{ id: 'server-tree', popupType: 'tree' }}>
        <TreeProvider value={{ props: { valueKey, labelKey: 'label', childrenKey: 'children' } }}>
          <TreeView data={data} />
        </TreeProvider>
      </ComboboxContext.Provider>
    );
    const ids = Array.from(html.matchAll(/\bid="([^"]*)"/g), match => match[1]).filter(id =>
      id.startsWith('server-tree-opt-')
    );
    expect(ids).to.deep.equal([
      'server-tree-opt-Number_0',
      'server-tree-opt-String_0',
      'server-tree-opt-String_Number_0'
    ]);
    expect(new Set(ids).size).to.equal(3);
    expect(data.every(node => !('refKey' in node))).to.be.true;
  }
);
