import * as React from 'react';

export interface ButtonProps extends StrictButtonProps {
  [key: string]: any;
}

export interface StrictButtonProps {
  // A button can have different appearances.
  appearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

  // The prefix of the component CSS class
  classPrefix?: string;

  // You can use a custom element for this component
  componentClass?: React.ElementType;

  // A button can have different sizes
  size?: string;

  // A button can have different colors
  color?: string;

  // Additional classes
  className?: string;

  // A button can show it is currently the active user selection
  active?: boolean;

  // Display block buttons
  block?: boolean;

  // Providing a `href` will render an `<a>` element, _styled_ as a button
  href?: string;

  // A button can show a loading indicator
  loading?: boolean;

  // A button can show it is currently unable to be interacted with
  disabled?: boolean;

  // Primary content
  children?: React.Node;
}

declare const Button: React.StatelessComponent<ButtonProps>;

export default Button;
