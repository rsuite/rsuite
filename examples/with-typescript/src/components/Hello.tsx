import * as React from 'react';
import { Grid, Button } from 'rsuite';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
        <Grid>
          <h1>
            Hello from {this.props.compiler} and {this.props.framework}!
          </h1>
          <Button appearance="default" size="lg">
            React Suite
          </Button>
        </Grid>
    );
  }
}
