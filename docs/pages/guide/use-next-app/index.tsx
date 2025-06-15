import React from 'react';
import Page from '@/components/layout/Page';
import InstallGuide from '@/components/InstallGuide';

const inDocsComponents = {
  'install-guide': () => <InstallGuide />
};

const PageComponent = () => {
  return <Page inDocsComponents={inDocsComponents} />;
};

PageComponent.displayName = 'NextAppGuidePage';

export default PageComponent;
