import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Drawer, Input } from 'rsuite';
import Link from '@/components/Link';
import AppContext from '@/components/AppContext';

interface SearchDrawerProps {
  show?: boolean;
  onClose?: () => void;
}

function createAlgoliaClient(language: string) {
  const indexKey = `rsuite-${language}`;
  const client = algoliasearch('PTK5IGAK3K', 'dd3a62fc583bb0749dafa15cc61588bf');
  return client.initIndex(indexKey);
}

export default function SearchDrawer(props: SearchDrawerProps) {
  const { show, onClose } = props;
  const [list, setList] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const { messages, language } = React.useContext(AppContext);

  let client = null;
  React.useEffect(() => {
    client = createAlgoliaClient(language);
  }, [language]);

  const onSearch = React.useCallback(
    keyword => {
      setKeyword(keyword);
      if (keyword === '') {
        setList([]);
        return;
      }

      client?.search?.(keyword, { hitsPerPage: 6 }).then(({ hits }) => {
        setList(hits || []);
      });
    },
    [client]
  );

  return (
    <Drawer className="search-drawer" placement="left" size="xs" open={show} onClose={onClose}>
      <Drawer.Header style={{ border: 'none' }}>
        <Input
          placeholder={messages?.common?.search}
          className="search-input"
          value={keyword}
          onChange={onSearch}
        />
      </Drawer.Header>
      <Drawer.Body style={{ padding: '0px 20px 0 56px' }}>
        <ul className="search-list">
          {list.map((item, index) => {
            const component = item?.component;
            const content = item?._highlightResult?.content?.value;
            const title = item?._highlightResult?.title?.value;
            const url = `/components/${component}`;

            return (
              <li key={index}>
                <div onClick={onClose}>
                  <Link href={url}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${title}<p>${content}</p>`
                      }}
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Drawer.Body>
    </Drawer>
  );
}
