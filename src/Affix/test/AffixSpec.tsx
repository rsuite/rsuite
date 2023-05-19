import React from 'react';
import Affix from '../Affix';

describe('Affix', () => {
  it('Should render a button', () => {
    cy.mount(
      <Affix>
        <button data-testid="button">button</button>
      </Affix>,
    );
    cy.getByTestId('button').should('exist');
  });

  it('Should call onChange callback', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const onChangeSpy = cy.spy().as('onChangeSpy');

    cy.mount(
      <div data-testid="container" style={ { height: 3000 } }>
        <div style={ { height: 100 } }>--</div>
        <Affix top={ 10 } data-testid="affix" onChange={ onChangeSpy }>
          <button ref={ buttonRef }>button</button>
        </Affix>
      </div>,
    );

    cy.window().scrollTo('bottom');

    cy.get('@onChangeSpy').should('have.been.called');

    cy.getByTestId('affix').find('>*').eq(0).as('affix');

    cy.get('@affix').should('have.class', 'rs-affix');
    cy.get('@affix').should('have.css', 'position', 'fixed');
  });

  it('Should have a custom style', () => {
    cy.mount(<Affix data-testid="affix" style={ { fontSize: 12 } }/>);

    cy.getByTestId('affix').should('have.css', 'font-size', '12px');
  });

  it('Should call onOffsetChange callback', async () => {
    const onOffsetChangeSpy = cy.spy().as('onOffsetChangeSpy');

    const App = () => {
      const [height, setHeight] = React.useState(100);

      return (
        <div style={ { height: 3000 } }>
          <div style={ { height } }>--</div>
          <Affix top={ 10 } onOffsetChange={ onOffsetChangeSpy }>
            <button data-testid="button" onClick={ () => setHeight(200) }>
              button
            </button>
          </Affix>
        </div>
      );
    };

    cy.mount(<App/>);

    cy.getByTestId('button').click();

    cy.get('@onOffsetChangeSpy').should('have.been.called');
  });
});
