import * as React from 'react';
import { Row, Col } from 'rsuite';
import { Markdown } from 'react-markdown-reader';
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
          <Markdown>{require(`.${localePath}/footer.md`)}</Markdown>
        </Col>
      </Row>
    </DefaultPage>
  );
}
