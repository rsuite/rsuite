import React, { useCallback, useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import createTextMaskInputElement from './createTextMaskInputElement';
import { MaskType, MaskFunctionType, ConfigType } from './types';
import { mergeRefs } from '../utils';

/**
 * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#guide
 */
interface TextMaskBaseProps {
  /**
   * `guide` is a boolean that tells the component whether to be in guide or no guide mode.
   */
  guide?: boolean;

  /**
   * `mask` is an array or a function that defines how the user input is going to be masked.
   */
  mask?: MaskType | MaskFunctionType | boolean;

  /**
   * `showMask` is a boolean that tells the Text Mask component to display the mask as a placeholder
   * in place of the regular placeholder when the input element value is empty.
   */
  showMask?: boolean;

  /** The placeholder character represents the fillable spot in the mask. The default placeholder character is underscore, _. */
  placeholderChar?: string;

  /** `keepCharPositions` changes the general behavior of the Text Mask component. */
  keepCharPositions?: boolean;

  /** You can provide a `pipe` function that will give you the opportunity to modify the conformed value before it is displayed on the screen. */
  pipe?: (conformedValue: string, config: ConfigType) => string;
}

export type TextMaskProps = TextMaskBaseProps &
  React.HTMLAttributes<HTMLInputElement> & {
    /** Custom rendering DOM */
    render?: (
      ref: React.Ref<HTMLInputElement>,
      props: React.HTMLAttributes<HTMLInputElement>
    ) => any;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    readOnly?: boolean;
    disabled?: boolean;
  };

const defaultRender = (ref, props) => <input ref={ref} {...props} />;

const TextMask = React.forwardRef((props: TextMaskProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    mask,
    guide = true,
    placeholderChar,
    value,
    showMask,
    pipe,
    render = defaultRender,
    onChange,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const textMaskInputElement = useRef<{ update: (value?: string | number) => void }>();

  const initTextMask = useCallback(() => {
    textMaskInputElement.current = createTextMaskInputElement({
      inputElement: inputRef.current,
      ...props
    });

    textMaskInputElement.current?.update(value);
  }, [props, value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      textMaskInputElement.current?.update();

      onChange?.(event);
    },
    [onChange]
  );

  useEffect(() => {
    initTextMask();
  }, [guide, placeholderChar, showMask, pipe, mask, value, initTextMask]);

  return render(mergeRefs(inputRef, ref), {
    onChange: handleChange,
    defaultValue: value,
    ...omit(rest, ['keepCharPositions'])
  });
});

TextMask.displayName = 'TextMask';
TextMask.propTypes = {
  render: PropTypes.func,
  onChange: PropTypes.func,
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.bool]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool
};

export default TextMask;
