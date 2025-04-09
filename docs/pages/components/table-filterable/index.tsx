import React from 'react';
import {
  Table,
  Button,
  Input,
  InputGroup,
  TagPicker,
  SelectPicker,
  CheckPicker,
  Toggle,
  InputNumber,
  DateRangePicker,
  DatePicker,
  InputPicker,
  VStack,
  HStack,
  Popover,
  Dropdown,
  Menu,
  Whisper,
  IconButton,
  Tag,
  Box
} from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
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
        TagPicker,
        SelectPicker,
        CheckPicker,
        InputPicker,
        Toggle,
        InputNumber,
        DateRangePicker,
        DatePicker,
        VStack,
        HStack,
        Popover,
        Dropdown,
        Menu,
        Whisper,
        IconButton,
        Tag,
        Box,
        faker,
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
