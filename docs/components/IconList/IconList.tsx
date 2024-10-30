import React, { useCallback, useMemo, useState } from 'react';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Link from '@/components/Link';
import IconItem from './IconItem';
import { useApp } from '@/components/AppContext';
import iconList from '@rsuite/icons/meta.json';
import * as Icons from '@rsuite/icons';
import IcomModal, { IconMeta } from './IconModal';

function searchFilter(keyword: string) {
  return iconList.filter(({ categoryName, iconName }: IconMeta) => {
    const key = keyword.toUpperCase();
    return (
      categoryName.toLocaleUpperCase().includes(key) || iconName.toLocaleUpperCase().includes(key)
    );
  });
}

function IconList() {
  const { locales } = useApp();
  const [activeIcon, setActiveIcon] = useState<IconMeta>(null);
  const [showIcon, setShowIcon] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSelect = useCallback(name => {
    const icon = iconList.find(({ iconName }) => iconName === name);

    if (icon) {
      setActiveIcon(icon);
      setShowIcon(true);
    }
  }, []);

  const handleClose = useCallback(() => {
    setShowIcon(false);
  }, []);

  const filteredIcons = searchFilter(keyword);

  const iconElements = useMemo(() => {
    if (filteredIcons.length === 0) {
      return (
        <div>
          <p className="icon-list-no-results-title">
            {locales?.resourcesIcons.searchNoResults} &quot;<strong>{keyword}</strong>&quot;
          </p>
          <hr />
          <p className="icon-list-no-results-help">{locales?.resourcesIcons.tryOther}</p>
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

    return (
      <div className="row icon-item-list">
        {filteredIcons.map(({ iconName }, j) => {
          return (
            <IconItem
              icon={Icons[iconName]}
              name={iconName}
              key={`${j}-${iconName}`}
              onSelect={handleSelect}
            />
          );
        })}
      </div>
    );
  }, [filteredIcons, handleSelect, keyword, locales]);

  return (
    <div className="icon-list-wrap">
      <InputGroup inside size="lg" className="icon-search-input">
        <Input
          type="text"
          placeholder={`Search ${iconList.length} icons ...`}
          onChange={setKeyword}
        />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
      {iconElements}
      <IcomModal open={showIcon} onClose={handleClose} activeIcon={activeIcon} />
    </div>
  );
}

export default IconList;
