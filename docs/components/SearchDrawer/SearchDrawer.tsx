import * as React from 'react';
import algoliasearch from 'algoliasearch';
import { Drawer, Input } from 'rsuite';
import Link from '@/components/Link';
import AppContext from '@/components/AppContext';

interface SearchDrawerProps {
  show?: boolean;
  onHide?: () => void;
}

function createAlgoliaClient(language: string) {
  const indexKey = language === 'en-US' ? 'rsuite-en' : 'rsuite-zh';
  const client = algoliasearch('PTK5IGAK3K', 'dd3a62fc583bb0749dafa15cc61588bf');
  return client.initIndex(indexKey);
}

export default function SearchDrawer(props: SearchDrawerProps) {
  const { show, onHide } = props;
  const [list, setList] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const { messages } = React.useContext(AppContext);

  let client = null;
  React.useEffect(() => {
    client = createAlgoliaClient(messages?.id);
  }, []);

  const onSearch = React.useCallback(keyword => {
    setKeyword(keyword);
    if (keyword === '') {
      setList([]);
      return;
    }
    client.search({ keyword, hitsPerPage: 6 }, (_err, res) => {
      setList(res?.hits || []);
    });
  }, []);

  return (
    <Drawer className="search-drawer" placement="left" size="xs" show={show} onHide={onHide}>
      <Drawer.Header>
        <Drawer.Title>{messages?.common?.search}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Input
          placeholder={messages?.common?.search}
          className="search-input"
          value={keyword}
          onChange={onSearch}
        />
        <ul className="search-list">
          {list.map((item, index) => {
            const component = item?.component;
            const content = item?.content;
            let title = item?._highlightResult?.title?.value;
            title = `${component} > ${title.replace(/`/gi, '')}`;
            const url = `/components/${component}`;

            return (
              <li key={index}>
                {title.indexOf('<em>') !== -1 ? (
                  <div onClick={onHide}>
                    <Link href={url}>
                      <a
                        dangerouslySetInnerHTML={{
                          __html: `${title}<p>${content}</p>`
                        }}
                      />
                    </Link>
                  </div>
                ) : (
                  <div onClick={onHide}>
                    <Link href={url}>
                      {title}
                      <p>{content}</p>
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Drawer.Body>
    </Drawer>
  );
}
