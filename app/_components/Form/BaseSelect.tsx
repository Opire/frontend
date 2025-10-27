import { useState } from 'react';
import { Select } from '@mantine/core';

export function BaseSelect<T>({
  options,
  validator,
  onChange,
  value = undefined,
  label = '',
  required = false,
  placeholder = '',
}: {
  options: T[];
  validator: (value?: T, required?: boolean) => string | null;
  onChange: (value?: T) => void;
  value?: T;
  label?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [error, setError] = useState<string | null>(null);

  const onLocalChange = (newValue: T | null) => {
    if (!newValue) {
      onChange(undefined);

      return;
    }

    onChange(newValue);
    updateErrorState(newValue);
  };

  const updateErrorState = (value?: T) => {
    const error = validator(value, required);
    setError(error);
  };

  return (
    <Select
      onBlur={() => updateErrorState(value)}
      data={options as string[]}
      label={label}
      placeholder={placeholder}
      required={required}
      value={value as string}
      onChange={el => onLocalChange(el as T)}
      error={error}
    />
  );
}
