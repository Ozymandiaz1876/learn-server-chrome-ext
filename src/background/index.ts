function parseNotionUrlClient(url: string) {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('-');
    const potentialPageId = pathSegments[pathSegments.length - 1];

    if (potentialPageId && /^[0-9a-f]{32}$/i.test(potentialPageId)) {
      const pageId = potentialPageId;
      const titleSegments = pathSegments.slice(0, -1);
      let pageTitle = decodeURIComponent(
        titleSegments
          .join('-')
          .replace(/[^a-zA-Z0-9\\s-]/g, ' ')
          .trim()
          .replace(/-/g, ' ')
      );

      if (!pageTitle && urlObj.searchParams.has('p')) {
        pageTitle = urlObj.searchParams.get('p') || '';
      }
      return { pageId, pageTitle: pageTitle || null };
    }
    return { pageId: null, pageTitle: null };
  } catch (e) {
    console.error('Error parsing Notion URL:', e);
    return { pageId: null, pageTitle: null };
  }
}

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  chrome.storage.local.get(['token', 'listenerEnabled'], (result) => {
    console.log(result);

    if (
      result.token &&
      result.listenerEnabled &&
      changeInfo.status === 'complete' &&
      tab.url &&
      tab.url.includes('studyplan-chandresh.notion.site')
    ) {
      const { pageId, pageTitle } = parseNotionUrlClient(tab.url);

      if (pageId && pageTitle) {
        fetch('https://study-helper.chandreshsharma06-cs.workers.dev', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${result.token}`,
          },
          body: JSON.stringify({
            page_id: pageId,
            page_title: pageTitle,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  });
});
