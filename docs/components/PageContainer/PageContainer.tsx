import * as React from 'react';
import classnames from 'classnames';
import { Content as PageContent, Nav as PageNav } from '@rsuite/document-nav';
import { on } from 'dom-lib';

import { Row, Col, IconButton, Icon, ButtonToolbar, Tooltip, Whisper } from 'rsuite';
import LanguageButton from '../LanguageButton';
import TypesDrawer from '../TypesDrawer';
import AppContext from '../AppContext';

interface ContainerProps {
  hidePageNav?: boolean;
  designHash?: any;
  routerId?: string;
  children: React.ReactNode;
}

export default function PageContainer(props: ContainerProps) {
  const { children, designHash: designHashConfig = {}, hidePageNav, routerId, ...rest } = props;
  const [openPageNav, setOpenPageNav] = React.useState(!hidePageNav);
  const [openTypesDrawer, setOpenTypesDrawer] = React.useState();

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

  const {
    messages,
    theme: [themeName, direction]
  } = React.useContext(AppContext);
  const designHash = designHashConfig[themeName];
  const rtl = direction === 'rtl';

  return (
    <>
      <Row {...rest} className={classnames({ ['hide-page-nav']: !openPageNav })}>
        <Col md={24} xs={24} sm={24} className="main-container">
          <PageContent>{children}</PageContent>
        </Col>
        <Col md={8} xsHidden smHidden>
          <ButtonToolbar className="menu-button">
            {designHash ? (
              <Whisper placement="bottom" speaker={<Tooltip>{messages?.common?.design}</Tooltip>}>
                <IconButton
                  appearance="subtle"
                  target="_blank"
                  icon={<Icon icon="diamond" />}
                  href={`/design/${themeName}/index.html#artboard${designHash}`}
                />
              </Whisper>
            ) : null}
            {routerId ? (
              <Whisper placement="bottom" speaker={<Tooltip>{messages?.common?.edit}</Tooltip>}>
                <IconButton
                  appearance="subtle"
                  icon={<Icon icon="edit2" />}
                  target="_blank"
                  href={`https://github.com/rsuite/rsuite/edit/master/docs/pages/${routerId}/index.md`}
                />
              </Whisper>
            ) : null}

            <Whisper placement="bottom" speaker={<Tooltip>{messages?.common?.newIssues}</Tooltip>}>
              <IconButton
                appearance="subtle"
                icon={<Icon icon="bug" />}
                target="_blank"
                href={'https://github.com/rsuite/rsuite/issues/new'}
              />
            </Whisper>

            <Whisper
              placement="bottom"
              speaker={<Tooltip>{messages?.common?.changeLanguage}</Tooltip>}
            >
              <LanguageButton />
            </Whisper>

            <Whisper
              placement="bottom"
              speaker={<Tooltip>{messages?.common?.collapseMenu}</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                icon={<Icon icon="bars" />}
                onClick={() => {
                  setOpenPageNav(!openPageNav);
                }}
              />
            </Whisper>
          </ButtonToolbar>

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
