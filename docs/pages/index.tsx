import React from 'react';
import { Button, ButtonToolbar, FlexboxGrid, Grid, Row, Col } from 'rsuite';
import Link from 'next/link';
import TopLevelNav from '../components/TopLevelNav';
import LanguageButton from '../components/LanguageButton';
import Logo from '../components/Logo';
import ReactLogo from '../components/ReactLogo';
import { ThemeContext } from '../components/Context';

function HomePage() {
  const [running, setRuning] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setRuning(true);
    }, 1700);
  }, []);

  return (
    <ThemeContext.Consumer>
      {({ messages }) => {
        const messagesPath = messages?.id === 'en-US' ? '/en/' : '/';
        return (
          <Grid className="page-home">
            <TopLevelNav hideToggle />
            <span className="language-switch-button-wrapper">
              <LanguageButton
                size="lg"
                language={messages?.id}
                href={messagesPath}
                className="home-page"
              />
            </span>

            <Row>
              <FlexboxGrid align="middle" className="banner">
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={12}>
                  <section className="section">
                    <h1 className="title">React Suite</h1>
                    <p className="sub-title"> {messages?.common?.resume}</p>
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
                    <ButtonToolbar>
                      <Button
                        size="lg"
                        appearance="primary"
                        componentClass={Link}
                        href={`${messagesPath}guide/introduction`}
                      >
                        {messages?.common?.gettingStarted}
                      </Button>
                    </ButtonToolbar>
                  </section>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item
                  className="logo-react-suite-wrapper"
                  componentClass={Col}
                  colspan={24}
                  md={12}
                >
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
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default HomePage;
