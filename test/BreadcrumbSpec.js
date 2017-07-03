import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM, { findDOMNode } from 'react-dom';
import Breadcrumb from '../src/Breadcrumb';
describe('Breadcrumb', () => {

    it('Should output a <ol>', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb></Breadcrumb>
        );
        assert.equal(findDOMNode(instance).nodeName, 'OL');
    });

    it('Should have breadcrumb class', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb className='custom'></Breadcrumb>
        );
        assert.equal(findDOMNode(instance).className, 'breadcrumb custom');
    });

    it('Should output a <li>', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb.Item></Breadcrumb.Item>
        );
        assert.equal(findDOMNode(instance).nodeName, 'LI');
    });

    it('Should output a <a>', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb.Item></Breadcrumb.Item>
        );
        assert.equal(findDOMNode(instance).querySelectorAll('a').length, 1);
    });

    it('Should output a <span>', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb.Item active ></Breadcrumb.Item>
        );
        assert.equal(findDOMNode(instance).querySelectorAll('span').length, 1);
    });


    it('Should output a <div>', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb.Item componentClass="div" ></Breadcrumb.Item>
        );
        assert.equal(findDOMNode(instance).querySelectorAll('div').length, 1);
    });

    it('Should be activated first item', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Breadcrumb >
                <Breadcrumb.Item active ></Breadcrumb.Item>
                <Breadcrumb.Item ></Breadcrumb.Item>
            </Breadcrumb>
        );
        assert.ok(findDOMNode(instance).querySelectorAll('li')[0].className === 'active');
    });

});
