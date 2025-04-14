import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Icon from '@rsuite/icons/Icon';
import { Badge, Button, Toggle, Rate, VStack, HStack, Text, Progress, Divider } from 'rsuite';
import { FaHeart, FaCoffee, FaFrown, FaMeh, FaSmile } from 'react-icons/fa';

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
        Progress,
        Divider,
        VStack,
        HStack,
        Text,
        FaCoffee,
        FaHeart,
        FaFrown,
        FaMeh,
        FaSmile
      }}
    />
  );
}
