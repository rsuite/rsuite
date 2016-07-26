import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { findDOMNode } from 'react-dom';
import FormControl from '../src/FormControl';
describe('FormControl', () => {
    it('Should output a input by default', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <FormControl />
        );
        assert.equal(findDOMNode(instance).nodeName, 'INPUT');
    });

    it('Should call onChange when FormControl changed', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <FormControl onChange={() => flag = true} />
        );
        ReactTestUtils.Simulate.change(findDOMNode(instance));
        assert.equal(flag, true);
    });

    it('Should pass value as an argument on onChange', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <FormControl onChange={(v) => flag = v} value='Hello' />
        );
        ReactTestUtils.Simulate.change(findDOMNode(instance));
        assert.equal(flag, 'Hello');
    });
});
