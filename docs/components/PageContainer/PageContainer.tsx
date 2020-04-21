import * as React from 'react';
import classNames from 'classnames';
import { Content as PageContent, Nav as PageNav } from '@rsuite/document-nav';
import { on } from 'dom-lib';
import canUseDOM from 'dom-lib/lib/query/canUseDOM';
import { Row, Col } from 'rsuite';
import TypesDrawer from '../TypesDrawer';
import AppContext from '../AppContext';
import PageToolbar from '../PageToolbar';

interface ContainerProps {
  hidePageNav?: boolean;
  designHash?: any;
  routerId?: string;
  children: React.ReactNode;
}

export default function PageContainer(props: ContainerProps) {
  const { children, designHash: designHashConfig = {}, routerId, hidePageNav, ...rest } = props;
  const [openTypesDrawer, setOpenTypesDrawer] = React.useState<boolean>();
  // Resolve server render is not same with the client problem.
  // reference https://itnext.io/tips-for-server-side-rendering-with-react-e42b1b7acd57
  const [ssrDone, setSsrDone] = React.useState(false);

  const onDocumentClick = React.useCallback(e => {
    const href = e.target?.getAttribute('href');
    if (href === '#types') {
      e.stopPropagation();
      e.preventDefault();
      setOpenTypesDrawer(true);
    }
  }, []);

  React.useEffect(() => {
    const documentListener = on(document, 'click', onDocumentClick, true);
    return () => {
      documentListener.off();
    };
  }, []);

  React.useEffect(() => {
    setSsrDone(canUseDOM);
  }, [canUseDOM]);

  const {
    theme: [themeName, direction]
  } = React.useContext(AppContext);

  const designHash = designHashConfig[themeName];
  const rtl = direction === 'rtl';

  const classes = classNames('page-context-wrapper', {
    'hide-page-nav': hidePageNav
  });

  return (
    <>
      <Row {...rest} className={classes} key={ssrDone ? 'client' : 'server'}>
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
      <TypesDrawer
        onHide={() => {
          setOpenTypesDrawer(false);
        }}
        show={openTypesDrawer}
      />
    </>
  );
}
