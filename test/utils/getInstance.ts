import React from 'react';
import { render } from './render';
import { act } from '@testing-library/react';

export function getInstance(children, waitForDidMount = true): any {
  const instanceRef = React.createRef();

  if (waitForDidMount) {
    // Use act() to make sure componentDidMount/useEffect is done
    act(() => {
      render(React.cloneElement(children, { ref: instanceRef }));
    });
  } else {
    render(React.cloneElement(children, { ref: instanceRef }));
  }

  return instanceRef.current;
}
