declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: <S extends JQuery<HTMLLIElement>>(testId: string) => Cypress.Chainable<S>;
    }
  }
}

Cypress.Commands.add(
  'getByTestId',
  { prevSubject: 'optional' },
  (subject: any, testId: string) => {
    const selector = `[data-testid=${testId}]`;
    if (subject) {
      return cy.wrap(subject).find(selector);
    }
    return cy.get(selector);
  },
);

export {};
