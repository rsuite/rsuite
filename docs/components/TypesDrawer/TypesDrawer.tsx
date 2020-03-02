import React from 'react';
import { Drawer } from 'rsuite';
import { Markdown } from 'react-markdown-reader';

interface TypesDrawerProps {
  show: boolean;
  onHide: () => void;
}

function TypesDrawer(props: TypesDrawerProps) {
  const { show, onHide } = props;
  return (
    <Drawer placement="right" show={show} onHide={onHide}>
      <Drawer.Header>
        <Drawer.Title>Types</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Markdown>{require('./Types.md')}</Markdown>
      </Drawer.Body>
    </Drawer>
  );
}

export default TypesDrawer;
