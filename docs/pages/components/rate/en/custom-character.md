### Custom render character (renderCharacter)

When there are multiple levels of rating, you can customize the character displayed at each level, but you need to implement this yourself

<!--start-code-->

```js
const renderCharacter = value => {
  if (value < 3) {
    return <Icon icon="frown-o" size="2x" />;
  }
  if (value < 4) {
    return <Icon icon="meh-o" size="2x" />;
  }
  return <Icon icon="smile-o" size="2x" />;
};
const instance = <Rate defaultValue={2.5} renderCharacter={renderCharacter} />;

ReactDOM.render(instance);
```

<!--end-code-->
