import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { findDOMNode } from 'react-dom';
import Checkbox from '../src/Checkbox.js';
describe('Checkbox', () => {
    it('Should uncheck by default', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox>
                Checkbox
            </Checkbox>
        );
        assert.equal(findDOMNode(instance).querySelector('input').checked, false);
    });

    it('Should setup check state depending on checked props', () => {
        let instance1 = ReactTestUtils.renderIntoDocument(
            <Checkbox checked={true}>
                Checkbox
            </Checkbox>
        );
        let instance2 = ReactTestUtils.renderIntoDocument(
            <Checkbox checked={false}>
                Checkbox
            </Checkbox>
        );
        assert.equal(findDOMNode(instance1).querySelector('input').checked, true);
        assert.equal(findDOMNode(instance2).querySelector('input').checked, false);
    });

    it('Should setup check state depending on value props', () => {
        let instance1 = ReactTestUtils.renderIntoDocument(
            <Checkbox value={true}>
                Checkbox
            </Checkbox>
        );
        let instance2 = ReactTestUtils.renderIntoDocument(
            <Checkbox value={false}>
                Checkbox
            </Checkbox>
        );
        assert.equal(findDOMNode(instance1).querySelector('input').checked, true);
        assert.equal(findDOMNode(instance2).querySelector('input').checked, false);
    });

    it('Should ignore value props if checked props has been given', () => {
        let instance1 = ReactTestUtils.renderIntoDocument(
            <Checkbox checked={true} value={false}>
                Checkbox
            </Checkbox>
        );
        let instance2 = ReactTestUtils.renderIntoDocument(
            <Checkbox checked={false} value={true}>
                Checkbox
            </Checkbox>
        );
        assert.equal(findDOMNode(instance1).querySelector('input').checked, true);
        assert.equal(findDOMNode(instance2).querySelector('input').checked, false);
    });

    it('Should call onError when value is invalid', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox isValid={false} value={false} onError={() => flag = true}>
                Checkbox
            </Checkbox>
        );
        assert.equal(flag, true);
    });

    it('Should NOT call onError if value props has NOT been given', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox isValid={false} onError={() => flag = true}>
                Checkbox
            </Checkbox>
        );
        assert.equal(flag, false);
    });

    it('Should always call onError when input is invalid and force is true', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox isValid={false} force={true} onError={() => flag = true}>
                Checkbox
            </Checkbox>
        );
        assert.equal(flag, true);
    });

    it('Should call onChange when checkbox changed', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox onChange={() => flag = true}>
                Checkbox
            </Checkbox>
        );
        let inputField = findDOMNode(instance).querySelector('input');
        ReactTestUtils.Simulate.change(inputField);
        assert.equal(flag, true);
    });

    it('Should value as an argument on onChange', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox onChange={(v) => flag = v} value={true}>
                Checkbox
            </Checkbox>
        );
        let inputField = findDOMNode(instance).querySelector('input');
        ReactTestUtils.Simulate.change(inputField);
        assert.equal(flag, instance.state.checked);
        ReactTestUtils.Simulate.change(inputField);
        assert.equal(flag, instance.state.checked);
    });
});

