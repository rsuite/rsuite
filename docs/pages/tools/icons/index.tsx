import * as React from 'react';
import { Row, Col } from 'rsuite';
import { Markdown } from 'react-markdown-reader';
import PageContainer from '@/components/PageContainer';
import AppContext from '@/components/AppContext';
import Frame from '@/components/Frame';
import IconList from '@/components/IconList';

export default function Page() {
  const { localePath } = React.useContext(AppContext);
  return (
    <Frame>
      <PageContainer>
        <Row>
          <Col md={24}>
            <Markdown>{require(`.${localePath}/index.md`)}</Markdown>
          </Col>
        </Row>
        <IconList />
        <Row>
          <Col md={24}>
            <Markdown>{require(`.${localePath}/footer.md`)}</Markdown>
          </Col>
        </Row>
      </PageContainer>
    </Frame>
  );
}
