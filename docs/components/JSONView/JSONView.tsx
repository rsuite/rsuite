import React from 'react';
import { Box, Panel } from 'rsuite';
import { JSONTree } from 'react-json-tree';
import styles from './JSONView.module.scss';

interface JSONViewProps {
  formValue?: React.ComponentProps<typeof JSONTree>['data'];
  formError?: React.ComponentProps<typeof JSONTree>['data'];
}

export const JSONView = ({ formValue, formError }: JSONViewProps) => (
  <Box mb={10}>
    <Panel className={styles['json-tree-wrapper']} header={<p>formValue</p>}>
      <JSONTree data={formValue} />
    </Panel>

    <Panel className={styles['json-tree-wrapper']} header={<p>formError</p>}>
      <JSONTree data={formError} />
    </Panel>
  </Box>
);
