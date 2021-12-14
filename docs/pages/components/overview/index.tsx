import React from 'react';
import usePages from '@/utils/usePages';
import DefaultPage from '@/components/Page';
import AppContext from '@/components/AppContext';
import { ButtonGroup, Button } from 'rsuite';
import ListIcon from '@rsuite/icons/List';
import TableColumnIcon from '@rsuite/icons/TableColumn';
import CategorizedList from './CategorizedList';
import SortedList from './SortedList';

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
          <Button active={type === 'category'} onClick={() => setType('category')}>
            <ListIcon />
          </Button>
          <Button active={type === 'sorted'} onClick={() => setType('sorted')}>
            <TableColumnIcon />
          </Button>
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
