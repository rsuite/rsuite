import React from 'react';
import usePages from '@/utils/usePages';
import DefaultPage from '@/components/Page';
import AppContext from '@/components/AppContext';
import { ButtonGroup, IconButton } from 'rsuite';
import CategorizedList from './CategorizedList';
import SortedList from './SortedList';

import { FaSortAlphaUp, FaList } from 'react-icons/fa';

export default function Page() {
  const { language } = React.useContext(AppContext);
  const pages = usePages();
  const [type, setType] = React.useState<'category' | 'sorted'>('category');

  const components = (pages?.[1]?.children).filter(
    item => item.id !== 'overview' && item.id !== 'css-packs'
  );

  return (
    <DefaultPage>
      <div className="component-overview">
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
        {type === 'category' ? (
          <CategorizedList components={components} language={language} />
        ) : (
          <SortedList components={components} />
        )}
      </div>
    </DefaultPage>
  );
}
