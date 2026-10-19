import React from 'react';
import Splitter from '../Splitter';
import CustomProvider from '../../CustomProvider';
import type { SplitterResizeEvent } from '../useSplitterResize';

export interface ResizeRecord {
  id: string;
  sizes: number[];
  trusted: boolean;
  type: string;
}

declare global {
  interface Window {
    splitterHydrated: boolean;
    splitterHydrationErrors: string[];
    splitterResizeRecords: ResizeRecord[];
    splitterReactVersion: string;
    splitterServerHTML: string;
  }
}

function record(id: string, sizes: number[], event: SplitterResizeEvent) {
  window.splitterResizeRecords.push({
    id,
    sizes,
    trusted: event.nativeEvent.isTrusted,
    type: event.type
  });
}

export default function SplitterHydrationFixture() {
  return (
    <>
      <Splitter
        id="horizontal"
        defaultSizes={[40, 60]}
        gap={16}
        style={{
          width: 640,
          height: 150,
          padding: 20,
          border: '4px solid',
          transform: 'scale(1.1)',
          transformOrigin: 'top left',
          marginBottom: 30
        }}
        onResize={(sizes, event) => record('horizontal', sizes, event)}
      >
        <Splitter.Panel
          id="explorer"
          aria-labelledby="explorer-title"
          minSize={20}
          maxSize={70}
          style={{ padding: 12 }}
        >
          <h2 id="explorer-title">Explorer</h2>
        </Splitter.Panel>
        <Splitter.Panel minSize={10} style={{ padding: 8 }}>
          Workspace
        </Splitter.Panel>
      </Splitter>
      <Splitter
        id="vertical"
        orientation="vertical"
        gap={16}
        style={{
          width: 640,
          height: 200,
          padding: 20,
          border: '4px solid',
          transform: 'scale(1.1)',
          transformOrigin: 'top left',
          marginBottom: 30
        }}
        onResize={(sizes, event) => record('vertical', sizes, event)}
      >
        <Splitter.Panel aria-label="Output" minSize={10} />
        <Splitter.Panel minSize={20} />
      </Splitter>
      <CustomProvider rtl>
        <Splitter
          id="rtl"
          gap={16}
          style={{
            width: 640,
            height: 150,
            padding: 20,
            border: '4px solid',
            transform: 'scale(1.1)',
            transformOrigin: 'top left'
          }}
          onResize={(sizes, event) => record('rtl', sizes, event)}
        >
          <Splitter.Panel aria-label="RTL navigation" minSize={20} />
          <Splitter.Panel minSize={20} />
        </Splitter>
      </CustomProvider>
      {(['horizontal', 'vertical'] as const).map(orientation => (
        <Splitter
          key={orientation}
          id={`padded-${orientation}`}
          orientation={orientation}
          defaultSizes={[25, 75]}
          gap={16}
          style={{ width: 640, height: 200, padding: 20, marginTop: 30 }}
          onResize={(sizes, event) => record(`padded-${orientation}`, sizes, event)}
        >
          <Splitter.Panel
            aria-label={`Padded ${orientation}`}
            tabIndex={0}
            p={20}
            style={{ border: '2px solid' }}
          >
            Primary
            <input aria-label={`Primary ${orientation}`} defaultValue="Draft" />
          </Splitter.Panel>
          <Splitter.Panel p={12} style={{ border: '2px solid' }}>
            Secondary
            <input aria-label={`Secondary ${orientation}`} />
          </Splitter.Panel>
        </Splitter>
      ))}
    </>
  );
}
