import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
import { RegisterForm } from '../sections/auth/register';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src="/assets/illustrations/illustration_register.jpg" alt="register" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to AioPro
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Do have an account? 
              <Link to="/login">Login</Link>
            </Typography>
            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
