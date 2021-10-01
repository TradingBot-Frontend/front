import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
    flex: 1;
    align-items: center;
    margin: 0rem 3rem 0rem 0rem;
  }
  .value {
    display: flex;
    flex: 2;
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
  margin: 0.5rem 0rem 0rem 0rem;
`;
const FooterWrapper = styled.div`
  display: flex;
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
  width: 8rem;
  margin: 0.5rem 0rem 0rem 0rem;
`;
const CancleButton = styled(Button)`
  display: flex;
  border: 1px solid #bdb8b8;
  color: #000000;
  width: 8rem;
  margin: 0.5rem 0rem 0rem 0.5rem;
`;
const DialogBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
interface ISettingProps {
  handleClose: () => void;
}
interface IButtonProps {
  [k: string]: boolean;
}
// const InitButton = () =>{

//   return(

//   )
// }
const buttonMap = [
  {
    title: 'Password setting',
    key: 'pws',
  },
  {
    title: 'API setting',
    key: 'api',
  },
  {
    title: 'Back',
    key: 'back',
  },
];
const PrivateSetting = ({ handleClose }: ISettingProps) => {
  const [button, setButton] = useState<IButtonProps>({
    pws: false,
    api: false,
    back: false,
  });
  const [states, setStates] = useState({
    password: '',
    pwConfirm: '',
    exchange: 'bitsum',
    apiKey: '',
    secretKey: '',
  });
  const { pws, api, back } = button;
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
    // handleClose();
    Object.entries(button).forEach((btn) => {
      if (btn[1]) {
        setButton({
          ...button,
          [btn[0]]: false,
        });
      }
    });
  };
  const handleSelectBtn = (key: string, value: boolean) => {
    if (key === 'back') {
      handleClose();
    } else {
      setButton({
        ...button,
        [key]: !value,
      });
    }
  };
  useEffect(() => {
    console.log('button:', button);
  }, [button]);
  return (
    <>
      <DialogTitle
        sx={{ background: '#294c60', color: '#ffffff', textAlign: 'center' }}
      >
        Privatekey Setting
      </DialogTitle>
      <DialogContent
        sx={{
          width: '20rem',
          height: '25rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {!pws &&
              !api &&
              !back &&
              buttonMap.map((btn) => {
                return (
                  <Button
                    key={btn.key}
                    onClick={() =>
                      handleSelectBtn(`${btn.key}`, button[`${btn.key}`])
                    }
                    style={{
                      background: '#adb6c4',
                      width: '10rem',
                      margin: '1rem 0rem 0rem 0rem',
                    }}
                  >
                    {btn.title}
                  </Button>
                );
              })}
            {pws && (
              <>
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
              </>
            )}
            {api && (
              <div>
                <InputWrapper>
                  <span className="lable">거래소</span>
                  <Select
                    id="exchange"
                    style={{
                      width: '6rem',
                      height: '2rem',
                      margin: '0rem 0rem 0rem 0rem',
                    }}
                    className="value"
                    defaultValue="bitsum"
                    onChange={handleSelectChange}
                  >
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
                    className="value"
                    //   value="dgsg"
                  />
                </InputWrapper>
                <InputWrapper>
                  <span className="lable">Secret Key</span>
                  <TextFields
                    id="secretKey"
                    variant="outlined"
                    onChange={handleChange}
                    className="value"
                    //   value="dgsg"
                  />
                </InputWrapper>
                <FooterWrapper>
                  <div className="validate">
                    <Buttons onClick={handleValidate}>validate</Buttons>
                    {validate && (
                      <>
                        <CheckIcon style={{ color: 'green' }} />
                        <span className="validateString">
                          유효한 API Key 입니다.
                        </span>
                      </>
                    )}
                  </div>
                </FooterWrapper>
              </div>
            )}
            {(pws || api) && (
              <BtnWrapper>
                <ConfirmButton type="submit">save</ConfirmButton>
                <CancleButton onClick={handleButtonClick}>cancel</CancleButton>
              </BtnWrapper>
            )}
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};
export default PrivateSetting;
export {};
// return (
//   <Paper>
//     <Box sx={style}>
//       <Box component="form" onSubmit={handleSubmit}>
//         <InputWrapper>
//           <span className="lable">ID</span>
//           <TextFields
//             id="id"
//             variant="outlined"
//             //   onChange={onTextChange}
//             value="dgsg"
//             disabled

//             // label="ID"
//           />
//         </InputWrapper>

//       </Box>
//     </Box>
//   </Paper>
// );
