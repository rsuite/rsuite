import React, { useEffect, useState } from 'react';
import MainNav from '@/components/layout/MainNav';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import ReactLogo from '@/components/ReactLogo';
import Head from '@/components/layout/Head';
import PageToolbar from '@/components/layout/PageToolbar';
import classNames from 'classnames';
import { Button, ButtonToolbar, Grid, Row, Col } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import styles from './index.module.scss';

function HomePage() {
  const [running, setRuning] = useState(false);
  const { locales } = useApp();

  useEffect(() => {
    setTimeout(() => {
      setRuning(true);
    }, 1700);
  }, []);

  return (
    <>
      <Head title={locales?.common?.home} description={locales?.common?.resume}></Head>
      <Grid className={styles['page-home']}>
        <MainNav hideToggle />
        <PageToolbar />
        <Row className={styles['banner']} align="middle">
          <Col span={{ xs: 24, md: 12 }}>
            <section className={styles['section']}>
              <h1 className={styles['title']}>React Suite</h1>
              <p className={styles['sub-title']}> {locales?.common?.resume}</p>
              <p className={styles['home-page-badge-wrap']}>
                <a
                  href="https://www.npmjs.com/package/rsuite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="npm" src="https://badge.fury.io/js/rsuite.svg" />
                </a>
                <a
                  style={{ marginLeft: 10 }}
                  href="https://gitee.com/rsuite/rsuite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://gitee.com/rsuite/rsuite/badge/star.svg?theme=gvp"
                    alt="star"
                  ></img>
                </a>

                <a
                  style={{ marginLeft: 10 }}
                  href="https://github.com/rsuite/rsuite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="GitHub stars"
                    src="https://img.shields.io/github/stars/rsuite/rsuite?style=social"
                  />
                </a>
              </p>
              <ButtonToolbar className={styles['primary-toolbar']}>
                <Button size="lg" appearance="primary" as={Link} href={'/guide/introduction'}>
                  {locales?.common?.gettingStarted}
                </Button>
                <Button
                  size="lg"
                  appearance="ghost"
                  as={Link}
                  style={{ marginLeft: 10 }}
                  href={'/components/overview'}
                >
                  {locales?.common?.components}
                </Button>
              </ButtonToolbar>
            </section>
          </Col>

          <Col className={styles['logo-react-suite-wrapper']} span={{ xs: 24, md: 12 }}>
            <div className={classNames(styles['section'], styles['logo-react-suite'])}>
              <Logo width={120} height={138} className={styles['rsuite-logo']} />
              <ReactLogo running={running} className={styles['react-logo']} />
            </div>
          </Col>
        </Row>
      </Grid>
    </>
  );
}

export default HomePage;
