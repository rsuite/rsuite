import React, { Ref } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Disclosure from '../Disclosure';
import useDisclosureContext from '../useDisclosureContext';
import { DisclosureActionTypes } from '../DisclosureContext';

describe('<Disclosure>', () => {
  it('Should render a Disclosure', () => {
    render(
      <Disclosure>
        {() => (
          <>
            <Disclosure.Button>
              {props => (
                <button data-testid="button" {...props}>
                  Button
                </button>
              )}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open, ...props }) => (
                <div data-testid="content" hidden={!open} {...props}>
                  Content
                </div>
              )}
            </Disclosure.Content>
          </>
        )}
      </Disclosure>
    );

    const button = screen.getByTestId('button');
    const content = screen.getByTestId('content');

    expect(button, 'The button').not.to.be.null;
    expect(content, 'The content').not.to.be.null;

    expect(content.hidden, 'Content is hidden').to.be.true;

    fireEvent.click(button);

    expect(!content.hidden, 'Content is visible').to.be.true;
  });

  it('Should be possible to control Disclosure with `open` and `onToggle`', () => {
    const onToggleSpy = sinon.spy();
    const { rerender } = render(
      <Disclosure open onToggle={onToggleSpy}>
        {() => (
          <>
            <Disclosure.Button>
              {props => (
                <button data-testid="button" {...props}>
                  Button
                </button>
              )}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open, ...props }) => (
                <div data-testid="content" hidden={!open} {...props}>
                  Content
                </div>
              )}
            </Disclosure.Content>
          </>
        )}
      </Disclosure>
    );

    const button = screen.getByTestId('button');
    const content = screen.getByTestId('content');

    expect(!content.hidden, 'Content is visible').to.be.true;

    fireEvent.click(button);

    expect(onToggleSpy).to.have.been.calledWith(false);

    rerender(
      <Disclosure open={false} onToggle={onToggleSpy}>
        {() => (
          <>
            <Disclosure.Button>
              {props => (
                <button data-testid="button" {...props}>
                  Button
                </button>
              )}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open, ...props }) => (
                <div data-testid="content" hidden={!open} {...props}>
                  Content
                </div>
              )}
            </Disclosure.Content>
          </>
        )}
      </Disclosure>
    );

    expect(content.hidden, 'Content is hidden').to.be.true;

    fireEvent.click(button);

    expect(onToggleSpy).to.have.been.calledWith(true);
  });

  it('Should be toggled by mouseEnter/mouseLeave given `trigger=[hover]`', () => {
    render(
      <Disclosure trigger={['hover']}>
        {(props, ref) => (
          <div ref={ref as Ref<HTMLDivElement>} {...props}>
            <Disclosure.Button>
              {props => (
                <button data-testid="button" {...props}>
                  Button
                </button>
              )}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open, ...props }) => (
                <div data-testid="content" hidden={!open} {...props}>
                  Content
                </div>
              )}
            </Disclosure.Content>
          </div>
        )}
      </Disclosure>
    );

    fireEvent.mouseEnter(screen.getByTestId('button'));
    expect(screen.getByTestId('content')).to.be.visible;

    fireEvent.mouseLeave(screen.getByTestId('button'));
    expect(screen.getByTestId('content')).not.to.be.visible;
  });

  context('Nested disclosures', () => {
    it('Should close parent disclosure when descendants are dispatching with `cascade: true`', () => {
      const ChildDisclosureContent = () => {
        const [, dispatch] = useDisclosureContext('ChildDisclosureContent');
        return (
          <button
            onClick={() =>
              dispatch({
                type: DisclosureActionTypes.Hide,
                cascade: true
              })
            }
          >
            Close all disclosures
          </button>
        );
      };

      render(
        <Disclosure>
          {() => (
            <>
              <Disclosure.Button>
                {(props, ref) => (
                  <button ref={ref as Ref<HTMLButtonElement>} {...props}>
                    Open parent disclosure
                  </button>
                )}
              </Disclosure.Button>
              <Disclosure.Content>
                {({ open, ...props }, ref) => (
                  <div
                    ref={ref as Ref<HTMLDivElement>}
                    {...props}
                    hidden={!open}
                    data-testid="parent-content"
                  >
                    <Disclosure>
                      {() => (
                        <>
                          <Disclosure.Button>
                            {(props, ref) => (
                              <button ref={ref as Ref<HTMLButtonElement>} {...props}>
                                Open child disclosure
                              </button>
                            )}
                          </Disclosure.Button>
                          <Disclosure.Content>
                            {({ open, ...props }, ref) => (
                              <div ref={ref as Ref<HTMLDivElement>} {...props} hidden={!open}>
                                <ChildDisclosureContent />
                              </div>
                            )}
                          </Disclosure.Content>
                        </>
                      )}
                    </Disclosure>
                  </div>
                )}
              </Disclosure.Content>
            </>
          )}
        </Disclosure>
      );

      userEvent.click(screen.getByText('Open parent disclosure'));

      userEvent.click(screen.getByText('Open child disclosure'));

      userEvent.click(screen.getByText('Close all disclosures'));

      expect(screen.getByTestId('parent-content')).not.to.be.visible;
    });
  });

  context('Keyboard interaction', function () {
    it('Enter: activates the disclosure control and toggles the visibility of the disclosure content.', () => {
      render(
        <Disclosure>
          {() => (
            <>
              <Disclosure.Button>
                {props => (
                  <button data-testid="button" {...props}>
                    Button
                  </button>
                )}
              </Disclosure.Button>
              <Disclosure.Content>
                {({ open, ...props }) => (
                  <div data-testid="content" hidden={!open} {...props}>
                    Content
                  </div>
                )}
              </Disclosure.Content>
            </>
          )}
        </Disclosure>
      );

      const button = screen.getByTestId('button');
      const content = screen.getByTestId('content');

      fireEvent.keyDown(button, { key: 'Enter' });

      expect(!content.hidden, 'Shows the content').to.be.true;

      fireEvent.keyDown(button, { key: 'Enter' });

      expect(content.hidden, 'Hides the content').to.be.true;
    });
    it('Space: activates the disclosure control and toggles the visibility of the disclosure content.', () => {
      render(
        <Disclosure>
          {() => (
            <>
              <Disclosure.Button>
                {props => (
                  <button data-testid="button" {...props}>
                    Button
                  </button>
                )}
              </Disclosure.Button>
              <Disclosure.Content>
                {({ open, ...props }) => (
                  <div data-testid="content" hidden={!open} {...props}>
                    Content
                  </div>
                )}
              </Disclosure.Content>
            </>
          )}
        </Disclosure>
      );

      const button = screen.getByTestId('button');
      const content = screen.getByTestId('content');

      fireEvent.keyDown(button, { key: ' ' });

      expect(!content.hidden, 'Shows the content').to.be.true;

      fireEvent.keyDown(button, { key: ' ' });

      expect(content.hidden, 'Hides the content').to.be.true;
    });
  });
});
