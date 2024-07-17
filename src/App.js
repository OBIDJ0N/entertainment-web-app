import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Bookmark, Details, Login, Main, Movie, Navbar, Register, Search, Tv } from './components';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import AuthService from './service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, registAndLoginSuccess } from './slice/auth';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null)
  const isLoginPage = useMatch('/login')
  const isSignupPage = useMatch('/signup')
  const isDetailPage = useMatch('/detail/:type/:id')

  useEffect(() => {
    ref.current.continuousStart()
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(registAndLoginSuccess(user));
      } else {
        dispatch(logOutUser());
      }
      ref.current.complete()
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!loggedIn && window.location.pathname !== '/signup') {
        navigate('/login'); 
      }
    }
  }, [loggedIn, loading, navigate]);
  
  return (
    <ThemeProvider theme={theme}>
      <LoadingBar color="#f11946" ref={ref} shadow={true} height={3} />
      {(!isLoginPage && !isSignupPage && !isDetailPage) && <Navbar /> }
      <Routes>
        <Route path='/' element={<Main loadingBarRef={ref} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/bookmark' element={<Bookmark />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/detail/:type/:id' element={<Details />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
