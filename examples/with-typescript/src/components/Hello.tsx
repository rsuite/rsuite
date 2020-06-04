import * as React from 'react';
import { Grid, IntlProvider, Button } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <IntlProvider locale={zhCN}>
        <Grid>
          <h1>
            Hello from {this.props.compiler} and {this.props.framework}!
          </h1>
          <Button appearance="default" size="lg">
            React Suite
          </Button>
        </Grid>
      </IntlProvider>
    );
  }
}
