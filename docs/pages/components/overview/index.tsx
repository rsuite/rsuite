import * as React from 'react';
import getPages from '@/utils/pages';
import DefaultPage from '@/components/Page';
import AppContext from '@/components/AppContext';
import Link from '@/components/Link';

interface ComponentType {
  id: string;
  name: string;
  title: string;
  group?: string;
  components?: string[];
  apis?: string[];
}

const Item = ({ name, isComponent }: { name: string; isComponent?: boolean }) => (
  <li>
    <span className="name">{isComponent ? `<${name}>` : name}</span>
  </li>
);

export default function Page() {
  const { language } = React.useContext(AppContext);

  const components = (getPages()?.[1]?.children as ComponentType[]).filter(
    item => item.id !== 'overview'
  );

  return (
    <DefaultPage>
      <div className="component-overview">
        <ul>
          {components.map(item => {
            if (item.group) {
              return (
                <li className="title" key={item.id}>
                  <h4 id={item.name}># {item.name}</h4>
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
      </div>
    </DefaultPage>
  );
}
