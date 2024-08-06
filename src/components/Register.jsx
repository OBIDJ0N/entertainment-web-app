import React, { useEffect, useState } from 'react';
import AuthService from '../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { registerAndLoginFailure, registerAndLoginStart, registerAndLoginSuccess } from '../slice/auth';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { logo } from '../constants';
import { Input } from '../ui';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { errors, isLoading, loggedIn } = useSelector(state => state.auth)

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    if (email === '' || password === '' || passwordConfirmation === '') {
      setError("Can't be empty");
      return;
    }
    if (password !== passwordConfirmation) {
      setPasswordError("Passwords don't match");
      return;
    }
    dispatch(registerAndLoginStart());
    try {
      const response = await AuthService.userRegister(email, password);
      dispatch(registerAndLoginSuccess(response));
      navigate('/')
    } catch (error) {
      dispatch(registerAndLoginFailure(error.message));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn, navigate])

  return (
    <Box className='bg-dark-blue h-dvh flex justify-center'>
      <Stack className='max-w-[25rem] w-full h-fi mt-[4.901rem] mx-6'>
        <Link to={'/'}>
          <Box component={'img'} src={logo} width={'2rem'} mx={'auto'} />
        </Link>
        <form onSubmit={handleRegister} className='text-white bg-semi-dark-blue p-8 rounded-[1.25rem] mt-[5.187rem] max-phone:p-6 max-phone:pb-7 max-phone:rounded-[.625rem]'>
          <Typography className='text-3xl mb-6'>Sign Up</Typography>
          {errors && <Alert severity="error">{errors.slice(10)}</Alert>}
          <Box component={'div'} display={'flex'} className='input-box focus-within:border-b-white flex items-center'>
            <Input state={email} setState={setEmail} type={'email'} placeholder={'Email address'} className={`form-input ${error && email === '' ? 'w-[70%]' : ''}`} />
            {error && email === '' && <Typography variant='subtitle2' className='text-red'>{error}</Typography>}
          </Box>
          <Box component={'div'} display={'flex'} className='input-box focus-within:border-b-white flex items-center'>
            <Input state={password} setState={setPassword} type={'password'} placeholder={'Password'} className={`form-input ${error && password === '' ? 'w-[70%]' : ''}`} />
            {error && password === '' && <Typography variant='subtitle2' className='text-red'>{error}</Typography>}
          </Box>
          <Box component={'div'} display={'flex'} className='input-box focus-within:border-b-white flex items-center'>
            <Input state={passwordConfirmation} setState={setPasswordConfirmation} type={'password'} placeholder={'Repeat password'} className={`form-input ${error && passwordConfirmation === '' ? 'w-[70%]' : ''}`} />
            {(error && passwordConfirmation === '') || passwordError ? (
              <Typography variant='subtitle2' className='text-red'>
                {error || passwordError}
              </Typography>
            ) : null}
          </Box>
          <Button type='submit' variant='contained' className='w-full bg-red hover:bg-white hover:text-dark-blue mt-6 normal-case py-[.75rem] rounded-md'>
            {isLoading ? <CircularProgress size={20} className='text-dark-blue' /> : 'Create an account'}
          </Button>
          <Typography textAlign={'center'} mt={'1.5rem'} className='text-base'>
            Already have an account? <Link to={'/login'} className='text-red ml-1'>Login</Link>
          </Typography>
        </form>
      </Stack>
    </Box>
  );
};

export default Register;
