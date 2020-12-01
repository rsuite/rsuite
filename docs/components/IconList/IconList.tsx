import React from 'react';
import { Input, toaster, Message } from 'rsuite';
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

export default function IconList() {
  const [icons, setIcons] = React.useState<IconMeta[]>(iconMeta);
  const { messages } = React.useContext(AppContext);

  const onCopy = React.useCallback(
    (result) => {
      toaster.push(
        <Message type="success" showIcon>
          {messages?.common[`copy${result ? 'Succeed' : 'Failed'}`]}
        </Message>
      );
    },
    [messages?.common]
  );

  const onSearch = React.useCallback((key) => {
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
                  onCopy={onCopy}
                />
              );
            })}
          </React.Fragment>
        );
      });
  }, [icons, onCopy]);

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
    </div>
  );
}
