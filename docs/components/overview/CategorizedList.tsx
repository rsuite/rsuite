import React from 'react';
import Link from '@/components/Link';
import { Heading, HStack, VStack, Tag, Text } from 'rsuite';
import { ComponentThumbnail } from './ComponentThumbnail';

interface CategorizedListProps {
  components: any[];
  language: string;
}

export const CategorizedList = React.forwardRef(function CategorizedList(
  props: CategorizedListProps,
  ref: React.Ref<HTMLDivElement>
) {
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
              <HStack wrap spacing={10} align="flex-start">
                {item.children?.map(item => {
                  return (
                    <Link key={item.id} href={`/components/${item.id}`} className="rs-co-box-link">
                      <div className="rs-co-box">
                        <div className="rs-co-thumbnail">
                          <ComponentThumbnail componentId={item.id} />
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
                            {item.components && item.components.length > 0 && (
                              <Tag size="sm">{item.components.length} components</Tag>
                            )}
                            {item.apis && item.apis.length > 0 && (
                              <Tag size="sm">{item.apis.length} APIs</Tag>
                            )}
                            {item.tag && (
                              <Tag size="sm" color="orange">
                                {item.tag}
                              </Tag>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </HStack>
            </VStack>
          );
        })}
    </div>
  );
});
