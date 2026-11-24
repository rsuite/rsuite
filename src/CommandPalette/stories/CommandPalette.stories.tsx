import React, { useState } from 'react';
import Button from '../../Button';
import CommandPalette from '../CommandPalette';
import '../styles/index.scss';

export default { title: 'Components/CommandPalette', component: CommandPalette };

const commands = [
  { value: 'projects', label: 'Open projects', group: 'Workspace', keywords: ['dashboard'] },
  {
    value: 'settings',
    label: 'Settings',
    group: 'Account',
    description: 'Manage your preferences',
    shortcut: '⌘ ,'
  },
  { value: 'archive', label: 'Archive project', group: 'Workspace', disabled: true },
  { value: 'help', label: 'Help center', group: 'Support', keywords: ['documentation', '帮助'] }
] as const;

export const Basic = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  return (
    <>
      <Button onClick={() => setOpen(true)}>Run a command</Button>
      <p role="status">{selected ? `Selected: ${selected}` : 'Choose a workspace command.'}</p>
      <CommandPalette
        open={open}
        title="Run a command"
        data={commands}
        onClose={() => setOpen(false)}
        onSelect={value => setSelected(value)}
        footer="↑ ↓ to navigate · Enter to run · Escape to close"
      />
    </>
  );
};
