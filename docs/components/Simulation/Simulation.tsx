import React, { useState } from 'react';
import FakeBrowser from '../FakeBrowser';
import Icon from '@rsuite/icons/Icon';
import { Tabs, HStack, IconButton } from 'rsuite';
import { useApp } from '../AppContext';
import {
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoTabletPortraitOutline,
  IoLogoGithub
} from 'react-icons/io5';

type Device = 'desktop' | 'tablet' | 'mobile';

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
  const { locales } = useApp();

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

  return (
    <div className="rs-simulation">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <Tabs
          appearance="pills"
          activeKey={device}
          onSelect={(key: string) => setDevice(key as Device)}
        >
          <Tabs.Tab
            eventKey="desktop"
            title={<IoDesktopOutline title={locales.common?.desktop} />}
          />
          <Tabs.Tab
            eventKey="tablet"
            title={<IoTabletPortraitOutline title={locales.common?.tablet} />}
          />
          <Tabs.Tab
            eventKey="mobile"
            title={<IoPhonePortraitOutline title={locales.common?.mobile} />}
          />
        </Tabs>

        <IconButton
          size="sm"
          icon={<Icon as={IoLogoGithub} style={{ fontSize: 16 }} />}
          target="_blank"
          title={locales.common?.seeTheSourceOnGitHub}
          href={`https://github.com/rsuite/rsuite/tree/main/docs/pages/components/${componentName}/examples/${example}.tsx`}
        />
      </HStack>

      <DeviceFrame width={dimensions.width} height={dimensions.height}>
        <iframe
          src={`/components/${componentName}/examples?example=${example}`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </DeviceFrame>
    </div>
  );
};

export default Simulation;
