import React, { useEffect, useState } from 'react';
import AuthService from '../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { registAndLoginFailure, registAndLoginStart, registAndLoginSuccess } from '../slice/auth';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { logo } from '../constants';
import { Input } from '../ui';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { errors, isLoading, loggedIn } = useSelector(state => state.auth)
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (email === '' || password === '') {
      setError("Can't be empty");
      return;
    }
    dispatch(registAndLoginStart());
    try {
      const response = await AuthService.userLogin(email, password)
      dispatch(registAndLoginSuccess(response))
      navigate('/')
      console.log(response);
    } catch (error) {
      dispatch(registAndLoginFailure(error.message))
    }
  };

  useEffect(() => {
    if(loggedIn) {
      navigate('/')
    }
  }, [loggedIn, navigate])

  return (
    <Box className='bg-dark-blue h-dvh flex justify-center'>
      <Stack className='max-w-[25rem] w-full h-fi mt-[4.901rem]'>
        <Box component={'img'} src={logo} width={'2rem'} mx={'auto'} />
        <form onSubmit={handleRegister} className='text-white bg-semi-dark-blue p-8 rounded-[1.25rem] mt-[5.187rem]'>
          {errors && <Alert severity="error">{errors.slice(22, -2)}</Alert>}
          <Box component={'div'} display={'flex'} className='input-box focus-within:border-b-white flex items-center'>
            <Input state={email} setState={setEmail} type={'email'} placeholder={'Email address'} className={`form-input ${error && email === '' ? 'w-[70%]' : ''}`} />
            {error && email === '' && <Typography variant='subtitle2' className='text-red'>{error}</Typography>}
          </Box>
          <Box component={'div'} display={'flex'} className='input-box focus-within:border-b-white flex items-center'>
            <Input state={password} setState={setPassword} type={'password'} placeholder={'Password'} className={`form-input ${error && password === '' ? 'w-[70%]' : ''}`} />
            {error && password === '' && <Typography variant='subtitle2' className='text-red'>{error}</Typography>}
          </Box>
          <Button type='submit' variant='contained' className='w-full bg-red hover:bg-white hover:text-dark-blue mt-6 normal-case py-[.75rem] rounded-md'>
            {isLoading ? <CircularProgress size={20} className='text-dark-blue' /> : 'Login to your accounty'}
          </Button>
          <Typography textAlign={'center'} mt={'1.5rem'} className='text-base'>
            Don’t have an account? <Link to={'/signup'} className='text-red ml-1'>Sign Up</Link>
          </Typography>
        </form>
      </Stack>
    </Box>
  );
};

export default Login;
