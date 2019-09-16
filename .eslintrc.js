'use strict';

module.exports = {
  extends: '../../.eslintrc.js',
  globals: {
    chrome: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: '.'
      }
    }
  }
};
