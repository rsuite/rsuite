import React, { useRef } from 'react';
import classNames from 'classnames';
import { TiArrowUnsorted } from 'react-icons/ti';
import styles from './FakeBrowser.module.scss';

interface FakeBrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

function FakeBrowser(props: FakeBrowserProps) {
  const { children, width, height, style, className, ...rest } = props;
  const browserRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    const browser = browserRef.current;
    if (!browser) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      browser.requestFullscreen();
    }
  };

  return (
    <div
      className={classNames(styles['fake-browser'], className)}
      style={{ width, height, ...style }}
      ref={browserRef}
      {...rest}
    >
      <div className={styles['fake-browser-header']}>
        <button className={classNames(styles['fake-browser-header-button'], styles['red'])} />
        <button className={classNames(styles['fake-browser-header-button'], styles['yellow'])} />
        <button
          className={classNames(styles['fake-browser-header-button'], styles['green'])}
          onClick={toggleFullscreen}
        >
          <TiArrowUnsorted className={styles['fake-browser-header-button-icon']} />
        </button>
      </div>

      <div className={styles['fake-browser-content']}>{children}</div>
    </div>
  );
}

export default FakeBrowser;
