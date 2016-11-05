import React from 'react';
import { Button, ButtonGroup, Dropdown } from '../src';

const ButtonGroupDemo = React.createClass({
    getInitialState() {
        return {
            status: 'ENABLE',
            formValid: false
        };
    },
    handleSelect(activeButton) {
        console.log('handleSelect',activeButton.props.dataKey);
    },
    handleDropdownSelect(eventKey){
        console.log('handleDropdownSelect',eventKey);
    },
    render() {
        const items = [
            {
                dataKey: '',
                title: '全部'
            }, {
                dataKey: 'ENABLE',
                title: '启用'
            }, {
                dataKey: 'DISABLE',
                title: '禁用'
            }
        ];

        const buttons = items.map((item, index) => {
            const classes = item.dataKey === this.state.status ? 'active' : '';
            return (
                <Button
                    shape="default"
                    key={index}
                    dataKey={item.dataKey}
                    className={classes}
                    >
                    {item.title}
                </Button>
            );
        });
        return (
            <div className="container">
                <h1 className="page-title">ButtonGroup</h1>
                <ButtonGroup  type='radio' onSelect={this.handleSelect}>
                    {buttons}
                </ButtonGroup>

                <Dropdown  activeKey=""  select onSelect={this.handleDropdownSelect }>
                    <Dropdown.Item eventKey="" >全部</Dropdown.Item>
                    <Dropdown.Item eventKey="set" >人群集合</Dropdown.Item>
                    <Dropdown.Item eventKey="creator" >创建者</Dropdown.Item>
                </Dropdown>
            </div>
        );
    }
});

export default ButtonGroupDemo;
