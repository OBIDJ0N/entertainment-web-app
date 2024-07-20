import React from 'react'
import AuthService from '../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../slice/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    const clickHandler = () => {
        AuthService.userLogout();
        dispatch(logOutUser());
        navigate('/')
    };
    console.log(user);
    return (
        <>
            <Stack display={'flex'} alignItems={'center'}>
                <Box className='max-w-[15rem] w-full mt-[4.901rem] text-white'>
                    <Typography className='text-3xl mb-8 text-center'>Profile</Typography>
                    <Avatar
                        alt={''}
                        src={user?.photoURL}
                        sx={{ width: 100, height: 100, margin: 'auto' }}
                    />
                    <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'1rem'}>
                        <Typography className='text-xl'>
                            Display name:
                        </Typography>
                        <Typography className='text-base'>
                            {user?.displayName || 'No'}
                        </Typography>
                    </Stack>
                    <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'.5rem'}>
                        <Typography className='text-xl'>
                            Email:
                        </Typography>
                        <Typography className='text-base'>
                            {user?.email}
                        </Typography>
                    </Stack>
                    <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                        {''}
                    </Typography>
                    <Stack display={'flex'} flexDirection={'row'} gap={'1rem'} mt={'3rem'}>
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} type='button' variant='contained' className='w-full bg-greyish-blue hover:bg-white hover:text-dark-blue normal-case  rounded-md'>
                            Back
                        </Button>
                        <Button onClick={() => navigate('/edit-profile')} type='button' variant='contained' className='w-full text-dark-blue bg-white hover:bg-greyish-blue hover:text-white normal-case rounded-md'>
                            Edit profile
                        </Button>
                    </Stack>
                    <Button onClick={() => clickHandler()} type='button' variant='contained' className='w-full bg-red hover:bg-white hover:text-dark-blue mt-6 normal-case rounded-md'>Log out</Button>
                </Box>
            </Stack>
        </>
    )
}

export default Profile