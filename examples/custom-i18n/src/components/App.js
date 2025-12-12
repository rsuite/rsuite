import React, { useState } from 'react';
import {
  SelectPicker,
  DatePicker,
  Calendar,
  Stack,
  Button,
  Message,
  toaster,
  Divider,
  Text,
  Panel
} from 'rsuite';
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';

const selectData = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' }
];

function App() {
  const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState(null);

  const showNotification = () => {
    toaster.push(
      <Message showIcon type="success">
        <FormattedMessage id="notification.success" />
      </Message>,
      { placement: 'topEnd' }
    );
  };

  return (
    <Stack direction="column" spacing={24}>
      {/* Welcome Message */}
      <Panel bordered>
        <Stack direction="column" spacing={12}>
          <Text size="xl" weight="bold">
            <FormattedMessage id="hello" />
          </Text>
          <Text muted>
            <FormattedMessage id="description" />
          </Text>
        </Stack>
      </Panel>

      {/* Date & Number Formatting */}
      <Panel bordered>
        <Stack direction="column" spacing={12}>
          <Text weight="semibold">
            <FormattedMessage id="dateTime" />:
          </Text>
          <Text>
            <FormattedDate
              value={date}
              year="numeric"
              month="long"
              day="2-digit"
              weekday="long"
            />
          </Text>
          <Text muted>
            <FormattedMessage id="number" />:{' '}
            <FormattedNumber value={123456.789} style="currency" currency="USD" />
          </Text>
        </Stack>
      </Panel>

      <Divider />

      {/* Select Picker */}
      <Stack direction="column" spacing={8}>
        <Text weight="semibold">
          <FormattedMessage id="selectPicker" />:
        </Text>
        <SelectPicker
          data={selectData}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Select an option"
          style={{ width: 300 }}
        />
      </Stack>

      {/* Date Picker */}
      <Stack direction="column" spacing={8}>
        <Text weight="semibold">
          <FormattedMessage id="datePicker" />:
        </Text>
        <DatePicker
          value={date}
          onChange={setDate}
          oneTap
          style={{ width: 300 }}
        />
      </Stack>

      {/* Calendar */}
      <Stack direction="column" spacing={8}>
        <Text weight="semibold">
          <FormattedMessage id="calendar" />:
        </Text>
        <Calendar bordered value={date} onChange={setDate} />
      </Stack>

      {/* Button */}
      <Button appearance="primary" onClick={showNotification}>
        <FormattedMessage id="showNotification" />
      </Button>
    </Stack>
  );
}

export default App;
