<!--start-code-->

```js
import { List } from 'rsuite';

const defaultData = [
  { text: 'Apple iPhone 15', collection: 0, price: 999, status: 'In Stock' },
  { text: 'Samsung Galaxy S23', collection: 0, price: 849, status: 'Out of Stock' },
  { text: 'Google Pixel 8', collection: 0, price: 799, status: 'In Stock' },
  { text: 'Sony WH-1000XM5 Headphones', collection: 1, price: 350, status: 'In Stock' },
  { text: 'Bose QuietComfort 45', collection: 1, price: 329, status: 'In Stock' },
  { text: 'Beats Studio 3 Wireless Headphones', collection: 1, price: 299, status: 'Out of Stock' },
  { text: 'Dell XPS 13 Laptop', collection: 2, price: 1200, status: 'In Stock' },
  { text: 'MacBook Pro 16-inch', collection: 2, price: 2400, status: 'Out of Stock' },
  { text: 'HP Spectre x360', collection: 2, price: 1500, status: 'In Stock' },
  { text: 'Oculus Quest 2', collection: 3, price: 299, status: 'In Stock', disabled: true },
  { text: 'PlayStation VR', collection: 3, price: 399, status: 'Out of Stock' }
];

const colors = [
  '#f0f8ff', // Light Blue for Phones
  '#f5f5dc', // Light Beige for Headphones
  '#fff0f5', // Lavender for Laptops
  '#ffebcd' // Blanched Almond for VR
];

const App = () => {
  const [data, setData] = React.useState(defaultData);

  const handleSortEnd = ({ oldIndex, newIndex }) =>
    setData(prvData => {
      const moveData = prvData.splice(oldIndex, 1);
      const newData = [...prvData];
      newData.splice(newIndex, 0, moveData[0]);
      return newData;
    });

  // Function to assign a background color based on collection
  const getCollectionStyle = collection => {
    return { backgroundColor: colors[collection], color: 'black' };
  };

  return (
    <List sortable bordered onSort={handleSortEnd}>
      {data.map(({ text, collection, disabled, status, price }, index) => (
        <List.Item
          key={text}
          index={index}
          disabled={disabled}
          collection={collection}
          style={getCollectionStyle(collection)}
        >
          {text} - ${price} - Status: {status}
        </List.Item>
      ))}
    </List>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
