<!--start-code-->

```js
import { Table } from 'rsuite';
import { faker } from '@faker-js/faker';

const { Column, ColumnGroup, HeaderCell, Cell } = Table;

const data = [
  {
    id: '1',
    task: 'Project Lifecycle',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    children: [
      {
        id: '1-1',
        task: 'Requirements analysis',
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        children: [
          {
            id: '1-1-1',
            task: 'Gathering requirements',
            startDate: '2024-01-01',
            endDate: '2024-01-02'
          },
          {
            id: '1-1-2',
            task: 'Documenting requirements',
            startDate: '2024-01-03',
            endDate: '2024-01-05'
          }
        ]
      },
      {
        id: '1-2',
        task: 'Design',
        startDate: '2024-01-06',
        endDate: '2024-01-10',
        children: [
          {
            id: '1-2-1',
            task: 'System architecture design',
            startDate: '2024-01-06',
            endDate: '2024-01-07'
          },
          {
            id: '1-2-2',
            task: 'Database design',
            startDate: '2024-01-08',
            endDate: '2024-01-10'
          }
        ]
      },
      {
        id: '1-3',
        task: 'Development',
        startDate: '2024-01-11',
        endDate: '2024-01-20',
        children: [
          {
            id: '1-3-1',
            task: 'Frontend development',
            startDate: '2024-01-11',
            endDate: '2024-01-15'
          },
          {
            id: '1-3-2',
            task: 'Backend development',
            startDate: '2024-01-16',
            endDate: '2024-01-20'
          }
        ]
      },
      {
        id: '1-4',
        task: 'Testing',
        startDate: '2024-01-21',
        endDate: '2024-01-25',
        children: [
          {
            id: '1-4-1',
            task: 'Unit testing',
            startDate: '2024-01-21',
            endDate: '2024-01-22'
          },
          {
            id: '1-4-2',
            task: 'Integration testing',
            startDate: '2024-01-23',
            endDate: '2024-01-25'
          }
        ]
      },
      {
        id: '1-5',
        task: 'Deployment',
        startDate: '2024-01-26',
        endDate: '2024-01-27'
      },
      {
        id: '1-6',
        task: 'Maintenance',
        startDate: '2024-01-28',
        endDate: '2024-01-31'
      }
    ]
  }
];

const columns = Array.from({ length: 31 }).map((_, index) => {
  return {
    HeaderCell: props => {
      return <HeaderCell {...props}>{index + 1}</HeaderCell>;
    },
    Cell: ({ rowData, depth, ...rest }) => {
      const colors = ['#c8f0c7', '#4cb04f', '#0f9119'];
      const startDate = new Date(rowData.startDate);
      const endDate = new Date(rowData.endDate);
      const day = index + 1;
      const inRange = startDate.getDate() <= day && day <= endDate.getDate();

      console.log('inRange', { rest });
      return (
        <Cell
          {...rest}
          depth={depth}
          style={{
            //padding: 0,
            backgroundColor: inRange ? colors[depth] : 'transparent'
          }}
        />
      );
    }
  };
});

const App = () => {
  return (
    <Table
      isTree
      defaultExpandAllRows
      bordered
      cellBordered
      rowKey="id"
      autoHeight
      data={data}
      rowHeight={30}
    >
      <Column width={300} fixed>
        <HeaderCell>Project Task</HeaderCell>
        <Cell dataKey="task" style={{ padding: '5px 0' }} />
      </Column>

      {columns.map((column, index) => {
        return (
          <Column key={index} width={40} align="center">
            <column.HeaderCell />
            <column.Cell />
          </Column>
        );
      })}
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
