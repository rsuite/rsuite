import React from 'react';
import mergeRefs from '../mergeRefs';

export function MergedRefConsumer({
  callback
}: {
  callback?: React.RefCallback<HTMLDivElement> | null;
}) {
  const objectRef = React.useRef<HTMLDivElement | null>(null);
  const legacyCallback = (node: HTMLDivElement | null) => node?.focus();
  const cleanupCallback = (node: HTMLDivElement | null) => {
    if (node) return () => node.blur();
  };
  const composed: React.RefCallback<HTMLDivElement> = mergeRefs(
    mergeRefs(objectRef, callback),
    mergeRefs(legacyCallback, cleanupCallback)
  );
  const absent: React.RefCallback<HTMLDivElement> = mergeRefs(undefined, null);
  absent(null);

  // @ts-expect-error Merged refs retain their element type.
  composed('not an element');
  // @ts-expect-error Object refs must match the merged element type.
  mergeRefs<HTMLDivElement>(React.createRef<HTMLButtonElement>());

  return <div ref={composed} />;
}
