import React from 'react';
import { SelectPicker, SelectPickerProps } from 'rsuite';

const placements = [
  'top',
  'bottom',
  'left',
  'right',
  'topStart',
  'topEnd',
  'leftStart',
  'leftEnd',
  'rightStart',
  'rightEnd',
  'bottomStart',
  'bottomEnd',
  'auto',
  'autoVerticalStart',
  'autoVerticalEnd',
  'autoHorizontalStart',
  'autoHorizontalEnd'
].map(item => ({ label: item, value: item }));

const PlacementPicker = (props: Partial<SelectPickerProps>) => {
  return (
    <SelectPicker
      label="Placement:"
      data={placements}
      cleanable={false}
      searchable={false}
      {...props}
    />
  );
};

export default PlacementPicker;
