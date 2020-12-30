<!--start-code-->

```js
/**
 * import { AutoComplete } from 'rsuite';
 * import MemberIcon from '@rsuite/icons/Member';
 */

const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];
const instance = (
  <AutoComplete
    data={data}
    renderMenuItem={item => {
      return (
        <div>
          <MemberIcon /> {item}
        </div>
      );
    }}
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
