import React from 'react';
import PropTypes from 'prop-types';

interface TabProps {
  /**
   * The children of the tab.
   */
  children?: React.ReactNode;

  /**
   * The disabled state of the tab.
   */
  disabled?: boolean;

  /**
   * The event key of the tab.
   */
  eventKey?: string;

  /**
   * The icon of the tab.
   */
  icon?: React.ReactNode;

  /**
   * Content for the tab title.
   */
  title: React.ReactNode;
}

const Tab: React.FC<TabProps> = () => {
  return <></>;
};

Tab.displayName = 'Tab';
Tab.propTypes = {
  disabled: PropTypes.bool,
  eventKey: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node,
  icon: PropTypes.node
};

export default Tab;
