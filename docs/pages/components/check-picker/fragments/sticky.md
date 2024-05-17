<!--start-code-->

```js
import { CheckPicker } from 'rsuite';
import { mockUsers } from './mock';

/**
 *  Data structure:
 *  [
 *    { firstLetter: 'A', name: 'Alan', firstName: 'Alan' },
 *    { firstLetter: 'B', name: 'Benson', firstName: 'Benson' },
 *  ]
 */
const data = mockUsers(100)
  .map(item => {
    const firstLetter = item.firstName[0].toUpperCase();
    return { firstLetter, ...item };
  })
  .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));

const App = () => (
  <>
    <CheckPicker sticky data={data} labelKey="firstName" valueKey="name" style={{ width: 224 }} />
    <hr />
    <CheckPicker
      sticky
      data={data}
      placeholder="Group by first letter"
      groupBy="firstLetter"
      labelKey="firstName"
      valueKey="name"
      style={{ width: 224 }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
