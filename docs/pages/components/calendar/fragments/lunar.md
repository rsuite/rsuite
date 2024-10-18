<!--start-code-->

```js
import { Calendar, Text, Badge, HStack, VStack } from 'rsuite';
import { HolidayUtil, Lunar, Solar } from 'lunar-typescript';

function renderCell(date) {
  const lunar = Lunar.fromDate(date);
  const jieqi = lunar.getJieQi();
  const day = lunar.getDayInChinese();

  return (
    <div style={{ position: 'relative' }}>
      <Text as="span" muted size="sm">
        {jieqi || day}
      </Text>
      <HolidayStatus date={date} />
    </div>
  );
}

const App = () => {
  const [date, setDate] = React.useState(new Date());
  const lunar = Lunar.fromDate(date);
  const solar = Solar.fromDate(date);
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());

  return (
    <HStack divider={<Divider vertical style={{ height: 400 }} />} spacing={10} wrap>
      <Calendar
        compact
        bordered
        renderCell={renderCell}
        style={{ width: 320 }}
        onChange={setDate}
      />
      <DayView date={date} />
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

function DayView({ date }) {
  const lunar = Lunar.fromDate(date);
  const solar = Solar.fromDate(date);
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());

  return (
    <VStack spacing={10}>
      <HStack>
        <Text size="xl">{lunar.toString()}</Text>
        <Text as="span">{holiday?.getName()}</Text>
      </HStack>
      <Text>
        {lunar.getYearInGanZhi()}({lunar.getYearShengXiao()})年
      </Text>
      <Text>{solar.getXingZuo()}座</Text>

      <HStack>
        <Tag as="span" color="green">
          宜
        </Tag>
        <HStack wrap style={{ maxWidth: 300 }}>
          {lunar.getDayYi()?.map(t => (
            <Text key={t}>{t}</Text>
          ))}
        </HStack>
      </HStack>
      <HStack>
        <Tag as="span" color="red">
          忌
        </Tag>
        <HStack wrap style={{ maxWidth: 300 }}>
          {lunar.getDayJi()?.map(t => (
            <Text key={t}>{t}</Text>
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
}

const HolidayStatus = ({ date }) => {
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const styles = {
    position: 'absolute',
    right: -6,
    top: -26,
    transform: 'scale(0.8)',
    padding: '0 2px'
  };
  const work = holiday?.isWork();
  return holiday ? (
    <Badge content={work ? '班' : '休'} color={work ? 'orange' : 'blue'} style={styles} />
  ) : null;
};
```

<!--end-code-->
