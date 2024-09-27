import React from 'react';
import sortBy from 'lodash/sortBy';
import kebabCase from 'lodash/kebabCase';
import Link from '@/components/Link';
import { List } from 'rsuite';

interface ItemType {
  category: string;
  id: string;
  componentName: string;
}

interface SortedObject {
  [key: string]: ItemType[];
}

interface SortedListProps {
  components: any[];
}

function getSortedComponents(components): SortedObject {
  const list = [];

  components.forEach(child => {
    child.children.forEach(item => {
      if (item.components) {
        item.components.forEach(componentName => {
          list.push({
            category: componentName[0],
            id: item.id,
            componentName
          });
        });
      }
    });
  });

  const sortedList = sortBy(list, item => item.componentName);
  const categorizedList = {};

  sortedList.forEach(item => {
    if (!categorizedList[item.category]) {
      categorizedList[item.category] = [];
    }

    categorizedList[item.category].push(item);
  });

  return categorizedList;
}

const SortedList = React.forwardRef((props: SortedListProps, ref: React.Ref<HTMLDivElement>) => {
  const { components, ...rest } = props;
  const sortedList = getSortedComponents(components);

  return (
    <div {...rest} ref={ref}>
      {Object.entries(sortedList).map(([category, items]) => {
        return (
          <div key={category} className="sorted-list">
            <h3 className="title">{category}</h3>
            <List>
              {items.map((item, index) => (
                <List.Item key={index} index={index}>
                  <Link
                    href={`/components/${item.id}#code-lt-${kebabCase(item.componentName)}-gt-code`}
                  >{`<${item.componentName}>`}</Link>
                </List.Item>
              ))}
            </List>
          </div>
        );
      })}
    </div>
  );
});

export default SortedList;
