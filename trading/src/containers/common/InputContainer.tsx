import React, { useEffect } from 'react';
import { CommonInput } from '@components/common/Input';

export interface InputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: () => void;
}
export const CommonInputContainer: React.FC<InputProps> = ({ placeholder, onChange, onKeyPress }) => {
  return <CommonInput placeholder={placeholder} onChange={onChange} onKeyPress={onKeyPress} />;
};
