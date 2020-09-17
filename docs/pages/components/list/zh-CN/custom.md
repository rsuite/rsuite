### 自定义列表

<!--start-code-->

```js
const data = [
  {
    title: '20170923-香港自由行@尖沙咀',
    icon: 'image',
    creator: 'Yvnonne',
    date: '2017.10.13 14:50',
    peak: 3223,
    peakRaise: 433,
    uv: 433,
    uvRaise: 33
  },
  {
    title: '庆中秋',
    icon: 'image',
    creator: 'Daibiao',
    date: '2017.10.13 14:50',
    peak: 3223,
    peakRaise: 238,
    uv: 238,
    uvRaise: 28
  },
  {
    title: '直播打篮球',
    icon: 'film',
    creator: 'Bidetoo',
    date: '2017.10.13 14:50',
    peak: 4238,
    peakRaise: -239,
    uv: 239,
    uvRaise: 29
  },
  {
    title: '2018立法院会议直播',
    icon: 'film',
    creator: 'Yvnonne',
    date: '2017.10.13 14:50',
    peak: 4238,
    peakRaise: 2321,
    uv: 921,
    uvRaise: 91
  },
  {
    title: '爱玩客贴片',
    icon: 'image',
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

class ListDemo extends React.Component {
  constructor() {
    super();
    this.renderRaise = this.renderRaise.bind(this);
  }

  renderRaise(number) {
    const isPositive = number > 0;
    const isNegative = number < 0;
    return (
      <span
        style={{
          paddingLeft: 15,
          color: isNegative ? 'red' : 'green'
        }}
      >
        <span>{isPositive ? '+' : null}</span>
        <span>{number}</span>
      </span>
    );
  }

  render() {
    return (
      <List hover>
        {data.map((item, index) => (
          <List.Item key={item['title']} index={index}>
            <FlexboxGrid>
              {/*icon*/}
              <FlexboxGrid.Item colspan={2} style={styleCenter}>
                <Icon
                  icon={item['icon']}
                  style={{
                    color: 'darkgrey',
                    fontSize: '1.5em'
                  }}
                />
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
                    <Icon icon="user-circle-o" />
                    {' ' + item['creator']}
                  </div>
                  <div>{item['date']}</div>
                </div>
              </FlexboxGrid.Item>
              {/*peak data*/}
              <FlexboxGrid.Item colspan={6} style={styleCenter}>
                <div style={{ textAlign: 'right' }}>
                  <div style={slimText}>峰值</div>
                  <div style={dataStyle}>{item['peak'].toLocaleString()}</div>
                </div>
                {this.renderRaise(item['peakRaise'])}
              </FlexboxGrid.Item>
              {/*uv data*/}
              <FlexboxGrid.Item colspan={6} style={styleCenter}>
                <div style={{ textAlign: 'right' }}>
                  <div style={slimText}>独立访问量（UV）</div>
                  <div style={dataStyle}>{item['uv'].toLocaleString()}</div>
                </div>
                {this.renderRaise(item['uvRaise'])}
              </FlexboxGrid.Item>
              {/*uv data*/}
              <FlexboxGrid.Item
                colspan={4}
                style={{
                  ...styleCenter
                }}
              >
                <a href="#">查看</a>
                <span style={{ padding: 5 }}>|</span>
                <a href="#">编辑</a>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </List.Item>
        ))}
      </List>
    );
  }
}

ReactDOM.render(<ListDemo />);
```

<!--end-code-->
