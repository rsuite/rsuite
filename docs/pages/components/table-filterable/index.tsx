import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import SearchIcon from '@rsuite/icons/Search';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import {
  Table,
  Button,
  Input,
  InputGroup,
  SelectPicker,
  CheckPicker,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  NumberInput,
  DateRangePicker,
  InputPicker,
  VStack,
  HStack,
  Popover,
  Menu,
  Whisper,
  IconButton,
  Tag,
  Box,
  Text
} from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import { importFakerString, mockUsers, mockUsersString, sandboxFakerVersion } from '@/utils/mock';
import { VscFilter, VscFilterFilled, VscSearch } from 'react-icons/vsc';
import { IoMdMore, IoIosCloseCircle } from 'react-icons/io';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { TbFilter, TbFilterOff } from 'react-icons/tb';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Table']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Table,
        Button,
        Input,
        InputGroup,
        SelectPicker,
        CheckPicker,
        InputPicker,
        NumberInput,
        DateRangePicker,
        VStack,
        HStack,
        Popover,
        Menu,
        Whisper,
        IconButton,
        Tag,
        Box,
        Text,
        faker,
        SearchIcon,
        CloseOutlineIcon,
        mockUsers,
        VscFilter,
        VscFilterFilled,
        VscSearch,
        IoMdMore,
        IoIosCloseCircle,
        FaFilter,
        FaSortAmountDown,
        FaSortAmountUp,
        TbFilter,
        TbFilterOff
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
