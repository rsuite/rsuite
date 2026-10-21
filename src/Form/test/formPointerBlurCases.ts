export interface PointerBlurCase {
  name: string;
  shift: boolean;
  gesture: 'click' | 'outside' | 'back' | 'keyboard';
  nativeSubmits: number;
  disableOnBlur?: boolean;
  removeOnBlur?: boolean;
  prevent?: boolean;
  foreignCapture?: boolean;
  external?: boolean;
  portal?: boolean;
  customRoot?: boolean;
  reentrant?: boolean;
  number?: boolean;
  callback?: 'check-disable' | 'check-remove' | 'error-disable' | 'error-remove';
  action?:
    | 'cleanErrors'
    | 'resetErrors'
    | 'cleanErrorForField'
    | 'reset'
    | 'unmount-field'
    | 'unmount-form'
    | 'value'
    | 'trigger'
    | 'supersede';
}

export const pointerBlurCases: PointerBlurCase[] = [
  {
    name: 'number blur retains invalidity',
    number: true,
    shift: true,
    gesture: 'outside',
    nativeSubmits: 0
  },
  {
    name: 'number blur accepts normalized value',
    number: true,
    shift: false,
    gesture: 'outside',
    nativeSubmits: 0
  },
  {
    name: 'callback unmounts another pending form',
    reentrant: true,
    shift: true,
    gesture: 'click',
    nativeSubmits: 1
  },
  { name: 'stationary invalid input', shift: true, gesture: 'click', nativeSubmits: 1 },
  { name: 'stationary valid input', shift: false, gesture: 'click', nativeSubmits: 1 },
  { name: 'drag outside invalid input', shift: true, gesture: 'outside', nativeSubmits: 0 },
  { name: 'drag outside valid input', shift: false, gesture: 'outside', nativeSubmits: 0 },
  { name: 'drag outside and back', shift: false, gesture: 'back', nativeSubmits: 1 },
  { name: 'keyboard activation', shift: true, gesture: 'keyboard', nativeSubmits: 1 },
  { name: 'disable on blur', shift: true, gesture: 'click', nativeSubmits: 0, disableOnBlur: true },
  { name: 'remove on blur', shift: true, gesture: 'click', nativeSubmits: 0, removeOnBlur: true },
  { name: 'prevent click', shift: true, gesture: 'click', nativeSubmits: 0, prevent: true },
  ...[true, false].map(shift => ({
    name: `application pointer capture (${shift})`,
    shift,
    gesture: 'click' as const,
    nativeSubmits: 0,
    foreignCapture: true
  })),
  ...(['check-disable', 'check-remove', 'error-disable', 'error-remove'] as const).map(
    callback => ({
      name: callback,
      shift: true,
      gesture: 'click' as const,
      nativeSubmits: 0,
      callback
    })
  ),
  ...(
    [
      'cleanErrors',
      'resetErrors',
      'cleanErrorForField',
      'reset',
      'unmount-field',
      'unmount-form',
      'value',
      'trigger',
      'supersede'
    ] as const
  ).map(action => ({
    name:
      action === 'value'
        ? 'validate the latest value after blur'
        : `cancel pending blur through ${action}`,
    shift: true,
    gesture: 'outside' as const,
    nativeSubmits: 0,
    action
  })),
  { name: 'external submitter', external: true, shift: true, gesture: 'click', nativeSubmits: 1 },
  { name: 'custom form root', customRoot: true, shift: true, gesture: 'click', nativeSubmits: 1 },
  { name: 'iframe form', portal: true, shift: true, gesture: 'click', nativeSubmits: 1 },
  {
    name: 'iframe cancellation',
    portal: true,
    callback: 'check-remove',
    shift: true,
    gesture: 'click',
    nativeSubmits: 0
  },
  {
    name: 'iframe unmount',
    portal: true,
    action: 'unmount-form',
    shift: true,
    gesture: 'outside',
    nativeSubmits: 0
  }
];
