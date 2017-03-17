import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { findDOMNode } from 'react-dom';
import Dropdown from '../src/Dropdown';
describe('Dropdown', () => {
    it('Should output a dropdown', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Dropdown />
        );
        assert.ok(findDOMNode(instance).className.match(/\bdropdown\b/));
    });

    it('Should have both-ends class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Dropdown bothEnds />
        );
        assert.ok(findDOMNode(instance).className.match(/\bboth-ends\b/));
    });

    it('Should have dropup class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Dropdown dropup />
        );
        assert.ok(findDOMNode(instance).className.match(/\bdropup\b/));
    });

    it('Should have dropup class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Dropdown dropup />
        );
        assert.ok(findDOMNode(instance).className.match(/\bdropup\b/));
    });

    it('Should not have icon for caret ', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Dropdown noCaret />
        );
        assert.ok(!findDOMNode(instance).querySelectorAll('.caret').length);
    });





    it('Should be activated first item', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Dropdown activeKey={0} >
                <Dropdown.Item eventKey={0}>0</Dropdown.Item>
                <Dropdown.Item eventKey={1}>1</Dropdown.Item>
            </Dropdown>
        );
        assert.ok(findDOMNode(instance).querySelectorAll('li')[0].className === 'active');
    });

});
