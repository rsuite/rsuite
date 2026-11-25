import React from 'react';
import CommandPalette from '../CommandPalette';

export const commands = [
  { value: 'projects', label: 'Open projects', group: 'Workspace' },
  { value: 'archive', label: 'Archive project', group: 'Workspace', disabled: true },
  { value: 0, label: 'Open settings', group: 'Account' }
];

export default function CommandPaletteHydrationFixture() {
  return (
    <>
      <CommandPalette open reduceMotion title="First commands" data={commands} />
      <CommandPalette open reduceMotion title="Second commands" data={commands} />
    </>
  );
}
