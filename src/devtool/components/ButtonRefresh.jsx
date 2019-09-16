import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

export default ({ onClick }) => (
  <IconButton
    aria-label="refresh"
    className="tab-icon-refresh"
    size="small"
    onClick={onClick}
  >
    <RefreshIcon fontSize="inherit" />
  </IconButton>
);
