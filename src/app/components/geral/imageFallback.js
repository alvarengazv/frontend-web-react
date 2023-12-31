import React, { useState, useEffect } from 'react';
import { MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';

export default function ImageWithFallback({ src, alt, size, login }) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          if (isLoading) {
            setIsLoading(false);
          }
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [isLoading]);

    return isLoading ? (
        <MDBSpinner className='mx-2 mt-2' size='sm' grow role="status" aria-hidden="true" />
    ) : !imageError ? (
        <img
            src={src}
            alt={alt}
            style={{ width: size, height: size }}
            className='rounded-circle mx-1 mt-2'
            onError={() => {
                setImageError(true)
                setIsLoading(false)
            }}
            onLoad={() => setIsLoading(false)}
        />
    ) : (
        <MDBIcon size={ login ? '2x' : null} className='mx-2 mt-2' color={ login ? "black" : null } fas icon="user" />
    );
}