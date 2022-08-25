import React from 'react';
import { Panel, Row, Col, Stack, Button, IconButton } from 'rsuite';
import Page from '@/components/Page';

import GitHubIcon from '@rsuite/icons/legacy/Github';

interface CardProps {
  name: string;
  imgUrl: string;
  viewUrl: string;
  sourceUrl: string;
}

const Card = (props: CardProps) => {
  const { viewUrl, sourceUrl, imgUrl, name } = props;

  return (
    <Panel bordered bodyFill className="tpl-card">
      <img src={imgUrl} width="100%" />
      <Stack className="preview-actions" justifyContent="center" spacing={6}>
        <Button appearance="primary" href={viewUrl} target="_blank">
          View {name}
        </Button>
        <IconButton icon={<GitHubIcon />} href={sourceUrl} target="_blank" />
      </Stack>
    </Panel>
  );
};

export default () => {
  const resources = [
    {
      name: 'Admin Template',
      imgUrl: '/images/templates/admin-template-1.png',
      viewUrl: 'https://rsuite-admin-template.vercel.app/',
      sourceUrl: 'https://github.com/rsuite/rsuite-admin-template'
    }
  ];

  return (
    <Page hidePageNav>
      <Row>
        {resources.map((item, index) => {
          return (
            <Col md={12} sm={12} xs={24} key={index}>
              <Card {...item} />
            </Col>
          );
        })}
      </Row>
    </Page>
  );
};
