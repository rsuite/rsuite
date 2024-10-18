import React, { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Whisper, WhisperInstance, Tooltip, Button, IconButton } from 'rsuite';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import * as SvgIcons from '@/components/SvgIcons';
import { useApp } from '../AppContext';
import Link from '@/components/Link';
import { useRouter } from 'next/router';
import Icon from '@rsuite/icons/Icon';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import Github from '@rsuite/icons/legacy/Github';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';

interface ButtonWithTooltipProps {
  children: React.ReactNode;
  tip: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

const ButtonWithTooltip = React.forwardRef(
  (
    { children, as = 'a', tip, className, ...props }: ButtonWithTooltipProps,
    ref: React.Ref<WhisperInstance>
  ) => {
    const btn = (
      <Button {...props} size="lg" className={classNames('icon-btn-circle', className)} as={as}>
        {children}
      </Button>
    );
    if (isMobile) {
      return btn;
    }
    return (
      <Whisper ref={ref} speaker={<Tooltip>{tip}</Tooltip>} placement="right" trigger="hover">
        {btn}
      </Whisper>
    );
  }
);

const SearchButton = React.forwardRef(({ tip, ...rest }: any, ref) => {
  return (
    <ButtonWithTooltip tip={tip} {...rest} ref={ref}>
      <Icon as={() => <SvgIcons.Search />} style={{ fontSize: 20 }} />
    </ButtonWithTooltip>
  );
});

interface TopLevelNavProps {
  onToggleMenu?: (show: boolean) => void;
  showSubmenu?: boolean;
  hideToggle?: boolean;
  children?: React.ReactNode;
}

function getNavItems(messages) {
  return [
    {
      key: 'guide',
      tip: messages?.common?.guide,
      to: '/guide/introduction',
      icon: <Icon as={() => <SvgIcons.Guide />} />
    },
    {
      key: 'components',
      tip: messages?.common?.components,
      to: '/components/overview',
      icon: <Icon as={() => <SvgIcons.Component />} />
    },

    {
      key: 'resources',
      tip: messages?.common?.resources,
      to: '/resources/templates',
      icon: <Icon as={() => <SvgIcons.Ecology />} />
    }
  ];
}

const TopLevelNav = React.forwardRef((props: TopLevelNavProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, showSubmenu, hideToggle, onToggleMenu: onToggleMenuProp } = props;
  const router = useRouter();

  const [searchModalOpen, setSearchModalOpen] = React.useState<boolean>(false);
  const [initialQuery, setInitialQuery] = React.useState(undefined);
  const searchButtonRef = React.useRef(null);

  const onToggleMenu = useCallback(
    (_event, show?: boolean) => {
      onToggleMenuProp?.(show);
    },
    [onToggleMenuProp]
  );
  const {
    locales,
    language,
    theme: [, direction]
  } = useApp();

  const navItems = getNavItems(locales);
  const rtl = direction === 'rtl';

  const onOpen = () => {
    setSearchModalOpen(true);
  };

  const onClose = () => {
    setSearchModalOpen(false);
  };

  const onInput = useCallback(
    event => {
      setSearchModalOpen(true);
      setInitialQuery(event.key);
    },
    [setSearchModalOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen: searchModalOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef
  });

  const searchParameters = useMemo(() => {
    return { facetFilters: [`lang:${language}`] };
  }, [language]);

  const navigator = {
    navigate({ itemUrl }: { itemUrl: string }) {
      router.push(itemUrl);
    }
  };

  const arrow = useMemo(() => (rtl ? !showSubmenu : showSubmenu), [showSubmenu, rtl]);

  return (
    <div className="top-level-nav" ref={ref}>
      {!hideToggle && (
        <IconButton
          circle
          className="btn-nav-toggle"
          appearance="default"
          icon={arrow ? <AngleLeft /> : <AngleRight />}
          size="xs"
          style={{ [rtl ? 'right' : 'left']: showSubmenu ? 310 : 70, width: '24px' }}
          title={showSubmenu ? locales?.common?.closeMenu : locales?.common?.openMenu}
          onClick={onToggleMenu}
        />
      )}

      <Link href="/">
        <Logo width={26} height={30} className="logo-sm" />
      </Link>

      <div className="top-level-nav-header">
        <SearchButton
          className="visible-xs"
          tip={locales?.common?.search}
          ref={searchButtonRef}
          onClick={onOpen}
        />
        {navItems.map(item => (
          <ButtonWithTooltip
            tip={item.tip}
            key={item.key}
            href={item.to}
            as={Link}
            onClick={event => {
              onToggleMenu(event, true);
            }}
          >
            {React.cloneElement(
              item.icon,
              router.pathname.indexOf(`/${item.key}`) === 0
                ? {
                    style: {
                      fill: '#169de0'
                    }
                  }
                : null
            )}
          </ButtonWithTooltip>
        ))}

        <ButtonWithTooltip
          tip="GitHub"
          href="https://github.com/rsuite/rsuite"
          style={{ padding: 11 }}
          as="a"
          target="_blank"
        >
          <Github style={{ fontSize: 20 }} />
        </ButtonWithTooltip>
        <SearchButton className="hidden-xs" tip={locales?.common?.search} onClick={onOpen} />
      </div>
      <div className="top-level-nav-footer"></div>
      {children}

      {searchModalOpen &&
        createPortal(
          <DocSearchModal
            appId="FS7O6PO8BY"
            indexName="rsuitejs"
            apiKey="ea7cf5ab3e88bea1526aad7b15e74a09"
            initialQuery={initialQuery}
            onClose={onClose}
            initialScrollY={typeof window !== 'undefined' ? window.scrollY : undefined}
            searchParameters={searchParameters}
            navigator={navigator}
          />,
          document.body
        )}
    </div>
  );
});

export default TopLevelNav;
