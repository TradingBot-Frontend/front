import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 650,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const InputWrapper = styled.div`
  display: flex;
  margin: 0rem 0rem 2rem 0rem;
  .lable {
    display: flex;
    width: 4rem;
    align-items: center;
    margin: 0rem 3rem 0rem 0rem;
  }
`;
const TextFields = styled(TextField)`
  .MuiOutlinedInput-input {
    padding: 0.5rem;
  }
  input[disabled] {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .validate {
    display: flex;
    flex-direction: row;
  }
  .validateString {
    margin: 0.2rem 0rem 0rem 0.2rem;
  }
`;
const Buttons = styled(Button)`
  color: #ffffff;
  background-color: #3072eb;
  width: 7rem;
`;
const ConfirmButton = styled(Button)`
  display: flex;
  background-color: #bdb8b8;
  color: #ffffff;
  width: 11rem;
  margin: 0.5rem 0rem 0rem 0rem;
`;
const CancleButton = styled(Button)`
  display: flex;
  border: 1px solid #bdb8b8;
  color: #000000;
  width: 11rem;
  margin: 0.5rem 0rem 0rem 0.5rem;
`;
interface ISettingProps {
  handleClose: () => void;
}
const PrivateSetting = ({ handleClose }: ISettingProps) => {
  const [states, setStates] = useState({
    password: '',
    pwConfirm: '',
    exchange: 'bitsum',
    apiKey: '',
    secretKey: '',
  });
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    console.log('states:', states);
  }, [states]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit:', states);
  };
  const handleValidate = () => {
    setValidate(!validate);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log('id:', id, 'value:', value);
    setStates({
      ...states,
      [id]: value,
    });
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    setStates({
      ...states,
      exchange: e.target.value,
    });
  };
  const handleButtonClick = () => {
    handleClose();
    console.log('클릭!');
  };
  return (
    <Paper>
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit}>
          <InputWrapper>
            <span className="lable">ID</span>
            <TextFields
              id="id"
              variant="outlined"
              //   onChange={onTextChange}
              value="dgsg"
              disabled

              // label="ID"
            />
          </InputWrapper>
          <InputWrapper>
            <span className="lable">email</span>
            <TextFields
              id="email"
              variant="outlined"
              // onChange={onTextChange}
              value="dgsg"
              disabled
              // label="ID"
            />
          </InputWrapper>
          <InputWrapper>
            <span className="lable">Password</span>
            <TextFields
              id="password"
              variant="outlined"
              onChange={handleChange}
              //   value="dgsg"

              // label="ID"
            />
          </InputWrapper>
          <InputWrapper>
            <span className="lable">PW Confirm</span>
            <TextFields
              id="pwConfirm"
              variant="outlined"
              onChange={handleChange}
              //   value="dgsg"
            />
          </InputWrapper>
          <InputWrapper>
            <span className="lable">거래소</span>
            <Select id="exchange" style={{ width: '7rem' }} defaultValue="bitsum" onChange={handleSelectChange}>
              <MenuItem value="bitsum">빗썸</MenuItem>
              <MenuItem value="upbit">업비트</MenuItem>
              <MenuItem value="binance">바이넨스</MenuItem>
            </Select>
          </InputWrapper>
          <InputWrapper>
            <span className="lable">API key</span>
            <TextFields
              id="apiKey"
              variant="outlined"
              onChange={handleChange}
              //   value="dgsg"
            />
          </InputWrapper>
          <InputWrapper>
            <span className="lable">Secret Key</span>
            <TextFields
              id="secretKey"
              variant="outlined"
              onChange={handleChange}
              //   value="dgsg"
            />
          </InputWrapper>
          <FooterWrapper>
            <div className="validate">
              <Buttons onClick={handleValidate}>validate</Buttons>
              {validate && (
                <>
                  <CheckIcon style={{ color: 'green' }} />
                  <span className="validateString">유효한 API Key 입니다.</span>
                </>
              )}
            </div>
            <BtnWrapper>
              <ConfirmButton type="submit">save</ConfirmButton>
              <CancleButton onClick={handleButtonClick}>cancel</CancleButton>
            </BtnWrapper>
          </FooterWrapper>
        </Box>
      </Box>
    </Paper>
  );
};
export default PrivateSetting;
