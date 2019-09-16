import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function TabPanel({
  className,
  children,
  value,
  index,
}) {
  const shouldHide = value !== index;
  const style = {
    display: shouldHide ? 'none' : 'block',
  };

  return (
    <div className={clsx(className, 'bdev-tab-panel')} style={style}>
      {children}
    </div>
  );
}

TabPanel.defaultProps = {
  children: null,
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
