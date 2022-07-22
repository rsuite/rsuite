<!--start-code-->

```js
import { List, FlexboxGrid } from 'rsuite';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';

const data = [
  {
    title: 'Hong Kong Free Walk @ Tsim Sha Tsui',
    icon: <ImageIcon />,
    creator: 'Yvnonne',
    date: '2017.10.13 14:50',
    peak: 3223,
    peakRaise: 433,
    uv: 433,
    uvRaise: 33
  },
  {
    title: 'Celebrate Mid-Autumn Festival',
    icon: <ImageIcon />,
    creator: 'Daibiao',
    date: '2017.10.13 14:50',
    peak: 3223,
    peakRaise: 238,
    uv: 238,
    uvRaise: 28
  },
  {
    title: 'Live basketball',
    icon: <FilmIcon />,
    creator: 'Bidetoo',
    date: '2017.10.13 14:50',
    peak: 4238,
    peakRaise: -239,
    uv: 239,
    uvRaise: 29
  },
  {
    title: 'Legislative Yuan meeting live',
    icon: <FilmIcon />,
    creator: 'Yvnonne',
    date: '2017.10.13 14:50',
    peak: 4238,
    peakRaise: 2321,
    uv: 921,
    uvRaise: 91
  },
  {
    title: 'Iwank Patch',
    icon: <ImageIcon />,
    creator: 'Tony',
    date: '2017.10.13 14:50',
    peak: 2321,
    peakRaise: 1321,
    uv: 321,
    uvRaise: 132
  }
];

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
};

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 500
};

const dataStyle = {
  fontSize: '1.2em',
  fontWeight: 500
};

const App = () => {
  const renderRaise = React.useCallback(number => {
    const isPositive = number > 0;
    const isNegative = number < 0;
    return (
      <span style={{ paddingLeft: 15, color: isNegative ? 'red' : 'green' }}>
        <span>{isPositive ? '+' : null}</span>
        <span>{number}</span>
      </span>
    );
  }, []);

  return (
    <List hover>
      {data.map((item, index) => (
        <List.Item key={item['title']} index={index + 1}>
          <FlexboxGrid>
            {/*icon*/}
            <FlexboxGrid.Item colspan={2} style={styleCenter}>
              {React.cloneElement(item['icon'], {
                style: {
                  color: 'darkgrey',
                  fontSize: '1.5em'
                }
              })}
            </FlexboxGrid.Item>
            {/*base info*/}
            <FlexboxGrid.Item
              colspan={6}
              style={{
                ...styleCenter,
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden'
              }}
            >
              <div style={titleStyle}>{item['title']}</div>
              <div style={slimText}>
                <div>
                  <UserCircleIcon />
                  {' ' + item['creator']}
                </div>
                <div>{item['date']}</div>
              </div>
            </FlexboxGrid.Item>
            {/*peak data*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>Peak</div>
                <div style={dataStyle}>{item['peak'].toLocaleString()}</div>
              </div>
              {renderRaise(item['peakRaise'])}
            </FlexboxGrid.Item>
            {/*uv data*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>User visits (UV)</div>
                <div style={dataStyle}>{item['uv'].toLocaleString()}</div>
              </div>
              {renderRaise(item['uvRaise'])}
            </FlexboxGrid.Item>
            {/*uv data*/}
            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter
              }}
            >
              <a href="#">View</a>
              <span style={{ padding: 5 }}>|</span>
              <a href="#">Edit</a>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
