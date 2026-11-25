import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import SelectPicker from 'rsuite/SelectPicker';
import rsuiteStyles from 'rsuite/dist/rsuite.min.css?inline';
import demoStyles from './panel.css?inline';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Pear', value: 'pear' },
  { label: 'Peach', value: 'peach' }
];

function FruitPicker({ overlay }) {
  const [value, setValue] = useState(null);
  const selectedFruit = fruits.find(fruit => fruit.value === value);

  return (
    <>
      <SelectPicker
        aria-label="Fruit"
        placeholder="Choose a fruit"
        data={fruits}
        value={value}
        onChange={setValue}
        container={overlay}
        searchable={false}
        cleanable={false}
        responsive={false}
      />
      <p role="status">
        {selectedFruit ? 'Selected: ' + selectedFruit.label : 'No fruit selected'}
      </p>
    </>
  );
}

class RSuiteFruitPicker extends HTMLElement {
  static observedAttributes = ['theme'];

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.ownerDocument.createElement('style');
    style.textContent = rsuiteStyles + demoStyles;

    this.panel = this.ownerDocument.createElement('section');
    this.panel.className = 'panel';
    this.mount = this.ownerDocument.createElement('div');
    this.overlay = this.ownerDocument.createElement('div');

    this.panel.append(this.mount, this.overlay);
    shadow.append(style, this.panel);
  }

  attributeChangedCallback() {
    this.panel.dataset.theme = this.getAttribute('theme') ?? 'light';
  }

  connectedCallback() {
    this.reactRoot = createRoot(this.mount);
    this.reactRoot.render(<FruitPicker overlay={this.overlay} />);
  }

  disconnectedCallback() {
    this.reactRoot.unmount();
    this.reactRoot = null;
  }
}

customElements.define('rsuite-fruit-picker', RSuiteFruitPicker);

const themeControl = document.querySelector('#dark-theme');
const picker = document.querySelector('rsuite-fruit-picker');
themeControl.addEventListener('change', () => {
  picker.setAttribute('theme', themeControl.checked ? 'dark' : 'light');
});
