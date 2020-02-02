#### Placement

```ts
type Placement4 = 'top' | 'bottom' | 'right' | 'left';
type Placement8 =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'leftEnd'
  | 'rightStart'
  | 'rightEnd';
type PlacementAuto =
  | 'auto'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';

type Placement = Placement8 | PlacementAuto;
type PlacementAll = Placement4 | Placement8 | PlacementAuto;
type PlacementStart = 'bottomStart' | 'topStart' | 'autoVerticalStart';
type NotificationPlacement = 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';
```

#### DataItemType

```ts
type DataItemType = {
  value: string; // property value is the value of valueKey 
  label: React.Node; // property value is the vaue of labelKey
  children?: Array<DataItemType>; // property value is the value of childrenKey
  groupBy?: string;
};
```

#### Range

```js
type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Date | ((date: Date) => Date)
};
```

#### Trigger

```js
type Trigger =
  | 'click'
  | 'hover'
  | 'contextMenu'
  | Array<'click' | 'hover' | 'contextMenu'>;
```

#### FileType

```js
type FileType = {
  name: string,
  fileKey: number | string,
  status?: 'inited' | 'uploading' | 'error' | 'finished',
  progress?: number,
  url?: string
};
```
