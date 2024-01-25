import React from 'react';
import type { StoryObj } from '@storybook/react';
import Uploader from '../Uploader';
import Button from '../../Button';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';

import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(Uploader);

export default {
  title: 'Components/Uploader',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Button>Select files...</Button>,
  action: '//jsonplaceholder.typicode.com/posts/'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Picture: Story = {
  args: {
    ...defaultArgs,
    listType: 'picture',
    children: (
      <button>
        <CameraRetroIcon />
      </button>
    )
  }
};

export const PictureAndText: Story = {
  args: {
    ...defaultArgs,
    listType: 'picture-text'
  }
};

export const DragDrop: Story = {
  args: {
    ...defaultArgs,
    draggable: true,
    children: (
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>Click or Drag files to this area to upload</span>
      </div>
    )
  }
};

export const InitialFileList: Story = {
  args: {
    ...defaultArgs,
    listType: 'picture-text',
    defaultFileList: [
      {
        name: 'IMG_20180529_110656.jpg',
        fileKey: '1546906031827-IMG_20180529_110656.jpg',
        url: 'https://img.yzcdn.cn/vant/leaf.jpg'
      },
      {
        name: 'IMG_20180529_110658.jpg',
        fileKey: '1546906031827-IMG_20180529_110658.jpg',
        url: 'https://img.yzcdn.cn/vant/tree.jpg'
      }
    ]
  }
};

export const CustomFileDescription: Story = {
  args: {
    ...defaultArgs,
    listType: 'picture-text',
    renderFileInfo: (file: any) => {
      return (
        <>
          <span>File Name: {file.name}</span>
          <p>File URL: {file.url}</p>
        </>
      );
    },
    defaultFileList: [
      {
        name: 'IMG_20180529_110656.jpg',
        fileKey: '1546906031827-IMG_20180529_110656.jpg',
        url: 'https://img.yzcdn.cn/vant/leaf.jpg'
      },
      {
        name: 'IMG_20180529_110658.jpg',
        fileKey: '1546906031827-IMG_20180529_110658.jpg',
        url: 'https://img.yzcdn.cn/vant/tree.jpg'
      }
    ]
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};
