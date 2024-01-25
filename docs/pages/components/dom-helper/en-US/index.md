# DOMHelper

In React , we do not recommend direct manipulation of the DOM, but inside the RSUITE component, you have to directly manipulate the DOM for some considerations. If you have similar requirements, you can use this method directly.

## Import

<!--{include:<import-guide>}-->

## APIs

### class

```typescript
hasClass: (node: HTMLElement, className: string) => boolean;
addClass: (node: HTMLElement, className: string) => HTMLElement;
removeClass: (node: HTMLElement, className: string) => HTMLElement;
toggleClass: (node: HTMLElement, className: string) => HTMLElement;
```

<!--{include:`class-helper.md`}-->

### style

```typescript
addStyle: (node: HTMLElement, property: string, value: string) => void;
addStyle: (node: HTMLElement, style: Object) => void;

removeStyle: (node: HTMLElement, property: string) => void;
removeStyle: (node: HTMLElement, propertys: Array<string>) => void;

getStyle: (node: HTMLElement, property: string) => string;
getStyle: (node: HTMLElement) => Object;

```

<!--{include:`style-helper.md`}-->

### events

```typescript
on: (target: HTMLElement, eventName: string, listener: Function, capture: boolean = false) => {off: Function};
off: (target: HTMLElement, eventName: string, listener: Function, capture: boolean = false) => void;
```

<!--{include:`event-helper.md`}-->

### scroll

```typescript
scrollLeft: (node: HTMLElement) => number;
scrollLeft: (node: HTMLElement, value: number) => void;

scrollTop: (node: HTMLElement) => number;
scrollTop: (node: HTMLElement, value: number) => void;
```

<!--{include:`scroll-helper.md`}-->

### query

```typescript
getHeight: (node: HTMLElement, client: HTMLElement) => number;
getWidth: (node: HTMLElement, client: HTMLElement) => number;
getOffset: (node: HTMLElement) => Object;
getOffsetParent: (node: HTMLElement) => HTMLElement;
getPosition: (node: HTMLElement, offsetParent: HTMLElement) => Object;
contains: (context: HTMLElement, node: HTMLElement) => boolean;
```

<!--{include:`query.md`}-->

### DOMMouseMoveTracker

Mouse drag tracker

```typescript
new DOMMouseMoveTracker(
  onMove:(deltaX: number, deltaY: number, moveEvent: Object) => void,
  onMoveEnd:() => void,
  container: HTMLElement
);
```

<!--{include:`dom-mouse-move-tracker.md`}-->

### Reference

- https://github.com/react-bootstrap/react-bootstrap
- https://github.com/facebook/fbjs
