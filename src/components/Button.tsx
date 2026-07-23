import { useState } from 'react';

export default function Button() {
  const [count, setCount] = useState(0);

  return (
    <button className='bg-red-500' onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
