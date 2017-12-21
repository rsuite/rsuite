// @flow

import * as React from 'react';
import classNames from 'classnames';
import Pagination from './Pagination';
import Dropdown from './Dropdown';
import prefix from './utils/prefix';

type Props = {
  lengthMenu?: Array<{ value: number, text: string | number }>,
  showLengthMenu?: boolean,
  showInfo?: boolean,
  total: number,
  displayLength: number,
  formatLengthMenu?: Function,
  formatInfo?: Function,
  onChangePage?: Function,
  onChangeLength?: Function,
  prev?: boolean,
  next?: boolean,
  first?: boolean,
  last?: boolean,
  maxButtons?: number,
  activePage: number,
  className?: string,
  classPrefix: string
}


type States = {
  displayLength: number,
  activePage: number
}

class TablePagination extends React.Component<Props, States> {

  static defaultProps = {
    showLengthMenu: true,
    showInfo: true,
    lengthMenu: [{
      value: 30,
      text: 30,
    }, {
      value: 50,
      text: 50,
    }, {
      value: 100,
      text: 100,
    }],
    displayLength: 30,
    prev: true,
    next: true,
    first: true,
    last: true,
    activePage: 1,
    maxButtons: 5
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      displayLength: props.displayLength,
      activePage: props.activePage
    };
  }
  componentWillReceiveProps(nextProps: Props) {
    const { displayLength, activePage } = this.props;
    if (displayLength !== nextProps.displayLength || activePage !== nextProps.activePage) {
      this.setState({
        displayLength: nextProps.displayLength,
        activePage: nextProps.activePage
      });
    }
  }

  handleChangeLength = (eventKey: any) => {

    const { onChangeLength } = this.props;
    this.setState({
      displayLength: eventKey
    });
    onChangeLength && onChangeLength(eventKey);
  }

  handleChangePage = (eventKey: any) => {
    const { onChangePage } = this.props;
    this.setState({
      activePage: eventKey
    });
    onChangePage && onChangePage(eventKey);
  }

  addPrefix(name: string) {
    const { classPrefix } = this.props;
    return prefix(classPrefix)(name);
  }

  renderLengthMenu() {

    const {
      lengthMenu = [],
      formatLengthMenu,
      showLengthMenu,
    } = this.props;

    const { displayLength } = this.state;

    if (!showLengthMenu) {
      return null;
    }

    const items = lengthMenu.map(item => (
      <Dropdown.Item
        key={item.value}
        eventKey={item.value}
      >
        {item.text}
      </Dropdown.Item>
    ));


    const dropdown = (
      <Dropdown
        shape="default"
        activeKey={displayLength}
        onSelect={this.handleChangeLength}
        dropup
        select
      >
        {items}
      </Dropdown>
    );

    return (
      <div className={this.addPrefix('length-menu')}>
        {
          formatLengthMenu ? formatLengthMenu(dropdown) : dropdown
        }
      </div>
    );
  }


  renderInfo() {

    const { formatInfo, total, showInfo } = this.props;

    if (!showInfo) {
      return null;
    }

    const { activePage } = this.state;
    return (
      <div className={this.addPrefix('page-info')}>
        {formatInfo ? formatInfo(total, activePage) : <span>Total: {total}</span>}
      </div>
    );
  }

  render() {
    const { total, prev, next, first, last, maxButtons, className } = this.props;
    const { displayLength, activePage } = this.state;
    const pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
    const classes = classNames(this.addPrefix('pagination-wrapper'), className);

    return (

      <div className={classes}>
        {this.renderLengthMenu()}
        {this.renderInfo()}

        <div className={classNames(this.addPrefix('pagination'))} >
          <Pagination
            prev={prev}
            next={next}
            first={first}
            last={last}
            maxButtons={maxButtons}
            pages={pages}
            onSelect={this.handleChangePage}
            activePage={activePage}
          />
        </div>

      </div>
    );
  }
}


export default TablePagination;
