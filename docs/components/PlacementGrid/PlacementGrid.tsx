import React from 'react';
import { IconButton } from 'rsuite';
import {
  RxArrowUp,
  RxArrowDown,
  RxArrowLeft,
  RxArrowRight,
  RxArrowTopLeft,
  RxArrowTopRight,
  RxArrowBottomLeft,
  RxArrowBottomRight
} from 'react-icons/rx';

export type Placement =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'topStart'
  | 'topEnd'
  | 'bottomStart'
  | 'bottomEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd';

interface PlacementGridProps {
  /**
   * Custom width of the grid
   */
  width?: number | string;

  /**
   * Custom render function for each cell
   */
  renderCell?: (props: {
    placement: Placement;
    button: React.ReactNode;
    key: string;
  }) => React.ReactNode;
}

/**
 * A grid of buttons representing different placement options
 */
const PlacementGrid: React.FC<PlacementGridProps> = ({ renderCell, width = 220 }) => {
  // Define the placement mapping to grid positions
  const placementMap: Record<string, Placement | null> = {
    '0-1': 'topStart',
    '0-2': 'top',
    '0-3': 'topEnd',
    '1-0': 'leftStart',
    '1-4': 'rightStart',
    '2-0': 'left',
    '2-4': 'right',
    '3-0': 'leftEnd',
    '3-4': 'rightEnd',
    '4-1': 'bottomStart',
    '4-2': 'bottom',
    '4-3': 'bottomEnd'
  };

  // Map the icon for each position
  const iconMap: Record<string, JSX.Element> = {
    '0-1': <RxArrowTopLeft />,
    '0-2': <RxArrowUp />,
    '0-3': <RxArrowTopRight />,
    '1-0': <RxArrowTopLeft />,
    '1-4': <RxArrowTopRight />,
    '2-0': <RxArrowLeft />,
    '2-4': <RxArrowRight />,
    '3-0': <RxArrowBottomLeft />,
    '3-4': <RxArrowBottomRight />,
    '4-1': <RxArrowBottomLeft />,
    '4-2': <RxArrowDown />,
    '4-3': <RxArrowBottomRight />
  };

  // Generate the grid cells
  const renderGridCells = () => {
    const cells = [];

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const position = `${row}-${col}`;
        const placementValue = placementMap[position];
        const icon = iconMap[position];

        if (placementValue && icon) {
          const button = (
            <IconButton
              key={position}
              icon={icon}
              aria-label={`Select ${placementValue} placement`}
            />
          );

          cells.push(renderCell?.({ placement: placementValue, button, key: position }) ?? button);
        } else {
          cells.push(<span key={position} />);
        }
      }
    }

    return cells;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        width: width
      }}
    >
      {renderGridCells()}
    </div>
  );
};

export default PlacementGrid;
