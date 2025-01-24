import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import DashboardIcon from '@rsuite/icons/Dashboard';
import SettingIcon from '@rsuite/icons/Setting';
import PeoplesIcon from '@rsuite/icons/Peoples';
import PieChartIcon from '@rsuite/icons/PieChart';
import DataAuthorizeIcon from '@rsuite/icons/DataAuthorize';
import GearIcon from '@rsuite/icons/Gear';
import TaskIcon from '@rsuite/icons/Task';
import EventDetailIcon from '@rsuite/icons/EventDetail';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import SearchIcon from '@rsuite/icons/Search';
import NoticeIcon from '@rsuite/icons/Notice';
import CalenderDateIcon from '@rsuite/icons/CalenderDate';
import HistoryIcon from '@rsuite/icons/History';
import PageIcon from '@rsuite/icons/Page';
import ImageIcon from '@rsuite/icons/Image';
import FolderIcon from '@rsuite/icons/Folder';
import StarIcon from '@rsuite/icons/Star';
import TrashIcon from '@rsuite/icons/Trash';
import {
  Sidenav,
  Nav,
  Button,
  Toggle,
  HStack,
  VStack,
  Input,
  InputGroup,
  Badge,
  Modal,
  Placeholder
} from 'rsuite';
import { SiProtondb } from 'react-icons/si';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Sidenav', 'Nav']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Sidenav,
        Nav,
        Button,
        Badge,
        HStack,
        VStack,
        Toggle,
        Input,
        InputGroup,
        Modal,
        Placeholder,
        SettingIcon,
        PeoplesIcon,
        OperatePeopleIcon,
        DashboardIcon,
        PieChartIcon,
        DataAuthorizeIcon,
        EventDetailIcon,
        CalenderDateIcon,
        HistoryIcon,
        TaskIcon,
        GearIcon,
        SearchIcon,
        NoticeIcon,
        PageIcon,
        ImageIcon,
        FolderIcon,
        StarIcon,
        TrashIcon,
        SiProtondb
      }}
    />
  );
}
