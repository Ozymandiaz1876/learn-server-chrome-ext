import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

function Popup() {
  const { token, logout } = useAuth();
  const [isListenerEnabled, setIsListenerEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['listenerEnabled'], (result) => {
      setIsListenerEnabled(result.listenerEnabled);
    });
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    setIsLoading(false);
  };

  const toggleListener = () => {
    setIsLoading(true);
    const newState = !isListenerEnabled;
    setIsListenerEnabled(newState);
    chrome.storage.local.set({ listenerEnabled: newState }, () => {
      setIsLoading(false);
    });
  };

  return (
    <div style={{ width: '300px', padding: '10px' }}>
      {token ? (
        <div>
          <h2>Welcome!</h2>
          <button
            type='button'
            onClick={toggleListener}
            disabled={isLoading}
            style={{ marginBottom: '10px' }}
          >
            {isLoading ? (
              <Loader size='small' />
            ) : (
              `${isListenerEnabled ? 'Disable' : 'Enable'} Listener`
            )}
          </button>
          <button type='button' onClick={handleLogout} disabled={isLoading}>
            {isLoading ? <Loader size='small' /> : 'Logout'}
          </button>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}

export default Popup;
