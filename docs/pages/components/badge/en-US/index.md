# Badge

Used for buttons, numbers or status markers next to icons.

## Usage

<!--{include:(components/badge/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### With content

<!--{include:`content.md`}-->

### Invisible

<!--{include:`invisible.md`}-->

### Independent Use

<!--{include:`independent.md`}-->

### Colorful indicator

`color` attribute sets the indicator style, options include: 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'.

<!--{include:`color.md`}-->

## Props

<!--{include:(_common/types/color.md)}-->

### `<Badge>`

| Property    | Type`(Default)`    | Description                                                |
| ----------- | ------------------ | ---------------------------------------------------------- |
| children    | ReactNode          | Be wrapped component                                       |
| classPrefix | string `('badge')` | The prefix of the component CSS class                      |
| content     | ReactNode          | Content info                                               |
| color       | Color              | A indicator can have different colors                      |
| maxCount    | number`(99)`       | Max count number（Only valid if `content` is type number） |
