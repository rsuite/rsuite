import React from 'react';
import { IconButton } from 'rsuite';
import {
  RxArrowTopLeft,
  RxArrowTopRight,
  RxArrowBottomLeft,
  RxArrowBottomRight
} from 'react-icons/rx';

export type Placement =
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
    icon: React.ReactNode;
    key: string;
  }) => React.ReactNode;
}

/**
 * A grid of buttons representing different placement options
 */
const PlacementGrid: React.FC<PlacementGridProps> = ({ renderCell, width = 170 }) => {
  // Define the placement mapping to grid positions
  const placementMap: Record<string, Placement | null> = {
    '0-1': 'topStart',
    '0-2': 'topEnd',
    '1-0': 'leftStart',
    '1-3': 'rightStart',
    '2-0': 'leftEnd',
    '2-3': 'rightEnd',
    '3-1': 'bottomStart',
    '3-2': 'bottomEnd'
  };

  // Map the icon for each position
  const iconMap: Record<string, JSX.Element> = {
    '0-1': <RxArrowTopLeft />,
    '0-2': <RxArrowTopRight />,
    '1-0': <RxArrowTopLeft />,
    '1-3': <RxArrowTopRight />,
    '2-0': <RxArrowBottomLeft />,
    '2-3': <RxArrowBottomRight />,
    '3-1': <RxArrowBottomLeft />,
    '3-2': <RxArrowBottomRight />
  };

  // Generate the grid cells
  const renderGridCells = () => {
    const cells = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
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

          cells.push(
            renderCell?.({ placement: placementValue, button, icon, key: position }) ?? button
          );
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
        width
      }}
    >
      {renderGridCells()}
    </div>
  );
};

export default PlacementGrid;
