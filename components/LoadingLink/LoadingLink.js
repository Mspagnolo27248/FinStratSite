import { useState } from 'react';
import Link from 'next/link';
import LoadingSpinner from './LoadingLink';
import { RingLoader } from 'react-spinners';

function LoadingLink({ href, children,onClick}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Wait a short time to show the spinner (optional)
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    onClick();
  };

  return (
    <>
      {isLoading &&  <RingLoader color="#36d7b7" />}
      <Link href={href} onClick={handleClick}>
        {children}
      </Link>
    </>
  );
}


export default LoadingLink