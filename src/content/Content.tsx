import React, { useEffect, useState } from 'react';

export default function Content() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['token'], (result) => {
      setToken(result.token);
    });
  }, []);

  if (!token) {
    return null;
  }

  return <div>Content script loaded</div>;
}
