import React from 'react';
import Page from '@/components/layout/Page';
import GitHubIcon from '@rsuite/icons/legacy/Github';
import { Panel, Row, Col, Stack, Button, IconButton } from 'rsuite';
import styles from './index.module.scss';

interface CardProps {
  name: string;
  imgUrl: string;
  viewUrl: string;
  sourceUrl: string;
}

const Card = (props: CardProps) => {
  const { viewUrl, sourceUrl, imgUrl, name } = props;

  return (
    <Panel bordered bodyFill className={styles['tpl-card']}>
      <img src={imgUrl} width="100%" />
      <Stack className={styles['preview-actions']} justify="center" spacing={6}>
        <Button appearance="primary" href={viewUrl} target="_blank">
          View {name}
        </Button>
        <IconButton icon={<GitHubIcon />} href={sourceUrl} target="_blank" />
      </Stack>
    </Panel>
  );
};

const resources = [
  {
    name: 'Admin Template',
    imgUrl: '/images/templates/admin-template-1.png',
    viewUrl: 'https://rsuite-admin-template.vercel.app/',
    sourceUrl: 'https://github.com/rsuite/rsuite-admin-template'
  },
  {
    name: 'PMP Template',
    imgUrl: '/images/templates/project-management-template.png',
    viewUrl: 'https://rsuite-project-template.vercel.app/',
    sourceUrl: 'https://github.com/rsuite/rsuite-project-template'
  }
];

export default function Index() {
  return (
    <Page hidePageNav>
      <Row gutter={20}>
        {resources.map((item, index) => {
          return (
            <Col span={{ xs: 24, sm: 12 }} key={index}>
              <Card {...item} />
            </Col>
          );
        })}
      </Row>
    </Page>
  );
}
