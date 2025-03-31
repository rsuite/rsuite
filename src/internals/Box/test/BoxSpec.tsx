import React from 'react';
import Box from '../Box';
import { render, screen } from '@testing-library/react';
import { testStandardProps, getStyle, getCssVarValue } from '@test/utils';

describe('Box', () => {
  testStandardProps(<Box />, { hasClassPrefix: false });

  it('Should render a div by default', () => {
    render(<Box>Content</Box>);
    const box = screen.getByText('Content');

    expect(box.tagName).to.equal('DIV');
    expect(box).to.not.have.attr('data-rs', 'box');
    expect(box).to.have.text('Content');
  });

  it('Should render with custom element', () => {
    render(<Box as="section">Content</Box>);
    const box = screen.getByText('Content');

    expect(box.tagName).to.equal('SECTION');
  });

  it('Should render with showFrom prop (hidden below breakpoint)', () => {
    render(<Box showFrom="sm">Content</Box>);
    const box = screen.getByText('Content');

    expect(box).to.have.attr('data-visible-from', 'sm');
  });

  it('Should render with hideFrom prop (hidden above breakpoint)', () => {
    render(<Box hideFrom="md">Content</Box>);
    const box = screen.getByText('Content');

    expect(box).to.have.attr('data-hidden-from', 'md');
  });

  it('Should render with display prop', () => {
    render(<Box display="flex">Content</Box>);
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-display')).to.equal('flex');
  });

  it('Should render with multiple props', () => {
    render(
      <Box showFrom="sm" hideFrom="md" display="flex" className="custom-class">
        Content
      </Box>
    );
    const box = screen.getByText('Content');

    expect(box).to.have.attr('data-visible-from', 'sm');
    expect(box).to.have.attr('data-hidden-from', 'md');
    expect(box).to.have.class('custom-class');
    expect(getStyle(box, '--rs-box-display')).to.equal('flex');
  });

  it('Should forward ref to the element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);

    expect(ref.current).to.exist;
    expect(ref.current?.tagName).to.equal('DIV');
  });

  // Padding tests
  it('Should render with padding props', () => {
    render(
      <Box p="10px" pt="5px" pb="15px" pl="20px" pr="25px" px="30px" py="35px">
        Content
      </Box>
    );
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-p')).to.equal('10px');
    expect(getStyle(box, '--rs-box-pt')).to.equal('5px');
    expect(getStyle(box, '--rs-box-pb')).to.equal('15px');
    expect(getStyle(box, '--rs-box-pl')).to.equal('20px');
    expect(getStyle(box, '--rs-box-pr')).to.equal('25px');
    expect(getStyle(box, '--rs-box-px')).to.equal('30px');
    expect(getStyle(box, '--rs-box-py')).to.equal('35px');
  });

  // Margin tests
  it('Should render with margin props', () => {
    render(
      <Box m="10px" mt="5px" mb="15px" ml="20px" mr="25px" mx="30px" my="35px">
        Content
      </Box>
    );
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-m')).to.equal('10px');
    expect(getStyle(box, '--rs-box-mt')).to.equal('5px');
    expect(getStyle(box, '--rs-box-mb')).to.equal('15px');
    expect(getStyle(box, '--rs-box-ml')).to.equal('20px');
    expect(getStyle(box, '--rs-box-mr')).to.equal('25px');
    expect(getStyle(box, '--rs-box-mx')).to.equal('30px');
    expect(getStyle(box, '--rs-box-my')).to.equal('35px');
  });

  // Size tests
  it('Should render with width and height props', () => {
    render(
      <Box w="200px" h="100px">
        Content
      </Box>
    );
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-w')).to.equal('200px');
    expect(getStyle(box, '--rs-box-h')).to.equal('100px');
  });

  // Min/Max size tests
  it('Should render with min/max width and height props', () => {
    render(
      <Box minw="100px" maxw="300px" minh="50px" maxh="150px">
        Content
      </Box>
    );
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-minw')).to.equal('100px');
    expect(getStyle(box, '--rs-box-maxw')).to.equal('300px');
    expect(getStyle(box, '--rs-box-minh')).to.equal('50px');
    expect(getStyle(box, '--rs-box-maxh')).to.equal('150px');
  });

  // Color tests
  it('Should render with color prop', () => {
    render(<Box c="red">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-c')).to.equal('var(--rs-color-red)');
  });

  it('Should render with color scheme prop', () => {
    render(<Box c="blue.500">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-c')).to.equal('var(--rs-blue-500)');
  });

  // Background tests
  it('Should render with background color prop', () => {
    render(<Box bg="#f5f5f5">Content</Box>);
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-bg')).to.equal('#f5f5f5');
  });

  it('Should render with background color scheme prop', () => {
    render(<Box bg="green.500">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-bg')).to.equal('var(--rs-green-500)');
  });

  // Border radius tests
  it('Should render with border radius prop', () => {
    render(<Box rounded="8px">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-rounded')).to.equal('8px');
  });

  it('Should render with border radius size prop', () => {
    render(<Box rounded="md">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-rounded')).to.equal('var(--rs-box-rounded-md)');
  });

  it('Should render with full border radius', () => {
    render(<Box rounded="full">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-rounded')).to.equal('var(--rs-box-rounded-full)');
  });

  // Border tests
  it('Should render with border prop', () => {
    render(<Box bd="1px solid black">Content</Box>);
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-bd')).to.equal('1px solid black');
  });

  // Shadow tests
  it('Should render with shadow prop', () => {
    render(<Box shadow="0 2px 4px rgba(0,0,0,0.2)">Content</Box>);
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-shadow')).to.equal('0 2px 4px rgba(0,0,0,0.2)');
  });

  it('Should render with shadow size prop', () => {
    render(<Box shadow="lg">Content</Box>);
    const box = screen.getByText('Content');

    expect(getCssVarValue(box, '--rs-box-shadow')).to.equal('var(--rs-box-shadow-lg)');
  });

  // Combined props test
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
    const box = screen.getByText('Content');

    expect(getStyle(box, '--rs-box-p')).to.equal('10px');
    expect(getStyle(box, '--rs-box-m')).to.equal('15px');
    expect(getStyle(box, '--rs-box-w')).to.equal('300px');
    expect(getStyle(box, '--rs-box-h')).to.equal('200px');
    expect(getCssVarValue(box, '--rs-box-c')).to.equal('var(--rs-blue-100)');
    expect(getCssVarValue(box, '--rs-box-bg')).to.equal('var(--rs-red-100)');
    expect(getCssVarValue(box, '--rs-box-rounded')).to.equal('var(--rs-box-rounded-md)');
    expect(getCssVarValue(box, '--rs-box-shadow')).to.equal('var(--rs-box-shadow-lg)');
    expect(getStyle(box, '--rs-box-bd')).to.equal('1px solid black');
    expect(box).to.have.attr('data-visible-from', 'sm');
    expect(box).to.have.attr('data-hidden-from', 'md');
  });
});
