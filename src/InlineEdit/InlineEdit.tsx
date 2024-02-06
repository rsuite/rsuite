import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { contains } from 'dom-lib';
import Input from '../Input';
import { useClassNames, useControlled, useEventCallback, mergeRefs } from '../utils';
import { oneOf } from '../internals/propTypes';
import { WithAsProps } from '../@types/common';
import EditableControls from './EditableControls';
import useTargetFocus from './useTargetFocus';

interface ChildrenProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  disabled?: boolean;
  placeholder?: string;
  plaintext?: boolean;
  value: any;
  onChange: (value: any, event: React.SyntheticEvent) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
}

export interface InlineEditProps extends WithAsProps {
  /**
   * If true, the InlineEdit will be disabled.
   */
  disabled?: boolean;

  /**
   * The initial value of the InlineEdit when it is not controlled.
   */
  defaultValue?: any;

  /**
   * The value of the InlineEdit.
   */
  value: any;

  /**
   * show the control buttons when editing.
   * @default true
   */
  showControls?: boolean;

  /**
   * The placeholder of the InlineEdit.
   */
  placeholder?: string;

  /**
   * The size of the InlineEdit.
   */
  size?: 'lg' | 'md' | 'sm' | 'xs';

  /**
   * The state of the InlineEdit when it is blurred.
   */
  stateOnBlur?: 'save' | 'cancel';

  /**
   * The callback function that is called when the value of the InlineEdit is changed.
   */
  onChange?: (value: any, event: React.ChangeEvent) => void;

  /**
   * The callback function that is called when the InlineEdit is canceled.
   */
  onCancel?: (event?: React.SyntheticEvent) => void;

  /**
   * The callback function that is called when the InlineEdit is saved.
   */
  onSave?: (event?: React.SyntheticEvent) => void;

  /**
   * The callback function that is called when the InlineEdit is clicked.
   */
  onEdit?: (event: React.SyntheticEvent) => void;

  /**
   * The render function of the InlineEdit.
   */
  children?: (props: ChildrenProps, ref: React.Ref<any>) => React.ReactElement;
}

function defaultRenderInput(props: ChildrenProps, ref: React.Ref<any>) {
  return <Input ref={ref} {...props} />;
}

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>((props, ref) => {
  const {
    as: Component = 'div',
    children = defaultRenderInput,
    classPrefix = 'inline-edit',
    className,
    defaultValue,
    disabled,
    size,
    value: valueProp,
    showControls = true,
    stateOnBlur = 'save',
    placeholder,
    onChange,
    onEdit,
    onSave,
    onCancel,
    ...rest
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useControlled(valueProp, defaultValue);

  // When editing, the value is not updated, and the original value is restored when canceling
  const [resetValue, setResetValue] = useState();
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useTargetFocus({ isEditing });

  const focusInput = useEventCallback((event: React.SyntheticEvent) => {
    onEdit?.(event);
    setIsEditing(true);
    setResetValue(value);
  });

  const handleChange = useEventCallback((value: any, event: React.ChangeEvent) => {
    setValue(value);
    onChange?.(value, event);
  });

  const handleCancel = useEventCallback((event?: React.MouseEvent) => {
    setIsEditing(false);
    setValue(resetValue);
    onCancel?.(event);

    event?.stopPropagation();
  });

  const handleSave = useEventCallback((event?: React.MouseEvent) => {
    setIsEditing(false);
    onSave?.(event);
    event?.stopPropagation();
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (isEditing) {
      switch (event.key) {
        case 'Enter':
          handleSave(event);
          break;
        case 'Escape':
          handleCancel(event);
          break;
      }

      return;
    }

    if (event.key === 'Enter' || event.key === 'Space') {
      focusInput(event);
    }
  });

  const handleBlur = useEventCallback((event: React.FocusEvent) => {
    if (rootRef.current && contains(rootRef.current, event?.target)) {
      return;
    }

    if (stateOnBlur === 'save') {
      handleSave(event);
    } else if (stateOnBlur === 'cancel') {
      handleCancel(event);
    }
  });

  const childrenProps = {
    size,
    value,
    disabled,
    placeholder,
    plaintext: !isEditing,
    onChange: handleChange,
    onBlur: handleBlur
  };

  return (
    <Component
      ref={mergeRefs(rootRef, ref)}
      tabIndex={0}
      className={merge(className, withClassPrefix({ size }))}
      onClick={focusInput}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children(childrenProps, targetRef)}
      {showControls && isEditing && (
        <EditableControls
          className={prefix('controls')}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </Component>
  );
});

InlineEdit.displayName = 'InlineEdit';
InlineEdit.propTypes = {
  children: PropTypes.func,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  showControls: PropTypes.bool,
  placeholder: PropTypes.string,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  stateOnBlur: oneOf(['save', 'cancel']),
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onEdit: PropTypes.func
};

export default InlineEdit;
