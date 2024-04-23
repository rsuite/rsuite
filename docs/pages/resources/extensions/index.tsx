import React from 'react';
import { Panel, Row, Col, Stack, IconButton } from 'rsuite';
import Page from '@/components/Page';
import { useApp } from '@/components/AppContext';
import GitHubIcon from '@rsuite/icons/legacy/Github';

interface CardProps {
  name: string;
  description?: React.ReactNode;
  imgUrl: string;
  sourceUrl: string;
  href: string;
  children?: React.ReactNode;
}

const Card = (props: CardProps) => {
  const { name, description, children, imgUrl, href, sourceUrl } = props;

  return (
    <Panel bordered bodyFill style={{ display: 'block', height: 286, marginBottom: 10 }}>
      <div style={{ textAlign: 'center' }}>
        <a href={href} target="_blank" rel="noreferrer">
          <img src={imgUrl} height={150} style={{ objectFit: 'cover' }} />
        </a>
      </div>
      <Panel bodyFill>
        <div style={{ padding: 10 }}>
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            {name}
          </a>
          <div style={{ height: 70 }}>
            <small>
              {children}
              {description}
            </small>
          </div>
          <Stack justifyContent="space-between">
            <a href={`https://www.npmjs.com/package/${name}`} target="_blank" rel="noreferrer">
              <img src={`https://badge.fury.io/js/${encodeURIComponent(name)}.svg`} />
            </a>
            <IconButton icon={<GitHubIcon />} size="xs" href={sourceUrl} target="_blank" />
          </Stack>
        </div>
      </Panel>
    </Panel>
  );
};

export default () => {
  const { locales } = useApp();

  const resources = [
    {
      name: '@rsuite/charts',

      sourceUrl: 'https://github.com/rsuite/charts',
      imgUrl: '/images/extensions/rsuite-charts.png',
      href: 'https://charts.rsuitejs.com/'
    },
    {
      name: '@rsuite/schema-form',

      sourceUrl: 'https://github.com/rsuite/schema-form',
      imgUrl: '/images/extensions/schema-form.png',
      href: 'https://rsuite.github.io/schema-form/'
    },
    {
      name: '@rsuite/responsive-nav',

      sourceUrl: 'https://github.com/rsuite/responsive-nav',
      imgUrl: '/images/extensions/responsive-nav.png',
      href: 'https://rsuite.github.io/responsive-nav/'
    },
    {
      name: '@rsuite/react-frame',

      sourceUrl: 'https://github.com/rsuite/react-frame',
      imgUrl: '/images/extensions/rsuite-frame.png',
      href: 'https://rsuite.github.io/react-frame/'
    },
    {
      name: '@rsuite/multi-date-picker',

      sourceUrl: 'https://github.com/rsuite/multi-date-picker',
      imgUrl: '/images/extensions/multi-date-picker.png',
      href: 'https://rsuite.github.io/multi-date-picker'
    },
    {
      name: '@rsuite/document-nav',

      sourceUrl: 'https://github.com/rsuite/document-nav',
      imgUrl: '/images/extensions/document-nav.png',
      href: 'https://rsuite.github.io/document-nav/'
    },
    {
      name: '@rsuite/timezone-picker',

      sourceUrl: 'https://github.com/rsuite/timezone-picker',
      imgUrl: '/images/extensions/timezone-picker.png',
      href: 'https://rsuite.github.io/timezone-picker/assets/'
    },
    {
      name: 'rsuite-color-picker',
      description: (
        <a href="https://github.com/cXiaof" target="_blank" rel="noreferrer">
          @cXiaof
        </a>
      ),
      sourceUrl: 'https://github.com/cXiaof/rsuite-color-picker',
      imgUrl: '/images/extensions/rsuite-color-picker.png',
      href: 'https://cxiaof.github.io/rsuite-color-picker/assets/'
    },
    {
      name: '@rsuite/formik',
      sourceUrl: 'https://github.com/rsuite/formik',
      imgUrl: '/images/extensions/rsuite-formik.png',
      href: 'https://github.com/rsuite/formik#rsuiteformik'
    }
  ];

  return (
    <Page hidePageNav>
      <Row gutter={20}>
        {resources.map((item, index) => {
          return (
            <Col md={6} sm={12} xs={24} key={index}>
              <Card {...item}>{locales.extensions[item.name]}</Card>
            </Col>
          );
        })}
      </Row>
    </Page>
  );
};
