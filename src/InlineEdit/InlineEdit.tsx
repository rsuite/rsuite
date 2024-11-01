import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import { oneOf } from '@/internals/propTypes';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import EditableControls from './EditableControls';
import useFocusEvent from './useFocusEvent';
import useEditState from './useEditState';
import { renderChildren, defaultRenderInput, type ChildrenProps } from './renderChildren';
import { useCustom } from '../CustomProvider';

export interface InlineEditProps extends Omit<WithAsProps, 'children'> {
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
  value?: any;

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
  children?:
    | ((props: ChildrenProps, ref: React.Ref<any>) => React.ReactElement)
    | React.ReactElement;
}

const InlineEdit: RsRefForwardingComponent<'div', InlineEditProps> = React.forwardRef<
  HTMLDivElement,
  InlineEditProps
>((props, ref) => {
  const { propsWithDefaults } = useCustom('InlineEdit', props);
  const {
    as: Component = 'div',
    children = defaultRenderInput,
    classPrefix = 'inline-edit',
    className,
    disabled,
    size,
    showControls = true,
    stateOnBlur = 'save',
    placeholder,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const { value, isEditing, onSave, onCancel, onChange, onKeyDown, onClick, htmlProps } =
    useEditState({ ...rest, disabled });

  const { target, root, onBlur } = useFocusEvent({
    isEditing,
    stateOnBlur,
    onSave,
    onCancel
  });

  const childrenProps = {
    size,
    value,
    disabled,
    placeholder,
    plaintext: !isEditing,
    onChange,
    onBlur
  };

  return (
    <Component
      ref={mergeRefs(root, ref)}
      tabIndex={0}
      className={merge(className, withClassPrefix(size, { disabled }))}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...htmlProps}
    >
      {renderChildren(children, childrenProps, target)}
      {showControls && isEditing && (
        <EditableControls className={prefix('controls')} onSave={onSave} onCancel={onCancel} />
      )}
    </Component>
  );
});

InlineEdit.displayName = 'InlineEdit';
InlineEdit.propTypes = {
  children: PropTypes.any,
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
