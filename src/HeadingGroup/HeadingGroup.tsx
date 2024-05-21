import { createComponent, ComponentProps } from '@/internals/utils';
export type HeadingGroupProps = ComponentProps;

/**
 * HeadingGroup is a group of headings.
 * @see https://rsuitejs.com/components/heading
 */
const HeadingGroup = createComponent({ name: 'HeadingGroup', componentAs: 'hgroup' });

export default HeadingGroup;
