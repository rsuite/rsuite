import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Disclosure from '../Disclosure';
import useDisclosureContext from '../useDisclosureContext';
import { DisclosureActionTypes } from '../DisclosureContext';

describe('<Disclosure>', () => {
  it('Should render a Disclosure', () => {
    const { getByTestId } = render(
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

    const button = getByTestId('button');
    const content = getByTestId('content');

    expect(button, 'The button').not.to.be.null;
    expect(content, 'The content').not.to.be.null;

    expect(content.hidden, 'Content is hidden').to.be.true;

    act(() => {
      fireEvent.click(button);
    });

    expect(!content.hidden, 'Content is visible').to.be.true;
  });

  it('Should be possible to control Disclosure with `open` and `onToggle`', () => {
    const onToggleSpy = sinon.spy();
    const { getByTestId, rerender } = render(
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

    const button = getByTestId('button');
    const content = getByTestId('content');

    expect(!content.hidden, 'Content is visible').to.be.true;

    act(() => {
      fireEvent.click(button);
    });

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

    act(() => {
      fireEvent.click(button);
    });

    expect(onToggleSpy).to.have.been.calledWith(true);
  });

  it('Should be toggled by mouseEnter/mouseLeave given `trigger=[hover]`', () => {
    const { getByTestId } = render(
      <Disclosure trigger={['hover']}>
        {(props, ref) => (
          <div ref={ref} {...props}>
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

    fireEvent.mouseEnter(getByTestId('button'));
    expect(getByTestId('content')).to.be.visible;

    fireEvent.mouseLeave(getByTestId('button'));
    expect(getByTestId('content')).not.to.be.visible;
  });

  context('Nested disclosures', () => {
    it('Should close parent disclosure when descendants are dispatching with `cascade: true`', () => {
      const ChildDisclosureContent = () => {
        const [, dispatch] = useDisclosureContext();
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

      const { getByText, getByTestId } = render(
        <Disclosure>
          {() => (
            <>
              <Disclosure.Button>
                {(props, ref) => (
                  <button ref={ref} {...props}>
                    Open parent disclosure
                  </button>
                )}
              </Disclosure.Button>
              <Disclosure.Content>
                {({ open, ...props }, ref) => (
                  <div ref={ref} {...props} hidden={!open} data-testid="parent-content">
                    <Disclosure>
                      {() => (
                        <>
                          <Disclosure.Button>
                            {(props, ref) => (
                              <button ref={ref} {...props}>
                                Open child disclosure
                              </button>
                            )}
                          </Disclosure.Button>
                          <Disclosure.Content>
                            {({ open, ...props }, ref) => (
                              <div ref={ref} {...props} hidden={!open}>
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

      userEvent.click(getByText('Open parent disclosure'));

      userEvent.click(getByText('Open child disclosure'));

      userEvent.click(getByText('Close all disclosures'));

      expect(getByTestId('parent-content')).not.to.be.visible;
    });
  });

  context('Keyboard interaction', function () {
    it('Enter: activates the disclosure control and toggles the visibility of the disclosure content.', () => {
      const { getByTestId } = render(
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

      const button = getByTestId('button');
      const content = getByTestId('content');

      act(() => {
        fireEvent.keyDown(button, { key: 'Enter' });
      });

      expect(!content.hidden, 'Shows the content').to.be.true;

      act(() => {
        fireEvent.keyDown(button, { key: 'Enter' });
      });

      expect(content.hidden, 'Hides the content').to.be.true;
    });
    it('Space: activates the disclosure control and toggles the visibility of the disclosure content.', () => {
      const { getByTestId } = render(
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

      const button = getByTestId('button');
      const content = getByTestId('content');

      act(() => {
        fireEvent.keyDown(button, { key: ' ' });
      });

      expect(!content.hidden, 'Shows the content').to.be.true;

      act(() => {
        fireEvent.keyDown(button, { key: ' ' });
      });

      expect(content.hidden, 'Hides the content').to.be.true;
    });
  });
});
