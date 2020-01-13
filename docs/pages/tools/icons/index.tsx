import React from 'react';
import { Row, Col } from 'rsuite';
import MarkdownView from '@/components/MarkdownView';
import PageContainer from '@/components/PageContainer';
import getLocalePath from '@/utils/getLocalePath';
import IconList from './IconList';

export default getLocalePath(localePath => {
  class IconPage extends React.Component {
    constructor() {
      super();
      this.state = {
        color: '#2196f3'
      };
    }
    handleChangeComplete = color => {
      this.setState({ color: color.hex });
    };

    render() {
      const { color } = this.state;
      return (
        <PageContainer>
          <Row>
            <Col md={24}>
              <MarkdownView>{require(`.${localePath}index.md`)}</MarkdownView>
            </Col>
          </Row>
          <IconList />
          <Row>
            <Col md={24}>
              <MarkdownView>{require(`.${localePath}footer.md`)}</MarkdownView>
            </Col>
          </Row>
        </PageContainer>
      );
    }
  }

  return IconPage;
});
