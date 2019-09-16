import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import VerticalSplitPanel from './VerticalSplitPanel';
import ResourceFilterForm from './ResourceFilterForm';

export default function TabResources({ data = {} }) {
  const [jsonTree, setJsonTree] = useState(data);
  console.log('jsonTree', jsonTree);

  return (
    <VerticalSplitPanel>
      <VerticalSplitPanel.Panel>
        <ResourceFilterForm
          initialFormData={{}}
          resourceList={data.resource_list}
        />
      </VerticalSplitPanel.Panel>
      <VerticalSplitPanel.Panel>
        <ReactJson src={jsonTree} />
      </VerticalSplitPanel.Panel>
    </VerticalSplitPanel>
  );
}
