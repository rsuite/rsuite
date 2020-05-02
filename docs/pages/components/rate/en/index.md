# Rate

A rating indicates user interest in content.

- `<Rate>`

## Usage

```js
import { Rate } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

| Property        | Type `(Default)`                                                       | Description                                                   |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| allowHalf       | boolean`(false)`                                                       | Whether to support half option                                |
| character       | React.ReactNode                                                        | custom character                                              |
| cleanable       | boolean`(true)`                                                        | Whether clear is supported                                    |
| defaultValue    | number`(0)`                                                            | Default value                                                 |
| disabled        | boolean`(false)`                                                       | Disabled，Cannot interact when value is true                  |
| max             | number`(5)`                                                            | Maximum score                                                 |
| renderCharacter | (value: number) => React.ReactNode                                     | Customize the render character function                       |
| readOnly        | boolean                                                                | Whether it is read-only, if true, no interaction is possible  |
| size            | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                  | Set component size                                            |
| color           | enum: 'red', 'orange','yellow', 'green', <br/>'cyan', 'blue', 'violet' | A button can have different colors                            |
| value           | number                                                                 | Value (Controlled)                                            |
| vertical        | boolean`(false)`                                                       | direction when half select                                    |
| onChange        | (value: ValueType, event: React.SyntheticEvent<HTMLElement>) => void   | Callback function that changes value                          |
| onChangeActive  | (value: number, event: React.SyntheticEvent<HTMLElement>) => void      | Callback function that is fired when the hover state changes. |
