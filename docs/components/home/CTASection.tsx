import React from 'react';
import Link from '@/components/Link';
import { Stack, Button } from 'rsuite';
import GithubIcon from '@rsuite/icons/legacy/Github';
import styles from './CTASection.module.scss';

interface CTASectionProps {
  locales: any;
}

function CTASection({ locales }: CTASectionProps) {
  return (
    <section className={styles['cta-section']} id="cta">
      <div className={styles['cta-bg-gradient']}></div>
      <div className={styles['cta-content']}>
        <div className={styles['cta-text']}>
          <div className={styles['section-badge']}>{locales?.home?.ctaBadge}</div>
          <h2 className={styles['section-title']}>{locales?.home?.ctaTitle}</h2>
          <p className={styles['section-description']}>
            {locales?.home?.ctaSubtitle}
          </p>
          <Stack spacing={20} justifyContent="center" className={styles['cta-actions']}>
            <Button
              size="lg"
              appearance="primary"
              as={Link}
              href="/guide/introduction"
              className={styles['cta-btn-primary']}
            >
              {locales?.common?.gettingStarted || 'Get Started'}
            </Button>
            <Button
              size="lg"
              as="a"
              href="https://github.com/rsuite/rsuite"
              target="_blank"
              className={styles['cta-btn-secondary']}
            >
              <GithubIcon style={{ marginRight: 8 }} />
              {locales?.home?.ctaGithub}
            </Button>
          </Stack>
          <div className={styles['cta-badges']}>
            <a href="https://www.npmjs.com/package/rsuite" target="_blank" rel="noopener noreferrer">
              <img alt="npm package version" src="https://badge.fury.io/js/rsuite.svg" />
            </a>
            <a href="https://github.com/rsuite/rsuite" target="_blank" rel="noopener noreferrer">
              <img alt="GitHub stars" src="https://img.shields.io/github/stars/rsuite/rsuite?style=social" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
