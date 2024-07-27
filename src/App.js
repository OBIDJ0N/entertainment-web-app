import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Bookmark, CastsDetails, Details, EditProfile, Login, Main, Movie, Navbar, Profile, Register, Search, Tv } from './components';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import AuthService from './service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, registAndLoginSuccess, registerAndLoginSuccess } from './slice/auth';
import LoadingBar from 'react-top-loading-bar';
import { Alerts } from './ui';

const App = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null)
  const isLoginPage = useMatch('/login')
  const isSignupPage = useMatch('/signup')
  const isDetailPage = useMatch('/detail/:type/:id')
  const isProfilePage = useMatch('/profile')
  const isEditProfilePage = useMatch('/edit-profile')

  useEffect(() => {
    ref.current.continuousStart();
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(registerAndLoginSuccess(user));
      } else {
        dispatch(logOutUser());
      }
      ref.current.complete();
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [dispatch]);
  

  // useEffect(() => {
  //   if (!loading) {
  //     if (!loggedIn && window.location.pathname !== '/signup') {
  //       navigate('/login'); 
  //     }
  //   }
  // }, [loggedIn, loading, navigate]);
  
  return (
    <ThemeProvider theme={theme}>
      <LoadingBar color="#f11946" ref={ref} shadow={true} height={3} />
      {(!isLoginPage && !isSignupPage && !isDetailPage && !isProfilePage && !isEditProfilePage) && <Navbar /> }
      <Routes>
        <Route path='/' element={<Main loadingBarRef={ref} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/bookmark' element={<Bookmark />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/detail/:type/:id' element={<Details />} />
        <Route path='/detail/person/:id' element={<CastsDetails />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
      <Alerts loggedIn={loggedIn} />
    </ThemeProvider>
  );
};

export default App;
