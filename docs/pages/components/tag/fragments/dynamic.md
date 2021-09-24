<!--start-code-->

```js
const App = () => {
  const [tags, setTags] = React.useState(['javascript', 'css', 'react']);
  const [typing, setTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleTagRemove = (tag) => {
    const nextTags = tags.filter((item) => item !== tag);
    setTags(nextTags);
  };

  const handleInputConfirm = () => {
    const nextTags = inputValue ? [...tags, inputValue] : tags;
    setTags(nextTags);
    setTyping(false);
    setInputValue('');
  };

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <Input
          className="tag-input"
          size="xs"
          style={{ width: 70 }}
          value={inputValue}
          onChange={setInputValue}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      );
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={handleButtonClick}
        icon={<Plus />}
        appearance="ghost"
        size="xs"
      />
    );
  };
  return (
    <TagGroup>
      {tags.map((item, index) => (
        <Tag key={index} closable onClose={() => handleTagRemove(item)}>
          {item}
        </Tag>
      ))}
      {renderInput()}
    </TagGroup>
  );
};

ReactDOM.render(<App />);

/**
 * css
 *
  .tag-input,
  .tag-add-btn {
    display: inline-block;
    margin-left: 10px;
  }
*/
```

<!--end-code-->
