import React from 'react';
import * as thumbnails from '../thumbnails';

interface ComponentThumbnailProps {
  componentId: string;
}

/**
 * Generate SVG thumbnails for different component types
 */
export const ComponentThumbnail: React.FC<ComponentThumbnailProps> = ({ componentId }) => {
  // Return the appropriate SVG thumbnail based on component ID
  const svgContent = getSvgForComponent(componentId);

  return <div className="component-thumbnail">{svgContent}</div>;
};

/**
 * Get the corresponding SVG thumbnail based on component ID
 */
const getSvgForComponent = (componentId: string): React.ReactNode => {
  // Component ID to SVG thumbnail mapping
  const thumbnailMap: Record<string, React.ReactNode> = {
    // Layout components
    box: <thumbnails.Box />,
    center: <thumbnails.Center />,
    divider: <thumbnails.Divider />,
    frame: <thumbnails.Frame />,
    grid: <thumbnails.Grid />,
    stack: <thumbnails.Stack />,

    // Button components
    button: <thumbnails.Button />,
    'icon-button': <thumbnails.IconButton />,
    'button-group': <thumbnails.ButtonGroup />,

    // Form components
    form: <thumbnails.Form />,
    'password-input': <thumbnails.PasswordInput />,
    'form-validation': <thumbnails.FormValidation />,
    'form-formik': <thumbnails.FormValidation />,
    'form-react-hook-form': <thumbnails.FormValidation />,
    schema: <thumbnails.Schema />,
    checkbox: <thumbnails.Checkbox />,
    radio: <thumbnails.Radio />,
    input: <thumbnails.Input />,
    'input-number': <thumbnails.InputNumber />,
    toggle: <thumbnails.Toggle />,
    'pin-input': <thumbnails.PinInput />,

    // Data Entry components
    'auto-complete': <thumbnails.AutoComplete />,
    slider: <thumbnails.Slider />,
    'multi-slider': <thumbnails.Slider />,
    'range-slider': <thumbnails.Slider />,
    'inline-edit': <thumbnails.InlineEdit />,
    'radio-tile': <thumbnails.RadioTile />,
    rate: <thumbnails.Rate />,
    'tag-input': <thumbnails.TagInput />,
    uploader: <thumbnails.Uploader />,
    'cascade-tree': <thumbnails.CascadeTree />,
    tree: <thumbnails.Tree />,
    textarea: <thumbnails.Textarea />,
    'check-tree': <thumbnails.CheckTree />,
    'multi-cascade-tree': <thumbnails.MultiCascadeTree />,

    // Data Pickers components
    cascader: <thumbnails.Cascader />,
    'multi-cascader': <thumbnails.MultiCascader />,
    'check-picker': <thumbnails.CheckPicker />,
    'check-tree-picker': <thumbnails.CheckTreePicker />,
    'input-picker': <thumbnails.InputPicker />,
    'select-picker': <thumbnails.SelectPicker />,
    'tag-picker': <thumbnails.TagPicker />,
    'tree-picker': <thumbnails.TreePicker />,

    // Date and Time components
    calendar: <thumbnails.Calendar />,
    'date-input': <thumbnails.DateInput />,
    'date-picker': <thumbnails.DatePicker />,
    'date-range-input': <thumbnails.DateRangeInput />,
    'date-range-picker': <thumbnails.DateRangePicker />,
    'time-picker': <thumbnails.TimePicker />,
    'time-range-picker': <thumbnails.TimeRangePicker />,

    // Data Grid components
    table: <thumbnails.BasicTable />,
    'table-virtualized': <thumbnails.VirtualTable />,
    'table-tree': <thumbnails.TreeTable />,
    'table-affix': <thumbnails.StickyTable />,
    'table-editable': <thumbnails.EditableTable />,
    'table-filterable': <thumbnails.FilterableTable />,

    // Data Display components
    carousel: <thumbnails.Carousel />,
    list: <thumbnails.List />,
    timeline: <thumbnails.Timeline />,
    panel: <thumbnails.Panel />,
    card: <thumbnails.Card />,
    stat: <thumbnails.Stat />,
    tag: <thumbnails.Tag />,

    // Disclosure components
    accordion: <thumbnails.DisclosureAccordion />,
    tabs: <thumbnails.Tabs />,
    'visually-hidden': <thumbnails.VisuallyHidden />,

    // Misc components
    animation: <thumbnails.Animation />,
    'custom-provider': <thumbnails.CustomProvider />,
    'dom-helper': <thumbnails.DOMHelper />,
    'use-media-query': <thumbnails.Hooks />,
    'use-breakpoint-value': <thumbnails.Hooks />,

    // Status components
    badge: <thumbnails.Badge />,
    loader: <thumbnails.Loader />,
    message: <thumbnails.Message />,
    notification: <thumbnails.Notification />,
    progress: <thumbnails.Progress />,
    placeholder: <thumbnails.Placeholder />,
    toaster: <thumbnails.Toaster />,

    // Typography components
    heading: <thumbnails.Heading />,
    highlight: <thumbnails.Highlight />,
    kbd: <thumbnails.Kbd />,
    text: <thumbnails.Text />,

    // Overlay components
    drawer: <thumbnails.Drawer />,
    modal: <thumbnails.Modal />,
    popover: <thumbnails.Popover />,
    tooltip: <thumbnails.Tooltip />,
    whisper: <thumbnails.Whisper />,
    'modal-integrations': <thumbnails.ModalIntegrations />,

    // Navigation components
    affix: <thumbnails.Affix />,
    breadcrumb: <thumbnails.Breadcrumb />,
    dropdown: <thumbnails.Dropdown />,
    link: <thumbnails.Link />,
    menu: <thumbnails.Menu />,
    nav: <thumbnails.Nav />,
    navbar: <thumbnails.Navbar />,
    sidenav: <thumbnails.Sidenav />,
    steps: <thumbnails.Steps />,
    pagination: <thumbnails.Pagination />,

    // Media and Icons components
    avatar: <thumbnails.Avatar />,
    icon: <thumbnails.Icon />,
    image: <thumbnails.Image />,

    // Default icon used when no matching thumbnail is found
    default: <thumbnails.Default />
  };

  // Return the corresponding SVG thumbnail, or the default thumbnail if not found
  return thumbnailMap[componentId] || <thumbnails.Default />;
};
