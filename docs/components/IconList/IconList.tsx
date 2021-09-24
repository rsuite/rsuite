import React from 'react';
import { Input, Modal, Button, FlexboxGrid } from 'rsuite';
import IconItem from './IconItem';
import AppContext from '@/components/AppContext';
import allIconMeta from '@rsuite/icons/meta.json';
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

const notLegacy = ({ categoryName }) => categoryName !== 'legacy';

const iconMeta: IconMeta[] = allIconMeta.filter(notLegacy);

const NoneDom = () => <div className="rs-col-md-24">Null</div>;

function IconList() {
  const [icons, setIcons] = React.useState<IconMeta[]>(iconMeta);
  const { messages } = React.useContext(AppContext);
  const [iconName, setIconName] = React.useState('');
  const [showIcon, setShowIcon] = React.useState(false);

  const handleSelect = React.useCallback((name, event) => {
    console.log(name, event);
    setIconName(name);
    setShowIcon(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setShowIcon(false);
  }, []);

  const onSearch = React.useCallback(key => {
    const upperCaseKey = key.toUpperCase();
    setIcons(
      iconMeta.filter(({ categoryName, componentName }: IconMeta) => {
        return (
          categoryName.toLocaleUpperCase().includes(upperCaseKey) ||
          componentName.toLocaleUpperCase().includes(upperCaseKey)
        );
      })
    );
  }, []);

  const renderIcon = React.useCallback(() => {
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
  }, [icons, handleSelect]);

  const IconComponent = iconName ? Icons[iconName] : null;

  return (
    <div className="icon-list-wrap">
      <Input
        size="lg"
        className="icon-search-input"
        type="text"
        placeholder={messages?.common.searchIcon}
        onChange={onSearch}
      />
      <div className="row icon-item-list">{icons.length > 0 ? renderIcon() : <NoneDom />}</div>
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
