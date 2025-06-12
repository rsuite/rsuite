import React from 'react';
import { Divider, Footer, VStack, Button, ButtonGroup, Text, HStack } from 'rsuite';
import { VercelBanner } from '@/components/VercelBanner';
import { Icon } from '@rsuite/icons';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
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

  const socialButtons = [
    {
      href: 'https://github.com/rsuite/rsuite',
      label: 'GitHub',
      icon: <Icon as={FaGithub} />,
      appearance: 'ghost' as const
    },
    {
      href: 'https://twitter.com/reactsuite',
      label: 'Follow on X',
      icon: <Icon as={FaTwitter} />,
      appearance: 'ghost' as const
    },
    {
      href: 'https://discord.gg/R8mnjwh',
      label: 'Join Discord',
      icon: <Icon as={FaDiscord} />,
      appearance: 'primary' as const
    }
  ];
  return (
    <Footer className={styles.footer}>
      <Divider className={styles.divider} />
      <HStack justify="space-between" align="start">
        <VStack spacing={10}>
          <img
            src="/images/react-suite.png"
            alt="React Suite"
            height={60}
            className={styles.logo}
          />
          <Text className={styles.description}>{locales?.common?.bio}</Text>
        </VStack>
        <HStack spacing={32}>
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
        <Text muted>Built with ❤️ by the React Suite team and community contributors</Text>
        <HStack>
          <ButtonGroup>
            {socialButtons.map(button => (
              <Button
                key={button.href}
                appearance={button.appearance}
                as="a"
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={button.icon}
              >
                {button.label}
              </Button>
            ))}
          </ButtonGroup>
          <VercelBanner />
        </HStack>
      </HStack>
    </Footer>
  );
};
