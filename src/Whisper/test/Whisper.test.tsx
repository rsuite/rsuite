import React from 'react';
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
