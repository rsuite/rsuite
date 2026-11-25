import { DateRangePicker, Heading, Box } from 'rsuite';

const CustomDateRangePicker = () => {
  return (
    <Box mt={10}>
      <Heading level={3}>Custom DateRangePicker</Heading>
      <DateRangePicker mt={10} placement="auto" />
    </Box>
  );
};

export default CustomDateRangePicker;
