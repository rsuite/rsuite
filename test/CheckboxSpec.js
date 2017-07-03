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
            <Checkbox checked>
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
            <Checkbox value>
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
            <Checkbox checked value={false}>
                Checkbox
            </Checkbox>
        );
        let instance2 = ReactTestUtils.renderIntoDocument(
            <Checkbox checked={false} value>
                Checkbox
            </Checkbox>
        );
        assert.equal(findDOMNode(instance1).querySelector('input').checked, true);
        assert.equal(findDOMNode(instance2).querySelector('input').checked, false);
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

    it('Should pass value as an argument on onChange', () => {
        let flag = false;
        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox onChange={(v) => flag = v} value>
                Checkbox
            </Checkbox>
        );
        let inputField = findDOMNode(instance).querySelector('input');
        ReactTestUtils.Simulate.change(inputField);
        assert.equal(flag, instance.state.checked);
    });

    it('Should change the state at onChange', () => {

        let instance = ReactTestUtils.renderIntoDocument(
            <Checkbox> Checkbox </Checkbox>
        );

        let inputField = findDOMNode(instance).querySelector('input');
        ReactTestUtils.Simulate.change(inputField);
        assert.equal(true, instance.state.checked);

        ReactTestUtils.Simulate.change(inputField);
        assert.equal(false, instance.state.checked);

    });

});

