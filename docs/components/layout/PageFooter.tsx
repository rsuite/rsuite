import React from 'react';
import { Divider, Footer, VStack, Text, HStack } from 'rsuite';
import { VercelBanner } from '@/components/VercelBanner';
import { useApp } from '@/hooks/useApp';
import styles from './layout.module.scss';

interface LinkItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface LinkGroup {
  title: string;
  links: LinkItem[];
}

export const PageFooter = () => {
  const { locales } = useApp();

  const linkGroups: LinkGroup[] = [
    {
      title: locales?.common?.about,
      links: [
        {
          href: 'https://opencollective.com/rsuite',
          label: 'OpenCollective'
        },
        {
          href: 'https://github.com/rsuite/rsuite/graphs/contributors',
          label: 'Contributors'
        },
        {
          href: 'https://deepwiki.com/rsuite/rsuite',
          label: 'DeepWiki'
        },
        {
          href: 'https://github.com/rsuite/rsuite/releases',
          label: 'Releases'
        }
      ]
    },
    {
      title: locales?.common?.community,
      links: [
        {
          href: 'https://github.com/rsuite/rsuite',
          label: 'GitHub'
        },
        {
          href: 'https://x.com/reactsuite',
          label: 'Twitter'
        },
        {
          href: 'https://discord.gg/R8mnjwh',
          label: 'Discord'
        },
        {
          href: 'https://medium.com/rsuite',
          label: 'Medium'
        }
      ]
    },
    {
      title: locales?.common?.help,
      links: [
        {
          href: 'https://github.com/rsuite/rsuite/issues?q=is%3Aissue%20label%3AFAQ',
          label: 'FAQ'
        },
        {
          href: 'https://github.com/rsuite/rsuite/issues/new?template=bug-report.yml',
          label: 'Report bug'
        },
        {
          href: 'https://github.com/rsuite/rsuite/issues/new?template=2.feature_request.md',
          label: 'Request feature'
        },
        {
          href: 'https://github.com/rsuite/rsuite/discussions',
          label: 'Discussions'
        }
      ]
    }
  ];

  return (
    <Footer className={styles.footer}>
      <Divider className={styles.divider} />
      <HStack justify="space-between" align="start" wrap spacing={32}>
        <VStack spacing={10}>
          <div className={styles['logo']}>
            <img src="/images/react-suite.png" alt="React Suite" height={60} />
          </div>
          <Text className={styles.description}>{locales?.common?.bio}</Text>
        </VStack>
        <HStack spacing={60} wrap>
          {linkGroups.map(group => (
            <VStack spacing={8} key={group.title}>
              <h4 className={styles['section-title']}>{group.title}</h4>
              <VStack>
                {group.links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {link.label}
                  </a>
                ))}
              </VStack>
            </VStack>
          ))}
        </HStack>
      </HStack>
      <Divider className={styles.divider} />

      <HStack justify="space-between" wrap spacing={16}>
        <Text muted>{locales?.home?.ctaFooter}</Text>
        <HStack>
          <VercelBanner />
        </HStack>
      </HStack>
    </Footer>
  );
};
