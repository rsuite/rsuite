import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Icon from '@rsuite/icons/Icon';
import { Timeline, Grid, Row, Col, Text } from 'rsuite';
import { FaPlane, FaTruck, FaUser, FaCheck, FaCreditCard } from 'react-icons/fa';


const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Timeline']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Timeline,
        Text,
        Grid,
        Row,
        Col,
        Icon,
        FaCreditCard,
        FaPlane,
        FaTruck,
        FaUser,
        FaCheck
      }}
    />
  );
}
