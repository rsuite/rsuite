import * as React from 'react';
import { Content as PageContent, Nav as PageNav } from '@rsuite/document-nav';
import { on } from 'dom-lib';
import canUseDOM from 'dom-lib/lib/query/canUseDOM';
import * as SvgIcons from '@/components/SvgIcons';

import {
  Row,
  Col,
  IconButton,
  Icon,
  ButtonToolbar,
  Tooltip,
  Whisper,
  Dropdown,
  Popover
} from 'rsuite';
import LanguageButton from '../LanguageButton';
import TypesDrawer from '../TypesDrawer';
import AppContext from '../AppContext';

interface ContainerProps {
  hidePageNav?: boolean;
  designHash?: any;
  routerId?: string;
  children: React.ReactNode;
}

const MenuPopover = ({ children, ...rest }: any) => (
  <Popover {...rest} full>
    <Dropdown.Menu>{children}</Dropdown.Menu>
  </Popover>
);

export default function PageContainer(props: ContainerProps) {
  const { children, designHash: designHashConfig = {}, routerId, ...rest } = props;
  const [openTypesDrawer, setOpenTypesDrawer] = React.useState<boolean>();

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
    language,
    theme: [themeName, direction],
    onChangeDirection,
    onChangeTheme
  } = React.useContext(AppContext);

  const designHash = designHashConfig[themeName];
  const rtl = direction === 'rtl';

  return (
    <>
      <Row {...rest} className="page-context-wrapper">
        <Col md={24} xs={24} sm={24} className="main-container">
          <PageContent>{children}</PageContent>
        </Col>
        <Col md={8} xsHidden smHidden>
          <ButtonToolbar className="menu-button">
            <Whisper
              placement="bottom"
              speaker={<Tooltip>{messages?.common?.changeLanguage}</Tooltip>}
            >
              <LanguageButton />
            </Whisper>
            <Whisper placement="bottom" speaker={<Tooltip>Toggle light/dark theme</Tooltip>}>
              <IconButton
                appearance="subtle"
                icon={<Icon icon={themeName === 'dark' ? SvgIcons.Light : SvgIcons.Dark} />}
                onClick={onChangeTheme}
              />
            </Whisper>
            <Whisper placement="bottom" speaker={<Tooltip>Toggle RTL/LTR</Tooltip>}>
              <IconButton
                appearance="subtle"
                icon={<Icon icon={direction === 'rtl' ? SvgIcons.Rtl : SvgIcons.Ltr} />}
                onClick={onChangeDirection}
              />
            </Whisper>
            <Whisper
              placement="bottomEnd"
              trigger="click"
              speaker={
                <MenuPopover>
                  {designHash && (
                    <Dropdown.Item
                      icon={<Icon icon="diamond" />}
                      target="_blank"
                      href={`/design/${themeName}/#artboard${designHash}`}
                    >
                      {messages?.common?.design}
                    </Dropdown.Item>
                  )}

                  <Dropdown.Item
                    icon={<Icon icon="edit2" />}
                    disabled={!routerId}
                    target="_blank"
                    href={`https://github.com/rsuite/rsuite/edit/master/docs/pages${
                      language === 'zh' ? routerId : routerId + '/' + language
                    }/index.md`}
                  >
                    {messages?.common?.edit}
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<Icon icon="bug" />}
                    target="_blank"
                    href={'https://github.com/rsuite/rsuite/issues/new?template=bug_report.md'}
                  >
                    {messages?.common?.newIssues}
                  </Dropdown.Item>
                  {canUseDOM && (
                    <Dropdown.Item
                      icon={<Icon icon="twitter" />}
                      target="_blank"
                      href={`https://twitter.com/share?text=${document?.title}&url=${location?.href}`}
                    >
                      {messages.common.shareTwitter}
                    </Dropdown.Item>
                  )}
                </MenuPopover>
              }
            >
              <IconButton appearance="subtle" icon={<Icon icon={SvgIcons.More} />} />
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
