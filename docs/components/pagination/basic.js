const PaginationBasic = React.createClass({
    getInitialState() {
        return {
            activePage: 5
        };
    },

    handleSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    },

    render() {
        return (
            <div>
                <Pagination
                    size="lg"
                    pages={10}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />

                <br/>
                <Pagination
                    size="md"
                    pages={10}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />

                <br/>
                <Pagination
                    size="sm"
                    pages={10}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />
            </div>
        );
    }
});


ReactDOM.render(<PaginationBasic />, mountNode);
