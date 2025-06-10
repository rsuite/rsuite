import React from 'react';
import { Grid, GridProps } from 'rsuite';
import styles from './layout.module.scss';


export const Container = ({ children, ...rest }: GridProps) => {
  return (
    <Grid fluid className={styles['app-container']} {...rest}>
      {children}
    </Grid>
  );
};
