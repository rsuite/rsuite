import React from 'react';
import { Box, Button, IconButton, Uploader, type UploaderInstance } from 'rsuite';
import BoxSubpath from 'rsuite/Box';
import ButtonSubpath from 'rsuite/Button';
import IconButtonSubpath from 'rsuite/IconButton';

const divRef = React.createRef<HTMLDivElement>();
const buttonRef = React.createRef<HTMLButtonElement>();
const anchorRef = React.createRef<HTMLAnchorElement>();
const uploaderRef = React.createRef<UploaderInstance>();
function Plain(props: { label: string }) {
  return <div>{props.label}</div>;
}
const MemoPlain = React.memo(Plain);
const LazyPlain = React.lazy(async () => ({ default: Plain }));
const Forwarded = React.forwardRef<HTMLDivElement, { label: string }>((props, ref) => (
  <div ref={ref}>{props.label}</div>
));
Forwarded.displayName = 'Forwarded';
const MemoForwarded = React.memo(Forwarded);
const LazyForwarded = React.lazy(async () => ({ default: Forwarded }));
function RefProp(props: { label: string; ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={props.ref}>{props.label}</div>;
}
class ClassComponent extends React.Component<{ label: string }> {
  render() {
    return <div>{this.props.label}</div>;
  }
}
const classRef = React.createRef<ClassComponent>();
export const valid = (
  <>
    <Box as={Plain} label="Plain" />
    <Button as={Plain} label="Plain" />
    <IconButton as={Plain} label="Plain" />
    <Box as={Forwarded} label="Forwarded" ref={divRef} />
    <ButtonSubpath as={Forwarded} label="Forwarded" ref={divRef} />
    <Box as={MemoForwarded} label="Memo forwarded" ref={divRef} />
    <Box as={LazyForwarded} label="Lazy forwarded" ref={divRef} />
    <Box as={RefProp} label="Explicit ref prop" ref={divRef} />
    <Box as={ClassComponent} label="Class" ref={classRef} />
    <Button ref={buttonRef}>Save</Button>
    <Button as="a" href="/docs" ref={anchorRef}>
      Read
    </Button>
    <Uploader action="/upload" ref={uploaderRef} />
  </>
);

// @ts-expect-error Plain does not declare a ref prop.
export const plainBoxRef = <Box as={Plain} label="Plain" ref={divRef} />;
// @ts-expect-error Standalone Box retains the custom component's ref contract.
export const standalonePlainBoxRef = <BoxSubpath as={Plain} label="Plain" ref={divRef} />;
// @ts-expect-error Button cannot add ref support to a plain custom component.
export const plainButtonRef = <Button as={Plain} label="Plain" ref={divRef} />;
// @ts-expect-error Standalone Button retains the same custom ref restriction.
export const standalonePlainButtonRef = <ButtonSubpath as={Plain} label="Plain" ref={divRef} />;
// @ts-expect-error IconButton cannot add ref support to a plain custom component.
export const plainIconButtonRef = <IconButton as={Plain} label="Plain" ref={divRef} />;
// @ts-expect-error Standalone IconButton preserves the custom ref restriction.
export const standaloneIconRef = <IconButtonSubpath as={Plain} label="Plain" ref={divRef} />;
// @ts-expect-error Memoizing a plain component does not add ref support.
export const memoPlainRef = <Box as={MemoPlain} label="Memo" ref={divRef} />;
// @ts-expect-error Lazily loading a plain component does not add ref support.
export const lazyPlainRef = <Box as={LazyPlain} label="Lazy" ref={divRef} />;
// @ts-expect-error Native button refs still require a button element.
export const wrongNativeRef = <Button ref={divRef} />;
// @ts-expect-error Forwarded div refs still reject other native elements.
export const wrongForwardedRef = <Box as={Forwarded} label="Forwarded" ref={buttonRef} />;
// @ts-expect-error An explicit ref prop retains its declared target.
export const wrongRefProp = <Box as={RefProp} label="Explicit" ref={buttonRef} />;
// @ts-expect-error Class refs retain the component instance type.
export const wrongClassRef = <Box as={ClassComponent} label="Class" ref={buttonRef} />;
