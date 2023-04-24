import React from 'react';
import Link from '@/components/Link';

const Item = ({ name, isComponent }: { name: string; isComponent?: boolean }) => (
  <li>
    <span className="name">{isComponent ? `<${name}>` : name}</span>
  </li>
);

interface CategorizedListProps {
  components: any[];
  language: string;
}

const CategorizedList = React.forwardRef(
  (props: CategorizedListProps, ref: React.Ref<HTMLUListElement>) => {
    const { components, language, ...rest } = props;
    return (
      <ul ref={ref} {...rest}>
        {components
          .filter(c => c.components || c.apis || c.group)
          .map(item => {
            if (item.group) {
              return (
                <li className="title" key={item.id}>
                  <h4 id={item.name}>{item.name}</h4>
                </li>
              );
            } else {
              return (
                <li key={item.id}>
                  <Link href={`/components/${item.id}`} className="header">
                    {item.name}
                    {language === 'zh' ? (
                      <span>
                        <br /> ({item.title})
                      </span>
                    ) : null}
                  </Link>
                  <ul className="content">
                    {item.components
                      ? item.components.map(name => <Item name={name} key={name} isComponent />)
                      : null}

                    {item.apis ? item.apis.map(name => <Item name={name} key={name} />) : null}
                  </ul>
                </li>
              );
            }
          })}
      </ul>
    );
  }
);

export default CategorizedList;
