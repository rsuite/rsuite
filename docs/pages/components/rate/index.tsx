import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Icon from '@rsuite/icons/Icon';
import { Badge, Button, Toggle, Rate, VStack } from 'rsuite';
import { FaHeart, FaBeer, FaFrown, FaMeh, FaSmile } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Rate']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Badge,
        Button,
        Toggle,
        Rate,
        Icon,
        VStack,
        FaHeart,
        FaBeer,
        FaFrown,
        FaMeh,
        FaSmile
      }}
    />
  );
}
