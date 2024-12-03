import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, FlexboxGrid, Grid, Row, Col } from 'rsuite';
import TopLevelNav from '@/components/TopLevelNav';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import ReactLogo from '@/components/ReactLogo';
import Head from '@/components/Head';
import PageToolbar from '@/components/PageToolbar';
import { useApp } from '@/components/AppContext';

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
      <Grid className="page-home">
        <TopLevelNav hideToggle />
        <PageToolbar />
        <Row>
          <FlexboxGrid align="middle" className="banner">
            <FlexboxGrid.Item as={Col} colspan={24} md={12}>
              <section className="section">
                <h1 className="title">React Suite</h1>
                <p className="sub-title"> {locales?.common?.resume}</p>
                <p className="home-page-badge-wrap">
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
                <ButtonToolbar className="primary-toolbar">
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
            </FlexboxGrid.Item>

            <FlexboxGrid.Item className="logo-react-suite-wrapper" as={Col} colspan={24} md={12}>
              <div className="section logo-react-suite">
                <Logo width={120} height={138} />
                <ReactLogo running={running} />
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Row>
        <Row>
          <div className="footerbar">
            <a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
              沪 ICP 备 12011101 号 - 10
            </a>
          </div>
        </Row>
      </Grid>
    </>
  );
}

export default HomePage;
