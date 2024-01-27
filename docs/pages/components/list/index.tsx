import React from 'react';
import { List, Tag, Button, FlexboxGrid, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['List']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Panel, List, Tag, Button, FlexboxGrid, UserCircleIcon, ImageIcon, FilmIcon }}
    />
  );
}
