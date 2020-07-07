### 穿梭

<!--start-code-->

```js

export const ColumnComponent = React.forwardRef((props, ref) => {
    return <div ref={ref} {...props}>{props.children}</div>;
});

const Message = (props) => {
    const {item, select, onSetSelect} = props
    return (
        <List>
            <List.Item>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={3} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60px'
                    }}>
                        <Checkbox checked={select.indexOf(item.id) > -1}
                                  onChange={(value, checked, event) => onSetSelect(item.id, checked)}/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={9} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60px'
                    }}>
                        <Icon
                            icon={'image'}
                            style={{
                                color: 'darkgrey',
                                fontSize: '1.5em'
                            }}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={12}
                        style={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            paddingBottom: 5,
                            whiteSpace: 'nowrap',
                            fontWeight: 500
                        }}>
                            {item.name}
                        </div>
                        <div style={{
                            fontSize: '0.666em',
                            color: '#97969B',
                            fontWeight: 'lighter',
                            paddingBottom: 5
                        }}>
                            <div>
                                <Icon icon="user-circle-o"/>
                                {' ' + item.creator}
                            </div>
                            <div>{item.date}</div>
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        </List>
    )
}

const App = () => {
    const [source, setSource] = React.useState([
        {
            id: 'source-1',
            name: '自由行@尖沙咀',
            creator: 'Yvnonne',
            date: '2017.10.13 14:50'
        },
        {
            id: 'source-2',
            name: '庆中秋',
            creator: 'Daibiao',
            date: '2017.10.13 14:50'
        },
        {
            id: 'source-3',
            name: '直播打篮球',
            creator: 'Bidetoo',
            date: '2017.10.13 14:50'
        },
        {
            id: 'source-4',
            name: '爱玩客贴片',
            creator: 'Tony',
            date: '2017.10.13 14:50'
        }
    ])
    const [sourceSelect, setSourceSelect] = React.useState([])
    const [target, setTarget] = React.useState([
        {
            id: 'target-1',
            name: 'And so are you',
            creator: 'Yvnonne',
            date: '2017.10.13 14:50'
        },
        {
            id: 'target-2',
            name: 'Sugar is sweet',
            creator: 'Daibiao',
            date: '2017.10.13 14:50'
        },
        {
            id: 'target-3',
            name: 'Violets are blue',
            creator: 'Bidetoo',
            date: '2017.10.13 14:50'
        },
        {
            id: 'target-4',
            name: 'Roses are red',
            creator: 'Tony',
            date: '2017.10.13 14:50'
        }
    ])
    const [targetSelect, setTargetSelect] = React.useState([])

    const onSetTargetSelect = (id, checked) => {
        const newtargetSelect = targetSelect.filter((item) => item !== id);
        if (checked) {
            newtargetSelect.push(id)
        }
        setTargetSelect(newtargetSelect);
    }

    const onSetSourceSelect = (id, checked) => {
        const newsourceSelect = sourceSelect.filter((item) => item !== id);
        if (checked) {
            newsourceSelect.push(id)
        }
        setSourceSelect(newsourceSelect);
    }

    const onMovingRight = () => {
        const newSource = []
        const select = source.filter((item) => {
            if (sourceSelect.indexOf(item.id) > -1) {
                return true
            }
            newSource.push(item)
            return false
        });
        const newtargetSelect = target.concat(select);
        setTarget(newtargetSelect)
        setSource(newSource)
        setSourceSelect([])
    }

    const onMovingLeft = () => {
        const newTarget = []
        const select = target.filter((item) => {
            if (targetSelect.indexOf(item.id) > -1) {
                return true
            }
            newTarget.push(item)
            return false
        });
        const newtargetSelect = source.concat(select);
        setSource(newtargetSelect)
        setTarget(newTarget)
        setTargetSelect([])
    }

    return (
        <div style={{display: 'flex'}}>
            <div>
                <ReactSortable
                    tag={ColumnComponent}
                    style={{
                        width: 255,
                        minHeight: 300
                    }}
                    list={source}
                    group={{
                        name: 'head'
                    }}
                    animation={500}
                    setList={((newState, sortable, store) => {
                        if (newState) {
                            setSource(newState)
                        }
                    })}
                >
                    {
                        source.length > 0 ? source.map((item, index) => (
                            <Message item={item} select={sourceSelect} onSetSelect={onSetSourceSelect}/>
                        )) : undefined
                    }
                </ReactSortable>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 55,
                    height: 100
                }}>
                    <IconButton onClick={() => onMovingRight()} icon={<Icon icon={'chevron-circle-right'}/>}/>
                    <IconButton onClick={() => onMovingLeft()} icon={<Icon icon={'chevron-circle-left'}/>}/>
                </div>
            </div>
            <div>
                <ReactSortable
                    tag={ColumnComponent}
                    style={{
                        width: 255,
                        minHeight: 300
                    }}
                    list={target}
                    group={{
                        name: 'head'
                    }}
                    animation={500}
                    setList={((newState, sortable, store) => {
                        if (newState) {
                            setTarget(newState)
                        }
                    })}
                >
                    {
                        target.length > 0 ? target.map((item, index) => (
                            <Message item={item} select={targetSelect} onSetSelect={onSetTargetSelect}/>
                        )) : undefined
                    }
                </ReactSortable>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>);

```

<!--end-code-->
