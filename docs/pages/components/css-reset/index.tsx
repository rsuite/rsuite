import * as React from 'react';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['anchor', 'heading', 'paragraph', 'list-ul', 'list-ol', 'list-dl']}
      dependencies={{}}
    />
  );
}
