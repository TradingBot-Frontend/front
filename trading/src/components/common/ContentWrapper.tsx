import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface ContentWrapperProps {
  title: string;
  addButton?: JSX.Element;
  children: JSX.Element;
  overflow?: string;
  handleOpen?: () => void;
}

export default function ContentWrapper({
  title,
  addButton,
  children,
  overflow = 'auto',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleOpen = () => {},
}: ContentWrapperProps): JSX.Element {
  return (
    <Box
      sx={{
        flex: 1,
        padding: '2rem',
      }}
    >
      <Typography variant="h4" component="div">
        {title}
        {addButton ? (
          <IconButton
            aria-label="add"
            sx={{ marginLeft: '0.8rem' }}
            onClick={handleOpen}
          >
            add
          </IconButton>
        ) : null}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: '80vh',
          padding: '1rem 0rem 0rem 0rem',
          overflow,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
