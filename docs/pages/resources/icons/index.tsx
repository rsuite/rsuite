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
        <Col md={24}>
          <MarkdownRenderer>
            {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              require(`.${localePath}/footer.md`)?.default
            }
          </MarkdownRenderer>
        </Col>
      </Row>
    </DefaultPage>
  );
}
