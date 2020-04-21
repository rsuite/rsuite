import React, { CSSProperties } from 'react';

const containerStyle: CSSProperties = {
  overflow: 'auto',
  position: 'relative'
};
const contentStyle: CSSProperties = {
  height: '400%',
  width: '230%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap'
};

interface PreventOverflowContainerProps {
  children: React.ReactChildren;
  height?: number;
}

const PreventOverflowContainer = ({ children, height = 500 }: PreventOverflowContainerProps) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const contentRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    containerRef.current.scrollTop = contentRef.current.clientHeight / 2 - 60;
    containerRef.current.scrollLeft =
      contentRef.current.clientWidth / 2 - containerRef.current.clientWidth / 2;
  }, []);

  return (
    <div
      id="preventOverflowContainer"
      style={{ ...containerStyle, height } as CSSProperties}
      ref={containerRef}
    >
      <div style={contentStyle} ref={contentRef}>
        {(children as any)(() => containerRef.current)}
      </div>
    </div>
  );
};

export default PreventOverflowContainer;
