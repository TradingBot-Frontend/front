import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  addBotActions,
  Bot,
  updateBotActions,
} from '@redux/reducers/botReducer';
import { styled as muiStyled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { ICoinState } from '@redux/reducers/websocketReducer';
import DialogActions from '@mui/material/DialogActions';

const SmallTextField = ({ ...rest }: any) => {
  return <TextField size="small" {...rest} />;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'auto',
  // borderRadius: 25,
  p: 4,
};
const contentStyle = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
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
  /* margin: 4rem 0rem 0rem 0rem; */
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
    botName: '',
    coinName: 'BTC',
    bidReference: '7ma', // 이동평균선
    bidCondition: 0, // 기준
    bidQuantity: 0, // 수량
    isBidConditionExceed: false, // 기준대비
    askReference: 'PROFIT',
    askCondition: 0, // 수익률
    askQuantity: 0,
    isActive: false,
    description: 'default',
  });
  const [localMsg, setLocalMsg] = useState('');
  const coinList = useSelector((state: RootState) => state.coin.coinList);
  const hasDefaultBotInfo = !!botInfo;

  useEffect(() => {
    console.log('values:', values);
  }, [values]);

  useEffect(() => {
    if (botInfo) {
      setValues(botInfo);
    }
  }, []);

  useEffect(() => {
    console.log('localMsg:', localMsg);
  }, [localMsg]);

  // TODO: validation 추가

  const calculateCurrentPrice = useCallback(
    (cl: ICoinState[]) => {
      if (values.coinName && values.bidQuantity) {
        // 이게 반영 잘 되나?
        const targetCoin = cl.find((coin: ICoinState) => {
          const [name] = coin.symbol.split('_');
          return name === values.coinName;
        });
        const price = values.bidQuantity * Number(targetCoin?.openPrice || '0');
        const converted = price.toLocaleString('ko-KR', {
          maximumFractionDigits: 4,
        });
        return converted;
      }
      return 0;
    },
    [values.coinName, values.bidQuantity],
  );

  const current = useMemo(() => calculateCurrentPrice(coinList), [coinList]);

  // TODO: 제대로 작동하는지 확인
  const isBlank = useCallback(() => {
    return Object.values(values).some((val) => {
      console.log('val: ', val, 'ret: ', !val);
      if (typeof val === 'boolean') return false;
      return !val;
    });
  }, [values]);

  const handleSubmit = () => {
    if (isBlank()) {
      setLocalMsg('정보를 다 채워주세요.');
      console.log(values);
    } else {
      setLocalMsg('');
      if (hasDefaultBotInfo) {
        updateBotActions.request(values);
        console.log('update');
      } else {
        addBotActions.request(values);
        console.log('add');
      }
      handleClose();
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      console.log('id:', id, 'value:', value);
      setValues({
        ...values,
        [id]: value,
      });
    },
    [values, setValues],
  );

  const handleSelectChange = useCallback(
    (e: SelectChangeEvent, key: string) => {
      setValues({
        ...values,
        [key]: e.target.value,
      });
    },
    [values, setValues],
  );

  const handleButtonClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleSwitchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        isActive: e.target.checked,
      });
    },
    [values, setValues],
  );

  return (
    <>
      <DialogTitle sx={{ color: '#170F8B', textAlign: 'center' }}>
        TradingBot 추가
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: '1px solid #C1C6CE',
          borderTop: '1px solid #C1C6CE',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ margin: '2rem 0rem 0rem 0rem' }}>
            <InputWrapper>
              <span className="lable">트레이딩봇 이름</span>
              <SmallTextField
                id="botName"
                variant="outlined"
                value={values.botName}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">암호화폐명</span>
              <div className="row">
                <Select
                  id="coinName"
                  style={{ width: '7rem' }}
                  value={values.coinName || 'BTC'}
                  onChange={(e) => handleSelectChange(e, 'coinName')}
                >
                  <MenuItem value="BTC">BTC</MenuItem>
                  <MenuItem value="ADA">ADA</MenuItem>
                  <MenuItem value="LTC">LTC</MenuItem>
                  <MenuItem value="XRP">XRP</MenuItem>
                  <MenuItem value="ETH">ETH</MenuItem>
                  <MenuItem value="LINK">LINK</MenuItem>
                  <MenuItem value="XLM">XLM</MenuItem>
                  <MenuItem value="BCH">BCH</MenuItem>
                  <MenuItem value="EOS">EOS</MenuItem>
                  <MenuItem value="TRX">TRX</MenuItem>
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
                  value={values.bidCondition}
                  style={{ width: '6rem', margin: '0rem 1rem 0rem 0rem' }}
                />

                <Select
                  id="standardLine"
                  style={{ width: '7rem', height: '2.5rem' }}
                  defaultValue="up"
                  onChange={(e) => handleSelectChange(e, 'standardLine')}
                >
                  <MenuItem value="up">이상</MenuItem>
                  <MenuItem value="down">이하</MenuItem>
                </Select>
              </div>
            </InputWrapper>
            <InputWrapper>
              <span className="lable">수량</span>
              <SmallTextField
                id="bidQuantity"
                variant="outlined"
                value={values.bidQuantity}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">매수총액(현재가)</span>
              <TextFields
                id="totalBuy"
                variant="outlined"
                disabled
                value={`${current}원`}
              />
            </InputWrapper>
          </Box>
          <Divider />
          <Box>
            <h3>매도설정</h3>
            <InputWrapper>
              {/* <span className="lable">수익률</span>
              <Select
                id="askCondition"
                style={{ width: '7rem' }}
                defaultValue="ten"
                onChange={(e) => handleSelectChange(e, 'askCondition')}
              >
                <MenuItem value="ten">10%</MenuItem>
                <MenuItem value="twenty">20%</MenuItem>
                <MenuItem value="thirty">30%</MenuItem>
              </Select> */}
              <span className="lable">수익률</span>
              <SmallTextField
                id="askCondition"
                variant="outlined"
                value={values.askCondition}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <span className="lable">수량</span>
              <SmallTextField
                id="askQuantity"
                variant="outlined"
                value={values.askQuantity}
                onChange={handleChange}
              />
            </InputWrapper>
          </Box>
        </Box>
      </DialogContent>
      {localMsg ? <Alert severity="warning">{localMsg}</Alert> : null}
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <ConfirmButton onClick={handleSubmit}>시작</ConfirmButton>
        <CancleButton onClick={handleButtonClick}>취소</CancleButton>
      </DialogActions>
    </>
  );
};
export default TradingBotAdd;
