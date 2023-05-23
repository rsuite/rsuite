import { ReactNode } from 'react';
import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', (component: ReactNode, options) => {
  return mount(
    component,
    options,
  );
});
