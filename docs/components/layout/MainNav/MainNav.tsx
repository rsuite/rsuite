import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import Logo from '@/components/Logo';
import Link from '@/components/Link';
import Icon from '@rsuite/icons/Icon';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { Search, Guide, Component, Ecology } from '@/components/icons';
import { FaGithub } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { Whisper, WhisperInstance, Tooltip, Button, IconButton } from 'rsuite';
import { isMobile } from 'react-device-detect';
import { useApp } from '@/hooks/useApp';
import { useRouter } from 'next/router';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import styles from './MainNav.module.scss';

interface ButtonWithTooltipProps {
  children: React.ReactNode;
  tip: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

const ButtonWithTooltip = React.forwardRef(function ButtonWithTooltip(
  { children, as = 'a', tip, className, ...props }: ButtonWithTooltipProps,
  ref: React.Ref<WhisperInstance>
) {
  const btn = (
    <Button
      {...props}
      size="lg"
      className={classNames(styles['icon-btn-circle'], className)}
      as={as}
    >
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
});

const SearchButton = React.forwardRef(function SearchButton({ tip, ...rest }: any, ref) {
  return (
    <ButtonWithTooltip tip={tip} {...rest} ref={ref}>
      <Icon as={() => <Search />} style={{ fontSize: 20 }} />
    </ButtonWithTooltip>
  );
});

interface MainNavProps {
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
      icon: <Icon as={() => <Guide />} />
    },
    {
      key: 'components',
      tip: messages?.common?.components,
      to: '/components/overview',
      icon: <Icon as={() => <Component />} />
    },

    {
      key: 'resources',
      tip: messages?.common?.resources,
      to: '/resources/templates',
      icon: <Icon as={() => <Ecology />} />
    }
  ];
}

const MainNav = React.forwardRef(function MainNav(
  props: MainNavProps,
  ref: React.Ref<HTMLDivElement>
) {
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
    <div className={styles['main-nav']} ref={ref}>
      {!hideToggle && (
        <IconButton
          circle
          className={styles['btn-nav-toggle']}
          appearance="default"
          icon={arrow ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
          size="xs"
          style={{ [rtl ? 'right' : 'left']: showSubmenu ? 310 : 70, width: '24px' }}
          title={showSubmenu ? locales?.common?.closeMenu : locales?.common?.openMenu}
          onClick={onToggleMenu}
        />
      )}

      <Link href="/">
        <Logo width={26} height={30} className={styles['logo-sm']} />
      </Link>

      <div className={styles['main-nav-header']}>
        <SearchButton
          className={styles['visible-xs']}
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
          <FaGithub size={16} />
        </ButtonWithTooltip>
        <SearchButton
          className={styles['hidden-xs']}
          tip={locales?.common?.search}
          onClick={onOpen}
        />
      </div>
      <div className={styles['main-nav-footer']}></div>
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

export default MainNav;
