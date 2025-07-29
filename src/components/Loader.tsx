import React from 'react';

interface LoaderProps {
  size: 'small' | 'medium' | 'large';
}

function Loader({ size = 'medium' }: LoaderProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: '16px', height: '16px' };
      case 'large':
        return { width: '32px', height: '32px' };
      case 'medium':
      default:
        return { width: '24px', height: '24px' };
    }
  };

  const sizeStyle = getSize();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div
        style={{
          ...sizeStyle,
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
