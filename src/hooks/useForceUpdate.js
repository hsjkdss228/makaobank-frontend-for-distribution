import { useState } from 'react';

export default function useForceUpdate() {
  const [count, setValue] = useState(0);

  return () => setValue((count + 1));
}
