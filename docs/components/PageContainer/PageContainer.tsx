import * as React from 'react';
import classnames from 'classnames';
import {
  NavProvider as PageProvider,
  Nav as PageNav,
  Content as PageContent
} from '@rsuite/document-nav';
import { on } from 'dom-lib';

import { Row, Col, IconButton, Icon, ButtonToolbar, Tooltip, Whisper } from 'rsuite';
import IconDesign from '../icons/Design';
import LanguageButton from '../LanguageButton';
import TypesDrawer from '../TypesDrawer';
import { ThemeContext } from '../Context';

interface ContainerProps {
  hidePageNav?: boolean;
  designHash?: any;
  routerId?: string;
}

interface ContainerState {
  hideNav: boolean;
  showTypes: boolean;
}

class PageContainer extends React.Component<ContainerProps, ContainerState> {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    this.state = {
      hideNav: props.hidePageNav || false,
      showTypes: false
    };
  }
  documentListener = null;
  componentDidMount() {
    if (!this.documentListener) {
      this.documentListener = on(document, 'click', this.handleDocumentClick, true);
    }
  }
  componentWillUnmount() {
    if (this.documentListener) {
      this.documentListener.off();
    }
  }
  handleDocumentClick = e => {
    const href = e.target.getAttribute('href');
    if (href === '#types') {
      e.stopPropagation();
      e.preventDefault();
      this.setState({
        showTypes: true
      });
    }
  };
  closeShowTypes = () => {
    this.setState({
      showTypes: false
    });
  };
  handleNavicon = () => {
    this.setState({
      hideNav: !this.state.hideNav
    });
  };
  getLocaleKey() {
    return this.context.messages?.id;
  }
  handleChangeLanguage = () => {
    const pathname = location.pathname.replace('/en/', '');
    const isEN = this.getLocaleKey() === 'en-US';
    const nextPathName = isEN ? `/${pathname}` : `/en${pathname}`;
    location.href = `${location.origin}${nextPathName}`;
  };

  render() {
    const { children, designHash: designHashConfig = {}, routerId, ...rest } = this.props;
    const { hideNav } = this.state;
    const {
      messages,
      theme: [themeName, direction]
    } = this.context;
    const designHash = designHashConfig[themeName];
    const rtl = direction === 'rtl';

    return (
      <PageProvider>
        <Row {...rest} className={classnames({ ['hide-page-nav']: hideNav })}>
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
                    href={`/design/${themeName}/index.html#artboard${designHash}`}
                  >
                    <IconDesign />
                  </IconButton>
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
                <LanguageButton language={messages?.id} onClick={this.handleChangeLanguage} />
              </Whisper>

              <Whisper
                placement="bottom"
                speaker={<Tooltip>{messages?.common?.collapseMenu}</Tooltip>}
              >
                <IconButton
                  appearance="subtle"
                  icon={<Icon icon="bars" />}
                  onClick={this.handleNavicon}
                />
              </Whisper>
            </ButtonToolbar>

            <PageNav
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
        <TypesDrawer onHide={this.closeShowTypes} show={this.state.showTypes} />
      </PageProvider>
    );
  }
}

export default PageContainer;
