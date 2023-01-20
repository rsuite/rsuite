import React from 'react';
import { expectType } from 'ts-expect';
import Whisper, { WhisperInstance } from '../Whisper';

const whisperRef = React.createRef<WhisperInstance>();

<Whisper ref={whisperRef} speaker={<div></div>}>
  <div></div>
</Whisper>;

whisperRef.current?.open();
whisperRef.current?.open(300);

whisperRef.current?.close();
whisperRef.current?.close(300);

whisperRef.current?.updatePosition();

// speaker function types
<Whisper
  speaker={(props, ref) => {
    expectType<number | undefined>(props.arrowOffsetLeft);
    expectType<number | undefined>(props.arrowOffsetLeft);
    expectType<((...args: any[]) => any) | undefined>(props.onMouseEnter);
    expectType<((...args: any[]) => any) | undefined>(props.onMouseLeave);
    expectType<(...args: any[]) => any>(props.onClose);

    return <div ref={ref} {...props}></div>;
  }}
>
  <div></div>
</Whisper>;

// @ts-expect-error should not accept children of type string
<Whisper speaker={<div></div>}>button</Whisper>;
