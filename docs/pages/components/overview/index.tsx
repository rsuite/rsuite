import React from 'react';
import usePages, { type MenuItem } from '@/utils/usePages';
import DefaultPage from '@/components/Page';
import { useApp } from '@/components/AppContext';
import { ButtonGroup, HStack, IconButton, Input, InputGroup, Text } from 'rsuite';
import CategorizedList from '@/components/CategorizedList';
import SortedList from '@/components/SortedList';

import SearchIcon from '@rsuite/icons/Search';
import { FaSortAlphaUp, FaList } from 'react-icons/fa';

function includes(str: string, keyword: string) {
  return str.toLowerCase().includes(keyword.toLowerCase());
}

const filterComponents = (item: MenuItem, search: string) => {
  const { name, title, keywords, apis, components } = item;

  return (
    includes(name, search) ||
    includes(title, search) ||
    keywords?.some(keyword => includes(keyword, search)) ||
    apis?.some(api => includes(api, search)) ||
    components?.some(component => includes(component, search))
  );
};

export default function Page() {
  const { language, locales } = useApp();
  const pages = usePages();
  const [type, setType] = React.useState<'category' | 'sorted'>('category');
  const [search, setSearch] = React.useState('');

  const components = (pages?.[1]?.children).filter(
    item => !['overview', 'css-packs'].includes(item.id) && filterComponents(item, search)
  );

  return (
    <DefaultPage>
      <div className="component-overview">
        <HStack className="toolbar" spacing={10}>
          <ButtonGroup className="group" size="lg">
            <IconButton
              icon={<FaList />}
              active={type === 'category'}
              onClick={() => setType('category')}
            />
            <IconButton
              icon={<FaSortAlphaUp />}
              active={type === 'sorted'}
              onClick={() => setType('sorted')}
            />
          </ButtonGroup>
          <InputGroup inside className="component-search-input" size="lg">
            <Input
              placeholder={locales.common.searchComponents}
              onChange={value => setSearch(value)}
              autoComplete="off"
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </HStack>

        {type === 'category' ? (
          <CategorizedList components={components} language={language} />
        ) : (
          <SortedList components={components} />
        )}
      </div>
      <hr />
      <Text>
        {locales.components.noComponent}

        <a
          href="https://github.com/rsuite/rsuite/issues/new?assignees=&labels=feature+request&projects=&template=2.feature_request.md&title="
          target="_blank"
          rel="noreferrer"
        >
          {locales.components.requestNewComponent}
        </a>
      </Text>
    </DefaultPage>
  );
}
