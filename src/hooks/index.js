import { useState } from 'react';

export const useField = (type, name) => {
  const [value, setValue] = useState(``);

  const reset = () => setValue(``);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    input: {
      type, value, onChange, name,
    },
    reset
  };
};