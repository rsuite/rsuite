import React from 'react';
import Box from '../Box';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { StyleManager } from '@/internals/styled-system/style-manager';
import { CustomContext } from '@/internals/Provider/CustomContext';

// Mock StyleManager
vi.mock('@/internals/styled-system/style-manager', () => ({
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

    expect(cssRules).toContain('--rs-box-rounded: var(--rs-radius-md)');
    expect(cssRules).toContain('--rs-box-rounded: var(--rs-radius-md)');

    expect(cssRules).toContain('border-radius: var(--rs-box-rounded)');
  });

  it('Should render with full border radius', () => {
    render(<Box rounded="full">Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-rounded: var(--rs-radius-full)');

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

  it('Should render with position props', () => {
    render(
      <Box
        pos="absolute"
        top="10px"
        left="20px"
        right="30px"
        bottom="40px"
        insetx="50px"
        insety="60px"
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-pos: absolute');
    expect(cssRules).toContain('--rs-box-top: 10px');
    expect(cssRules).toContain('--rs-box-left: 20px');
    expect(cssRules).toContain('--rs-box-right: 30px');
    expect(cssRules).toContain('--rs-box-bottom: 40px');
    expect(cssRules).toContain('--rs-box-insetx: 50px');
    expect(cssRules).toContain('--rs-box-insety: 60px');

    expect(cssRules).toContain('position: var(--rs-box-pos)');
    expect(cssRules).toContain('top: var(--rs-box-top)');
    expect(cssRules).toContain('left: var(--rs-box-left)');
    expect(cssRules).toContain('right: var(--rs-box-right)');
    expect(cssRules).toContain('bottom: var(--rs-box-bottom)');
  });

  it('Should render with background props', () => {
    render(
      <Box
        bg="blue.500"
        bgc="red.500"
        bgi="url('image.jpg')"
        bga="fixed"
        bgr="no-repeat"
        bgsz="cover"
        bgp="center"
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-bg: var(--rs-blue-500)');
    expect(cssRules).toContain('--rs-box-bgc: var(--rs-red-500)');
    expect(cssRules).toContain("--rs-box-bgi: url('image.jpg')");
    expect(cssRules).toContain('--rs-box-bga: fixed');
    expect(cssRules).toContain('--rs-box-bgr: no-repeat');
    expect(cssRules).toContain('--rs-box-bgsz: cover');
    expect(cssRules).toContain('--rs-box-bgp: center');

    expect(cssRules).toContain('background: var(--rs-box-bg)');
    expect(cssRules).toContain('background-color: var(--rs-box-bgc)');
    expect(cssRules).toContain('background-image: var(--rs-box-bgi)');
    expect(cssRules).toContain('background-attachment: var(--rs-box-bga)');
    expect(cssRules).toContain('background-repeat: var(--rs-box-bgr)');
    expect(cssRules).toContain('background-size: var(--rs-box-bgsz)');
    expect(cssRules).toContain('background-position: var(--rs-box-bgp)');
  });

  it('Should render with typography props', () => {
    render(
      <Box
        ff="Arial, sans-serif"
        fs="16px"
        fw="bold"
        ta="center"
        tt="uppercase"
        td="underline"
        lts="1px"
        lh="1.5"
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-ff: Arial, sans-serif');
    expect(cssRules).toContain('--rs-box-fs: 16px');
    expect(cssRules).toContain('--rs-box-fw: bold');
    expect(cssRules).toContain('--rs-box-ta: center');
    expect(cssRules).toContain('--rs-box-tt: uppercase');
    expect(cssRules).toContain('--rs-box-td: underline');
    expect(cssRules).toContain('--rs-box-lts: 1px');
    expect(cssRules).toContain('--rs-box-lh: 1.5');

    expect(cssRules).toContain('font-family: var(--rs-box-ff)');
    expect(cssRules).toContain('font-size: var(--rs-box-fs)');
    expect(cssRules).toContain('font-weight: var(--rs-box-fw)');
    expect(cssRules).toContain('text-align: var(--rs-box-ta)');
    expect(cssRules).toContain('text-transform: var(--rs-box-tt)');
    expect(cssRules).toContain('text-decoration: var(--rs-box-td)');
    expect(cssRules).toContain('letter-spacing: var(--rs-box-lts)');
    expect(cssRules).toContain('line-height: var(--rs-box-lh)');
  });

  it('Should render with flex props', () => {
    render(
      <Box gap="10px" rowgap="15px" colgap="20px" align="center" justify="space-between">
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;
    const cssRules = addRuleCalls[0][1];

    expect(cssRules).toContain('--rs-box-gap: 10px');
    expect(cssRules).toContain('--rs-box-rowgap: 15px');
    expect(cssRules).toContain('--rs-box-colgap: 20px');
    expect(cssRules).toContain('--rs-box-align: center');
    expect(cssRules).toContain('--rs-box-justify: space-between');

    expect(cssRules).toContain('gap: var(--rs-box-gap)');
    expect(cssRules).toContain('row-gap: var(--rs-box-rowgap)');
    expect(cssRules).toContain('column-gap: var(--rs-box-colgap)');
    expect(cssRules).toContain('align-items: var(--rs-box-align)');
    expect(cssRules).toContain('justify-content: var(--rs-box-justify)');
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

    expect(cssRules).toContain('--rs-box-shadow: var(--rs-shadow-lg)');

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
    expect(cssRules).toContain('--rs-box-rounded: var(--rs-radius-md)');
    expect(cssRules).toContain('--rs-box-shadow: var(--rs-shadow-lg)');
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

  describe('Native CSS properties', () => {
    it('Should handle standard CSS properties but not defined in cssSystemPropAlias', () => {
      render(
        <Box
          {...({
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            textDecorationColor: 'red'
          } as any)}
        >
          Content
        </Box>
      );

      expect(StyleManager.addRule).toHaveBeenCalled();
      const addRuleCalls = (StyleManager.addRule as any).mock.calls;
      const cssRules = addRuleCalls[0][1];

      expect(cssRules).toContain('--rs-box-td: underline');
      expect(cssRules).toContain('--rs-box-tds: dotted');
      expect(cssRules).toContain('--rs-box-tdc: var(--rs-color-red)');

      expect(cssRules).toContain('text-decoration: var(--rs-box-td)');
      expect(cssRules).toContain('text-decoration-style: var(--rs-box-tds)');
      expect(cssRules).toContain('text-decoration-color: var(--rs-box-tdc)');
    });

    it('Should handle standard CSS properties not defined', () => {
      render(<Box {...({ flexBasis: '25%' } as any)}>Content</Box>);

      expect(StyleManager.addRule).toHaveBeenCalled();
      const addRuleCalls = (StyleManager.addRule as any).mock.calls;
      const cssRules = addRuleCalls[0][1];

      expect(cssRules).toContain('--rs-box-basis: 25%');
      expect(cssRules).toContain('flex-basis: var(--rs-box-basis)');
    });
  });
});
