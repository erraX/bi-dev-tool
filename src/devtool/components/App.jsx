import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ButtonRefresh from './ButtonRefresh';
import { sendMessage, onReceiveMessage } from '../chrome';
import TabPanel from './TabPanel';
import TabResources from './TabResources';
import TabTargets from './TabTargets';
import TabConstants from './TabConstants';

export default function App() {
  const [curTab, setCurTab] = useState(0);
  const [json, setJson] = useState({});
  const handleTabChange = (event, newValue) => setCurTab(newValue);

  const handleRefresh = () => {
    sendMessage({ action: 'GET_RESOURCE_INFO' });
  };

  useEffect(() => {
    onReceiveMessage((data) => {
      const parsedData = JSON.parse(data);
      console.log('new data', parsedData);
      setJson(parsedData[0]);
    });
    // handleRefresh();
  }, []);

  return (
    <>
      <Paper square>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={curTab}
          onChange={handleTabChange}
        >
          <Tab label="资源" />
          <Tab label="定向" />
          <Tab label="常量" />
        </Tabs>
        <ButtonRefresh onClick={handleRefresh} />
      </Paper>
      <TabPanel value={curTab} index={0}>
        <TabResources data={json} />
      </TabPanel>
      <TabPanel value={curTab} index={1}>
        <TabTargets />
      </TabPanel>
      <TabPanel value={curTab} index={2}>
        <TabConstants />
      </TabPanel>
    </>
  );
}
