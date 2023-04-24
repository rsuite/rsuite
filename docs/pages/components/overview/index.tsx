import React from 'react';
import usePages from '@/utils/usePages';
import DefaultPage from '@/components/Page';
import AppContext from '@/components/AppContext';
import { ButtonGroup, IconButton, Input, InputGroup } from 'rsuite';
import CategorizedList from '@/components/CategorizedList';
import SortedList from '@/components/SortedList';

import SearchIcon from '@rsuite/icons/Search';
import { FaSortAlphaUp, FaList } from 'react-icons/fa';

export default function Page() {
  const { language, messages } = React.useContext(AppContext);
  const pages = usePages();
  const [type, setType] = React.useState<'category' | 'sorted'>('category');
  const [search, setSearch] = React.useState('');

  const filterComponents = (name: string, title: string) => {
    if (language === 'zh') {
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return name.toLowerCase().includes(search.toLowerCase());
  };

  const components = (pages?.[1]?.children).filter(
    item => !['overview', 'css-packs'].includes(item.id) && filterComponents(item.name, item.title)
  );

  return (
    <DefaultPage>
      <div className="component-overview">
        <div className="toolbar">
          <ButtonGroup>
            <IconButton
              icon={<FaList />}
              active={type === 'category'}
              onClick={() => setType('category')}
            ></IconButton>
            <IconButton
              icon={<FaSortAlphaUp />}
              active={type === 'sorted'}
              onClick={() => setType('sorted')}
            ></IconButton>
          </ButtonGroup>
          <InputGroup size="md" inside className="component-search-input">
            <Input
              placeholder={messages.common.searchComponents}
              onChange={value => setSearch(value)}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </div>

        {type === 'category' ? (
          <CategorizedList components={components} language={language} />
        ) : (
          <SortedList components={components} />
        )}
      </div>
    </DefaultPage>
  );
}
