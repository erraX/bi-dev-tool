function injectScript(content, node) {
  const el = document.getElementsByTagName(node)[0];
  const script = document.createElement('script');

  const removeScript = () => el.removeChild(script);

  script.setAttribute('type', 'text/javascript');
  script.textContent = content;
  script.onload = removeScript;
  script.onerror = removeScript;

  el.appendChild(script);
}

// Receive message from extension
chrome.runtime.onMessage.addListener(
  (request) => {
    console.log('receive request', request.action);
    switch (request.action) {
      case 'GET_RESOURCE_INFO':
        injectScript(
          `
            document.dispatchEvent(new CustomEvent('__BI_DEV_TOOL__', {
              detail: JSON.stringify(window.RESOURCE_INFO)
            }))
          `,
          'body',
        );
        break;
      default:
        break;
    }
  },
);

// Listen for event fired from the page, and receive some data
document.addEventListener('__BI_DEV_TOOL__', (event) => {
  chrome.runtime.sendMessage({ data: event.detail });
});
