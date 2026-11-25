import React, { useEffect, useMemo, useState } from 'react';
import CustomProvider from '../CustomProvider';
import Toggle from '../../Toggle';
import Breadcrumb from '../../Breadcrumb';
import Pagination from '../../Pagination';
import type { CustomProviderProps } from '..';

export type LocaleAction = {
  control: 'toggle' | 'page';
  value: boolean | number | string;
  trusted?: boolean;
};

export default function DefaultLocaleFixture({
  onReady,
  onAction
}: {
  onReady?: () => void;
  onAction?: (action: LocaleAction) => void;
}) {
  const [version, setVersion] = useState(1);
  const [removed, setRemoved] = useState(false);
  const [override, setOverride] = useState(false);
  const [page, setPage] = useState(1);
  const components = useMemo<CustomProviderProps['components']>(
    () =>
      removed
        ? {}
        : {
            Toggle: {
              defaultProps: {
                locale: { on: `Default on ${version}`, off: `Default off ${version}` }
              }
            },
            Pagination: {
              defaultProps: {
                first: true,
                locale: { next: `Default next ${version}`, prev: `Default previous ${version}` }
              }
            },
            Breadcrumb: {
              defaultProps: { maxItems: 2, locale: { expandText: `Show folders ${version}` } }
            }
          },
    [version, removed]
  );
  useEffect(() => onReady?.(), [onReady]);
  return (
    <CustomProvider components={components}>
      <Toggle
        defaultChecked
        locale={override ? { off: 'Instance off' } : undefined}
        onChange={(value, event) =>
          onAction?.({ control: 'toggle', value, trusted: event.nativeEvent.isTrusted })
        }
      />
      <Pagination
        total={30}
        limit={10}
        activePage={page}
        next
        prev
        locale={{ prev: 'Instance previous' }}
        onChangePage={value => {
          setPage(value);
          onAction?.({ control: 'page', value });
        }}
      />
      <output data-testid="page">{page}</output>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Account</Breadcrumb.Item>
        <Breadcrumb.Item>Billing</Breadcrumb.Item>
      </Breadcrumb>
      <button onClick={() => setVersion(value => value + 1)}>Change defaults</button>
      <button onClick={() => setOverride(true)}>Override instance</button>
      <button onClick={() => setRemoved(true)}>Remove defaults</button>
    </CustomProvider>
  );
}
