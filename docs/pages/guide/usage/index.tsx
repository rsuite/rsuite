import React from 'react';
import Page from '@/components/layout/Page';
import Link from 'next/link';
import InstallGuide from '@/components/InstallGuide';
import { Stack, Panel } from 'rsuite';
import { SiNextdotjs, SiCreatereactapp } from 'react-icons/si';
import { Vite } from '@/components/icons';
import styles from './index.module.scss';

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
    <Stack spacing={16} className={styles['framework-guide']} wrap>
      {frameworks.map((fw, index) => {
        const Icon = fw.icon;
        return (
          <Link key={index} href={fw.link}>
            <Panel key={index} bordered className={styles['fw-item']} bodyFill>
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
