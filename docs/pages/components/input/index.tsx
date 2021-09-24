import React from 'react';
import { Input, InputNumber, InputGroup, Whisper, Tooltip, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import Search from '@rsuite/icons/Search';
import Info from '@rsuite/icons/legacy/Info';
import Avatar from '@rsuite/icons/legacy/Avatar';
import Eye from '@rsuite/icons/legacy/Eye';
import EyeSlash from '@rsuite/icons/legacy/EyeSlash';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Input,
        InputNumber,
        InputGroup,
        Whisper,
        Tooltip,
        Grid,
        Row,
        Col,
        Search,
        Info,
        Avatar,
        Eye,
        EyeSlash
      }}
    />
  );
}
