const PaginationAdvanced = React.createClass({
    getInitialState() {
        return {
            activePage: 1
        };
    },
    handleSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    },

    render() {
        return (
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                pages={30}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect} />
        );
    }
});

ReactDOM.render(<PaginationAdvanced />, mountNode);
