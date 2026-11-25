/* eslint-disable @typescript-eslint/no-require-imports */
import { Row, Col } from 'rsuite';
import { HTMLRenderer } from '@/components/CodeView/HTMLRenderer';
import { useApp } from '@/hooks/useApp';
import IconList from '@/components/resources/icons/IconList';
import DefaultPage from '@/components/layout/Page';

export default function Page() {
  const { localePath } = useApp();

  return (
    <DefaultPage>
      <IconList />
      <Row>
        <Col span={24}>
          <HTMLRenderer>{require(`.${localePath}/footer.md`)?.default}</HTMLRenderer>
        </Col>
      </Row>
    </DefaultPage>
  );
}
