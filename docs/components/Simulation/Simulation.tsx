import React, { useState, useEffect, useRef } from 'react';
import FakeBrowser from '../FakeBrowser';
import Icon from '@rsuite/icons/Icon';
import hljs from 'highlight.js';
import { Tabs, HStack, IconButton, Loader } from 'rsuite';
import { useApp } from '../AppContext';
import {
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoTabletPortraitOutline,
  IoExpandOutline,
  IoLogoGithub
} from 'react-icons/io5';

type Device = 'desktop' | 'tablet' | 'mobile';

interface SimulationProps {
  componentName: string;
  example: string;
  defaultDevice?: Device;
}

const DeviceFrame = ({ style, children }) => (
  <FakeBrowser className="rs-device-frame" style={style}>
    {children}
  </FakeBrowser>
);

const Simulation: React.FC<SimulationProps> = ({
  componentName,
  example,
  defaultDevice = 'desktop'
}) => {
  const [device, setDevice] = useState(defaultDevice);
  const [type, setType] = useState<'preview' | 'code'>('preview');
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { locales } = useApp();
  const codeRef = useRef<HTMLElement>(null);
  const exampleUrl = `/components/${componentName}/examples?example=${example}`;

  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      default:
        return { width: '100%', maxWidth: 960, height: 600 };
    }
  };

  const dimensions = getDeviceDimensions();

  useEffect(() => {
    if (type === 'code' && !sourceCode) {
      setLoading(true);
      fetch(`/api/sourcecode?componentName=${componentName}&example=${example}`)
        .then(res => res.json())
        .then(data => {
          if (data.sourceCode) {
            setSourceCode(data.sourceCode);
          }
        })
        .catch(error => {
          console.error('Error fetching source code:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [type, componentName, example]);

  useEffect(() => {
    if (codeRef.current && sourceCode) {
      hljs.highlightElement(codeRef.current);
    }
  }, [sourceCode]);

  const handleChangeDevice = (key: string) => {
    if (key === 'openInNewTab') {
      window.open(exampleUrl, '_blank');
      return;
    }

    setDevice(key as Device);
  };

  return (
    <div className="rs-simulation">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <Tabs appearance="pills" activeKey={device} onSelect={handleChangeDevice}>
          <Tabs.Tab
            eventKey="desktop"
            title={<IoDesktopOutline title={locales?.common.desktop} size={20} />}
          />
          <Tabs.Tab
            eventKey="tablet"
            title={<IoTabletPortraitOutline title={locales?.common.tablet} size={20} />}
          />
          <Tabs.Tab
            eventKey="mobile"
            title={<IoPhonePortraitOutline title={locales?.common.mobile} size={20} />}
          />
          <Tabs.Tab
            eventKey="openInNewTab"
            title={<IoExpandOutline title={locales?.common.openInNewTab} size={20} />}
          />
        </Tabs>

        <HStack spacing={8}>
          <Tabs
            appearance="pills"
            activeKey={type}
            onSelect={(key: 'preview' | 'code') => setType(key)}
          >
            <Tabs.Tab eventKey="preview" title="Preview" />
            <Tabs.Tab eventKey="code" title="Code" />
          </Tabs>
          <IconButton
            icon={<Icon as={IoLogoGithub} style={{ fontSize: 16 }} />}
            target="_blank"
            title={locales?.common.seeTheSourceOnGitHub}
            href={`https://github.com/rsuite/rsuite/tree/main/docs/pages/components/${componentName}/examples/${example}.tsx`}
          />
        </HStack>
      </HStack>

      <DeviceFrame style={dimensions}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Loader size="md" content="Loading..." />
          </div>
        ) : (
          <pre className="hljs" style={{ display: type === 'code' ? 'block' : 'none' }}>
            <code ref={codeRef} className="typescript">
              {sourceCode}
            </code>
          </pre>
        )}
        <iframe
          src={exampleUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: type === 'code' ? 'none' : 'block'
          }}
        />
      </DeviceFrame>
    </div>
  );
};

export default Simulation;
