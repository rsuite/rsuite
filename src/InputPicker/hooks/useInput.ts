import { useRef, useCallback, useMemo } from 'react';
import useMaxWidth from './useMaxWidth';
import type { OverlayTriggerHandle } from '@/internals/Picker/PickerToggleTrigger';
import InputAutosize from '../InputAutosize';

interface InputProps {
  multi?: boolean;
  triggerRef: React.RefObject<OverlayTriggerHandle>;
}
const INPUT_MARGIN_RIGHT = 60;
function useInput(props: InputProps) {
  const { multi, triggerRef } = props;
  const inputRef = useRef<any>();
  const maxWidth = useMaxWidth(triggerRef);

  const getInput = useCallback(() => {
    return multi ? inputRef.current?.input : inputRef.current;
  }, [multi]);

  const focus = useCallback(() => {
    getInput()?.focus();
  }, [getInput]);

  const blur = useCallback(() => {
    getInput()?.blur();
  }, [getInput]);

  const inputProps = useMemo(() => {
    return multi
      ? { inputStyle: { maxWidth: maxWidth - INPUT_MARGIN_RIGHT }, as: InputAutosize }
      : { as: 'input' };
  }, [maxWidth, multi]);

  return {
    inputProps,
    inputRef,
    focus,
    blur
  };
}

export default useInput;
