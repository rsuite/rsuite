<!--start-code-->

```js
import { AutoComplete } from 'rsuite';
import MemberIcon from '@rsuite/icons/Member';

const data = [
  'Eugenia',
  'Bryan',
  'Linda',
  'Nancy',
  'Lloyd',
  'Alice',
  'Julia',
  'Albert',
  'Louisa',
  'Lester',
  'Lola',
  'Lydia',
  'Hal',
  'Hannah',
  'Harriet',
  'Hattie',
  'Hazel',
  'Hilda'
];

const App = () => (
  <AutoComplete
    data={data}
    style={{ width: 224 }}
    renderMenuItem={item => {
      return (
        <div>
          <MemberIcon /> {item}
        </div>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
