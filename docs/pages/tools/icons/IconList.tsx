import * as React from 'react';
import { Input, Alert } from 'rsuite';
import IconItem from './IconItem';
import allIcons from './icons.json';

const newIcons = [
  // update
  'more',
  'reload',
  'tag',
  'list',
  'edit',
  'share',
  'copy',
  'dashboard',
  'pie-chart',
  // create
  'id-info',
  'setting',
  'back-arrow',
  'character-area',
  'character-authorize',
  'creative',
  'data-authorize',
  'detail',
  'explore',
  'export',
  'file-download',
  'file-upload',
  'gear',
  'id-mapping',
  'import',
  'off',
  'peoples-map',
  'peoples',
  'sales',
  'growth',
  'project',
  'public-opinion',
  'rate',
  'realtime',
  'related-map',
  'search-peoples',
  'speaker',
  'tag-area',
  'tag-authorize',
  'tag-unauthorize',
  'task',
  'trend',
  'user-info',
  'views-authorize',
  'views-unauthorize'
];

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

  const onCopy = (_text, result) => {
    const message = result ? '复制成功' : '复制失败，浏览器不支持此功能';
    Alert.success(message);
  };

  const renderIcon = React.useCallback(() => {
    const nextIcons = icons.reduce(parseIconByCategory, {});
    
    console.log(nextIcons);

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
  }, [icons]);

  return (
    <div className="icon-list-wrap">
      <Input
        size="lg"
        className="icon-search-input"
        type="text"
        placeholder="搜索 Icon"
        onChange={onSearch}
      />

      <div className="row icon-item-list">{icons.length > 0 ? renderIcon() : <NoneDom />}</div>
    </div>
  );
}
