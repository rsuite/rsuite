import React from 'react';
import { render } from '@testing-library/react';
import AutoSizer from '../AutoSizer';

function DefaultChildComponent({ height, width, foo, bar }) {
  return <div>{`width:${width}, height:${height}, foo:${foo}, bar:${bar}`}</div>;
}

describe('AutoSizer', () => {
  const Container = props => {
    const {
      bar = 123,
      ChildComponent = DefaultChildComponent,
      className = undefined,
      defaultHeight = undefined,
      defaultWidth = undefined,
      disableHeight = false,
      disableWidth = false,
      foo = 456,
      height = 100,
      onResize,
      paddingBottom = 0,
      paddingLeft = 0,
      paddingRight = 0,
      paddingTop = 0,
      style = undefined,
      width = 200,
      ...rest
    } = props;

    const wrapperStyle = {
      boxSizing: 'border-box',
      height,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      width
    } as const;

    return (
      <div style={wrapperStyle}>
        <AutoSizer
          className={className}
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
          disableHeight={disableHeight}
          disableWidth={disableWidth}
          onResize={onResize}
          style={style}
          {...rest}
        >
          {({ height, width }) => (
            <ChildComponent
              width={disableWidth ? undefined : width}
              height={disableHeight ? undefined : height}
              bar={bar}
              foo={foo}
            />
          )}
        </AutoSizer>
      </div>
    );
  };

  it('should relay properties to ChildComponent or React child', () => {
    const { container } = render(<Container />);
    expect(container).to.contain.text('foo:456');
    expect(container).to.contain.text('bar:123');
  });

  it('should set the correct initial width and height of ChildComponent or React child', () => {
    const { container } = render(<Container />);

    expect(container).to.contain.text('height:100');
    expect(container).to.contain.text('width:200');
  });

  it('should account for padding when calculating the available width and height', () => {
    const { container } = render(
      <Container paddingBottom={10} paddingLeft={4} paddingRight={4} paddingTop={15} />
    );

    expect(container).to.contain.text('height:75');
    expect(container).to.contain.text('width:192');
  });

  it('should not update :width if :disableWidth is true', () => {
    const { container } = render(<Container disableWidth />);

    expect(container).to.contain.text('height:100');
    expect(container).to.contain.text('width:undefined');
  });

  it('should not update :height if :disableHeight is true', () => {
    const { container } = render(<Container disableHeight />);

    expect(container).to.contain.text('height:undefined');
    expect(container).to.contain.text('width:200');
  });
});
