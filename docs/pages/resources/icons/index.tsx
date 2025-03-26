/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { Row, Col } from 'rsuite';
import { MarkdownRenderer } from 'react-code-view';
import { useApp } from '@/components/AppContext';
import IconList from '@/components/IconList';
import DefaultPage from '@/components/Page';

export default function Page() {
  const { localePath } = useApp();

  return (
    <DefaultPage>
      <IconList />
      <Row>
        <Col span={24}>
          <MarkdownRenderer>{require(`.${localePath}/footer.md`)?.default}</MarkdownRenderer>
        </Col>
      </Row>
    </DefaultPage>
  );
}
