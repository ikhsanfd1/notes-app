import { useState } from 'react';

function useInput(initialState) {
  const [value, setValue] = useState(initialState);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
}

export default useInput;
