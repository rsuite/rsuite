import { createComponent, ComponentProps } from '@/internals/utils';

export type StatValueUnitProps = ComponentProps;

const StatValueUnit = createComponent<'span', StatValueUnitProps>({
  name: 'StatValueUnit',
  componentAs: 'span'
});

export default StatValueUnit;
