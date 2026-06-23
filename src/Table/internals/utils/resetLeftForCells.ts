import React from 'react';

/**
 * Resets the relative left distance of all cells in the array.
 * @param cells
 * @param extraWidth The additional width added to the last cell when there is a vertical scroll bar.
 */
export default function resetLeftForCells(cells, extraWidth?: number) {
  let left = 0;
  const nextCells: React.ReactNode[] = [];

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const nextCell = React.cloneElement(cell, {
      left,
      width: i === cells.length - 1 && extraWidth ? cell.props.width + extraWidth : cell.props.width
    });
    left += cell.props.width;
    nextCells.push(nextCell);
  }

  return nextCells;
}
