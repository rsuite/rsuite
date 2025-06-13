import React from 'react';
import { Grid, GridProps } from 'rsuite';
import styles from './layout.module.scss';


export const AppContainer = ({ children, ...rest }: GridProps) => {
  return (
    <Grid fluid className={styles['app-container']} {...rest}>
      {children}
    </Grid>
  );
};
