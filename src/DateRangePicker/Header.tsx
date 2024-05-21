import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { compareAsc } from '@/internals/utils/date';
import { FormattedDate } from '../CustomProvider';
import Button from '../Button';

interface HeaderProps {
  formatStr: string;
  character: string;
  value: Date[] | null;
  activeKey?: 'start' | 'end';
  onSelect?: (eventKey: 'start' | 'end') => void;
  clickable?: boolean;
}

function Header(props: HeaderProps) {
  const { prefix } = useClassNames('picker');
  const { formatStr, character, value, activeKey = 'start', clickable, onSelect } = props;

  const [startDate, endDate] = value ?? [null, null];
  const v = startDate && endDate ? [startDate, endDate].sort(compareAsc) : [startDate, endDate];
  const start = v[0] ? <FormattedDate date={v[0]} formatStr={formatStr} /> : formatStr;
  const end = v[1] ? <FormattedDate date={v[1]} formatStr={formatStr} /> : formatStr;

  return (
    <div
      className={prefix('daterange-header', { [`tab-active-${activeKey}`]: clickable })}
      data-testid="daterange-header"
    >
      {clickable ? (
        <>
          <Button
            size="xs"
            appearance="subtle"
            className={prefix('header-date')}
            onClick={() => onSelect?.('start')}
            aria-label="Select start date"
          >
            {start}
          </Button>
          <span className={prefix('header-character')}>{character}</span>
          <Button
            size="xs"
            appearance="subtle"
            className={prefix('header-date')}
            onClick={() => onSelect?.('end')}
            aria-label="Select end date"
          >
            {end}
          </Button>
        </>
      ) : (
        <>
          <span className={prefix('header-date')}>{start}</span>
          <span className={prefix('header-character')}>{character}</span>
          <span className={prefix('header-date')}>{end}</span>
        </>
      )}
    </div>
  );
}

export default Header;
