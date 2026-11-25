import React from 'react';
import { umiLogo, rsuiteLogo } from '../assets/logos';
import styles from './Logos.module.css';

const Logos = () => {
  return (
    <>
      <img className={styles.umiLogo} src={umiLogo} alt="Umi Logo" />
      <img className={styles.rsuiteLogo} src={rsuiteLogo} alt="React Suite Logo" />
    </>
  );
};

export default Logos;
