import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from './Pagination';
import Dropdown from './Dropdown';
import addPrefixClass from './utils/addPrefixClass';

const propTypes = {
  lengthMenu: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })),
  showLengthMenu: PropTypes.bool,
  showInfo: PropTypes.bool,
  total: PropTypes.number.isRequired,
  displayLength: PropTypes.number,
  formatLengthMenu: PropTypes.func,
  formatInfo: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeLength: PropTypes.func,
  prev: PropTypes.bool,
  next: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  maxButtons: PropTypes.number,
  activePage: PropTypes.number
};

const defaultProps = {
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
  maxButtons: 5
};

class TablePagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLength: props.displayLength,
      activePage: props.activePage || 1
    };
  }
  componentWillReceiveProps(nextProps) {
    const { displayLength, activePage } = this.props;
    if (displayLength !== nextProps.displayLength || activePage !== nextProps.activePage) {
      this.setState({
        displayLength: nextProps.displayLength,
        activePage: nextProps.activePage
      });
    }
  }

  handleChangeLength = (eventKey) => {

    const { onChangeLength } = this.props;
    this.setState({
      displayLength: eventKey
    });
    onChangeLength && onChangeLength(eventKey);
  }

  handleChangePage = (eventKey) => {
    const { onChangePage } = this.props;
    this.setState({
      activePage: eventKey
    });
    onChangePage && onChangePage(eventKey);
  }

  renderLengthMenu() {

    const {
      lengthMenu,
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
      <div className={this.prefix('length-menu')}>
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
      <div className={this.prefix('page-info')}>
        {formatInfo ? formatInfo(total, activePage) : <span>Total: {total}</span>}
      </div>
    );
  }

  render() {
    const { total, prev, next, first, last, maxButtons, className } = this.props;
    const { displayLength, activePage } = this.state;
    const pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
    const classes = classNames(this.prefix('pagination-wrapper'), className);

    return (

      <div className={classes}>
        {this.renderLengthMenu()}
        {this.renderInfo()}

        <div className={classNames(this.prefix('pagination'))} >
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

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;

export default addPrefixClass({
  classPrefix: 'rsuite-table'
})(TablePagination);
