import React, { useState } from 'react';
import PlacementPicker from '@/components/PlacementPicker';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import { Toggle, HStack, HStackProps, VStack, Divider, Message, useMediaQuery } from 'rsuite';

interface ChildrenProps {
  placement: string;
  preventOverflow: boolean;
  container: () => HTMLDivElement;
}

interface PlacementContainerProps extends Omit<HStackProps, 'children'> {
  children: (props: ChildrenProps) => React.ReactNode;
}

export const PlacementContainer = (props: PlacementContainerProps) => {
  const { children, h = 400, ...rest } = props;
  const [isMobile] = useMediaQuery('xs');
  const [placement, setPlacement] = useState('bottomStart');
  const [preventOverflow, setPreventOverflow] = useState(true);

  return (
    <HStack
      divider={<Divider vertical={!isMobile} />}
      h={isMobile ? 'auto' : h}
      align="start"
      wrap
      {...rest}
    >
      <PreventOverflowContainer>
        {container => children({ placement, preventOverflow, container })}
      </PreventOverflowContainer>

      <VStack spacing={20} w={260}>
        <PlacementPicker onChange={setPlacement} value={placement} block />

        <Toggle checked={preventOverflow} onChange={setPreventOverflow}>
          Prevent Overflow
        </Toggle>

        <Message type="warning">
          <ul>
            <li>
              When <code>placement</code> is set to <code>auto*</code>, scrolling the container will
              automatically position the popup in a space with sufficient space.
            </li>
            <li>
              When <code>preventOverflow</code> is enabled, the popup will always remain within the
              visible area of the container.
            </li>
          </ul>
        </Message>
      </VStack>
    </HStack>
  );
};

export default PlacementContainer;
