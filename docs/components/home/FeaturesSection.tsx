import React from 'react';
import Link from '@/components/Link';
import { Grid } from 'rsuite';
import { RiLayoutGridFill } from 'react-icons/ri';
import { IoColorPalette, IoEarthSharp } from 'react-icons/io5';
import { MdAccessibility } from 'react-icons/md';
import { useApp } from '@/hooks/useApp';
import styles from './FeaturesSection.module.scss';

function FeaturesSection() {
  const { locales } = useApp();

  return (
    <section className={styles['features-section']} id="features">
      <Grid fluid>
        <div className={styles['section-header']}>
          <div className={styles['section-badge']}>{locales?.home?.featuresBadge}</div>
          <h2 className={styles['section-title']}>{locales?.home?.featuresTitle}</h2>
          <p className={styles['section-subtitle']}>
            {locales?.home?.featuresSubtitle}
          </p>
        </div>
        <div className={styles['features-grid']}>
          <div className={styles['feature-card']}>
            <RiLayoutGridFill className={styles['feature-icon']} />
            <div className={styles['feature-number']}>01</div>
            <h3>{locales?.home?.feature1Title}</h3>
            <p>{locales?.home?.feature1Desc}</p>
            <Link href="/components/overview" className={styles['feature-link']}>
              {locales?.home?.feature1Link} →
            </Link>
          </div>
          <div className={styles['feature-card']}>
            <IoColorPalette className={styles['feature-icon']} />
            <div className={styles['feature-number']}>02</div>
            <h3>{locales?.home?.feature2Title}</h3>
            <p>{locales?.home?.feature2Desc}</p>
            <Link href="/guide/css-variables" className={styles['feature-link']}>
              {locales?.home?.feature2Link} →
            </Link>
          </div>
          <div className={styles['feature-card']}>
            <IoEarthSharp className={styles['feature-icon']} />
            <div className={styles['feature-number']}>03</div>
            <h3>{locales?.home?.feature3Title}</h3>
            <p>{locales?.home?.feature3Desc}</p>
            <Link href="/guide/intl" className={styles['feature-link']}>
              {locales?.home?.feature3Link} →
            </Link>
          </div>
          <div className={styles['feature-card']}>
            <MdAccessibility className={styles['feature-icon']} />
            <div className={styles['feature-number']}>04</div>
            <h3>{locales?.home?.feature4Title}</h3>
            <p>{locales?.home?.feature4Desc}</p>
            <Link href="/guide/accessibility" className={styles['feature-link']}>
              {locales?.home?.feature4Link} →
            </Link>
          </div>
        </div>
      </Grid>
    </section>
  );
}

export default FeaturesSection;
