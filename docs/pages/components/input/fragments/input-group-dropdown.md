<!--start-code-->

```js
import { InputGroup, Dropdown, Whisper, Popover, Input, VStack } from 'rsuite';

const currencies = [
  { label: 'CNY - Chinese Yuan', value: 'CNY', symbol: '¥', flag: '🇨🇳' },
  { label: 'USD - US Dollar', value: 'USD', symbol: '$', flag: '🇺🇸' },
  { label: 'EUR - Euro', value: 'EUR', symbol: '€', flag: '🇪🇺' },
  { label: 'GBP - British Pound', value: 'GBP', symbol: '£', flag: '🇬🇧' },
  { label: 'JPY - Japanese Yen', value: 'JPY', symbol: '¥', flag: '🇯🇵' }
];

function App() {
  const [currency, setCurrency] = React.useState(currencies[0]);

  const renderMenu = ({ onClose, left, top, className }, ref) => {
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu>
          {currencies.map(currency => (
            <Dropdown.Item
              key={currency.value}
              eventKey={currency.value}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              onSelect={() => {
                setCurrency(currency);
                onClose();
              }}
            >
              <span style={{ marginRight: 8 }}>{currency.flag}</span>
              {currency.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <VStack style={{ width: 300 }}>
      <InputGroup>
        <Whisper placement="bottomStart" trigger="click" speaker={renderMenu}>
          <InputGroup.Button>
            <HStack>
              {currency.value}
              <ArrowDownIcon />
            </HStack>
          </InputGroup.Button>
        </Whisper>
        <Input />
        <InputGroup.Addon>{currency.symbol}</InputGroup.Addon>
      </InputGroup>

      <InputGroup inside>
        <Whisper placement="bottomStart" trigger="click" speaker={renderMenu}>
          <InputGroup.Button>
            <HStack>
              {currency.value}
              <ArrowDownIcon />
            </HStack>
          </InputGroup.Button>
        </Whisper>
        <Input />
        <InputGroup.Addon>{currency.symbol}</InputGroup.Addon>
      </InputGroup>
    </VStack>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
