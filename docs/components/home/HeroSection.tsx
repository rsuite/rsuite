import React from 'react';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import ReactLogo from '@/components/ReactLogo';
import { Stack, Button } from 'rsuite';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
  locales: any;
  running: boolean;
}

function HeroSection({ locales, running }: HeroSectionProps) {
  return (
    <section className={styles['hero-section']} id="hero">
      <div className={styles['hero-bg-gradient']}></div>
      <div className={styles['hero-grid-pattern']}></div>
      <div className={styles['hero-container']}>
        <div className={styles['hero-content']}>
          {/* Left: Content */}
          <div className={styles['hero-text']}>
            <div className={styles['hero-badge']}>
              <span className={styles['badge-dot']}></span>
              <span>{locales?.home?.heroBadge}</span>
            </div>
            <h1 className={styles['hero-title']}>
              {locales?.home?.heroTitle1}
              <br />
              <span className={styles['gradient-text']}>{locales?.home?.heroTitle2}</span>
            </h1>
            <p className={styles['hero-subtitle']}>
              {locales?.home?.heroSubtitle}
            </p>
            <Stack spacing={16} className={styles['hero-actions']}>
              <Button size="lg" appearance="primary" as={Link} href="/guide/introduction">
                {locales?.common?.gettingStarted || 'Get Started'}
              </Button>
              <Button size="lg" appearance="ghost" as={Link} href="/components/overview">
                {locales?.common?.components || 'Components'}
              </Button>
            </Stack>
            <div className={styles['hero-badges']}>
              <a href="https://www.npmjs.com/package/rsuite" target="_blank" rel="noopener noreferrer">
                <img alt="npm" src="https://badge.fury.io/js/rsuite.svg" />
              </a>
              <a href="https://gitee.com/rsuite/rsuite" target="_blank" rel="noopener noreferrer">
                <img src="https://gitee.com/rsuite/rsuite/badge/star.svg?theme=gvp" alt="star" />
              </a>
              <a href="https://github.com/rsuite/rsuite" target="_blank" rel="noopener noreferrer">
                <img alt="GitHub stars" src="https://img.shields.io/github/stars/rsuite/rsuite?style=social" />
              </a>
            </div>
          </div>

          {/* Right: Logo Animation */}
          <div className={styles['hero-visual']}>
            <div className={styles['logo-container']}>
              <Logo width={120} height={138} className={styles['rsuite-logo']} />
              <ReactLogo running={running} className={styles['react-logo']} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
