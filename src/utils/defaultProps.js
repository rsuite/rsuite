import defaultProps from 'recompose/defaultProps';
import { globalKey } from './prefix';

type Props = {
  classPrefix: string,
  componentClass?: React.ElementType
};

export default (props: Props) => {
  const { classPrefix, ...rest } = props;
  return defaultProps({
    classPrefix: `${globalKey}${classPrefix}`,
    ...rest
  });
};
