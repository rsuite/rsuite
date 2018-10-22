import * as React from 'react';

export interface ButtonProps extends StrictButtonProps {
  [key: string]: any;
}

export interface StrictButtonProps {
  // A button can display different appearances.
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

  // The prefix of the component CSS class
  classPrefix: string;

  // You can use a custom element for this component
  componentClass: React.ElementType;

  // Additional classes
  className?: string;

  // A button can show it is currently the active user selection
  active?: boolean;

  // Display block buttons
  block?: boolean;

  // Redirect url of link button
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
