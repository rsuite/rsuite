import React, { useState, useEffect, useRef } from 'react';
import FakeBrowser from '../FakeBrowser';
import Icon from '@rsuite/icons/Icon';
import hljs from 'highlight.js';
import {
  HStack,
  IconButton,
  Loader,
  Divider,
  Message,
  useMediaQuery,
  SegmentedControl
} from 'rsuite';
import { useApp } from '@/hooks/useApp';
import {
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoTabletPortraitOutline,
  IoExpandOutline,
  IoLogoGithub
} from 'react-icons/io5';

import styles from './Simulation.module.scss';

type Device = 'desktop' | 'tablet' | 'mobile';
type Type = 'preview' | 'code';

interface SimulationProps {
  componentName: string;
  example: string;
  defaultDevice?: Device;
}

const DeviceFrame = ({ style, children }) => (
  <FakeBrowser className={styles['rs-device-frame']} style={style}>
    {children}
  </FakeBrowser>
);

const Simulation: React.FC<SimulationProps> = ({
  componentName,
  example,
  defaultDevice = 'mobile'
}) => {
  const [device, setDevice] = useState(defaultDevice);
  const [type, setType] = useState<Type>('preview');
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { locales } = useApp();
  const codeRef = useRef<HTMLElement>(null);
  const exampleUrl = `/components/${componentName}/examples?example=${example}`;
  const [isMobile] = useMediaQuery('xs');

  const typeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  const deviceOptions = [
    { value: 'desktop', label: <IoDesktopOutline title={locales?.common.desktop} size={20} /> },
    {
      value: 'tablet',
      label: <IoTabletPortraitOutline title={locales?.common.tablet} size={20} />
    },
    { value: 'mobile', label: <IoPhonePortraitOutline title={locales?.common.mobile} size={20} /> },
    {
      value: 'openInNewTab',
      label: <IoExpandOutline title={locales?.common.openInNewTab} size={20} />
    }
  ];

  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 767, height: 1024 };
      default:
        return { width: '100%', height: 600 };
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

  if (isMobile) {
    return (
      <Message type="warning" showIcon bordered>
        Please preview on a computer
      </Message>
    );
  }

  return (
    <div className={styles['rs-simulation']}>
      <HStack justify="space-between" align="flex-start">
        <SegmentedControl data={deviceOptions} value={device} onChange={handleChangeDevice} />

        <HStack spacing={8}>
          <SegmentedControl
            data={typeOptions}
            value={type}
            onChange={value => setType(value as Type)}
          />
          <IconButton
            icon={<Icon as={IoLogoGithub} style={{ fontSize: 16 }} />}
            target="_blank"
            title={locales?.common.seeTheSourceOnGitHub}
            href={`https://github.com/rsuite/rsuite/tree/main/docs/pages/components/${componentName}/examples/${example}.tsx`}
          />
        </HStack>
      </HStack>

      <Divider />

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
