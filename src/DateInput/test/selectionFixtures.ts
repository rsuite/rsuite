export const selectionFormats = [
  {
    format: 'yyyy-MM-dd',
    keys: '20240101',
    endKeys: '20240202',
    expected: '2024-01-01',
    expectedEnd: '2024-02-02',
    lastSegmentLength: 2
  },
  {
    format: 'MM/dd/yyyy',
    keys: '01012024',
    endKeys: '02022024',
    expected: '01/01/2024',
    expectedEnd: '02/02/2024',
    lastSegmentLength: 4
  },
  {
    format: 'MMM dd,yyyy',
    keys: '01012024',
    endKeys: '02022024',
    expected: 'Jan 01,2024',
    expectedEnd: 'Feb 02,2024',
    lastSegmentLength: 4
  },
  {
    format: 'MM/dd/yyyy HH:mm:ss',
    keys: '01012024120130',
    endKeys: '02022024130130',
    expected: '01/01/2024 12:01:30',
    expectedEnd: '02/02/2024 13:01:30',
    lastSegmentLength: 2
  }
];
