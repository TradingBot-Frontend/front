import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@material-ui/core/Divider';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Bot } from '@redux/reducers/botReducer';
import { styled as muiStyled } from '@mui/material/styles';

const SmallTextField = ({ ...rest }: any) => {
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

const IOSSwitch = muiStyled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => {
  return {
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor:
            theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  };
});

interface ISettingProps {
  // botInfo?: BotInfo;
  botInfo?: Bot;
  handleClose: () => void;
}

const TradingBotAdd = ({
  botInfo,
  handleClose,
}: ISettingProps): JSX.Element => {
  const [values, setValues] = useState<Bot>({
    uuid: '',
    botName: '',
    coinName: '',
    bidReference: '7ma', // 이동평균선
    bidCondition: 0, // 기준
    bidQuantity: 0, // 수량
    isBidConditionExceed: false, // 기준대비
    // totalBuy: '',
    askCondition: 0, // 수익률
    isActive: false,
  });
  useEffect(() => {
    // console.log('states:', states);
    if (botInfo) {
      setStates(botInfo);
    }
  }, [states]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit:', states);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log('id:', id, 'value:', value);
    setStates({
      ...states,
      [id]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent, key: string) => {
    setStates({
      ...states,
      [key]: e.target.value,
    });
  };

  const handleButtonClick = () => {
    handleClose();
    console.log('클릭!');
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('스위치 on/off');
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
                id="botName"
                variant="outlined"
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">암호화폐명</span>
              <div className="row">
                <Select
                  id="coinName"
                  style={{ width: '7rem' }}
                  defaultValue="bitsum"
                  onChange={(e) => handleSelectChange(e, 'coinName')}
                >
                  <MenuItem value="bitsum">BTC</MenuItem>
                  <MenuItem value="upbit">ADA</MenuItem>
                  <MenuItem value="binance">BTT</MenuItem>
                </Select>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1, ml: 5 }}
                      defaultChecked
                      onChange={handleSwitchChange}
                    />
                  }
                  label="동작"
                />
              </div>
            </InputWrapper>
          </Box>
          <Divider />
          <Box>
            <h3>매수설정</h3>
            <InputWrapper>
              <span className="lable">이동평균선</span>
              <Select
                id="bidReference"
                style={{ width: '7rem' }}
                defaultValue="7ma"
                onChange={(e) => handleSelectChange(e, 'coinName')}
              >
                <MenuItem value="7ma">7MA</MenuItem>
                <MenuItem value="60ma">60MA</MenuItem>
                <MenuItem value="120ma">120MA</MenuItem>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <span className="lable">조건</span>
              <div className="row">
                <SmallTextField
                  size="small"
                  id="bidCondition"
                  variant="outlined"
                  label="기준"
                  onChange={handleChange}
                  style={{ width: '6rem', margin: '0rem 1rem 0rem 0rem' }}
                  //   value="dgsg"
                />

                <Select
                  id="isBidConditionExceed"
                  style={{ width: '7rem', height: '2.5rem' }}
                  defaultValue="up"
                  onChange={(e) => handleSelectChange(e, 'standardLine')}
                >
                  <MenuItem value="up">이상</MenuItem>
                  <MenuItem value="down">이하</MenuItem>
                  <MenuItem value="binance">??</MenuItem>
                </Select>
              </div>
            </InputWrapper>
            <InputWrapper>
              <span className="lable">수량</span>
              <SmallTextField
                id="bidQuantity"
                variant="outlined"
                onChange={handleChange}
                //   value="dgsg"
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">매수총액(현재가)</span>
              <TextFields
                id="totalBuy"
                variant="outlined"
                onChange={handleChange}
                disabled
                value="6.353.24원"
              />
            </InputWrapper>
          </Box>
          <Divider />
          <Box>
            <h3>매도설정</h3>
            <InputWrapper>
              <span className="lable">수익률</span>
              <Select
                id="askCondition"
                style={{ width: '7rem' }}
                defaultValue="ten"
                onChange={(e) => handleSelectChange(e, 'earnRate')}
              >
                <MenuItem value="ten">10%</MenuItem>
                <MenuItem value="twenty">20%</MenuItem>
                <MenuItem value="thirty">30%</MenuItem>
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
