import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps, prefix, createContext } from '../utils';
import { ContainerProps } from './Container.d';

interface ContainerState {
  hasSidebar: boolean;
}

export const ContainerContext = createContext({});

class Container extends React.Component<ContainerProps, ContainerState> {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    classPrefix: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      hasSidebar: false
    };
  }
  setContextState = nextState => {
    this.setState(nextState);
  };
  render() {
    const { className, children = [], classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('has-sidebar')]: this.state.hasSidebar
    });

    return (
      <ContainerContext.Provider value={{ setContextState: this.setContextState }}>
        <div {...props} className={classes}>
          {children}
        </div>
      </ContainerContext.Provider>
    );
  }
}

export default defaultProps<ContainerProps>({
  classPrefix: 'container'
})(Container);
