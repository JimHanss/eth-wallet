import { Box, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();

  const goBack = () => {
    router.push('/demo/verify');
  };

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      gap="2rem"
      flexDirection="column"
    >
      Verify Success
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
        onClick={goBack}
      >
        Go Back
      </ButtonBase>
    </Box>
  );
};

export default Success;
