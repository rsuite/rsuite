import React, { useCallback, useState, useContext } from 'react';
import { Input, Modal, Button, FlexboxGrid, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Link from '@/components/Link';
import IconItem from './IconItem';
import AppContext from '@/components/AppContext';
import iconList from '@rsuite/icons/meta.json';
import * as Icons from '@rsuite/icons';

interface IconMeta {
  iconName: string;
  componentName: string;
  categoryName: string;
}

const parseIconByCategory = (obj, conf) => {
  const { categoryName: category } = conf;
  if (obj[category]) {
    obj[category].push(conf);
    return obj;
  }
  obj[category] = [conf];
  return obj;
};

const usableIconList: IconMeta[] = iconList.filter(({ categoryName }) => categoryName !== 'legacy');

function IconList() {
  const { messages } = useContext(AppContext);
  const [iconName, setIconName] = useState('');
  const [showIcon, setShowIcon] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSelect = useCallback(name => {
    setIconName(name);
    setShowIcon(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowIcon(false);
  }, []);

  const renderIconList = useCallback(() => {
    const key = keyword.toUpperCase();
    const icons = usableIconList.filter(({ categoryName, componentName }: IconMeta) => {
      return (
        categoryName.toLocaleUpperCase().includes(key) ||
        componentName.toLocaleUpperCase().includes(key)
      );
    });

    if (icons.length === 0) {
      return (
        <div className="rs-col-md-24">
          <p className="icon-list-no-results-title">
            {messages?.resourcesIcons.searchNoResults} &quot;<strong>{keyword}</strong>&quot;
          </p>
          <hr />
          <p className="icon-list-no-results-help">{messages?.resourcesIcons.tryOther}</p>
          <ul>
            <li>
              <Link href="/components/icon/#font-awesome-icons">Font awesome icons</Link>
            </li>
            <li>
              <Link href="/components/icon/#react-icons">React Icons</Link>
            </li>
            <li>
              <Link href="/components/icon/#iconfont-icons">Iconfont Icons</Link>
            </li>
          </ul>
        </div>
      );
    }

    const nextIcons = icons.reduce<{ [key: string]: IconMeta[] }>(parseIconByCategory, {});
    return Object.keys(nextIcons)
      .sort((a, b) => a.localeCompare(b))
      .map((category, i) => {
        return (
          <React.Fragment key={i}>
            <h3 className="icon-list-group-title">{category}</h3>
            {nextIcons[category].map(({ componentName }, j) => {
              return (
                <IconItem
                  icon={Icons[componentName]}
                  name={componentName}
                  key={`${j}-${componentName}`}
                  onSelect={handleSelect}
                />
              );
            })}
          </React.Fragment>
        );
      });
  }, [handleSelect, keyword, messages]);

  const IconComponent = iconName ? Icons[iconName] : null;

  return (
    <div className="icon-list-wrap">
      <InputGroup inside size="lg" className="icon-search-input">
        <Input type="text" placeholder={messages?.common.searchIcon} onChange={setKeyword} />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
      <div className="row icon-item-list">{renderIconList()}</div>
      <Modal open={showIcon} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{iconName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="doc-highlight" style={{ margin: '0 0 1em 0' }}>
            <pre>
              <code className="javascript">
                <span className="hljs-keyword">import</span>
                {` ${iconName}Icon `}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">{`'@rsuite/icons/${iconName}'`}</span>;
              </code>
            </pre>
          </div>
          {IconComponent ? (
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={12}>
                <div className="icon-bg-transparent" style={{ padding: 10, textAlign: 'center' }}>
                  <IconComponent style={{ fontSize: 200 }} />
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={12}>
                <div className="icon-example-list">
                  <IconComponent style={{ fontSize: '2em' }} />
                  <IconComponent style={{ fontSize: '3em' }} />
                  <IconComponent style={{ fontSize: '4em' }} />
                  <IconComponent style={{ fontSize: '5em' }} />
                </div>
                <div className="icon-example-list" style={{ marginTop: 20 }}>
                  <IconComponent className="icon-item-box" style={{ color: '#1675e0' }} />
                  <IconComponent
                    className="icon-item-box"
                    style={{ background: '#1675e0', color: '#fff' }}
                  />
                  <IconComponent className="icon-item-box" style={{ color: '#000' }} />
                  <IconComponent
                    className="icon-item-box"
                    style={{ background: '#000', color: '#fff' }}
                  />
                </div>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IconList;
