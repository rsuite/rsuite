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
  IoLogoGithub,
  IoCodeSlash
} from 'react-icons/io5';

type Device = 'desktop' | 'tablet' | 'mobile' | 'code';

interface SimulationProps {
  componentName: string;
  example: string;
  defaultDevice?: Device;
}

const DeviceFrame = ({ width, height, children }) => (
  <FakeBrowser className="rs-device-frame" style={{ width, height }}>
    {children}
  </FakeBrowser>
);

const Simulation: React.FC<SimulationProps> = ({
  componentName,
  example,
  defaultDevice = 'desktop'
}) => {
  const [device, setDevice] = useState(defaultDevice);
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { locales } = useApp();
  const codeRef = useRef<HTMLElement>(null);

  // 根据设备类型设置尺寸
  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      default:
        return { width: '100%', height: 500 };
    }
  };

  const dimensions = getDeviceDimensions();

  useEffect(() => {
    if (device === 'code' && !sourceCode) {
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
  }, [device, componentName, example]);

  useEffect(() => {
    if (codeRef.current && sourceCode) {
      hljs.highlightElement(codeRef.current);
    }
  }, [sourceCode]);

  return (
    <div className="rs-simulation">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <HStack spacing={8}>
          <Tabs
            appearance="pills"
            activeKey={device}
            onSelect={(key: string) => setDevice(key as Device)}
          >
            <Tabs.Tab
              eventKey="desktop"
              title={<IoDesktopOutline title={locales?.common.desktop} />}
            />
            <Tabs.Tab
              eventKey="tablet"
              title={<IoTabletPortraitOutline title={locales?.common.tablet} />}
            />
            <Tabs.Tab
              eventKey="mobile"
              title={<IoPhonePortraitOutline title={locales?.common.mobile} />}
            />
            <Tabs.Tab eventKey="code" title={<IoCodeSlash title={locales?.common.code} />} />
          </Tabs>
        </HStack>

        <IconButton
          size="sm"
          icon={<Icon as={IoLogoGithub} style={{ fontSize: 16 }} />}
          target="_blank"
          title={locales?.common.seeTheSourceOnGitHub}
          href={`https://github.com/rsuite/rsuite/tree/main/docs/pages/components/${componentName}/examples/${example}.tsx`}
        />
      </HStack>

      <DeviceFrame width={dimensions.width} height={dimensions.height}>
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
          <pre className="hljs" style={{ display: device === 'code' ? 'block' : 'none' }}>
            <code ref={codeRef} className="typescript">
              {sourceCode}
            </code>
          </pre>
        )}
        <iframe
          src={`/components/${componentName}/examples?example=${example}`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: device === 'code' ? 'none' : 'block'
          }}
        />
      </DeviceFrame>
    </div>
  );
};

export default Simulation;
