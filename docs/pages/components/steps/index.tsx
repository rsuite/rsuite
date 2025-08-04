import React from 'react';
import { Steps, ButtonGroup,  Button, Panel,Tag,Box, Placeholder } from 'rsuite';
import { FaShoppingCart, FaTruck, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Steps']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Steps,
        ButtonGroup,
        Button,
        Panel,
        Tag,
        Box,
        Placeholder,
        FaShoppingCart,
        FaTruck,
        FaCheckCircle,
        FaBoxOpen
      }}
    />
  );
}
