import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { findDOMNode } from 'react-dom';
import IconFont from '../src/IconFont';
describe('IconFont', () => {
    it('Should output a i', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <IconFont icon="star" />
        );
        assert.equal(findDOMNode(instance).nodeName, 'I');
    });

    it('Should have icon class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
           <IconFont icon="star" />
        );
        assert.ok(findDOMNode(instance).className.match(/\bicon icon-star\b/));
    });

    it('Should have custom class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
           <IconFont icon="star" className="custom" />
        );
        assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
    });

});
