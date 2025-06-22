import React from 'react';
import Box from '../Box';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { StyleManager } from '@/internals/utils/style-sheet/style-manager';
import { CustomContext } from '@/internals/Provider/CustomContext';

// Mock StyleManager
vi.mock('@/internals/utils/style-sheet/style-manager', () => ({
  StyleManager: {
    addRule: vi.fn(),
    removeRule: vi.fn()
  }
}));

describe('Box', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  testStandardProps(<Box />, { hasClassPrefix: false });

  it('Should render a div by default', () => {
    render(<Box>Content</Box>);
    const element = screen.getByText('Content');

    expect(element.tagName).to.equal('DIV');
    expect(element).to.not.have.attr('data-rs', 'box');
    expect(element).to.have.text('Content');
  });

  it('Should render with custom element', () => {
    render(<Box as="section">Content</Box>);
    const element = screen.getByText('Content');

    expect(element.tagName).to.equal('SECTION');
  });

  it('Should render with showFrom prop (hidden below breakpoint)', () => {
    render(<Box showFrom="sm">Content</Box>);
    const element = screen.getByText('Content');

    expect(element).to.have.attr('data-visible-from', 'sm');
  });

  it('Should render with hideFrom prop (hidden above breakpoint)', () => {
    render(<Box hideFrom="md">Content</Box>);
    const element = screen.getByText('Content');

    expect(element).to.have.attr('data-hidden-from', 'md');
  });

  it('Should render with display prop', () => {
    render(<Box display="flex">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-display: flex');
    expect(cssRules).toContain('display: var(--rs-box-display)');
  });

  it('Should render with multiple props', () => {
    render(
      <Box showFrom="sm" hideFrom="md" display="flex" className="custom-class">
        Content
      </Box>
    );
    const element = screen.getByText('Content');

    expect(element).to.have.attr('data-visible-from', 'sm');
    expect(element).to.have.attr('data-hidden-from', 'md');
    expect(element).to.have.class('custom-class');

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-display: flex');
    expect(cssRules).toContain('display: var(--rs-box-display)');
  });

  it('Should forward ref to the element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);

    expect(ref.current).to.exist;
    expect(ref.current?.tagName).to.equal('DIV');
  });

  it('Should render with padding props', () => {
    render(
      <Box p="10px" pt="5px" pb="15px" pl="20px" pr="25px" px="30px" py="35px">
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-p: 10px');
    expect(cssRules).toContain('--rs-box-pt: 5px');
    expect(cssRules).toContain('--rs-box-pb: 15px');
    expect(cssRules).toContain('--rs-box-p: 10px');
    expect(cssRules).toContain('--rs-box-pt: 5px');
    expect(cssRules).toContain('--rs-box-pb: 15px');
    expect(cssRules).toContain('--rs-box-pl: 20px');
    expect(cssRules).toContain('--rs-box-pr: 25px');
    expect(cssRules).toContain('--rs-box-px: 30px');
    expect(cssRules).toContain('--rs-box-py: 35px');

    // Check CSS properties are applied via CSS variables
    expect(cssRules).toContain('padding: var(--rs-box-p)');
    expect(cssRules).toContain('padding-top: var(--rs-box-pt)');
    expect(cssRules).toContain('padding-bottom: var(--rs-box-pb)');
    expect(cssRules).toContain('padding-left: var(--rs-box-pl)');
    expect(cssRules).toContain('padding-right: var(--rs-box-pr)');
  });

  it('Should render with margin props', () => {
    render(
      <Box m="10px" mt="5px" mb="15px" ml="20px" mr="25px" mx="30px" my="35px">
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-m: 10px');
    expect(cssRules).toContain('--rs-box-mt: 5px');
    expect(cssRules).toContain('--rs-box-mb: 15px');
    expect(cssRules).toContain('--rs-box-ml: 20px');
    expect(cssRules).toContain('--rs-box-mr: 25px');
    expect(cssRules).toContain('--rs-box-mx: 30px');
    expect(cssRules).toContain('--rs-box-my: 35px');

    expect(cssRules).toContain('margin: var(--rs-box-m)');
    expect(cssRules).toContain('margin-top: var(--rs-box-mt)');
    expect(cssRules).toContain('margin-bottom: var(--rs-box-mb)');
    expect(cssRules).toContain('margin-left: var(--rs-box-ml)');
    expect(cssRules).toContain('margin-right: var(--rs-box-mr)');
  });

  it('Should render with width and height props', () => {
    render(
      <Box w="200px" h="100px">
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-w: 200px');
    expect(cssRules).toContain('--rs-box-h: 100px');

    expect(cssRules).toContain('width: var(--rs-box-w)');
    expect(cssRules).toContain('height: var(--rs-box-h)');
  });

  it('Should render with min/max width and height props', () => {
    render(
      <Box minw="100px" maxw="300px" minh="50px" maxh="150px">
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-minw: 100px');
    expect(cssRules).toContain('--rs-box-maxw: 300px');
    expect(cssRules).toContain('--rs-box-minh: 50px');
    expect(cssRules).toContain('--rs-box-minw: 100px');
    expect(cssRules).toContain('--rs-box-maxw: 300px');
    expect(cssRules).toContain('--rs-box-minh: 50px');
    expect(cssRules).toContain('--rs-box-maxh: 150px');

    expect(cssRules).toContain('min-width: var(--rs-box-minw)');
    expect(cssRules).toContain('max-width: var(--rs-box-maxw)');
    expect(cssRules).toContain('min-height: var(--rs-box-minh)');
    expect(cssRules).toContain('max-height: var(--rs-box-maxh)');
  });

  it('Should render with color prop', () => {
    render(<Box c="red">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-c: var(--rs-color-red)');

    expect(cssRules).toContain('color: var(--rs-box-c)');
  });

  it('Should render with color scheme prop', () => {
    render(<Box c="blue.500">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-c: var(--rs-blue-500)');

    expect(cssRules).toContain('color: var(--rs-box-c)');
  });

  it('Should render with background color prop', () => {
    render(<Box bg="#f5f5f5">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-bg: #f5f5f5');

    expect(cssRules).toContain('background: var(--rs-box-bg)');
  });

  it('Should render with background color scheme prop', () => {
    render(<Box bg="green.500">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-bg: var(--rs-green-500)');

    expect(cssRules).toContain('background: var(--rs-box-bg)');
  });

  it('Should render with border radius prop', () => {
    render(<Box rounded="8px">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-rounded: 8px');

    expect(cssRules).toContain('border-radius: var(--rs-box-rounded)');
  });

  it('Should render with border radius size prop', () => {
    render(<Box rounded="md">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-rounded: var(--rs-box-rounded-md)');
    expect(cssRules).toContain('--rs-box-rounded: var(--rs-box-rounded-md)');

    expect(cssRules).toContain('border-radius: var(--rs-box-rounded)');
  });

  it('Should render with full border radius', () => {
    render(<Box rounded="full">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-rounded: var(--rs-box-rounded-full)');

    expect(cssRules).toContain('border-radius: var(--rs-box-rounded)');
  });

  it('Should render with border prop', () => {
    render(<Box bd="1px solid black">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-bd: 1px solid black');

    expect(cssRules).toContain('border: var(--rs-box-bd)');
  });

  it('Should render with shadow prop', () => {
    render(<Box shadow="0 2px 4px rgba(0,0,0,0.2)">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-shadow: 0 2px 4px rgba(0,0,0,0.2)');

    expect(cssRules).toContain('box-shadow: var(--rs-box-shadow)');
  });

  it('Should render with shadow size prop', () => {
    render(<Box shadow="lg">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-shadow: var(--rs-box-shadow-lg)');

    expect(cssRules).toContain('box-shadow: var(--rs-box-shadow)');
  });

  it('Should render with multiple style props', () => {
    render(
      <Box
        p="10px"
        m="15px"
        w="300px"
        h="200px"
        c="blue.100"
        bg="red.100"
        rounded="md"
        shadow="lg"
        bd="1px solid black"
        showFrom="sm"
        hideFrom="md"
      >
        Content
      </Box>
    );
    const element = screen.getByText('Content');

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-p: 10px');
    expect(cssRules).toContain('--rs-box-m: 15px');
    expect(cssRules).toContain('--rs-box-w: 300px');
    expect(cssRules).toContain('--rs-box-h: 200px');
    expect(cssRules).toContain('--rs-box-c: var(--rs-blue-100)');
    expect(cssRules).toContain('--rs-box-bg: var(--rs-red-100)');
    expect(cssRules).toContain('--rs-box-rounded: var(--rs-box-rounded-md)');
    expect(cssRules).toContain('--rs-box-shadow: var(--rs-box-shadow-lg)');
    expect(cssRules).toContain('--rs-box-bd: 1px solid black');

    expect(cssRules).toContain('padding: var(--rs-box-p)');
    expect(cssRules).toContain('margin: var(--rs-box-m)');
    expect(cssRules).toContain('width: var(--rs-box-w)');
    expect(cssRules).toContain('height: var(--rs-box-h)');
    expect(cssRules).toContain('color: var(--rs-box-c)');
    expect(cssRules).toContain('background: var(--rs-box-bg)');
    expect(cssRules).toContain('border-radius: var(--rs-box-rounded)');
    expect(cssRules).toContain('box-shadow: var(--rs-box-shadow)');
    expect(cssRules).toContain('border: var(--rs-box-bd)');

    expect(element).to.have.attr('data-visible-from', 'sm');
    expect(element).to.have.attr('data-hidden-from', 'md');
  });

  it('Should clean up styles when unmounted', () => {
    const { unmount } = render(<Box p="10px">Content</Box>);

    unmount();

    expect(StyleManager.removeRule).toHaveBeenCalled();
  });

  it('Should support CSP nonce', () => {
    const nonce = 'test-nonce';

    render(
      <CustomContext.Provider value={{ csp: { nonce } }}>
        <Box p="10px">Content</Box>
      </CustomContext.Provider>
    );

    expect(StyleManager.addRule).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
      nonce
    });
  });
});
