import { createComponent, ComponentProps } from '@/internals/utils';

export type StatHelpTextProps = ComponentProps;

const StatHelpText = createComponent<'span', StatHelpTextProps>({
  name: 'StatHelpText',
  componentAs: 'span'
});

export default StatHelpText;
