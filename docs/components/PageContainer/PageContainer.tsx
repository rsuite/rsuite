import React from 'react';
import classNames from 'classnames';
import { Content as PageContent, Nav as PageNav } from '@rsuite/document-nav';
import canUseDOM from 'dom-lib/canUseDOM';
import { Row, Col } from 'rsuite';
import { useApp } from '../AppContext';
import PageToolbar from '../PageToolbar';

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

  const classes = classNames('page-context-wrapper', {
    'hide-page-nav': hidePageNav
  });

  return (
    <Row {...rest} className={classes} data-key={ssrDone ? 'client' : 'server'}>
      <Col md={24} xs={24} sm={24} className="main-container">
        <PageContent>{children}</PageContent>
      </Col>
      <Col md={8} xsHidden smHidden>
        <PageToolbar designHash={designHash} routerId={routerId} />
        {hidePageNav ? null : (
          <PageNav
            showOrderNumber={false}
            width={150}
            scrollBar="left"
            rtl={rtl}
            once={false}
            deep={4}
            offset={{
              top: 80,
              [rtl ? 'left' : 'right']: 10
            }}
          />
        )}
      </Col>
    </Row>
  );
}
