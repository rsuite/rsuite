import * as React from 'react';
import createPageContainer from '../../../components/createPageContainer';
import Frame from '../../../components/Frame';

const Component = createPageContainer({ routerId: 'guide/introduction' })('zh');

export default function Page() {
  return (
    <Frame>
      <Component />
    </Frame>
  );
}
