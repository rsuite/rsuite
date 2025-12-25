import React from 'react';
import Link from '@/components/Link';
import { Grid } from 'rsuite';
import { IoRocketOutline, IoColorPaletteOutline, IoExtensionPuzzleOutline } from 'react-icons/io5';
import { useApp } from '@/hooks/useApp';
import styles from './EcosystemSection.module.scss';

function EcosystemSection() {
  const { locales } = useApp();

  return (
    <section className={styles['ecosystem-section']} id="ecosystem">
      <Grid fluid>
        <div className={styles['section-header']}>
          <div className={styles['section-badge']}>{locales?.home?.ecosystemBadge}</div>
          <h2 className={styles['section-title']}>{locales?.home?.ecosystemTitle}</h2>
          <p className={styles['section-subtitle']}>
            {locales?.home?.ecosystemSubtitle}
          </p>
        </div>

        <div className={styles['ecosystem-grid']}>
          <div className={styles['ecosystem-card']}>
            <div className={styles['icon-wrapper']}>
              <IoRocketOutline className={styles['ecosystem-icon']} />
            </div>
            <div className={styles['card-content']}>
              <h3>{locales?.home?.ecosystemQuickStart}</h3>
              <p>{locales?.home?.ecosystemQuickStartDesc}</p>
            </div>
            <Link href="/guide/usage" className={styles['ecosystem-link']}>
              {locales?.home?.ecosystemQuickStartLink} →
            </Link>
          </div>

          <div className={styles['ecosystem-card']}>
            <div className={styles['icon-wrapper']}>
              <IoColorPaletteOutline className={styles['ecosystem-icon']} />
            </div>
            <div className={styles['card-content']}>
              <h3>{locales?.home?.ecosystemDesignResources}</h3>
              <p>{locales?.home?.ecosystemDesignResourcesDesc}</p>
            </div>
            <Link href="/resources/design" className={styles['ecosystem-link']}>
              {locales?.home?.ecosystemDesignResourcesLink} →
            </Link>
          </div>

          <div className={styles['ecosystem-card']}>
            <div className={styles['icon-wrapper']}>
              <IoExtensionPuzzleOutline className={styles['ecosystem-icon']} />
            </div>
            <div className={styles['card-content']}>
              <h3>{locales?.home?.ecosystemMcpServer}</h3>
              <p>{locales?.home?.ecosystemMcpServerDesc}</p>
            </div>
            <Link href="/guide/mcp-server" className={styles['ecosystem-link']}>
              {locales?.home?.ecosystemMcpServerLink} →
            </Link>
          </div>
        </div>
      </Grid>
    </section>
  );
}

export default EcosystemSection;
