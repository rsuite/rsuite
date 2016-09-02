import React from 'react';
import { Table, Column, Cell, HeaderCell} from 'rsuite-table';
import { FormattedMessage } from 'react-intl';

import TableResizeMixin from '../../mixins/TableResizeMixin';
import PageTitleBar from '../../components/PageTitleBar';
import { ObjectCell, LinkCell } from '../CustomTableCells';



const RepoTable = React.createClass({
    mixins: [TableResizeMixin],
    propTypes: {
        data: React.PropTypes.array,
        status: React.PropTypes.string,
        onFetchRepos: React.PropTypes.func,
        //table默认高度
        tableDefaultHeight: React.PropTypes.number.isRequired,
        //框架的高度用于计算 table的高度
        frameHeight: React.PropTypes.number.isRequired,
    },
    getDefaultProps() {
        return {
            tableDefaultHeight: 400,
            frameHeight: 140
        };
    },
    handleChangePage(dataKey) {
        const {displayLength} = this.state;
    },
    handleChangeLength(dataKey) {
        this.setState({
            displayLength: dataKey
        });
    },
    componentDidMount() {
        const {onFetchRepos} = this.props;
        onFetchRepos && onFetchRepos();
    },
    render: function () {

        const { data = [], status } = this.props;
        const tableLocale = {
            emptyMessage: <FormattedMessage id={ (status === 'success' && data.length === 0) ? 'noDataFound' : 'loading'} />
        };

        return (
            <div className="page-content">
                <PageTitleBar title="Events"></PageTitleBar>
                <Table
                    height={this.state.tableHeight}
                    data={data}
                    headerHeight={40}
                    rowHeight={40}
                    locale={tableLocale}
                    >
                    <Column width={120}  fixed resizable>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={200}  fixed resizable>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>

                    <Column width={260} resizable>
                        <HeaderCell>Full Name</HeaderCell>
                        <Cell dataKey="full_name" />
                    </Column>

                    <Column width={100}  resizable>
                        <HeaderCell>Language</HeaderCell>
                        <Cell dataKey="language" />
                    </Column>

                    <Column width={100}  resizable>
                        <HeaderCell>Stargazers</HeaderCell>
                        <Cell dataKey="stargazers_count" />
                    </Column>

                    <Column width={100}  resizable>
                        <HeaderCell>Forks</HeaderCell>
                        <Cell dataKey="forks" />
                    </Column>

                    <Column width={120}  resizable>
                        <HeaderCell>Open Issues</HeaderCell>
                        <Cell dataKey="open_issues_count" />
                    </Column>


                    <Column width={300}  resizable>
                        <HeaderCell>URL</HeaderCell>
                        <LinkCell dataKey="html_url" />
                    </Column>

                    <Column width={300}  resizable>
                        <HeaderCell>Home Page</HeaderCell>
                        <LinkCell dataKey="homepage" />
                    </Column>


                    <Column width={300}  resizable>
                        <HeaderCell>description</HeaderCell>
                        <Cell dataKey="description" />
                    </Column>




                </Table>
            </div>
        );
    }
});

export default RepoTable;
