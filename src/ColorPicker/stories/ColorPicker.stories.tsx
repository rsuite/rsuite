import type { StoryObj } from '@storybook/react';
import ColorPicker from '..';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(ColorPicker);
export default { title: 'Components/ColorPicker', ...meta };
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: '#3498ff', label: 'Brand' } };
export const Alpha: Story = { args: { defaultValue: '#3498ff80' } };
export const Presets: Story = {
  args: {
    presets: [
      { value: '#3498ff', label: 'Primary' },
      { value: '#4caf50', label: 'Success' },
      { value: '#f44336', label: 'Danger' }
    ]
  }
};
export const RGB: Story = {
  args: { defaultFormat: 'rgb', defaultValue: 'rgba(52, 152, 255, 0.5)' }
};
export const Disabled: Story = { args: { disabled: true, defaultValue: '#3498ff' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: '#3498ff' } };
export const Plaintext: Story = { args: { plaintext: true, defaultValue: '#3498ff' } };
