import React from 'react';
import dynamic from 'next/dynamic';
import { Grid, Row, Col } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import { useApp } from '@/hooks/useApp';
import styles from './CodeSection.module.scss';

const Simulation = dynamic(() => import('@/components/Simulation'), { ssr: false });

function CodeSection() {
  const { locales } = useApp();

  return (
    <section className={styles['code-section']} id="code">
      <Grid fluid>
        <Row gutter={40} align="top">
          <Col span={{ xs: 24, lg: 10 }}>
            <div className={styles['section-badge']}>{locales?.home?.codeBadge}</div>
            <h2 className={styles['section-title']}>{locales?.home?.codeTitle}</h2>
            <p className={styles['section-description']}>
              {locales?.home?.codeSubtitle}
            </p>
            <div className={styles['feature-list']}>
              <div className={styles['feature-item']}>
                <CheckIcon className={styles['check-icon']} />
                <div>
                  <strong>{locales?.home?.codeMobileFirst}</strong>
                  <p>{locales?.home?.codeMobileFirstDesc}</p>
                </div>
              </div>
              <div className={styles['feature-item']}>
                <CheckIcon className={styles['check-icon']} />
                <div>
                  <strong>{locales?.home?.codeFlexibleGrid}</strong>
                  <p>{locales?.home?.codeFlexibleGridDesc}</p>
                </div>
              </div>
              <div className={styles['feature-item']}>
                <CheckIcon className={styles['check-icon']} />
                <div>
                  <strong>{locales?.home?.codeAdaptiveComponents}</strong>
                  <p>{locales?.home?.codeAdaptiveComponentsDesc}</p>
                </div>
              </div>
              <div className={styles['feature-item']}>
                <CheckIcon className={styles['check-icon']} />
                <div>
                  <strong>{locales?.home?.codeDevicePreview}</strong>
                  <p>{locales?.home?.codeDevicePreviewDesc}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={{ xs: 24, lg: 14 }}>
            <div className={styles['simulation-wrapper']}>
              <Simulation componentName="frame" example="horizontal" defaultDevice="desktop" />
            </div>
          </Col>
        </Row>
      </Grid>
    </section>
  );
}

export default CodeSection;
