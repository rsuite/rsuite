import React, { useEffect, useState } from 'react';
import MainNav from '@/components/layout/MainNav';
import Head from '@/components/layout/Head';
import PageToolbar from '@/components/layout/PageToolbar';
import { PageFooter } from '@/components/layout/PageFooter';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CodeSection from '@/components/home/CodeSection';
import ThemeSection from '@/components/home/ThemeSection';
import EcosystemSection from '@/components/home/EcosystemSection';
import CTASection from '@/components/home/CTASection';
import { useApp } from '@/hooks/useApp';
import styles from './index.module.scss';

function HomePage() {
  const [running, setRunning] = useState(false);
  const { locales } = useApp();

  useEffect(() => {
    setTimeout(() => {
      setRunning(true);
    }, 1700);
  }, []);

  return (
    <>
      <Head title={locales?.common?.homeTitle} description={locales?.common?.homeDescription}></Head>
      <div className={styles['page-home']}>
        <MainNav hideToggle />
        <PageToolbar />

        {/* Hero Section */}
        <HeroSection locales={locales} running={running} />

        <FeaturesSection />
        <CodeSection />
        <ThemeSection />
        <EcosystemSection />
        <CTASection locales={locales} />
        <PageFooter />
      </div>
    </>
  );
}

export default HomePage;
