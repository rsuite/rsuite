import React from 'react';
import {
  Table,
  Button,
  Input,
  IconButton,
  InputNumber,
  DatePicker,
  DateInput,
  VStack,
  HStack,
  CheckPicker,
  Popover,
  Dropdown,
  Whisper
} from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { importFakerString, mockUsers, mockUsersString, sandboxFakerVersion } from '@/utils/mock';
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc';
import { IoMdMore } from 'react-icons/io';
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { BiHide } from 'react-icons/bi';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
        IconButton,
        Input,
        InputNumber,
        DatePicker,
        CheckPicker,
        DateInput,
        VStack,
        HStack,
        Popover,
        Dropdown,
        Whisper,
        faker,
        HTML5Backend,
        useDrag,
        useDrop,
        DndProvider,
        FaAlignLeft,
        FaAlignCenter,
        FaAlignRight,
        FaArrowDown,
        FaArrowUp,
        BiHide,
        VscEdit,
        VscSave,
        VscRemove,
        IoMdMore,
        mockUsers
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
