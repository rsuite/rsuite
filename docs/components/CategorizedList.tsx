import React from 'react';
import Link from '@/components/Link';
import SupportVersion from './SupportVersion';
import { Heading, HStack, VStack, Tag } from 'rsuite';

const Item = ({ name, isComponent }: { name: string; isComponent?: boolean }) => (
  <li>
    <span className="rs-co-name">{isComponent ? `<${name}>` : name}</span>
  </li>
);

interface CategorizedListProps {
  components: any[];
  language: string;
}

const CategorizedList = React.forwardRef(
  (props: CategorizedListProps, ref: React.Ref<HTMLDivElement>) => {
    const { components, language, ...rest } = props;

    return (
      <div ref={ref} {...rest}>
        {components
          .filter(c => c.children || c.apis || c.group)
          .map(item => {
            return (
              <VStack key={item.id} className="rs-co-group">
                <Heading level={4} className="rs-co-title" key={item.id} id={item.name}>
                  {item.name}
                </Heading>
                <HStack wrap spacing={10} alignItems="flex-start">
                  {item.children?.map(item => {
                    return (
                      <VStack key={item.id} className="rs-co-box" justifyContent="space-between">
                        <div>
                          <Link href={`/components/${item.id}`} className="rs-co-header">
                            {item.name}
                            {language === 'zh' ? (
                              <span>
                                <br /> {item.title ? `(${item.title})` : null}
                              </span>
                            ) : null}
                          </Link>
                          <ul className="rs-co-content">
                            {item.components
                              ? item.components.map(name => (
                                  <Item name={name} key={name} isComponent />
                                ))
                              : null}

                            {item.apis
                              ? item.apis.map(name => <Item name={name} key={name} />)
                              : null}
                          </ul>
                        </div>
                        <div>
                          {item.tag && (
                            <Tag size="sm" color="orange">
                              {item.tag}
                            </Tag>
                          )}
                          {item.minVersion && <SupportVersion minVersion={item.minVersion} />}
                        </div>
                      </VStack>
                    );
                  })}
                </HStack>
              </VStack>
            );
          })}
      </div>
    );
  }
);

export default CategorizedList;
