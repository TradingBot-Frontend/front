import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@material-ui/core/Divider';
import Switch from '@mui/material/Switch';
import { ReadStream } from 'fs';

const SmallTextField = ({ ...rest }: any) => {
  console.log('rest', rest);
  return <TextField size="small" {...rest} />;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 25,
  p: 4,
};

const InputWrapper = styled.div`
  display: flex;
  margin: 0rem 0rem 2rem 0rem;
  .lable {
    display: flex;
    width: 7rem;
    align-items: center;
    margin: 0rem 3rem 0rem 0rem;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
`;
const TextFields = styled(TextField)`
  .MuiOutlinedInput-input {
    /* padding: 0.5rem; */
    /* height: 0.5rem; */
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
  margin: 4rem 0rem 0rem 0rem;
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
const TradingBotAdd = ({ handleClose }: ISettingProps) => {
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
          <Box>
            <h3>트레이딩봇</h3>
            <InputWrapper>
              <span className="lable">트레이딩봇 이름</span>
              <SmallTextField
                id="pwConfirm"
                variant="outlined"
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">암호화폐명</span>
              <Select
                id="exchange"
                style={{ width: '7rem' }}
                defaultValue="bitsum"
                onChange={handleSelectChange}
              >
                <MenuItem value="bitsum">BTC</MenuItem>
                <MenuItem value="upbit">ADA</MenuItem>
                <MenuItem value="binance">BTT</MenuItem>
              </Select>
            </InputWrapper>
          </Box>
          <Divider />
          <Box>
            <h3>매수설정</h3>
            <InputWrapper>
              <span className="lable">이동평균선</span>
              <Select
                id="exchange"
                style={{ width: '7rem' }}
                defaultValue="bitsum"
                onChange={handleSelectChange}
              >
                <MenuItem value="bitsum">BTC</MenuItem>
                <MenuItem value="upbit">ADA</MenuItem>
                <MenuItem value="binance">BTT</MenuItem>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <span className="lable">조건</span>
              <div className="row">
                <TextFields
                  size="small"
                  id="pwConfirm"
                  variant="outlined"
                  label="기준"
                  onChange={handleChange}
                  style={{ width: '6rem', margin: '0rem 1rem 0rem 0rem' }}
                  //   value="dgsg"
                />
                <Select
                  id="exchange"
                  style={{ width: '7rem', height: '2.25rem' }}
                  defaultValue="bitsum"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="bitsum">BTC</MenuItem>
                  <MenuItem value="upbit">ADA</MenuItem>
                  <MenuItem value="binance">BTT</MenuItem>
                </Select>
              </div>
            </InputWrapper>
            <InputWrapper>
              <span className="lable">수량</span>
              <TextFields
                id="pwConfirm"
                variant="outlined"
                onChange={handleChange}
                //   value="dgsg"
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">매수총액(현재가)</span>
              <TextFields
                id="pwConfirm"
                variant="outlined"
                onChange={handleChange}
                disabled
                value="6.353.24원"
              />
            </InputWrapper>
          </Box>
          <Divider />
          <Box>
            <h3>매수설정</h3>
            <InputWrapper>
              <span className="lable">수익률</span>
              <Select
                id="exchange"
                style={{ width: '7rem' }}
                defaultValue="bitsum"
                onChange={handleSelectChange}
              >
                <MenuItem value="bitsum">10%</MenuItem>
                <MenuItem value="upbit">20%</MenuItem>
                <MenuItem value="binance">30%</MenuItem>
              </Select>
            </InputWrapper>
          </Box>

          <FooterWrapper>
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
export default TradingBotAdd;
