import classNames from 'classnames';
import React from 'react';
import elementType from './prop-types/elementType';
import ClassNameMixin from './mixins/ClassNameMixin';

import PaginationButton from './PaginationButton';
import Anchor from './Anchor';

const Pagination = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        activePage: React.PropTypes.number,
        pages: React.PropTypes.number,
        maxButtons: React.PropTypes.number,
        /**
         * When `true`, will display the first and the last button page
         */
        boundaryLinks: React.PropTypes.bool,
        /**
         * When `true`, will display the default node value ('&hellip;').
         * Otherwise, will display provided node (when specified).
         */
        ellipsis: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.node
        ]),
        /**
         * When `true`, will display the default node value ('&laquo;').
         * Otherwise, will display provided node (when specified).
         */
        first: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.node
        ]),
        /**
         * When `true`, will display the default node value ('&raquo;').
         * Otherwise, will display provided node (when specified).
         */
        last: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.node
        ]),
        /**
         * When `true`, will display the default node value ('&lsaquo;').
         * Otherwise, will display provided node (when specified).
         */
        prev: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.node
        ]),
        /**
         * When `true`, will display the default node value ('&rsaquo;').
         * Otherwise, will display provided node (when specified).
         */
        next: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.node
        ]),
        onSelect: React.PropTypes.func,
        /**
         * You can use a custom element for the buttons
         */
        buttonComponentClass: elementType,
        classPrefix: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            activePage: 1,
            pages: 1,
            maxButtons: 0,
            first: false,
            last: false,
            prev: false,
            next: false,
            ellipsis: false,
            boundaryLinks: false,
            classPrefix: 'pagination',
            buttonComponentClass: Anchor
        };
    },

    renderPageButtons() {

        let pageButtons = [];
        let startPage, endPage, hasHiddenPagesAfter;
        let {
            maxButtons,
            activePage,
            pages,
            ellipsis,
            boundaryLinks
        } = this.props;

        if (maxButtons) {
            let hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
            startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
            hasHiddenPagesAfter = startPage + maxButtons <= pages;

            if (!hasHiddenPagesAfter) {
                endPage = pages;
                startPage = pages - maxButtons + 1;
                if (startPage < 1) {
                    startPage = 1;
                }
            } else {
                endPage = startPage + maxButtons - 1;
            }
        } else {
            startPage = 1;
            endPage = pages;
        }

        for (let pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
            pageButtons.push(this.renderItem({
                key: pagenumber,
                eventKey: pagenumber,
                active: pagenumber === activePage,
                children: pagenumber
            }));
        }

        if (boundaryLinks && ellipsis && startPage !== 1) {

            pageButtons.unshift(this.renderItem({
                key: 'ellipsisFirst',
                disabled: true,
                children: (
                    <span aria-label="More">
                        {ellipsis === true ? '\u2026' : ellipsis}
                    </span>
                )
            }));

            pageButtons.unshift(this.renderItem({
                key: 1,
                eventKey: 1,
                children: 1
            }));
        }

        if (maxButtons && hasHiddenPagesAfter && ellipsis) {
            pageButtons.push(this.renderItem({
                key: 'ellipsis',
                disabled: true,
                children: (
                    <span aria-label="More">
                        {ellipsis === true ? '\u2026' : ellipsis}
                    </span>
                )
            }));

            if (boundaryLinks && endPage !== pages) {
                pageButtons.push(this.renderItem({
                    key: pages,
                    eventKey: pages,
                    disabled: false,
                    children: pages
                }));
            }
        }

        return pageButtons;
    },

    renderPrev() {

        const { pages, activePage, prev } = this.props;

        if (!this.props.prev) {
            return null;
        }

        return this.renderItem({
            key: 'prev',
            eventKey: activePage - 1,
            disabled: activePage === 1,
            children: (
                <span aria-label="Previous">
                    {prev === true ? '\u2039' : prev}
                </span>
            )
        });

    },

    renderNext() {
        const { pages, activePage, next } = this.props;

        if (!this.props.next) {
            return null;
        }

        return this.renderItem({
            key: 'next',
            eventKey: activePage + 1,
            disabled: activePage >= pages,
            children: (
                <span aria-label="Next">
                    {next === true ? '\u203a' : next}
                </span>
            )
        });
    },

    renderFirst() {
        const { pages, activePage, first } = this.props;

        if (!first) {
            return null;
        }

        return this.renderItem({
            key: 'first',
            eventKey: 1,
            disabled: activePage === 1,
            children: (
                <span aria-label="First">
                    {first === true ? '\u00ab' : first}
                </span>
            )
        });
    },

    renderLast() {
        const { pages, activePage, last } = this.props;

        if (!last) {
            return null;
        }

        return this.renderItem({
            key: 'last',
            eventKey: pages,
            disabled: activePage >= pages,
            children: (
                <span aria-label="Last">
                    {last === true ? '\u00bb' : last}
                </span>
            )
        });
    },
    renderItem(props) {

        const {
            children,
            ...itemProps
        } = props;

        if (!itemProps.disabled) {
            itemProps.onSelect = this.props.onSelect;
        }

        return (
            <PaginationButton
                {...itemProps}
                componentClass={this.props.buttonComponentClass}
                >
                {children}
            </PaginationButton>
        );
    },
    render() {

        const clesses = classNames({
            'pagination': true
        }, ...this.getClassNames(), this.props.className);

        return (
            <ul
                {...this.props}
                className = {clesses}
                >
                {this.renderFirst() }
                {this.renderPrev() }
                {this.renderPageButtons() }
                {this.renderNext() }
                {this.renderLast() }
            </ul>
        );
    }
});

export default Pagination;
