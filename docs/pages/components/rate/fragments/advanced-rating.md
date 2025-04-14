<!--start-code-->

```js
import { Rate, VStack, HStack, Text, Progress } from 'rsuite';

const App = () => {
  const ratingData = {
    average: 4.3,
    total: 2847,
    distribution: [
      { stars: 5, percentage: 58, count: 1651 },
      { stars: 4, percentage: 26, count: 740 },
      { stars: 3, percentage: 9, count: 256 },
      { stars: 2, percentage: 5, count: 142 },
      { stars: 1, percentage: 2, count: 58 }
    ]
  };

  return (
    <VStack spacing={20}>
      <HStack spacing={10} align="center">
        <VStack align="flex-start" w={200}>
          <Text size="xl">{ratingData.average} out of 5</Text>
          <Rate value={ratingData.average} readOnly color="yellow" size="sm" />
          <Text muted mt={5}>
            {ratingData.total} global ratings
          </Text>
        </VStack>

        <VStack spacing={8}>
          {ratingData.distribution.map(item => (
            <HStack key={item.stars} spacing={10} align="center" w={300}>
              <Text>{item.stars} star</Text>
              <Progress.Line
                percent={item.percentage}
                strokeColor="#FFA41C"
                showInfo={false}
                style={{ flex: 1 }}
              />
              <Text w={40}>{item.percentage}%</Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
      <Divider label="Rate this product" labelPosition="left" />
      <Rate defaultValue={0} color="yellow" />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
