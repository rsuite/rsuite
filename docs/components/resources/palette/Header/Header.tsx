import React from 'react';
import NoticeIcon from '@rsuite/icons/Notice';
import GearIcon from '@rsuite/icons/Gear';
import { Stack, Badge, Avatar, IconButton } from 'rsuite';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <Stack className={styles['header']} spacing={8}>
      <IconButton
        icon={
          <Badge content={5}>
            <NoticeIcon style={{ fontSize: 20 }} />
          </Badge>
        }
      />
      <IconButton icon={<GearIcon style={{ fontSize: 20 }} />} />
      <Avatar
        size="sm"
        circle
        src="https://avatars.githubusercontent.com/u/1203827"
        alt="@simonguo"
        style={{ marginLeft: 8 }}
      />
    </Stack>
  );
};

export default Header;
