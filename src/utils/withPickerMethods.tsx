import * as React from 'react';

export interface Props {
  classPrefix: string;
  componentClass?: React.ElementType;
}

function withPickerMethods<T>() {
  return (WrappedComponent: React.ComponentClass<any>): React.ComponentClass<T> => {
    class PickerComponent extends WrappedComponent {
      // for IE9 & IE10 support
      static defaultProps = WrappedComponent.defaultProps;
      static contextTypes = WrappedComponent.contextTypes;
      static childContextTypes = WrappedComponent.childContextTypes;
      static getDerivedStateFromProps = WrappedComponent.getDerivedStateFromProps;

      [x: string]: any;
      open = () => {
        if (typeof this.handleOpenDropdown === 'function') {
          this.handleOpenDropdown();
        }
      };

      close = () => {
        if (typeof this.handleCloseDropdown === 'function') {
          this.handleCloseDropdown();
        }
      };

      render() {
        return super.render();
      }
    }

    return PickerComponent;
  };
}

export default withPickerMethods;
