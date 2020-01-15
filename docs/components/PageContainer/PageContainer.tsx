import * as React from 'react';
import classnames from 'classnames';
import {
  NavProvider as PageProvider,
  Content as PageContent,
  Nav as PageNav
} from '@rsuite/document-nav';
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

  function handleDocumentClick(e) {
    const href = e.target?.getAttribute('href');
    if (href === '#types') {
      e.stopPropagation();
      e.preventDefault();
      setOpenTypesDrawer(true);
    }
  }

  React.useEffect(() => {
    const documentListener = on(document, 'click', handleDocumentClick, true);
    return () => {
      documentListener.off();
    };
  }, []);

  return (
    <AppContext.Consumer>
      {({ messages, theme: [themeName, direction] }) => {
        const designHash = designHashConfig[themeName];
        const rtl = direction === 'rtl';

        function handleChangeLanguage() {
          const pathname = location.pathname.replace('/en/', '');
          const isEN = messages?.id === 'en-US';
          const nextPathName = isEN ? `/${pathname}` : `/en${pathname}`;
          location.href = `${location.origin}${nextPathName}`;
        }

        return (
          <PageProvider>
            <Row {...rest} className={classnames({ ['hide-page-nav']: !openPageNav })}>
              <Col md={24} xs={24} sm={24} className="main-container">
                <PageContent>{children}</PageContent>
              </Col>
              <Col md={8} xsHidden smHidden>
                <ButtonToolbar className="menu-button">
                  {designHash ? (
                    <Whisper
                      placement="bottom"
                      speaker={<Tooltip>{messages?.common?.design}</Tooltip>}
                    >
                      <IconButton
                        appearance="subtle"
                        target="_blank"
                        icon={<Icon icon="diamond" />}
                        href={`/design/${themeName}/index.html#artboard${designHash}`}
                      />
                    </Whisper>
                  ) : null}
                  {routerId ? (
                    <Whisper
                      placement="bottom"
                      speaker={<Tooltip>{messages?.common?.edit}</Tooltip>}
                    >
                      <IconButton
                        appearance="subtle"
                        icon={<Icon icon="edit2" />}
                        target="_blank"
                        href={`https://github.com/rsuite/rsuite/edit/master/docs/pages/${routerId}/index.md`}
                      />
                    </Whisper>
                  ) : null}

                  <Whisper
                    placement="bottom"
                    speaker={<Tooltip>{messages?.common?.newIssues}</Tooltip>}
                  >
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
                    <LanguageButton language={messages?.id} onClick={handleChangeLanguage} />
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
                  once={false}
                  showOrderNumber={false}
                  width={150}
                  scrollBar="left"
                  rtl={rtl}
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
          </PageProvider>
        );
      }}
    </AppContext.Consumer>
  );
}
