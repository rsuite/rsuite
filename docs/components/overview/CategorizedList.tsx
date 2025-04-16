import React from 'react';
import Link from '@/components/Link';
import { Image, Heading, VStack, Tag, Text } from 'rsuite';
import { ComponentThumbnail } from './ComponentThumbnail';
import { isUpdatedComponent } from '@/utils/version';

interface CategorizedListProps {
  components: any[];
  language: string;
}

export const CategorizedList = React.forwardRef(function CategorizedList(
  props: CategorizedListProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { components, language, ...rest } = props;

  const handleVersionClick = (event: React.MouseEvent, version: string) => {
    event.stopPropagation();
    event.preventDefault();
    window.open(`https://github.com/rsuite/rsuite/releases/tag/v${version}`);
  };

  return (
    <div ref={ref} {...rest}>
      {components
        .filter(c => c.children || c.apis || c.hooks || c.group)
        .map(item => {
          const componentsCount = item.children?.reduce(
            (acc, child) => acc + (child.components?.length || 0),
            0
          );
          return (
            <VStack key={item.id} className="rs-co-group">
              <Heading level={4} className="rs-co-title" key={item.id} id={item.name}>
                {item.name}
              </Heading>
              {componentsCount ? (
                <Text muted className="rs-co-subtitle">
                  {componentsCount} components
                </Text>
              ) : null}
              <div className="rs-co-boxes">
                {item.children?.map(item => {
                  return (
                    <Link key={item.id} href={`/components/${item.id}`} className="rs-co-box-link">
                      <div className="rs-co-box">
                        <div className="rs-co-thumbnail">
                          <ComponentThumbnail componentId={item.id} />
                          {(item.components || item.apis || item.hooks) && (
                            <div className="rs-co-hover-content">
                              {item.components?.length && (
                                <div className="rs-co-list">
                                  <Text className="rs-co-list-title">Components</Text>
                                  {item.components.map(component => (
                                    <div
                                      key={component}
                                      className="rs-co-list-item"
                                    >{`<${component}>`}</div>
                                  ))}
                                </div>
                              )}
                              {item.hooks?.length && (
                                <div className="rs-co-list">
                                  <Text className="rs-co-list-title">Hooks</Text>
                                  {item.hooks.map(hook => (
                                    <div key={hook} className="rs-co-list-item">
                                      {hook}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {item.apis?.length && (
                                <div className="rs-co-list">
                                  <Text className="rs-co-list-title">APIs</Text>
                                  {item.apis.map(api => (
                                    <div key={api} className="rs-co-list-item">
                                      {api}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="rs-co-content">
                          <Text className="rs-co-header">
                            {item.name}
                            {language === 'zh' ? (
                              <span className="rs-co-subtitle">
                                {item.title ? item.title : null}
                              </span>
                            ) : null}
                          </Text>

                          <div className="rs-co-description">
                            {item.tag && (
                              <Tag size="sm" color="orange">
                                {item.tag}
                              </Tag>
                            )}
                            {item.minVersion && (
                              <Image
                                src={`https://img.shields.io/badge/>=-v${item.minVersion}-blue`}
                                alt={`>=${item.minVersion}`}
                                onClick={event => handleVersionClick(event, item.minVersion)}
                                title={`Supported from version ${item.minVersion}, click to view`}
                              />
                            )}
                            {isUpdatedComponent(item.updateVersion) && (
                              <Tag
                                size="sm"
                                color="orange"
                                onClick={event => handleVersionClick(event, item.updateVersion)}
                                title={`Updated in version ${item.updateVersion}, click to view`}
                              >
                                Updated
                              </Tag>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </VStack>
          );
        })}
    </div>
  );
});
