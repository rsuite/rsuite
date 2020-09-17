import Whisper from './Whisper';
import { WhisperProps } from './Whisper.d';
import withLocale from '../IntlProvider/withLocale';

export default withLocale<WhisperProps>([])(Whisper);
