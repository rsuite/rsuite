import * as React from 'react';
import { Input, Alert } from 'rsuite';
import IconItem from './IconItem';
import allIcons from './icons.json';
import newIcons from './newIcons';
import AppContext from '@/components/AppContext';

const parseIconByCategory = (obj, conf) => {
  conf.categories.forEach(category => {
    if (obj[category]) {
      obj[category].push(conf);
      return;
    }
    obj[category] = [conf];
  });
  return obj;
};

const NoneDom = () => <div className="rs-col-md-24">Null</div>;

export default function IconList() {
  const [icons, setIcons] = React.useState(allIcons);
  const onSearch = React.useCallback(key => {
    const filterByCatogry = iconConf => {
      const { id, filter = [], categories = [] } = iconConf;
      const searchKeys = [id, ...filter, ...categories].map(key => key.toUpperCase());
      return (
        searchKeys.filter(searchKey => {
          return searchKey.indexOf(key.toUpperCase()) > -1;
        }).length > 0
      );
    };
    setIcons(allIcons.filter(filterByCatogry));
  }, []);

  const renderIcon = React.useCallback(
    onCopy => {
      const nextIcons = icons.reduce(parseIconByCategory, {});
      return Object.keys(nextIcons)
        .sort((a, b) => a.localeCompare(b))
        .map((category, i) => {
          return (
            <React.Fragment key={i}>
              <h3 className="icon-list-group-title">{category}</h3>
              {nextIcons[category].map((iconConf, j) => {
                const { id: icon } = iconConf;
                return (
                  <IconItem
                    icon={icon}
                    newIcon={newIcons.includes(icon)}
                    key={`${j}-${icon}`}
                    onCopy={onCopy}
                  />
                );
              })}
            </React.Fragment>
          );
        });
    },
    [icons]
  );

  return (
    <AppContext.Consumer>
      {({ messages }) => {
        const onCopy = (_text, result) => {
          Alert.success(messages?.common[`copy${result ? 'Succeed' : 'Failed'}`]);
        };

        return (
          <div className="icon-list-wrap">
            <Input
              size="lg"
              className="icon-search-input"
              type="text"
              placeholder={messages?.common.searchIcon}
              onChange={onSearch}
            />

            <div className="row icon-item-list">
              {icons.length > 0 ? renderIcon(onCopy) : <NoneDom />}
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}
