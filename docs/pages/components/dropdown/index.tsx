import React from 'react';
import { Dropdown, Button, ButtonToolbar, IconButton, ButtonGroup, Popover, Whisper } from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import AngleDoubleDown from '@rsuite/icons/legacy/AngleDoubleDown';
import Save from '@rsuite/icons/legacy/Save';
import Plus from '@rsuite/icons/legacy/Plus';
import User from '@rsuite/icons/legacy/User';
import Group from '@rsuite/icons/legacy/Group';
import File from '@rsuite/icons/legacy/File';
import FileO from '@rsuite/icons/legacy/FileO';
import CloudDownload from '@rsuite/icons/legacy/CloudDownload';
import FilePdfO from '@rsuite/icons/legacy/FilePdfO';
import Html5 from '@rsuite/icons/legacy/Html5';
import Cog from '@rsuite/icons/legacy/Cog';
import Info from '@rsuite/icons/legacy/Info';
import Edit2 from '@rsuite/icons/legacy/Edit2';
import Eye from '@rsuite/icons/legacy/Eye';
import Trash from '@rsuite/icons/legacy/Trash';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Dropdown,
        Button,
        AngleDoubleDown,
        ButtonToolbar,
        IconButton,
        ButtonGroup,
        Popover,
        Whisper,
        Link,
        Save,
        Plus,
        User,
        Group,
        File,
        FileO,
        CloudDownload,
        FilePdfO,
        Html5,
        Cog,
        Info,
        Edit2,
        Trash,
        Eye,
      }}
    />
  );
}
