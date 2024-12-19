import { useState, ChangeEvent } from 'react';

const useInputTypeCommon = (initValue: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return { value, onChange, onReset };
};

export default useInputTypeCommon;
