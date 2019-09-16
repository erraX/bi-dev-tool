/**
 * 获取当前窗口当前激活的tab
 *
 * @returns {Promise<any>}
 */
export const queryCurTabs = () => new Promise(
  resolve => chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    tabs => resolve(tabs),
  ),
);

/**
 * 发送事件至 content script
 *
 * @param message
 * @returns {Promise<void>}
 */
export const sendMessage = async (message) => {
  const tabs = await queryCurTabs();
  if (tabs && tabs.length && tabs[0] && tabs[0].id) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  }
  else {
    throw new Error('Cannot sendMessage to content script. Because current tabs not exists');
  }
};

/**
 * 从 content script 接收事件
 *
 * @param message
 * @returns {Promise<void>}
 */
export const onReceiveMessage = callback => (
  chrome.runtime.onMessage.addListener(({ data }) => callback(data))
);
