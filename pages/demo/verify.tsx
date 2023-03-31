import { Backdrop, ButtonBase, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Backdrop
        open={isLoading}
        style={{
          color: '#538fff',
          zIndex: '999',
          opacity: '0.5',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        display="flex"
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        gap="2rem"
        flexDirection="column"
      >
        <div>入场</div>
        <ButtonBase
          style={{
            width: '6.875rem',
            height: '3rem',
            borderRadius: '10px',
            backgroundColor: '#538fff',
            fontSize: '1rem',
            color: '#fff',
            padding: '0.5rem',
          }}
        >
          验证
        </ButtonBase>
      </Box>
    </>
  );
};

export default Verify;
