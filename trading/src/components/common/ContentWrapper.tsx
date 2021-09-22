import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ContentWrapperProps {
  title: string;
  children: JSX.Element;
}

export default function ContentWrapper({
  title,
  children,
}: ContentWrapperProps): JSX.Element {
  return (
    <Box
      sx={{
        flex: 1,
        padding: '2rem',
      }}
    >
      <Typography variant="h3" component="div">
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: '80vh',
          padding: '1rem 0rem 0rem 0rem',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
