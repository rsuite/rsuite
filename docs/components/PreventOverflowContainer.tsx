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

class PreventOverflowContainer extends React.Component<PreventOverflowContainerProps> {
  content: HTMLDivElement;
  container: HTMLDivElement;

  componentDidMount() {
    if (!this.content) {
      return;
    }
    this.container.scrollTop = this.content.clientHeight / 2 - 60;
    this.container.scrollLeft = this.content.clientWidth / 2 - this.container.clientWidth / 2;
  }
  render() {
    const { children, height = 500 } = this.props;
    return (
      <div
        id="preventOverflowContainer"
        style={{ ...containerStyle, height } as CSSProperties}
        ref={ref => {
          this.container = ref as HTMLDivElement;
        }}
      >
        <div
          style={contentStyle}
          ref={ref => {
            this.content = ref;
          }}
        >
          {(children as any)(() => {
            return this.container;
          })}
        </div>
      </div>
    );
  }
}

export default PreventOverflowContainer;
