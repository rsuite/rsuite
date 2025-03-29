import React, { useEffect, CSSProperties } from 'react';
import scrollTop from 'dom-lib/scrollTop';
import scrollLeft from 'dom-lib/scrollLeft';

const containerStyle: CSSProperties = {
  overflow: 'auto',
  position: 'relative',
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
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
  children: (container: () => HTMLDivElement) => React.ReactNode;
  height?: number;
}

const PreventOverflowContainer = ({ children, height = 400 }: PreventOverflowContainerProps) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const contentRef = React.createRef<HTMLDivElement>();

  // Scroll to the center of the container
  useEffect(() => {
    const top = contentRef.current.clientHeight / 2 - 60;
    const left = contentRef.current.clientWidth / 2 - containerRef.current.clientWidth / 2;

    scrollTop(containerRef.current, top);
    scrollLeft(containerRef.current, left);
  }, [containerRef, contentRef]);

  return (
    <div style={{ ...containerStyle, height } as CSSProperties} ref={containerRef}>
      <div style={contentStyle} ref={contentRef}>
        {children(() => containerRef.current)}
      </div>
    </div>
  );
};

export default PreventOverflowContainer;
