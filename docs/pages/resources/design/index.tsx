import React from 'react';
import { Panel, Row, Col } from 'rsuite';
import Page from '@/components/Page';
import { ResourcesDesign, ResourcesFigma, ResourcesSketch } from '@/components/SvgIcons';
import { useApp } from '@/components/AppContext';

interface CardProps {
  header: React.ReactNode;
  description: React.ReactNode;
  icon: React.ReactNode;
  href: string;
}

const Card = (props: CardProps) => {
  const { header, description, icon, href } = props;

  return (
    <Panel
      bordered
      bodyFill
      style={{ display: 'block', height: 267, textDecoration: 'none', marginBottom: 10 }}
      as="a"
      href={href}
      target="_blank"
    >
      <div style={{ padding: 20, textAlign: 'center', background: '#000' }}>{icon}</div>
      <Panel header={header}>
        <p>
          <small>{description}</small>
        </p>
      </Panel>
    </Panel>
  );
};

export default () => {
  const { locales } = useApp();

  const resources = [
    {
      header: locales.resourcesDesign.defaultHeader,
      description: locales.resourcesDesign.defaultDescription,
      icon: <ResourcesDesign style={{ fontSize: 100, fill: '#fff' }} />,
      href: '/design/default/'
    },
    {
      header: locales.resourcesDesign.darkHeader,
      description: locales.resourcesDesign.darkDescription,
      icon: <ResourcesDesign style={{ fontSize: 100, fill: '#aaa' }} />,
      href: '/design/dark/'
    },
    {
      header: locales.resourcesDesign.figmaHeader,
      description: locales.resourcesDesign.figmaDescription,
      icon: <ResourcesFigma style={{ fontSize: 100 }} />,
      href: 'https://www.figma.com/community/file/994524751550165025'
    },
    {
      header: locales.resourcesDesign.sketchHeader,
      description: locales.resourcesDesign.sketchDescription,
      icon: <ResourcesSketch style={{ fontSize: 100 }} />,
      href: 'https://1drv.ms/u/s!AtZRl-M-NXJTgt957t5P7UOe8jH7Yw?e=ar7ppY'
    }
  ];

  return (
    <Page hidePageNav>
      <Row>
        {resources.map((item, index) => {
          return (
            <Col md={6} sm={12} xs={24} key={index}>
              <Card {...item} />
            </Col>
          );
        })}
      </Row>
    </Page>
  );
};
