import Image from 'next/image';
import React from 'react';

const LogoComponent = (props: any) => {
  const { src } = props;

  return (
    <div
      style={{
        width: '35px',
        height: '35px',
        borderRadius: '100%',
        background: '#4B4B4B',
      }}
    >
      {src ? (
        <Image
          src={src}
          alt='company Logo'
          width='100%'
          height='100%'
          style={{
            borderRadius: '100%',
            objectFit: 'cover',
            position: 'relative',
            zIndex: 1,
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default LogoComponent;
