import React from 'react';
import classNames from 'classnames';
import canUseDOM from 'dom-lib/canUseDOM';
import PageToolbar from '../PageToolbar';
import { Content as PageContent, Nav as PageNav } from '@rsuite/document-nav';
import { Row, Col, Box } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import styles from './PageContainer.module.scss';

interface ContainerProps {
  hidePageNav?: boolean;
  designHash?: any;
  routerId?: string;
  children: React.ReactNode;
}

export default function PageContainer(props: ContainerProps) {
  const { children, designHash: designHashConfig = {}, routerId, hidePageNav, ...rest } = props;
  // Resolve server render is not same with the client problem.
  // reference https://itnext.io/tips-for-server-side-rendering-with-react-e42b1b7acd57
  const [ssrDone, setSsrDone] = React.useState(false);

  React.useEffect(() => {
    setSsrDone(canUseDOM);
  }, []);

  const {
    theme: [themeName, direction]
  } = useApp();

  const designHash = designHashConfig[themeName];
  const rtl = direction === 'rtl';

  const classes = classNames(styles['page-context-wrapper'], {
    [styles['hide-page-nav']]: hidePageNav
  });

  return (
    <>
      <PageToolbar designHash={designHash} routerId={routerId} />
      <div className={styles['page-main']}>
        <Row {...rest} className={classes} data-key={ssrDone ? 'client' : 'server'}>
          <Col span={24} className={styles['main-container']}>
            <PageContent>{children}</PageContent>
          </Col>
        </Row>

        {hidePageNav ? null : (
          <Box showFrom="sm" w={210}>
            <PageNav
              as={Col}
              showOrderNumber={false}
              width={180}
              scrollBar="left"
              rtl={rtl}
              once={false}
              deep={4}
              offset={{
                top: 80,
                position: 'sticky',
                insetInlineStart: 10,
                maxHeight: 'max-content'
              }}
            />
          </Box>
        )}
      </div>
    </>
  );
}
