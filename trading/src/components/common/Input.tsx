import Input from '@material-ui/core/Input';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputProps } from '@containers/common/InputContainer';

export const CommonInput: React.FC<InputProps> = ({ placeholder, onChange, onKeyPress }) => {
  return (
    <div>
      <Input
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'description' }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
