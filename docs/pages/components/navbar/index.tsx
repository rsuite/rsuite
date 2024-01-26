import React from 'react';
import { Navbar, Nav, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Navbar', 'Nav']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Navbar, Nav, Button, HomeIcon, CogIcon }}
    />
  );
}
