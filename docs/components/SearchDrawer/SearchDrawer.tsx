import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import get from 'lodash/get';
import algoliasearch from 'algoliasearch';
import Link from 'next/link';
import { Drawer, Input } from 'rsuite';

interface SearchDrawerProps {
  show?: boolean;
  onHide?: () => void;
}

interface SearchDrawerState {
  keyword: string;
  list: any[];
}

class SearchDrawer extends Component<SearchDrawerProps, SearchDrawerState> {
  static contextTypes = {
    locale: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      list: []
    };
  }
  index = null;
  componentDidMount() {
    this.initIndex();
  }
  initIndex() {
    const { locale } = this.context;
    const indexKey = _.get(locale, 'id') === 'en-US' ? 'rsuite-en' : 'rsuite-zh';
    const client = algoliasearch('PTK5IGAK3K', 'dd3a62fc583bb0749dafa15cc61588bf');
    this.index = client.initIndex(indexKey);
  }
  querySearch(query: string) {
    if (!query) {
      return;
    }
    this.index.search({ query, hitsPerPage: 6 }, (_err, res) => {
      this.setState({
        list: get(res, 'hits') || []
      });
    });
  }
  handleSearch = keyword => {
    if (keyword === '') {
      this.setState({ list: [] });
    }
    this.setState({ keyword }, () => {
      this.querySearch(keyword);
    });
  };
  handleClick = () => {
    this.props.onHide?.();
  };
  render() {
    const { show, onHide } = this.props;
    const { list } = this.state;
    const { locale } = this.context;
    const path = _.get(locale, 'id') === 'en-US' ? '/en' : '';

    return (
      <Drawer className="search-drawer" placement="left" size="xs" show={show} onHide={onHide}>
        <Drawer.Header>
          <Drawer.Title>{_.get(locale, 'common.search')}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Input
            placeholder={_.get(locale, 'common.search')}
            className="search-input"
            value={this.state.keyword}
            onChange={this.handleSearch}
          />
          <ul className="search-list">
            {list.map((item, index) => {
              const component = _.get(item, 'component');
              const content = _.get(item, 'content');
              let title = _.get(item, ['_highlightResult', 'title', 'value']);
              title = `${component} > ${title.replace(/`/gi, '')}`;
              const url = `${path}/components/${component}`;

              return (
                <li key={index}>
                  {title.indexOf('<em>') !== -1 ? (
                    <div onClick={this.handleClick}>
                      <Link href={url}>
                        <a
                          dangerouslySetInnerHTML={{
                            __html: `${title}<p>${content}</p>`
                          }}
                        />
                      </Link>
                    </div>
                  ) : (
                    <div onClick={this.handleClick}>
                      <Link href={url}>
                        {title}
                        <p>{content}</p>
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Drawer.Body>
      </Drawer>
    );
  }
}

export default SearchDrawer;
