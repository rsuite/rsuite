# Whisper

The `Whisper` component is a trigger for displaying overlay elements. It's primarily used to wrap components like `Tooltip` and `Popover` that need to be shown on hover, providing unified triggering behavior and positioning functionality. With `Whisper`, you can flexibly control the display and hiding of overlay layers, as well as customize triggering events.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic Usage

The default supported speaker components are `Tooltip` and `Popover`.

<!--{include:`basic.md`}-->

### Custom Overlay

You can customize the overlay content using the `speaker` prop. The following example demonstrates how to create a custom overlay component with delay support.

<!--{include:`overlay.md`}-->

## Props

<!--{include:(components/whisper/en-US/props.md)}-->
<!--{include:(_common/types/placement-all.md)}-->
