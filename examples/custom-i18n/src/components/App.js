import React from 'react';
import { Button, SelectPicker } from 'rsuite';
import { FormattedMessage } from 'react-intl';

const data = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="hello" />
        </h1>

        <SelectPicker data={data} />
      </div>
    );
  }
}

export default App;
