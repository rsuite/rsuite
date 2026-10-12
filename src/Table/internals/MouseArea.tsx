import React from 'react';

interface MouseAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  addPrefix: (...classes: any) => string;
  height: number;
  headerHeight: number;
}

const MouseArea = React.forwardRef((props: MouseAreaProps, ref: React.Ref<HTMLDivElement>) => {
  const { addPrefix, headerHeight, height } = props;
  const styles = { height };

  const spanStyles = { height: headerHeight - 1 };
  return (
    <div ref={ref} className={addPrefix('mouse-area')} style={styles}>
      <span style={spanStyles} />
    </div>
  );
});

MouseArea.displayName = 'Table.MouseArea';

export default MouseArea;
