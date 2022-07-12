import React from 'react';
import { Row, Col } from 'rsuite';
import { MarkdownRenderer } from 'react-code-view';
import AppContext from '@/components/AppContext';
import IconList from '@/components/IconList';
import DefaultPage from '@/components/Page';

export default function Page() {
  const { localePath } = React.useContext(AppContext);
  return (
    <DefaultPage>
      <IconList />
      <Row>
        <Col md={24}>
          <MarkdownRenderer>{require(`.${localePath}/footer.md`)}</MarkdownRenderer>
        </Col>
      </Row>
    </DefaultPage>
  );
}
