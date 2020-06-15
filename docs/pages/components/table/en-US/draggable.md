<!--start-code-->

```js
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move'
};

const ItemTypes = {
  COLUMN: 'column',
  ROW: 'row'
};

function DraggableHeaderCell({ children, onDrag, id, ...rest }) {
  const ref = React.useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop(item, monitor) {
      onDrag(item.id, id);
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id, type: ItemTypes.COLUMN },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  const isActive = canDrop && isOver;

  drag(drop(ref));

  const styles = {
    ...style,
    opacity: isDragging ? 0 : 1,
    background: isActive ? '#ddd' : null
  };

  return (
    <HeaderCell {...rest} style={{ padding: 0 }}>
      <div ref={ref} style={styles}>
        {children}
      </div>
    </HeaderCell>
  );
}

function DraggableCell({ children, onDrag, id, rowData, ...rest }) {
  const ref = React.useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.ROW,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop(item, monitor) {
      onDrag && onDrag(item.id, rowData.id);
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id: rowData.id, type: ItemTypes.ROW },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  const isActive = canDrop && isOver;

  drag(drop(ref));

  const styles = {
    ...style,
    opacity: isDragging ? 0.5 : 1,
    background: isActive ? '#ddd' : null
  };

  return (
    <Cell {...rest} style={{ padding: 0 }}>
      <div ref={ref} style={styles}>
        {children}
      </div>
    </Cell>
  );
}

function sort(source, sourceId, targetId) {
  const nextData = source.filter(item => item.id !== sourceId);
  const dragItem = source.find(item => item.id === sourceId);
  const index = nextData.findIndex(item => item.id === targetId);

  nextData.splice(index + 1, 0, dragItem);
  return nextData;
}

function DraggableTable() {
  const [data, setData] = React.useState(fakeData.filter((item, index) => index < 7));
  const [columns, setColumns] = React.useState([
    { id: 'id', name: 'Id', width: 80 },
    { id: 'firstName', name: 'First Name', width: 200 },
    { id: 'lastName', name: 'Last Name', width: 200 },
    { id: 'email', name: 'Email', width: 300 },
    { id: 'action', name: 'Action', width: 100 }
  ]);

  const handleDragColumn = (sourceId, targetId) => {
    setColumns(sort(columns, sourceId, targetId));
  };

  const handleDragRow = (sourceId, targetId) => {
    setData(sort(data, sourceId, targetId));
  };

  return (
    <DndProvider backend={Backend}>
      <div>
        <Table height={400} data={data}>
          {columns.map(column => (
            <Column width={column.width} key={column.id}>
              <DraggableHeaderCell onDrag={handleDragColumn} id={column.id}>
                {column.name} <Icon icon="arrows" />
              </DraggableHeaderCell>

              {column.id === 'action' ? (
                <DraggableCell id={column.id} onDrag={handleDragRow}>
                  <Icon icon="arrows" />
                </DraggableCell>
              ) : (
                <Cell dataKey={column.id} />
              )}
            </Column>
          ))}
        </Table>
      </div>
    </DndProvider>
  );
}

ReactDOM.render(<DraggableTable />);
```

<!--end-code-->
