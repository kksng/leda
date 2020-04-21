import React from 'react';

export const ArrowRight = ({ onClick }) => {
  return (
    <i
      style={{
        position: 'absolute',
        right: 0,
        padding: '10px',
        background: 'red',
      }}
      onClick={onClick}
    >
      right
    </i>
  );
};

export const ArrowLeft = ({ onClick }) => {
  return (
    <i
      style={{
        position: 'absolute',
        left: 0,
        padding: '10px',
        background: 'red',
      }}
      onClick={onClick}
    >
      left
    </i>
  );
};

