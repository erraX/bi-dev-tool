import React, { useState, useMemo, useCallback } from 'react';
import map from 'lodash-es/map';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default function ResourceFilterForm({
  resourceList = {},
  initialFormData = {},
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [resourceIdOptions, setResourceIdOptions] = useState([]);

  const querySectionOptions = useMemo(
    () => Object.keys(resourceList).map(key => ({
      text: key,
      value: key,
    })),
    [resourceList],
  );

  const handleQuerySectionChange = useCallback(({ target }) => {
    const resources = resourceList[target.value].info;
    setFormData(formData => ({
      ...formData,
      querySection: target.value,
    }));
    setResourceIdOptions(map(resources, (resource, index) => ({
      text: index,
      value: index,
    })));
  }, [resourceList]);

  const handleResourceIdChange = useCallback(({ target }) => {
    setFormData(formData => ({
      ...formData,
      resourceId: target.value,
    }));
  }, []);

  return (
    <form autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="query-section">询量阶段</InputLabel>
        <Select
          style={{ width: 200 }}
          value={formData.querySection}
          onChange={handleQuerySectionChange}
          inputProps={{
            name: 'query-section',
            id: 'query-section',
          }}
        >
          {querySectionOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="resource-id">资源编号/ID</InputLabel>
        <Select
          style={{ width: 200 }}
          value={formData.resourceId}
          onChange={handleResourceIdChange}
          inputProps={{
            name: 'resource-id',
            id: 'resource-id',
          }}
        >
          {resourceIdOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
