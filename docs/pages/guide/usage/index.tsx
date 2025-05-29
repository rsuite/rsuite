import React from 'react';
import Page from '@/components/layout/Page';
import Link from 'next/link';
import { Stack, Panel } from 'rsuite';
import { SiNextdotjs, SiCreatereactapp } from 'react-icons/si';
import { Vite } from '@/components/icons';
import InstallGuide from '@/components/InstallGuide';

const frameworks = [
  {
    name: 'Next.js(App)',
    icon: SiNextdotjs,
    link: '/guide/use-next-app/',
    color: '#000'
  },

  {
    name: 'Next.js(Pages)',
    icon: SiNextdotjs,
    link: '/guide/use-next-pages/',
    color: '#000'
  },
  {
    name: 'Vite',
    icon: Vite,
    link: '/guide/use-vite/'
  },
  {
    name: 'Create React App',
    icon: SiCreatereactapp,
    link: '/guide/use-with-create-react-app/',
    color: '#09d3ac'
  }
];

function FrameworkGuide() {
  return (
    <Stack spacing={16} className="framework-guide" wrap>
      {frameworks.map((fw, index) => {
        const Icon = fw.icon;
        return (
          <Link key={index} href={fw.link}>
            <Panel key={index} bordered className="fw-item" bodyFill>
              <Icon style={{ color: fw.color }} />
              <div>{fw.name}</div>
            </Panel>
          </Link>
        );
      })}
    </Stack>
  );
}

const inDocsComponents = {
  'install-guide': () => <InstallGuide />,
  'framework-guide': () => <FrameworkGuide />
};

export default function Index() {
  return <Page inDocsComponents={inDocsComponents} />;
}
