### 自定义快捷项

<!--start-code-->

```js
console.log(dateFns.addDays(new Date(), -1));

const instance = (
  <div className="field">
    <DatePicker
      ranges={[
        {
          label: '昨天',
          value: dateFns.addDays(new Date(), -1)
        },
        {
          label: '今天',
          value: new Date()
        },
        {
          label: '前一天',
          closeOverlay: false,
          value: datePage => {
            return dateFns.addDays(dateFns.parse(datePage), -1);
          }
        }
      ]}
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->

示例中点击“前一天”，不会关闭浮层，是因为配置 `closeOverlay:boolean` 参数，该参数用于设置点击快捷项以后是否关闭浮层，默认为 `true`。
