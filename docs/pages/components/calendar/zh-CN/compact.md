### 紧凑型

<!--start-code-->

```js
function getTodoList(date) {
  const day = dateFns.getDate(date);

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' }
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' }
      ];
    default:
      return [];
  }
}

function renderCell(date) {
  const list = getTodoList(date);

  if (list.length) {
    return (
      <Whisper
        placement="top"
        speaker={
          <Popover>
            {list.map((item, index) => (
              <p key={index}>
                <b>{item.time}</b> - {item.title}
              </p>
            ))}
          </Popover>
        }
      >
        <Badge className="calendar-todo-item-badge" />
      </Whisper>
    );
  }

  return null;
}

const instance = (
  <div style={{ width: 280 }}>
    <Calendar compact bordered renderCell={renderCell} />{' '}
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
