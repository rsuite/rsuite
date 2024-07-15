import React from 'react';
import classNames from 'classnames';

interface FakeBrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

function FakeBrowser(props: FakeBrowserProps) {
  const { children, width, height, style, className, ...rest } = props;

  return (
    <div
      className={classNames('fake-browser', className)}
      style={{ width, height, ...style }}
      {...rest}
    >
      <div className="fake-browser-header">
        <button className="fake-browser-header-button red" />
        <button className="fake-browser-header-button yellow" />
        <button className="fake-browser-header-button green" />
      </div>

      <div className="fake-browser-content">{children}</div>
    </div>
  );
}

export default FakeBrowser;
