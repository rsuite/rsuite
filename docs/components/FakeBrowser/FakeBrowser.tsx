import React, { useRef } from 'react';
import classNames from 'classnames';
import { TiArrowUnsorted } from 'react-icons/ti';

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
      className={classNames('fake-browser', className)}
      style={{ width, height, ...style }}
      ref={browserRef}
      {...rest}
    >
      <div className="fake-browser-header">
        <button className="fake-browser-header-button red" />
        <button className="fake-browser-header-button yellow" />
        <button className="fake-browser-header-button green" onClick={toggleFullscreen}>
          <TiArrowUnsorted className="fake-browser-header-button-icon" />
        </button>
      </div>

      <div className="fake-browser-content">{children}</div>
    </div>
  );
}

export default FakeBrowser;
