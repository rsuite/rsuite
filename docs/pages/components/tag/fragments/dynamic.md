<!--start-code-->

```js
import { TagGroup, Tag, Input, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';

const App = () => {
  const [tags, setTags] = React.useState(['javascript', 'css', 'react']);
  const [typing, setTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const removeTag = tag => {
    const nextTags = tags.filter(item => item !== tag);
    setTags(nextTags);
  };

  const addTag = () => {
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
          onBlur={addTag}
          onPressEnter={addTag}
        />
      );
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={handleButtonClick}
        icon={<PlusIcon />}
        appearance="ghost"
        size="xs"
      />
    );
  };
  return (
    <TagGroup>
      {tags.map((item, index) => (
        <Tag key={index} closable onClose={() => removeTag(item)}>
          {item}
        </Tag>
      ))}
      {renderInput()}
    </TagGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
