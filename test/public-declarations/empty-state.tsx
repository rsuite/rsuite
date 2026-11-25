import React from 'react';
import { CustomProvider, EmptyState, type EmptyStateProps } from 'rsuite';
import EmptyStateSubpath, {
  EmptyState as NamedEmptyState,
  type EmptyStateProps as SubpathProps
} from 'rsuite/EmptyState';

const options = {
  title: <span>No projects</span>,
  description: 'Create one to get started.',
  icon: <svg aria-hidden="true" />,
  align: 'start',
  headingLevel: 2,
  size: 'sm'
} satisfies EmptyStateProps & SubpathProps;
const ref = React.createRef<HTMLElement>();
export const emptyStates = (
  <CustomProvider components={{ EmptyState: { defaultProps: options } }}>
    <EmptyState {...options}>
      <button type="button">Create project</button>
    </EmptyState>
    <EmptyStateSubpath as="section" ref={ref} aria-label="Projects" {...options} />
    <NamedEmptyState title={0} description={0} size="lg" />
  </CustomProvider>
);

// @ts-expect-error EmptyState has three supported sizes.
const invalidSize = <EmptyState size="xs" />;
// @ts-expect-error Alignment uses the logical start direction.
const invalidAlign = <EmptyStateSubpath align="left" />;
// @ts-expect-error Headings follow HTML heading levels.
const invalidHeading = <NamedEmptyState headingLevel={7} />;
const invalidDefaults: NonNullable<React.ComponentProps<typeof CustomProvider>['components']> = {
  EmptyState: {
    defaultProps: {
      // @ts-expect-error Provider defaults share the public component contract.
      size: 'tiny'
    }
  }
};
void [invalidSize, invalidAlign, invalidHeading, invalidDefaults];
